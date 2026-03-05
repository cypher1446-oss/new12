'use client'

import { Shield, Target, Cpu, Globe, ArrowRight, Zap, Database, Search } from 'lucide-react'

export default function FluenceBento() {
    return (
        <section id="services" className="py-32 bg-bg-alt">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Our Solutions</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-text-dark tracking-tight">Driving confidence in your market decisions</h3>
                </div>

                <div className="bento-grid">
                    {/* Big Item */}
                    <div className="bento-item md:col-span-2 md:row-span-2 flex flex-col justify-between group">
                        <div className="space-y-4 relative z-10">
                            <div className="w-12 h-12 bg-primary-tint/50 border border-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-xl shadow-primary/5">
                                <Search className="w-6 h-6" />
                            </div>
                            <h4 className="text-3xl font-black text-text-dark">Expertise & Accuracy</h4>
                            <p className="text-text-body font-medium max-w-sm">
                                We combine research rigor with business acumen to deliver insights that don&apos;t just inform, but inspire action. Our senior-led teams are dedicated to understanding.
                            </p>
                        </div>
                        <div className="absolute right-0 bottom-0 w-2/3 h-1/2 bg-bg-alt border-t border-l border-border-base rounded-tl-[48px] p-8 hidden md:block group-hover:bg-white transition-colors">
                            <div className="flex justify-between items-end h-full">
                                {[30, 60, 40, 80, 50, 90, 70].map((h, i) => (
                                    <div key={i} className="w-4 bg-primary/10 rounded-full relative">
                                        <div className="absolute bottom-0 w-full bg-primary rounded-full" style={{ height: `${h}%` }}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Small Item */}
                    <div className="bento-item group bg-primary border-none shadow-primary/20">
                        <div className="space-y-4 text-white">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                <Zap className="w-5 h-5" />
                            </div>
                            <h4 className="text-xl font-black">40% Faster Insights</h4>
                            <p className="text-primary-tint text-xs font-medium leading-relaxed">
                                Our agile processes and rigorous quality control deliver reliable insights, quickly.
                            </p>
                        </div>
                    </div>

                    {/* Another Small Item */}
                    <div className="bento-item group bg-white border border-border-base">
                        <div className="space-y-4">
                            <div className="w-10 h-10 bg-text-dark rounded-xl flex items-center justify-center text-white">
                                <Database className="w-5 h-5" />
                            </div>
                            <h4 className="text-xl font-black text-text-dark">Customized Research</h4>
                            <p className="text-text-body text-xs font-medium leading-relaxed">
                                We design research tailored to your unique goals, not a one-size-fits-all approach.
                            </p>
                        </div>
                    </div>

                    {/* Wide Item at Bottom */}
                    <div className="bento-item md:col-span-3 row-span-1 flex items-center justify-between group bg-white border border-border-base">
                        <div className="flex items-center gap-8">
                            <div className="w-16 h-16 bg-bg-alt rounded-[28px] flex items-center justify-center text-text-dark border border-border-base group-hover:bg-primary group-hover:text-white transition-all">
                                <Globe className="w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-text-dark">Global Reach</h4>
                                <p className="text-text-body font-medium">Access to decision-makers across 100+ countries.</p>
                            </div>
                        </div>
                        <button className="w-12 h-12 bg-text-dark text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
