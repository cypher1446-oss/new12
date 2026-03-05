'use client'

export default function LeadGeneration() {
    return (
        <section id="contact" className="py-24 bg-slate-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-sm font-black text-indigo-400 uppercase tracking-widest tracking-tighter">Let&apos;s Talk</h2>
                            <h3 className="text-4xl md:text-6xl font-black text-white leading-tight">
                                Ready to Transform <br />
                                Your Business?
                            </h3>
                            <p className="text-slate-400 text-lg max-w-lg font-medium">
                                Our experts are ready to help you tackle your most complex business challenges. Fill out the form, and we&apos;ll be in touch to schedule a complimentary consultation.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8">
                            <div className="space-y-1">
                                <div className="text-3xl font-black text-white">1500+</div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Projects Completed</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-3xl font-black text-white">90%</div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Client Retention</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-3xl font-black text-white">5+</div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Industry Awards</div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card bg-white/5 backdrop-blur-2xl border-white/10 p-10 rounded-[48px] shadow-2xl">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john.doe@company.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Company (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="Your Company Inc."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Your Message</label>
                                <textarea
                                    placeholder="Tell us how we can help..."
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-medium resize-none"
                                />
                            </div>

                            <button className="w-full py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all shadow-xl shadow-slate-950/20 active:scale-[0.98]">
                                Get in Touch
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
