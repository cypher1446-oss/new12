import { Suspense } from 'react'
import { dashboardService } from '@/lib/dashboardService'
import DashboardStats from '@/components/DashboardStats'
import TrafficChart from '@/components/TrafficChart'
import DashboardFilters from '@/components/DashboardFilters'
import RedirectCenter from '@/components/RedirectCenter'
import LiveActivityFeed from '@/components/LiveActivityFeed'
import RedirectShortcut from '@/components/RedirectShortcut'
import AutoRefresh from '@/components/AutoRefresh'


export const dynamic = 'force-dynamic'

export default async function AdminDashboard({
    searchParams,
}: {
    searchParams: Promise<{ clientId?: string }>
}) {
    const { clientId } = await searchParams
    const [kpis, healthMetrics, responses, clients, projects] = await Promise.all([
        dashboardService.getKPIs(),
        dashboardService.getProjectHealthMetrics(),
        dashboardService.getResponses(),
        dashboardService.getClients(),
        dashboardService.getProjects()
    ])

    return (
        <div className="space-y-6">
            <AutoRefresh interval={5000} />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 font-inter">Intelligence Command</h1>
                    <p className="text-sm text-gray-400 font-inter mt-1">Global traffic monitoring & routing control</p>
                </div>
                <div className="mt-3 sm:mt-0 flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                        System Online
                    </span>
                </div>
            </div>

            <DashboardStats stats={kpis} />

            <div className="mt-8">
                <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse rounded-lg" />}>
                    <DashboardFilters clients={clients} />
                </Suspense>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-6">
                    <TrafficChart />

                    <div className="flex items-center justify-between pt-4">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Project Health Metrics</h3>
                        <span className="text-[10px] text-gray-400 italic">Today's real-time performance</span>
                    </div>

                    <div className="bg-white shadow rounded-2xl border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Project</th>
                                        <th className="px-6 py-3 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Entries (Today)</th>
                                        <th className="px-6 py-3 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">In Progress (Today)</th>
                                        <th className="px-6 py-3 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Completes (Today)</th>
                                        <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Success Rate</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {healthMetrics.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-xs text-gray-400 italic">No activity recorded today.</td>
                                        </tr>
                                    ) : (
                                        healthMetrics.slice(0, 5).map((m: any) => (
                                            <tr key={m.project_id} className="hover:bg-slate-50/30 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{m.project_code}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 font-mono">{m.clicks_today}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-blue-500 font-bold font-mono">{m.in_progress_today}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-emerald-600 font-bold font-mono">{m.completes_today}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="flex-1 w-24 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                                            <div
                                                                className={`h-full transition-all duration-1000 ${m.conversion_rate > 15 ? 'bg-emerald-500' :
                                                                    m.conversion_rate > 5 ? 'bg-indigo-500' : 'bg-rose-500'
                                                                    }`}
                                                                style={{ width: `${m.conversion_rate}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-xs font-bold text-gray-700">{Math.round(m.conversion_rate)}%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <RedirectShortcut />
                    <LiveActivityFeed responses={responses} />
                </div>
            </div>

            <div id="redirect-center" className="pt-8 transition-all duration-500 scroll-mt-6">
                <RedirectCenter projects={projects} />
            </div>
        </div>
    )
}
