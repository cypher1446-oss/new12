import { dashboardService } from '@/lib/dashboardService'
import RedirectCenter from '@/components/RedirectCenter'

export const dynamic = 'force-dynamic'

export default async function AdminRedirectsPage() {
    const projects = await dashboardService.getProjects()

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 font-inter">Redirect Management</h1>
                    <p className="text-sm text-gray-400 font-inter mt-1">Unified routing links for all active projects</p>
                </div>
            </div>

            <div className="bg-slate-50/50 rounded-3xl p-8 border border-slate-100">
                <RedirectCenter projects={projects} />
            </div>
        </div>
    )
}
