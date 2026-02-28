
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'
import { getClientIp } from '@/lib/getClientIp'
import crypto from 'crypto'

export const runtime = "nodejs";

/**
 * Smart URL Builder — safe param injection using oi_ namespace.
 * Never overwrites params already present in the base URL.
 */
function buildSurveyUrl(
    rawUrl: string,
    sessionToken: string,
    uid: string,
    prefix: string
): string {
    const url = new URL(rawUrl)
    const existingParams = new Set(url.searchParams.keys())
    const safeSet = (key: string, value: string) => {
        if (!existingParams.has(key)) url.searchParams.set(key, value)
    }
    safeSet(`${prefix}session`, sessionToken)
    safeSet(`${prefix}uid`, uid)
    return url.toString()
}

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ code: string; uid: string }> }
) {
    const { code, uid } = await context.params
    const ip = getClientIp(request);

    // 1. Validation
    if (!code || !uid) {
        return NextResponse.redirect(new URL('/paused?title=INVALID_LINK', request.url))
    }

    const supabase = await createAdminClient()
    if (!supabase) {
        return NextResponse.redirect(new URL('/paused?title=SYSTEM_OFFLINE', request.url))
    }

    try {
        // 2. Fetch Project
        const { data: project } = await supabase
            .from('projects')
            .select('*')
            .eq('project_code', code)
            .maybeSingle()

        if (!project) {
            return NextResponse.redirect(new URL('/paused?title=PROJECT_NOT_FOUND', request.url))
        }

        if (project.status === 'paused') {
            return NextResponse.redirect(new URL(`/paused?pid=${code}&title=PROJECT_PAUSED`, request.url))
        }

        const sessionToken = crypto.randomUUID()
        const oiPrefix: string = (project as any).oi_prefix || 'oi_'

        // 3. Insert in_progress record
        const { error: insertError } = await supabase
            .from('responses')
            .insert([{
                project_id: project.id,
                project_code: code,
                project_name: project.project_name || code,
                uid: uid,
                user_uid: uid,
                session_token: sessionToken,
                oi_session: sessionToken,   // Primary match key — no vendor PID collision
                clickid: sessionToken,
                hash: sessionToken,
                status: 'in_progress',
                ip: ip,
                user_agent: request.headers.get('user-agent') || 'Unknown',
                last_landing_page: 'entry',
                created_at: new Date().toISOString()
            }])

        if (insertError) {
            console.error('[Entry] DB Insert failed:', insertError)
            return NextResponse.redirect(new URL('/paused?title=TRACKING_ERROR', request.url))
        }

        // 4. Determine UID to use (Rule: Target UID Override)
        const tokenToUse = project.target_uid || uid

        // 5. Smart URL Builder — never reuse vendor params
        const builtUrl = buildSurveyUrl(project.base_url, sessionToken, tokenToUse, oiPrefix)

        // 5. Redirect to Survey
        return NextResponse.redirect(new URL(builtUrl))

    } catch (e) {
        console.error('[SmartRouter] Exception:', e)
        return NextResponse.redirect(new URL('/paused?title=SYSTEM_ERROR', request.url))
    }
}
