
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
    prefix: string,
    clientPidParam?: string | null,
    clientUidParam?: string | null
): string {
    const url = new URL(rawUrl)
    const existingParams = new Set(url.searchParams.keys())
    const safeSet = (key: string, value: string) => {
        if (!existingParams.has(key)) url.searchParams.set(key, value)
    }

    // Standard OI params
    safeSet(`${prefix}session`, sessionToken)

    // Inject UID/PID based on client config or defaults
    if (clientPidParam) {
        safeSet(clientPidParam, uid)
    }
    if (clientUidParam) {
        safeSet(clientUidParam, uid)
    }

    // Default fallback if no specific params configured
    if (!clientPidParam && !clientUidParam) {
        safeSet(`${prefix}uid`, uid)
    }

    return url.toString()
}

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ code: string; uid: string }> }
) {
    const { code, uid: incomingUid } = await context.params
    const ip = getClientIp(request);

    // 1. Validation
    if (!code || !incomingUid) {
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

        let clientUidToSent = incomingUid
        let isPidGenerated = false

        // 3. PID Generation Logic
        if (project.pid_prefix) {
            // Atomic increment for pid_counter
            const { data: updatedProject, error: updateError } = await supabase
                .from('projects')
                .update({ pid_counter: (project.pid_counter || 0) + 1 })
                .eq('id', project.id)
                .select('pid_counter')
                .single()

            if (!updateError && updatedProject) {
                const prefixValue = project.pid_prefix || ''
                const paddingValue = project.pid_padding || 2
                const counterValue = updatedProject.pid_counter

                // Extract country from searchParams if available
                const countryParam = request.nextUrl.searchParams.get('country') || request.nextUrl.searchParams.get('c')
                const countryPart = countryParam ? countryParam.toUpperCase() : ''

                const generatedPid = `${prefixValue}${countryPart}${String(counterValue).padStart(paddingValue, '0')}`

                if (project.force_pid_as_uid) {
                    clientUidToSent = generatedPid
                }
                isPidGenerated = true
            }
        }

        // Apply Target UID Override if set (highest priority)
        if (project.target_uid) {
            clientUidToSent = project.target_uid
        }

        // 4. Generate Hash Identifier (8 chars)
        const hashBase = `${incomingUid}-${Date.now()}`
        const hashIdentifier = crypto.createHash('sha256').update(hashBase).digest('hex').substring(0, 8)

        // 5. Insert tracking record
        const { error: insertError } = await supabase
            .from('responses')
            .insert([{
                project_id: project.id,
                project_code: code,
                project_name: project.project_name || code,
                supplier_uid: incomingUid, // original
                client_uid_sent: clientUidToSent, // what we send to client
                uid: incomingUid, // legacy compat
                user_uid: incomingUid, // legacy compat
                hash_identifier: hashIdentifier,
                session_token: sessionToken,
                oi_session: sessionToken,
                clickid: sessionToken,
                hash: sessionToken,
                status: 'in_progress',
                ip: ip,
                user_agent: request.headers.get('user-agent') || 'Unknown',
                last_landing_page: 'entry',
                start_time: new Date().toISOString(),
                created_at: new Date().toISOString()
            }])

        if (insertError) {
            console.error('[Entry] DB Insert failed:', insertError)
            return NextResponse.redirect(new URL('/paused?title=TRACKING_ERROR', request.url))
        }

        // 6. Smart URL Builder
        const builtUrl = buildSurveyUrl(
            project.base_url,
            sessionToken,
            clientUidToSent,
            oiPrefix,
            project.client_pid_param,
            project.client_uid_param
        )

        // 7. Redirect to Survey
        return NextResponse.redirect(new URL(builtUrl))

    } catch (e) {
        console.error('[SmartRouter] Exception:', e)
        return NextResponse.redirect(new URL('/paused?title=SYSTEM_ERROR', request.url))
    }
}
