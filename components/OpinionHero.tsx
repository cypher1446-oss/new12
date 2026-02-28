'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function OpinionHero() {
    return (
        <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white">
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-indigo-100/30 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-violet-100/30 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-sm shadow-sm">
                            <Sparkles className="w-4 h-4" />
                            <span>Precision Research & Data Insights</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
                            Your Voice. <br />
                            Your Data. <br />
                            <span className="text-gradient">Your Future.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            We provide the clarity and strategic insights your business needs to thrive. Confident decision-making starts here.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link
                                href="#services"
                                className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center group shadow-xl shadow-slate-200"
                            >
                                Our Expertise
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="#about"
                                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border-2 border-slate-100 rounded-2xl font-bold hover:border-indigo-100 hover:bg-indigo-50/30 transition-all flex items-center justify-center shadow-lg shadow-slate-100"
                            >
                                Our Solutions
                            </Link>
                        </div>

                        {/* Metrics Bar */}
                        <div className="pt-12 grid grid-cols-3 gap-8">
                            <div className="space-y-1">
                                <div className="text-3xl font-black text-slate-900">6+</div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Years Experience</div>
                            </div>
                            <div className="space-y-1 border-x border-slate-100 px-8">
                                <div className="text-3xl font-black text-slate-900">1500+</div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Projects Done</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-3xl font-black text-slate-900">25+</div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Industries</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-fuchsia-500/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative aspect-[4/3] rounded-[48px] overflow-hidden border-8 border-white shadow-2xl skew-y-1 rotate-1 group-hover:rotate-0 group-hover:skew-y-0 transition-all duration-700">
                            {/* Abstract Data Visual representation using CSS */}
                            <div className="absolute inset-0 premium-gradient opacity-90"></div>
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>

                            <div className="absolute inset-0 flex items-center justify-center p-12">
                                <div className="grid grid-cols-3 gap-4 w-full h-full items-end">
                                    <div className="bg-white/20 backdrop-blur-md rounded-2xl h-[40%] animate-pulse delay-75"></div>
                                    <div className="bg-white/30 backdrop-blur-md rounded-2xl h-[80%] animate-pulse delay-150"></div>
                                    <div className="bg-white/40 backdrop-blur-md rounded-2xl h-[60%] animate-pulse delay-300"></div>
                                </div>
                            </div>

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-card p-6 rounded-3xl border-white/40 shadow-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white uppercase tracking-tighter">Live Analysis</div>
                                        <div className="text-2xl font-black text-white">OpinionInsights</div>
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
