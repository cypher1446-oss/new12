import { KPIStats } from '@/lib/types'

export default function DashboardStats({ stats }: { stats: any }) {
    if (!stats) return null;

    const cards = [
        {
            name: 'Clicks Today',
            value: stats.clicks_today || 0,
            icon: (
                <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ),
            bg: 'bg-indigo-50',
            label: 'Total entries today'
        },
        {
            name: 'Completes Today',
            value: stats.completes_today || 0,
            icon: (
                <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            bg: 'bg-emerald-50',
            label: 'Successful conversions'
        },
        {
            name: 'Quotafull Today',
            value: stats.quotafull_today || 0,
            icon: (
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
            bg: 'bg-purple-50',
            label: 'Surveys reached quota'
        },
        {
            name: 'Terminates Today',
            value: stats.terminates_today || 0,
            icon: (
                <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            bg: 'bg-orange-50',
            label: 'Surveys terminated'
        },
        {
            name: 'In Progress Today',
            value: stats.in_progress_today || 0,
            icon: (
                <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            bg: 'bg-blue-50',
            label: 'Ongoing survey sessions'
        },
        {
            name: 'Conversion %',
            value: stats.clicks_today > 0
                ? `${((stats.completes_today / stats.clicks_today) * 100).toFixed(1)}%`
                : '0%',
            icon: (
                <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            bg: 'bg-amber-50',
            label: 'Success rate (Today)'
        },
        {
            name: 'Active Projects',
            value: stats.active_projects || 0,
            icon: (
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            bg: 'bg-blue-50',
            label: `Out of ${stats.total_projects || 0} total`
        },
        {
            name: 'Duplicates Today',
            value: stats.duplicates_today || 0,
            icon: (
                <svg className="h-6 w-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
            ),
            bg: 'bg-rose-50',
            label: 'Fraud attempts blocked'
        },
        {
            name: 'Security Terminate',
            value: stats.security_terminates_today || 0,
            icon: (
                <svg className="h-6 w-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            bg: 'bg-slate-50',
            label: 'Abuse/Bot detection'
        }
    ];

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
            {cards.map((card) => (
                <div key={card.name} className="relative bg-white pt-5 px-4 pb-6 shadow rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                    <dt>
                        <div className={`absolute rounded-xl p-3 ${card.bg} group-hover:scale-110 transition-transform`}>
                            {card.icon}
                        </div>
                        <p className="ml-16 text-xs font-bold text-gray-400 uppercase tracking-widest truncate">
                            {card.name}
                        </p>
                    </dt>
                    <dd className="ml-16 flex items-baseline">
                        <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    </dd>
                    <div className="mt-4 border-t border-gray-50 pt-2">
                        <p className="text-[10px] text-gray-400 italic">
                            {card.label}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
