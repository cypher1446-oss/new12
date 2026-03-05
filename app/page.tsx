import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8 p-10 bg-[#1e293b] rounded-3xl border border-slate-700 shadow-2xl">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white tracking-tight">RouterFlow</h1>
          <p className="text-slate-400 text-lg">System Management Portal</p>
        </div>

        <Link
          href="/login"
          className="group relative flex w-full justify-center rounded-2xl bg-indigo-600 px-6 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/25 border border-indigo-400/20"
        >
          <span className="flex items-center gap-2">
            Access Admin Dashboard
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </Link>
        <p className="text-slate-500 text-sm">Secure access for authorized personnel only.</p>
      </div>
    </main>
  )
}
