'use client'

import { useRouter } from 'next/navigation'
import { logoutAction } from '@/app/login/actions'
import { Bell, Search, User } from 'lucide-react'

export default function AdminHeader() {
    const router = useRouter()

    const handleLogout = async () => {
        await logoutAction()
        router.push('/login')
        router.refresh()
    }

    return (
        <header className="h-24 flex items-center justify-between px-8 bg-transparent z-40 relative">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-2xl leading-5 bg-white/40 backdrop-blur-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                        placeholder="Search projects, clients, or countries..."
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-6 ml-6">
                {/* Notifications */}
                <button className="p-3 rounded-2xl text-slate-400 hover:text-indigo-600 hover:bg-white/80 transition-all relative group shadow-sm bg-white/20 border border-white/50">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-3 right-3 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
                </button>

                {/* Profile Section */}
                <div className="flex items-center pl-6 border-l border-slate-200/60">
                    <div className="flex items-center space-x-4 group cursor-pointer mr-6">
                        <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 p-[2px] shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">
                            <div className="h-full w-full rounded-2xl bg-white flex items-center justify-center">
                                <User className="h-6 w-6 text-indigo-600" />
                            </div>
                        </div>
                        <div className="hidden lg:block text-left">
                            <p className="text-sm font-black text-slate-700 group-hover:text-indigo-600 transition-colors">Admin User</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Super Admin</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="px-5 py-2.5 text-xs font-black text-slate-400 hover:text-rose-500 bg-white/30 backdrop-blur-sm border border-black/5 rounded-xl hover:bg-rose-50 hover:border-rose-100 transition-all active:scale-95"
                    >
                        SIGN OUT
                    </button>
                </div>
            </div>
        </header>
    )
}
