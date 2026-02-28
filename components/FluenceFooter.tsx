'use client'

import Link from 'next/link'
import BrandLogo from './BrandLogo'
import { Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react'

export default function FluenceFooter() {
    return (
        <footer className="bg-white border-t border-slate-200/60 pt-32 pb-12">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
                    <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
                        <Link href="/" className="flex items-center justify-center lg:justify-start space-x-2 group">
                            <div className="w-8 h-8 bg-text-dark rounded-xl flex items-center justify-center">
                                <BrandLogo className="h-5 w-auto" />
                            </div>
                            <span className="text-lg font-black text-text-dark tracking-tighter italic">OpinionInsights</span>
                        </Link>
                        <p className="text-3xl md:text-4xl font-black text-text-dark tracking-tighter leading-[1.1]">
                            Ready to make smarter, <br />
                            <span className="text-text-muted/20">data-driven decisions?</span>
                        </p>
                        <button className="fluence-btn-primary">
                            Get in Touch
                        </button>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-text-muted uppercase tracking-widest">Solutions</h4>
                            <ul className="space-y-4">
                                {['B2B Research', 'B2C Research', 'Brand Tracking', 'Market Sizing'].map(item => (
                                    <li key={item}><Link href="#" className="text-xs font-black text-text-body hover:text-primary transition-all uppercase tracking-widest">{item}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-text-muted uppercase tracking-widest">Company</h4>
                            <ul className="space-y-4">
                                {['About Us', 'Case Studies', 'Methodology', 'Careers'].map(item => (
                                    <li key={item}><Link href="#" className="text-xs font-black text-text-body hover:text-primary transition-all uppercase tracking-widest">{item}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-text-muted uppercase tracking-widest">Contact</h4>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-2 text-xs font-black text-text-body uppercase tracking-widest">
                                    <Mail size={14} className="text-primary" />
                                    <span>Mail Us</span>
                                </li>
                                <li className="flex items-center gap-2 text-xs font-black text-text-body uppercase tracking-widest">
                                    <Linkedin size={14} className="text-primary" />
                                    <span>LinkedIn</span>
                                </li>
                                <li className="flex items-center gap-2 text-xs font-black text-text-body uppercase tracking-widest">
                                    <Twitter size={14} className="text-primary" />
                                    <span>Twitter</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-border-base flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">© 2026 OpinionInsights. All rights reserved.</p>
                    <div className="flex space-x-8">
                        <Link href="#" className="text-[10px] font-black text-text-muted uppercase tracking-widest hover:text-text-dark">Privacy Policy</Link>
                        <Link href="#" className="text-[10px] font-black text-text-muted uppercase tracking-widest hover:text-text-dark">Terms of Use</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
