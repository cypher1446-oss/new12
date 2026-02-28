'use client'

import { Quote } from 'lucide-react'

const testimonials = [
    {
        name: 'Aarav Sharma',
        role: 'Founder at Innovate India',
        quote: "OpinionInsights's market sizing report was a game-changer for our expansion strategy. Their data was impeccable and insights were spot on. We exceeded our first-year targets by 30%.",
        avatar: 'AS'
    },
    {
        name: 'Priya Mehta',
        role: 'Director at Digital Solutions Co.',
        quote: "The product research they conducted was incredibly thorough. We were able to launch our new feature with confidence, knowing it met a real customer need. The team was professional and a pleasure to work with.",
        avatar: 'PM'
    }
]

export default function TestimonialsSection() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-sm font-black text-indigo-600 uppercase tracking-widest tracking-tighter">Testimonials</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                        Check Our Testimonials
                    </h3>
                    <p className="text-slate-500 max-w-2xl mx-auto font-medium">
                        See how we&apos;ve helped businesses like yours achieve their goals.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-slate-50 p-12 rounded-[48px] relative group hover:bg-indigo-600 transition-all duration-500">
                            <Quote className="absolute top-8 right-8 w-12 h-12 text-indigo-100 group-hover:text-indigo-500/30 transition-colors" />

                            <div className="space-y-8 relative z-10">
                                <p className="text-xl font-bold text-slate-800 leading-relaxed group-hover:text-white transition-colors italic">
                                    &ldquo;{t.quote}&rdquo;
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black text-indigo-600 shadow-sm">
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 group-hover:text-white transition-colors">{t.name}</div>
                                        <div className="text-sm text-slate-400 group-hover:text-indigo-100 transition-colors">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="px-10 py-4 bg-white border-2 border-slate-100 text-slate-700 font-black rounded-2xl hover:border-indigo-600 hover:text-indigo-600 transition-all">
                        View All Testimonials
                    </button>
                </div>
            </div>
        </section>
    )
}
