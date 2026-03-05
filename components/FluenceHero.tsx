'use client'

import { ArrowRight, Play } from 'lucide-react'

export default function FluenceHero() {
    return (
        <section id="home" className="relative pt-48 pb-32 overflow-hidden bg-bg-main">
            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary-tint border border-primary/10 text-primary font-bold text-[10px] uppercase tracking-widest animate-reveal mb-8">
                    <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                    <span>Revolutionizing Data Intelligence</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-text-dark leading-[0.95] tracking-tighter mb-10 animate-reveal" style={{ animationDelay: '100ms' }}>
                    OpinionInsights – Your Voice. <br />
                    <span className="text-text-muted/40">Your Future.</span>
                </h1>

                <p className="text-lg md:text-xl text-text-body leading-relaxed max-w-2xl mx-auto mb-12 animate-reveal" style={{ animationDelay: '200ms' }}>
                    We provide the clarity and strategic insights your business needs to thrive. Confident decision-making starts here.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-reveal" style={{ animationDelay: '300ms' }}>
                    <button className="fluence-btn-primary w-full sm:w-auto">
                        View Our Expertise
                    </button>
                    <button className="fluence-btn-secondary w-full sm:w-auto flex items-center justify-center group">
                        <div className="w-6 h-6 bg-bg-alt rounded-full flex items-center justify-center mr-2 group-hover:bg-primary-tint transition-colors">
                            <Play className="w-3 h-3 text-text-dark fill-text-dark group-hover:text-primary group-hover:fill-primary" />
                        </div>
                        Watch Our Solutions
                    </button>
                </div>

                {/* Dashboard Preview Replacement */}
                <div className="mt-24 relative animate-reveal" style={{ animationDelay: '400ms' }}>
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bg-alt to-transparent z-10"></div>
                    <div className="relative mx-auto max-w-5xl group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-[#7C3AED] rounded-[40px] blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative bg-white border border-border-base rounded-[40px] shadow-2xl overflow-hidden aspect-video flex flex-col">
                            {/* Window Header */}
                            <div className="h-12 border-b border-border-base px-6 flex items-center justify-between bg-bg-alt/50">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-border-base"></div>
                                    <div className="w-3 h-3 rounded-full bg-border-base"></div>
                                    <div className="w-3 h-3 rounded-full bg-border-base"></div>
                                </div>
                                <div className="text-[10px] font-black text-text-muted uppercase tracking-widest">Dashboard Control Tower</div>
                                <div className="w-10"></div>
                            </div>
                            {/* Window Content */}
                            <div className="flex-1 p-8 grid grid-cols-12 gap-6 bg-bg-alt/30">
                                <div className="col-span-3 space-y-4">
                                    <div className="h-2 rounded-full bg-border-base w-2/3"></div>
                                    <div className="h-2 rounded-full bg-border-base w-full"></div>
                                    <div className="h-2 rounded-full bg-border-base w-4/5"></div>
                                    <div className="pt-8 space-y-4">
                                        <div className="h-32 rounded-3xl bg-white border border-border-base shadow-sm"></div>
                                    </div>
                                </div>
                                <div className="col-span-9 flex flex-col gap-6">
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="h-24 rounded-3xl bg-white border border-border-base shadow-sm p-4">
                                            <div className="h-2 w-1/3 bg-border-base rounded-full mb-4"></div>
                                            <div className="h-6 w-1/2 bg-primary rounded-lg"></div>
                                        </div>
                                        <div className="h-24 rounded-3xl bg-white border border-border-base shadow-sm p-4">
                                            <div className="h-2 w-1/3 bg-border-base rounded-full mb-4"></div>
                                            <div className="h-6 w-1/2 bg-[#7C3AED] rounded-lg"></div>
                                        </div>
                                        <div className="h-24 rounded-3xl bg-white border border-border-base shadow-sm p-4">
                                            <div className="h-2 w-1/3 bg-border-base rounded-full mb-4"></div>
                                            <div className="h-6 w-1/2 bg-text-dark rounded-lg"></div>
                                        </div>
                                    </div>
                                    <div className="flex-1 rounded-[32px] bg-white border border-border-base shadow-sm p-8">
                                        <div className="flex justify-between items-end h-full">
                                            {[40, 70, 45, 90, 65, 80, 55, 95].map((h, i) => (
                                                <div key={i} className="w-12 bg-primary/5 rounded-t-xl relative group">
                                                    <div
                                                        className="absolute bottom-0 w-full bg-primary rounded-t-xl transition-all duration-1000 group-hover:bg-primary-hover"
                                                        style={{ height: `${h}%` }}
                                                    ></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
