import LandingResultLayout from '@/components/LandingResultLayout'
import { getLandingPageData, updateResponseStatus } from '@/lib/landingService'

export const dynamic = "force-dynamic"

export default async function SecurityTerminatePage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await props.searchParams
    const { headers } = await import('next/headers')
    const headerList = await headers()

    const cookieUid = headerList.get('cookie')?.split(';').find(c => c.trim().startsWith('last_uid='))?.split('=')[1]
    const cookiePid = headerList.get('cookie')?.split(';').find(c => c.trim().startsWith('last_pid='))?.split('=')[1]

    const pid = (params.pid as string) || (params.code as string) || cookiePid || ''
    const uid = (params.uid as string) || cookieUid || ''
    const clickid = (params.clickid as string) || (params.cid as string) || null

    // UPDATE: update record to 'security_terminate'
    const updated = (pid && uid) || clickid ? await updateResponseStatus(pid, uid, 'security_terminate', clickid, 'security_terminate') : null

    const data = await getLandingPageData(params, {
        headers: { get: (name: string) => headerList.get(name) }
    } as any)

    const title = (params.title as string) || "ERROR!"
    const desc = (params.desc as string) || "Security Validation Failed: Access Denied"

    return (
        <LandingResultLayout
            title={title}
            description={desc}
            type="dark"
            uid={uid || data.uid}
            code={pid || data.pid}
            ip={data.ip}
            status="Access Denied"
            responseId={updated?.id || data.response?.id || undefined}
        />
    )
}
