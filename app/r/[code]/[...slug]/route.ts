import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'
import { getClientIp } from '@/lib/getClientIp'
import { cookies } from 'next/headers'
import crypto from 'crypto'

export const runtime = "nodejs"

/**
 * Unified URL Builder
 */
function buildSurveyUrl(
    rawUrl: string,
    sessionToken: string,
    uid: string,
    prefix: string,
    clientPidParam?: string | null,
    clientUidParam?: string | null
): string {
    const url = new URL(rawUrl)
    const existingParams = new Set(url.searchParams.keys())
    const safeSet = (key: string, value: string) => {
        if (!existingParams.has(key)) url.searchParams.set(key, value)
    }

    safeSet(`${prefix}session`, sessionToken)

    if (clientPidParam) {
        safeSet(clientPidParam, uid)
    }
    if (clientUidParam) {
        safeSet(clientUidParam, uid)
    }

    // Default fallback
    if (!clientPidParam && !clientUidParam) {
        safeSet(`${prefix}uid`, uid)
    }

    return url.toString()
}

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ code: string; slug: string[] }> }
) {
    const { code, slug } = await context.params
    const ip = getClientIp(request)

    // Routing Logic: 
    // Case 1: /r/[code]/[uid] -> slug = [uid]
    // Case 2: /r/[code]/[supplier]/[uid] -> slug = [supplier, uid]
    let incomingUid: string | null = null
    let supplierToken: string | null = null

    if (slug.length === 1) {
        incomingUid = slug[0]
        // Legacy support: check for ?supplier= in query
        supplierToken = request.nextUrl.searchParams.get('supplier') || null
    } else if (slug.length >= 2) {
        supplierToken = slug[0]
        incomingUid = slug[1]
    }

    if (!code || !incomingUid) {
        return NextResponse.redirect(new URL('/paused?title=INVALID_LINK', request.url))
    }

    const supabase = await createAdminClient()
    if (!supabase) {
        return NextResponse.redirect(new URL('/paused?title=SYSTEM_OFFLINE', request.url))
    }

    try {
        // 1. Fetch Project
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

        // 2. Resolve Supplier Name
        let supplierName: string | null = null
        if (supplierToken) {
            const { data: supplierRow } = await supabase
                .from('suppliers')
                .select('name')
                .eq('supplier_token', supplierToken)
                .eq('status', 'active')
                .maybeSingle()
            if (supplierRow) supplierName = supplierRow.name
        }

        const sessionToken = crypto.randomUUID()
        const oiPrefix: string = (project as any).oi_prefix || 'oi_'
        let clientUidToSent = incomingUid

        // 3. PID Generation Logic
        if (project.pid_prefix) {
            const { data: updatedProject, error: updateError } = await supabase
                .from('projects')
                .update({ pid_counter: (project.pid_counter || 0) + 1 })
                .eq('id', project.id)
                .select('pid_counter')
                .single()

            if (!updateError && updatedProject) {
                const countryParam = request.nextUrl.searchParams.get('country') || request.nextUrl.searchParams.get('c')
                const countryPart = countryParam ? countryParam.toUpperCase() : ''
                const generatedPid = `${project.pid_prefix}${countryPart}${String(updatedProject.pid_counter).padStart(project.pid_padding || 2, '0')}`

                if (project.force_pid_as_uid) {
                    clientUidToSent = generatedPid
                }
            }
        }
        if (project.target_uid) {
            clientUidToSent = project.target_uid
        }

        // 4. Generate Hash Identifier
        const hashIdentifier = crypto.createHash('sha256')
            .update(`${incomingUid}-${Date.now()}`).digest('hex').substring(0, 8)

        // 5. Insert tracking record
        const { error: insertError } = await supabase
            .from('responses')
            .insert([{
                project_id: project.id,
                project_code: code,
                project_name: project.project_name || code,
                supplier_uid: incomingUid,
                client_uid_sent: clientUidToSent,
                uid: incomingUid,
                user_uid: incomingUid,
                hash_identifier: hashIdentifier,
                session_token: sessionToken,
                oi_session: sessionToken,
                clickid: sessionToken,
                hash: sessionToken,
                supplier_token: supplierToken,
                supplier_name: supplierName,
                supplier: supplierToken,
                status: 'in_progress',
                ip: ip,
                user_agent: request.headers.get('user-agent') || 'Unknown',
                last_landing_page: 'entry',
                start_time: new Date().toISOString(),
                created_at: new Date().toISOString()
            }])

        if (insertError) {
            console.error('[UnifiedRouter] DB Insert failed:', insertError)
            return NextResponse.redirect(new URL('/paused?title=TRACKING_ERROR', request.url))
        }

        // 6. Set Cookies for session persistence
        const cookieStore = await cookies()
        const cookieOptions = {
            maxAge: 60 * 60 * 4, // 4 hours
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax' as const
        }
        cookieStore.set('last_sid', sessionToken, cookieOptions)
        cookieStore.set('last_uid', incomingUid, cookieOptions)
        cookieStore.set('last_pid', code, cookieOptions)

        // 7. Smart URL Builder
        const builtUrl = buildSurveyUrl(
            project.base_url,
            sessionToken,
            clientUidToSent,
            oiPrefix,
            project.client_pid_param,
            project.client_uid_param
        )

        // 8. Redirect
        return NextResponse.redirect(new URL(builtUrl))

    } catch (e) {
        console.error('[UnifiedRouter] Exception:', e)
        return NextResponse.redirect(new URL('/paused?title=SYSTEM_ERROR', request.url))
    }
}
