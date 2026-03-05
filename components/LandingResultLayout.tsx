'use client'

import React from 'react'

interface LandingResultLayoutProps {
    title: string
    description: string
    type: 'success' | 'warning' | 'error' | 'info' | 'dark' | 'secondary'
    uid?: string
    code?: string
    status?: string
    ip?: string
    sessionToken?: string
    responseId?: string
}

export default function LandingResultLayout({
    title,
    description,
    type,
    uid = 'N/A',
    code = 'N/A',
    status = 'N/A',
    ip = 'N/A',
    sessionToken,
    responseId
}: LandingResultLayoutProps) {

    // Status Badge Styling based on User Requirements
    const getBadgeStyle = (statusLabel: string) => {
        const s = statusLabel.toLowerCase()
        if (s.includes('complete')) return 'border-emerald-500 text-emerald-600'
        if (s.includes('terminate')) return 'border-rose-500 text-rose-600'
        if (s.includes('quota')) return 'border-amber-500 text-amber-600'
        if (s.includes('duplicate')) return 'border-indigo-500 text-indigo-600'
        if (s.includes('security')) return 'border-slate-800 text-slate-800'
        if (s.includes('pause')) return 'border-slate-500 text-slate-500'
        return 'border-slate-400 text-slate-400'
    }

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
            {/* Top Table Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center mb-4 space-x-2">
                    <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">Connected Successfully</span>
                </div>

                <div className="w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                    <table className="w-full text-left border-collapse bg-white">
                        <thead className="bg-[#f8f9fa] border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-wider">Project ID</th>
                                <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-wider">User ID</th>
                                <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-wider">IP Address</th>
                                <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-wider text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-bold text-slate-700 font-mono tracking-tight">{code}</td>
                                <td className="px-6 py-4 text-sm font-bold text-slate-700 font-mono tracking-tight">{uid}</td>
                                <td className="px-6 py-4 text-sm font-bold text-slate-500 font-mono">{ip}</td>
                                <td className="px-6 py-4 text-center">
                                    <div className={`inline-block px-3 py-1 rounded-md border text-[10px] font-black uppercase tracking-wider ${getBadgeStyle(status)}`}>
                                        {status}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Branded Hero Section */}
            <div className="bg-indigo-600 min-h-[70vh] flex items-center justify-center p-6 relative overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                </div>

                <div className="container max-w-4xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left space-y-8 md:space-y-0 md:space-x-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                        {/* SD Initials Logo */}
                        <div className="shrink-0 flex items-center justify-center w-32 h-32 md:w-48 md:h-48">
                            <h1 className="text-8xl md:text-[12rem] font-black text-white leading-none tracking-tighter opacity-90 drop-shadow-2xl">
                                SD
                            </h1>
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block w-px h-32 bg-white/20" />

                        {/* Status Message */}
                        <div className="flex flex-col flex-1 text-white">
                            <h2 className="text-4xl md:text-6xl font-black mb-2 tracking-tight uppercase drop-shadow-md">
                                {title}
                            </h2>
                            <h3 className="text-xl md:text-2xl font-light text-white/90 leading-relaxed tracking-wide uppercase italic">
                                {description}
                            </h3>
                        </div>
                    </div>

                    {/* Footer Nav */}
                    <div className="mt-16 flex flex-col items-center space-y-8">
                        <a
                            href="http://opinioninsights.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white font-bold opacity-80 hover:opacity-100 transition-opacity border-b-2 border-transparent hover:border-white text-sm uppercase tracking-widest"
                        >
                            Back to home
                        </a>

                        <p className="text-[10px] text-white/60 font-medium uppercase tracking-[0.3em] text-center max-w-xs leading-loose">
                            Copyright © {new Date().getFullYear()} All rights reserved to Opinion Insights Research Division.
                        </p>

                        {(sessionToken || responseId) && typeof window !== 'undefined' && window.location.search.includes('debug=true') && (
                            <div className="mt-8 p-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 text-left w-full max-w-md animate-in fade-in zoom-in duration-500">
                                <h4 className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Admin Debug Mode</h4>
                                <div className="space-y-2 font-mono text-[9px]">
                                    <div className="flex justify-between"><span className="text-white/40">PID</span> <span className="text-white">{code}</span></div>
                                    {sessionToken && <div className="flex justify-between"><span className="text-white/40">SESSION</span> <span className="text-white truncate ml-4">{sessionToken}</span></div>}
                                    {responseId && <div className="flex justify-between"><span className="text-white/40">RES_ID</span> <span className="text-white truncate ml-4">{responseId}</span></div>}
                                    <div className="flex justify-between"><span className="text-white/40">STATUS</span> <span className="text-white">{status}</span></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
