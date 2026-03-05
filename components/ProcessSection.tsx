'use client'

import { Search, PenTool, Database, FileText, Zap } from 'lucide-react'

const steps = [
    {
        icon: Search,
        title: 'Discovery & Scoping',
        text: 'We align on your business goals to define research objectives and scope.'
    },
    {
        icon: PenTool,
        title: 'Research Design & Methods',
        text: 'Our experts select the optimal methodology for your specific needs.'
    },
    {
        icon: Database,
        title: 'Data Collection & Analysis',
        text: 'Rigorous quality control ensures clean, reliable, and actionable data.'
    },
    {
        icon: FileText,
        title: 'Insight & Strategic Reporting',
        text: 'We translate data into a clear narrative with strategic recommendations.'
    },
    {
        icon: Zap,
        title: 'Activation & Follow-through',
        text: 'We partner with you to ensure insights are effectively implemented.'
    }
]

export default function ProcessSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-sm font-black text-indigo-600 uppercase tracking-widest tracking-tighter">Our Process</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                        Our Vision-Precise, <br />
                        <span className="text-gradient">Data-Actionable Insight</span>
                    </h3>
                    <p className="text-slate-500 max-w-2xl mx-auto font-medium">
                        A streamlined, transparent process designed for clarity and impact, from initial discovery to strategic activation.
                    </p>
                </div>

                <div className="relative">
                    {/* Connection Line */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 hidden lg:block"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
                        {steps.map((step, i) => (
                            <div key={i} className="group text-center space-y-6">
                                <div className="relative mx-auto w-20 h-20">
                                    <div className="absolute inset-0 bg-indigo-500 rounded-[28px] rotate-3 group-hover:rotate-6 transition-transform opacity-10"></div>
                                    <div className="relative w-full h-full bg-white border-2 border-slate-100 rounded-[28px] flex items-center justify-center text-slate-900 group-hover:border-indigo-500 group-hover:text-indigo-600 transition-all shadow-xl shadow-slate-100">
                                        <step.icon className="w-8 h-8" />
                                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white rounded-full text-xs font-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                            {i + 1}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-lg font-bold text-slate-900 leading-tight px-4">{step.title}</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{step.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <button className="px-10 py-4 bg-slate-100 text-slate-900 font-black rounded-2xl hover:bg-slate-200 transition-all">
                        Request a Demo
                    </button>
                </div>
            </div>
        </section>
    )
}
