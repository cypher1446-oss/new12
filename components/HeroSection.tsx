import Link from 'next/link'

export default function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Blobs */}
            <div className="hero-blob bg-indigo-400 w-[600px] h-[600px] -top-64 -left-64"></div>
            <div className="hero-blob bg-violet-400 w-[500px] h-[500px] top-1/2 -right-64"></div>

            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-8 animate-fade-in">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
                        <span className="text-xs font-semibold text-indigo-700 tracking-wide uppercase">Next-Gen Survey Routing</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tight">
                        Traffic Intelligence for <br />
                        <span className="text-gradient">Modern Market Research</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Optimize your respondent flow, monitor conversion rates in real-time, and scale your operations with the industry&apos;s most powerful routing engine.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link href="/login" className="w-full sm:w-auto premium-gradient text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-indigo-100 hover:shadow-indigo-200 hover:-translate-y-1 transition-all">
                            Launch Control Tower
                        </Link>
                        <Link href="#features" className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-50 transition-all">
                            View Capabilities
                        </Link>
                    </div>

                    {/* Social Proof Placeholder */}
                    <div className="mt-20 flex flex-col items-center">
                        <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">Trusted by industry leaders</p>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
                            <span className="text-2xl font-black text-slate-800">ACME</span>
                            <span className="text-2xl font-black text-slate-800">SAMSUNG</span>
                            <span className="text-2xl font-black text-slate-800">NIELSON</span>
                            <span className="text-2xl font-black text-slate-800">SURVEYX</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
