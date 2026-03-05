'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import BrandLogo from './BrandLogo'

export default function LandingNav() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100 py-3' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="http://opinioninsights.in/" className="flex items-center space-x-3 group">
                    <BrandLogo
                        className="h-10 w-auto group-hover:scale-105 transition-transform duration-300"
                        fallbackText=""
                        fallbackClassName="w-8 h-8 premium-gradient rounded-lg flex items-center justify-center shadow-indigo-200 shadow-lg"
                    />
                    <span className={`text-xl font-bold tracking-tight transition-colors ${scrolled ? 'text-slate-900' : 'text-slate-900'
                        }`}>
                        Opinion<span className="text-indigo-600">Insights</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    <Link href="#home" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Home</Link>
                    <Link href="#about" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">About Us</Link>
                    <Link href="#services" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Services</Link>
                    <Link href="#case-studies" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Case Studies</Link>
                    <Link href="#contact" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Contact Us</Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Link href="#contact" className="premium-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all">
                        Request a Demo
                    </Link>
                </div>
            </div>
        </nav>
    )
}
