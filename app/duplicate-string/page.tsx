import LandingResultLayout from '@/components/LandingResultLayout'
import { getLandingPageData, updateResponseStatus } from '@/lib/landingService'
import { redirect } from 'next/navigation'

export const dynamic = "force-dynamic"

export default async function DuplicateStringPage(props: {
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

    // UPDATE: update record to 'duplicate_string'
    const updated = (pid && uid) || clickid ? await updateResponseStatus(pid, uid, 'duplicate_string', clickid, 'duplicate_string') : null

    const data = await getLandingPageData(params, {
        headers: { get: (name: string) => headerList.get(name) }
    } as any);

    if (data.project?.status === 'paused') {
        redirect(`/paused?pid=${data.pid}&uid=${data.uid}&ip=${data.ip}`)
    }

    const title = (params.title as string) || "SORRY!"
    const desc = (params.desc as string) || "You have already attempted this survey"

    return (
        <LandingResultLayout
            title={title}
            description={desc}
            type="info"
            uid={data.uid}
            code={data.pid}
            ip={data.ip}
            status={(params.status as string) || 'Duplicate UID'}
            sessionToken={data.response?.session_token || undefined}
            responseId={data.response?.id || undefined}
        />
    )
}
