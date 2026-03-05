'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import BrandLogo from './BrandLogo'

export default function FluenceNav() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-8 ${scrolled ? 'py-4' : ''
            }`}>
            <div className={`max-w-6xl mx-auto flex items-center justify-between p-2 rounded-[28px] transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)] px-6' : ''
                }`}>
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <BrandLogo className="h-5 w-auto" />
                    </div>
                    <span className="text-lg font-black text-slate-900 tracking-tighter italic">OpinionInsights</span>
                </Link>

                <div className="hidden lg:flex items-center bg-slate-100/50 rounded-2xl p-1 px-2 border border-slate-200/50">
                    {['Home', 'Company', 'Services', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="px-6 py-2 text-xs font-black text-slate-500 hover:text-slate-900 transition-all uppercase tracking-widest"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center space-x-3">
                    <Link
                        href="/login"
                        className="text-xs font-black text-slate-900 uppercase tracking-widest px-4 py-2 hover:bg-slate-100 rounded-xl transition-all"
                    >
                        Admin Login
                    </Link>
                    <Link
                        href="#contact"
                        className="bg-slate-900 text-white text-[10px] uppercase font-black tracking-widest px-6 py-3 rounded-xl hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all active:scale-95"
                    >
                        Start Project
                    </Link>
                </div>
            </div>
        </nav>
    )
}
