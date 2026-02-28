'use client'

import BrandLogo from './BrandLogo'
import Link from 'next/link'
import { MapPin, Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export default function OpinionFooter() {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-16">
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <BrandLogo
                                className="h-10 w-auto"
                            />
                            <span className="text-2xl font-black text-slate-900 italic">Opinion<span className="text-indigo-600">insights</span></span>
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">
                            Delivering clarity and strategic insights for confident decision-making. Trusted by leaders worldwide.
                        </p>
                        <div className="flex items-center space-x-4">
                            <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all"><Facebook size={18} /></a>
                            <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all"><Twitter size={18} /></a>
                            <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all"><Linkedin size={18} /></a>
                            <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all"><Instagram size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-8">Services</h4>
                        <ul className="space-y-4">
                            {['B2B Research', 'B2C Research', 'Brand Research', 'Product Research'].map(l => (
                                <li key={l}><Link href="#services" className="text-sm text-slate-500 font-medium hover:text-indigo-600 transition-all">{l}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-8">Company</h4>
                        <ul className="space-y-4">
                            {['About Us', 'Case Studies', 'Blog', 'Contact Us'].map(l => (
                                <li key={l}><Link href={`#${l.toLowerCase().replace(' ', '-')}`} className="text-sm text-slate-500 font-medium hover:text-indigo-600 transition-all">{l}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-8">Contact Info</h4>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <MapPin className="text-indigo-600 w-5 h-5 flex-shrink-0" />
                                <span className="text-sm text-slate-500 font-medium leading-relaxed">
                                    A1-348, Dal Mill Road, Delhi, Delhi, 110059, India
                                </span>
                            </li>
                            <li className="flex gap-4">
                                <Mail className="text-indigo-600 w-5 h-5 flex-shrink-0" />
                                <span className="text-sm text-slate-500 font-medium">contact@opinioninsights.in</span>
                            </li>
                            <li className="flex gap-4">
                                <Phone className="text-indigo-600 w-5 h-5 flex-shrink-0" />
                                <span className="text-sm text-slate-500 font-medium">+91 9354018421</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-slate-400 font-medium">© 2026 OpinionInsights. All rights reserved.</p>
                    <div className="flex space-x-8">
                        <Link href="/privacy" className="text-xs text-slate-400 font-medium hover:text-slate-900 transition-all">Privacy Policy</Link>
                        <Link href="/terms" className="text-xs text-slate-400 font-medium hover:text-slate-900 transition-all">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
