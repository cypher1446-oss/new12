'use client'

import { useState } from 'react'
import { flushResponsesAction } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { Download, Trash2, Database, ShieldAlert, CheckCircle2 } from 'lucide-react'

export default function ResponseMaintenance() {
    const [loading, setLoading] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [showSafeFlushConfirm, setShowSafeFlushConfirm] = useState(false)
    const router = useRouter()

    const handleExportAll = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/admin/responses/export')
            if (!response.ok) throw new Error('Export failed')

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `FULL-DB-BACKUP-${new Date().toISOString().split('T')[0]}.xlsx`)
            document.body.appendChild(link)
            link.click()
            link.remove()
        } catch (error) {
            console.error(error)
            alert('Failed to export data')
        } finally {
            setLoading(false)
        }
    }

    const handleSafeExportAndFlush = async () => {
        setLoading(true)
        try {
            // 1. Trigger Export First
            const response = await fetch('/api/admin/responses/export')
            if (!response.ok) throw new Error('Export failed')

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `PRE-FLUSH-BACKUP-${new Date().toISOString().split('T')[0]}.xlsx`)
            document.body.appendChild(link)
            link.click()
            link.remove()

            // 2. Once download starts, show the second confirm for deletion
            setShowSafeFlushConfirm(true)
        } catch (error) {
            console.error(error)
            alert('Backup failed. Process aborted for security.')
        } finally {
            setLoading(false)
        }
    }

    const handleFlush = async () => {
        setLoading(true)
        try {
            const result = await flushResponsesAction()
            if (result.success) {
                alert('Database flushed successfully!')
                setShowConfirm(false)
                setShowSafeFlushConfirm(false)
                router.refresh()
            } else {
                throw new Error(result.error?.message || 'Flush failed')
            }
        } catch (error: any) {
            alert('Error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="mt-12 p-8 bg-white/50 backdrop-blur-md rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/40 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                <Database size={120} />
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                            <Database size={20} className="font-bold" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Database Maintenance</h2>
                    </div>
                    <p className="text-sm text-slate-500 max-w-lg font-medium leading-relaxed">
                        Keep your system lean. Export high-fidelity Excel backups and clear response history to prevent database overflow.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                    <button
                        onClick={handleExportAll}
                        disabled={loading}
                        className="flex items-center space-x-2 px-6 py-3.5 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-50 group/btn"
                    >
                        <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                        <span>Export Backup</span>
                    </button>

                    <button
                        onClick={handleSafeExportAndFlush}
                        disabled={loading}
                        className="flex items-center space-x-2 px-6 py-3.5 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 disabled:opacity-50 group/btn"
                    >
                        <ShieldAlert size={16} className="animate-pulse" />
                        <span>Backup + Clear All</span>
                    </button>

                    <button
                        onClick={() => setShowConfirm(true)}
                        disabled={loading}
                        className="flex items-center space-x-2 px-6 py-3.5 bg-rose-50 text-rose-600 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-rose-100 transition-all border border-rose-100 disabled:opacity-50"
                    >
                        <Trash2 size={16} />
                        <span>Force Flush</span>
                    </button>
                </div>
            </div>

            {/* Standard Confirm Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-8">
                            <ShieldAlert className="w-8 h-8 text-rose-500" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Danger Zone!</h3>
                        <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium">
                            This will permanently delete <span className="text-rose-600 font-bold">ALL response records</span> from the system. This cannot be undone. Are you sure you want to proceed without a backup?
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 py-4 bg-slate-100 text-slate-600 text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleFlush}
                                disabled={loading}
                                className="flex-1 py-4 bg-rose-600 text-white text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-rose-700 transition-all shadow-xl shadow-rose-200 disabled:opacity-50"
                            >
                                {loading ? 'Deleting...' : 'Force Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Safe Flush Confirm Modal (Shown AFTER Export) */}
            {showSafeFlushConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-indigo-900/40 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl border border-indigo-100 animate-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8">
                            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Backup Successful!</h3>
                        <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium">
                            The backup file has been generated and should be downloading. Now that your data is safe, do you want to <span className="text-indigo-600 font-bold">CLEAR the database</span> to free up space?
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowSafeFlushConfirm(false)}
                                className="flex-1 py-4 bg-slate-100 text-slate-600 text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all"
                            >
                                Keep Data
                            </button>
                            <button
                                onClick={handleFlush}
                                disabled={loading}
                                className="flex-1 py-4 bg-indigo-600 text-white text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 disabled:opacity-50"
                            >
                                {loading ? 'Clearing...' : 'Clear Database'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
