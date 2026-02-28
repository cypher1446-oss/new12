'use client'

import { Shield, Target, Cpu, Globe } from 'lucide-react'

const features = [
    {
        icon: Shield,
        title: 'Expertise & Accuracy',
        text: 'Industry-leading methodologies ensuring high-fidelity data.'
    },
    {
        icon: Target,
        title: 'Customized Research',
        text: 'Tailored solutions designed for your specific business objectives.'
    },
    {
        icon: Cpu,
        title: 'Advanced Tech',
        text: 'Leveraging AI and modern data processing for faster results.'
    },
    {
        icon: Globe,
        title: 'Global Reach',
        text: 'Access to diverse demographics across 100+ countries.'
    }
]

export default function AboutSection() {
    return (
        <section id="about" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-sm font-black text-indigo-600 uppercase tracking-widest tracking-tighter">Why OpinionInsights?</h2>
                            <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                                Driving confidence in your <br />
                                <span className="text-gradient">market decisions</span>
                            </h3>
                        </div>

                        <p className="text-lg text-slate-600 leading-relaxed font-medium">
                            We combine research rigor with business acumen to deliver insights that don&apos;t just inform, but inspire action. Our senior-led teams are dedicated to understanding the nuances of your industry.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {features.map((f, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex-shrink-0 flex items-center justify-center">
                                        <f.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">{f.title}</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed">{f.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="px-10 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                            Learn More
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-indigo-100/50 blur-3xl opacity-50 rounded-full"></div>
                        <div className="relative grid grid-cols-2 gap-6 p-8 bg-slate-50 rounded-[60px] border-8 border-white shadow-2xl skew-y-1">
                            {/* Decorative representation of insights */}
                            <div className="aspect-square bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-end">
                                <div className="text-4xl font-black text-indigo-600 leading-none">40%</div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Faster Insights</div>
                            </div>
                            <div className="aspect-square bg-slate-900 rounded-3xl p-6 shadow-xl flex flex-col justify-end">
                                <div className="text-4xl font-black text-white leading-none">2.5x</div>
                                <div className="text-xs font-bold text-slate-200 uppercase tracking-widest mt-2">Higher ROI</div>
                            </div>
                            <div className="aspect-square bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-end">
                                <div className="text-4xl font-black text-indigo-600 leading-none">20%</div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Cost Reduction</div>
                            </div>
                            <div className="aspect-square premium-gradient rounded-3xl p-6 shadow-xl flex flex-col justify-center items-center text-center">
                                <div className="text-white font-black text-lg">90%</div>
                                <div className="text-white/80 text-[10px] uppercase font-bold tracking-widest leading-tight">Client Retention</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
