import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'
import crypto from 'crypto'

export const runtime = "nodejs";

function verifySignature(uid: string, sig: string): boolean {
    const secret = process.env.CALLBACK_SECRET;
    if (!secret) return true;

    const expected = crypto
        .createHmac("sha256", secret)
        .update(uid)
        .digest("hex");

    return expected === sig;
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code') || searchParams.get('pid')
    const uid = searchParams.get('uid')
    const type = searchParams.get('type') || searchParams.get('status')
    const sig = searchParams.get('sig')

    // Primary match key — oi_session (zero PID collision risk)
    const oiSession = searchParams.get('oi_session') || searchParams.get('session_token') || null

    if (!uid && !oiSession) {
        return NextResponse.json({ error: "Missing UID or oi_session" }, { status: 400 })
    }

    // 1. Signature Verification
    if (process.env.CALLBACK_SECRET && sig && uid) {
        if (!verifySignature(uid, sig)) {
            console.error(`[callback] Invalid signature for UID ${uid}`);
            const url = new URL('/status', request.url)
            url.searchParams.set('uid', uid)
            url.searchParams.set('type', 'security_terminate')
            url.searchParams.set('pid', code || 'unknown')
            return NextResponse.redirect(url)
        }
    }

    const supabase = await createAdminClient()
    if (!supabase) {
        return NextResponse.json({ error: "Database not configured" }, { status: 500 })
    }

    const statusMap: Record<string, string> = {
        'complete': 'complete',
        'terminate': 'terminated',
        'quota': 'quota_full',
        'quotafull': 'quota_full',
        'duplicate_string': 'duplicate_string',
        'duplicate_ip': 'duplicate_ip',
        'security_terminate': 'security_terminate'
    }

    const finalStatus = (type && statusMap[type]) ? statusMap[type] : 'terminated'
    const now = new Date().toISOString()

    try {
        let updated: any = null
        let updateError: any = null

        // 2a. Match by oi_session (preferred — no vendor PID collisions ever)
        if (oiSession) {
            const result = await supabase
                .from('responses')
                .update({ status: finalStatus, completed_at: now })
                .eq('oi_session', oiSession)
                .in('status', ['in_progress', 'started', 'click'])
                .select('project_code')
                .maybeSingle()
            updated = result.data
            updateError = result.error
            if (updated) {
                console.log(`[callback] oi_session match: ${oiSession} → ${finalStatus}`)
            }
        }

        // 2b. Fallback: match by clickid (backward compat for old records)
        if (!updated && uid) {
            const result = await supabase
                .from('responses')
                .update({ status: finalStatus, completed_at: now })
                .eq('clickid', uid)
                .in('status', ['in_progress', 'started', 'click'])
                .select('project_code')
                .maybeSingle()
            updated = result.data
            updateError = result.error
            if (updated) {
                console.log(`[callback] clickid fallback match: ${uid} → ${finalStatus}`)
            }
        }

        if (updateError) {
            console.error('[callback] Update failed:', updateError)
        } else if (!updated) {
            console.warn(`[callback] No in_progress record for oi_session=${oiSession} uid=${uid}`)
        }

        // 3. Redirect to Landing Page
        const landingUrl = new URL('/status', request.url)
        if (uid) landingUrl.searchParams.set('uid', uid)

        const redirectType = finalStatus === 'quota_full' ? 'quota' : finalStatus
        landingUrl.searchParams.set('type', redirectType)

        return NextResponse.redirect(landingUrl)

    } catch (e) {
        console.error('[callback] Exception:', e)
        const errorUrl = new URL('/status', request.url)
        if (uid) errorUrl.searchParams.set('uid', uid)
        errorUrl.searchParams.set('type', 'security_terminate')
        return NextResponse.redirect(errorUrl)
    }
}
