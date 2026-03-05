'use client'

import { Briefcase, BarChart3, Users, PiggyBank, ShieldCheck, Box } from 'lucide-react'

const services = [
    {
        icon: Briefcase,
        title: 'B2B Research',
        text: 'Insights into complex business markets and decision-maker journeys.'
    },
    {
        icon: BarChart3,
        title: 'Market Sizing',
        text: 'Quantify market opportunities to inform your growth strategy.'
    },
    {
        icon: Users,
        title: 'B2C Research',
        text: 'Understand consumer behavior, preferences, and motivations.'
    },
    {
        icon: PiggyBank,
        title: 'Pricing Research',
        text: 'Optimize your pricing strategy for maximum profitability and market share.'
    },
    {
        icon: ShieldCheck,
        title: 'Brand Research',
        text: 'Measure and track brand health, perception, and equity.'
    },
    {
        icon: Box,
        title: 'Product Research',
        text: 'Validate concepts, test features, and guide product development.'
    }
]

export default function ServicesSection() {
    return (
        <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <h2 className="text-sm font-black text-indigo-600 uppercase tracking-widest tracking-tighter">Our Services</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                            Our Core Services
                        </h3>
                        <p className="text-slate-500 max-w-xl font-medium">
                            A comprehensive suite of research solutions to address your most pressing business questions.
                        </p>
                    </div>
                    <button className="px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                        Let&apos;s Talk
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((s, i) => (
                        <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-2 transition-all group">
                            <div className="w-14 h-14 bg-slate-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 border border-slate-50 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                                <s.icon className="w-7 h-7" />
                            </div>
                            <h4 className="text-2xl font-bold text-slate-900 mb-4">{s.title}</h4>
                            <p className="text-slate-500 leading-relaxed font-medium">{s.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
