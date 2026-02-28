import LandingResultLayout from '@/components/LandingResultLayout'
import { getLandingDataByClickId } from '@/lib/landingService'
import { notFound } from 'next/navigation'

export const dynamic = "force-dynamic"

export default async function StatusPage(props: {
    params: Promise<{ clickid: string }>
}) {
    const { clickid } = await props.params
    const response = await getLandingDataByClickId(clickid)

    if (!response) {
        return notFound()
    }

    const mapping: Record<string, { title: string; desc: string; type: any; status: string }> = {
        'complete': { title: 'THANK YOU!', desc: 'Survey Completed Successfully', type: 'success', status: 'Complete' },
        'terminated': { title: 'SORRY!', desc: 'Survey session ended.', type: 'error', status: 'Terminated' },
        'quota_full': { title: 'SORRY!', desc: 'The Quota for this survey is FULL', type: 'info', status: 'Quota Full' },
        'security_terminate': { title: 'ERROR!', desc: 'Security Validation Failed', type: 'dark', status: 'Denied' },
        'duplicate_ip': { title: 'SORRY!', desc: 'Duplicate IP Address Detected', type: 'info', status: 'Duplicate' },
        'in_progress': { title: 'SESSION ACTIVE', desc: 'Your session is still in progress.', type: 'info', status: 'In Progress' }
    }

    const config = mapping[response.status] || mapping['terminated']

    return (
        <LandingResultLayout
            title={config.title}
            description={config.desc}
            type={config.type}
            uid={response.user_uid || response.uid}
            code={response.project_code}
            ip={response.user_ip || response.ip}
            status={config.status}
            responseId={response.id}
        />
    )
}
