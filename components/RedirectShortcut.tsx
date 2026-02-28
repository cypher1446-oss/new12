export default function RedirectShortcut() {
    return (
        <div className="bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 p-6 text-white relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.89 15.55L11 12.66V8h2v3.84l2.12 2.12-1.23 1.59zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10z" />
                </svg>
            </div>
            <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Redirect Center</h3>
                <p className="text-indigo-100 text-xs mb-6 max-w-[180px] leading-relaxed">
                    Access shareable entry links and callback URLs for all active projects in one place.
                </p>
                <a
                    href="#redirect-center"
                    className="inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-colors uppercase tracking-widest shadow-sm"
                >
                    View All Links
                </a>
            </div>
        </div>
    );
}
