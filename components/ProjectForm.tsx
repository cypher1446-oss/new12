'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createProjectAction } from '@/app/actions'
import { Client } from '@/lib/types'
import { ChevronDown, Plus, Trash2, Link as LinkIcon, AlertCircle } from 'lucide-react'

export default function ProjectForm({ clients }: { clients: Client[] }) {
    const [formData, setFormData] = useState({
        client_id: clients[0]?.id || '',
        project_name: '',
        project_code: '',
        country: 'Global',
        base_url: '',
        complete_target: null as number | null,
        has_prescreener: false,
        prescreener_url: '',
        is_multi_country: false,
        // PID Tool Configuration
        pid_prefix: '',             // e.g. "OPGH"
        pid_counter: 1,             // Starting number
        pid_padding: 2,             // e.g. 2 for "01"
        // UID Logic
        target_uid: '',             // NEW: Global UID Override
        // Parameter isolation fields
        client_pid_param: '',       // e.g. "pid" — vendor's PID param name
        client_uid_param: '',       // e.g. "uid" — vendor's UID param name
        oi_prefix: 'oi_',           // Internal tracking prefix (never reuse vendor names)
    })
    const [links, setLinks] = useState<{ country_code: string; target_url: string; active: boolean }[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const addLink = () => {
        setLinks([...links, { country_code: '', target_url: '', active: true }])
    }

    const toggleActive = (index: number) => {
        const newLinks = [...links]
        newLinks[index].active = !newLinks[index].active
        setLinks(newLinks)
    }

    const updateLink = (index: number, field: 'country_code' | 'target_url', value: string) => {
        const newLinks = [...links]
        newLinks[index][field] = value
        setLinks(newLinks)
    }

    const removeLink = (index: number) => {
        setLinks(links.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { error: createError } = await createProjectAction({
                ...formData,
                is_multi_country: formData.is_multi_country,
            }, formData.is_multi_country ? links : [])

            if (createError) {
                setError(createError.message || 'Failed to create project')
            } else {
                setFormData({
                    client_id: clients[0]?.id || '',
                    project_name: '',
                    project_code: '',
                    country: 'Global',
                    base_url: '',
                    complete_target: null,
                    has_prescreener: false,
                    prescreener_url: '',
                    is_multi_country: false,
                    pid_prefix: '',
                    pid_counter: 1,
                    pid_padding: 2,
                    target_uid: '',
                    client_pid_param: '',
                    client_uid_param: '',
                    oi_prefix: 'oi_',
                })
                setLinks([])
                router.refresh()
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-slate-50/50 rounded-[2.5rem] p-1 border border-slate-100 shadow-sm max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.25rem] overflow-hidden border border-slate-100/50">
                <div className="p-8 lg:p-12 space-y-10">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center text-indigo-500">
                            <Plus className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 tracking-tight">Project PID Setup Tool</h3>
                    </div>

                    <div className="space-y-10">
                        {/* 1. Identity Phase */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-slate-50/30 border border-slate-100 rounded-3xl animate-in slide-in-from-left duration-500">
                            <div className="md:col-span-2 -mb-2">
                                <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Step 1: Project Identity</h4>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[11px] font-bold text-slate-500 tracking-tight ml-1">Client Name</label>
                                <div className="relative">
                                    <select
                                        value={formData.client_id}
                                        onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400 outline-none transition-all text-sm font-medium text-slate-700 appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="">Select client...</option>
                                        {clients.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[11px] font-bold text-slate-500 tracking-tight ml-1">Internal Project Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Samsung Galaxy S24 Study"
                                    value={formData.project_name || ''}
                                    onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400 outline-none transition-all text-sm font-medium text-slate-700 placeholder:text-slate-300"
                                    required
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="block text-[11px] font-bold text-slate-500 tracking-tight ml-1">Internal Project ID (Unique)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. SAMSUNG_S24_01"
                                    value={formData.project_code}
                                    onChange={(e) => setFormData({ ...formData, project_code: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400 outline-none transition-all text-sm font-medium text-slate-700 placeholder:text-slate-300"
                                    required
                                />
                            </div>
                        </div>

                        {/* 2. PID Setup Phase */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-indigo-50/30 border border-indigo-100 rounded-3xl animate-in slide-in-from-right duration-500">
                            <div className="md:col-span-4 -mb-2 flex items-center justify-between">
                                <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Step 2: Client PID Configuration</h4>
                                <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[9px] font-bold rounded-full border border-emerald-200 uppercase tracking-tighter animate-pulse">
                                    Anti-Duplicate Enabled
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-slate-400 tracking-widest ml-1 uppercase">PID Prefix</label>
                                <input
                                    type="text"
                                    placeholder="OPGH"
                                    value={formData.pid_prefix || ''}
                                    onChange={(e) => setFormData({ ...formData, pid_prefix: e.target.value.toUpperCase() })}
                                    className="w-full px-4 py-3 bg-white border border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400 outline-none transition-all text-sm font-bold text-slate-700 placeholder:text-slate-200 font-mono"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-slate-400 tracking-widest ml-1 uppercase">Start #</label>
                                <input
                                    type="number"
                                    value={formData.pid_counter}
                                    onChange={(e) => setFormData({ ...formData, pid_counter: parseInt(e.target.value) || 1 })}
                                    className="w-full px-4 py-3 bg-white border border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400 outline-none transition-all text-sm font-bold text-slate-700 font-mono"
                                    min="1"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-slate-400 tracking-widest ml-1 uppercase">Padding</label>
                                <select
                                    value={formData.pid_padding}
                                    onChange={(e) => setFormData({ ...formData, pid_padding: parseInt(e.target.value) })}
                                    className="w-full px-4 py-3 bg-white border border-indigo-100 rounded-xl outline-none transition-all text-sm font-bold text-slate-700 appearance-none cursor-pointer font-mono"
                                >
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                </select>
                            </div>

                            <div className="flex flex-col justify-end">
                                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 shadow-lg">
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">Preview</p>
                                    <code className="text-emerald-400 text-sm font-black tracking-widest">
                                        {formData.pid_prefix
                                            ? `${formData.pid_prefix}${String(formData.pid_counter).padStart(formData.pid_padding, '0')}`
                                            : '----'}
                                    </code>
                                </div>
                            </div>
                        </div>

                        {/* 3. Baseline & Advanced */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block text-[11px] font-bold text-slate-500 tracking-tight ml-1 uppercase opacity-70">
                                    {formData.is_multi_country ? 'Default Survey URL (Disabled)' : 'Base Survey URL'}
                                </label>
                                <input
                                    type="url"
                                    placeholder={formData.is_multi_country ? 'Multi-country mode: Add country URLs below' : 'https://survey-provider.com/s/123'}
                                    value={formData.base_url}
                                    onChange={(e) => setFormData({ ...formData, base_url: e.target.value })}
                                    className={`w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400 outline-none transition-all text-xs font-medium text-slate-700 placeholder:text-slate-300 font-mono ${formData.is_multi_country ? 'cursor-not-allowed bg-slate-50/50' : 'bg-white'}`}
                                    required={!formData.is_multi_country}
                                    disabled={formData.is_multi_country}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[11px] font-bold text-slate-500 tracking-tight ml-1 uppercase opacity-70">Global Target (Quota)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 500 (Optional)"
                                    value={formData.complete_target || ''}
                                    onChange={(e) => setFormData({ ...formData, complete_target: e.target.value ? parseInt(e.target.value) : null })}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400 outline-none transition-all text-sm font-medium text-slate-700 font-mono"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <details className="group bg-slate-50/50 border border-slate-100 rounded-2xl p-2 transition-all">
                                    <summary className="flex items-center justify-between px-4 py-2 cursor-pointer list-none select-none">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-8 h-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-open:text-indigo-500 transition-colors">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Advanced Link Settings</span>
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-slate-300 group-open:rotate-180 transition-transform" />
                                    </summary>
                                    <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-6 animate-in slide-in-from-top-2 duration-300">
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-bold text-indigo-600 tracking-tight ml-1 uppercase">Target UID Override</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. COMPLETED"
                                                value={formData.target_uid}
                                                onChange={(e) => setFormData({ ...formData, target_uid: e.target.value })}
                                                className="w-full px-4 py-2 bg-indigo-50/50 border border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400 outline-none transition-all text-xs font-bold text-slate-700 placeholder:text-slate-300 font-mono"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-bold text-slate-500 tracking-tight ml-1 uppercase">Vendor PID Param</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. pid"
                                                value={formData.client_pid_param}
                                                onChange={(e) => setFormData({ ...formData, client_pid_param: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/5 transition-all text-xs font-medium text-slate-700 placeholder:text-slate-300 font-mono"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-bold text-slate-500 tracking-tight ml-1 uppercase">Vendor UID Param</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. uid"
                                                value={formData.client_uid_param}
                                                onChange={(e) => setFormData({ ...formData, client_uid_param: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/5 transition-all text-xs font-medium text-slate-700 placeholder:text-slate-300 font-mono"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-bold text-slate-500 tracking-tight ml-1 uppercase">Safe Namespace</label>
                                            <input
                                                type="text"
                                                value={formData.oi_prefix}
                                                onChange={(e) => setFormData({ ...formData, oi_prefix: e.target.value || 'oi_' })}
                                                className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-indigo-500/5 transition-all text-xs font-medium text-slate-700 font-mono"
                                            />
                                        </div>
                                    </div>
                                </details>
                            </div>
                        </div>

                        {/* Toggles Row */}
                        <div className="bg-slate-50/30 border border-slate-100 rounded-2xl p-6 flex flex-wrap gap-8">
                            <label className="flex items-center space-x-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={formData.is_multi_country}
                                    onChange={() => setFormData({ ...formData, is_multi_country: !formData.is_multi_country })}
                                    className="w-5 h-5 rounded-lg border-2 border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                                />
                                <span className="text-xs font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">Enable Multi-Country Support</span>
                            </label>

                            <label className="flex items-center space-x-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={formData.has_prescreener}
                                    onChange={() => setFormData({ ...formData, has_prescreener: !formData.has_prescreener })}
                                    className="w-5 h-5 rounded-lg border-2 border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                                />
                                <span className="text-xs font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">Security Pre-Screener</span>
                            </label>
                        </div>

                        {formData.is_multi_country && (
                            <div className="space-y-4 animate-in fade-in duration-500">
                                <div className="bg-indigo-50/30 border border-indigo-100 rounded-3xl overflow-hidden shadow-inner">
                                    <table className="w-full text-left">
                                        <thead className="bg-indigo-100/30 border-b border-indigo-100">
                                            <tr>
                                                <th className="px-6 py-4 text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Country</th>
                                                <th className="px-6 py-4 text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Survey URL</th>
                                                <th className="px-6 py-4 text-[10px] font-bold text-indigo-600 uppercase tracking-widest text-center">Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-indigo-100/50">
                                            {links.map((link, idx) => (
                                                <tr key={idx} className="bg-white/50">
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="text"
                                                            value={link.country_code}
                                                            onChange={(e) => updateLink(idx, 'country_code', e.target.value.toUpperCase())}
                                                            className="w-12 px-2 py-2 border border-slate-200 rounded-lg text-xs font-bold text-center uppercase"
                                                            maxLength={2}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="url"
                                                            value={link.target_url}
                                                            onChange={(e) => updateLink(idx, 'target_url', e.target.value)}
                                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <button type="button" onClick={() => removeLink(idx)} className="text-rose-400 hover:text-rose-600 transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button type="button" onClick={addLink} className="w-full py-4 text-[10px] font-bold text-indigo-500 hover:bg-white transition-colors uppercase tracking-widest">
                                        + Add New Country
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="px-8 py-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex-1">
                        {error && (
                            <div className="flex items-center space-x-2 text-rose-500">
                                <AlertCircle className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{error}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-6">
                        <button
                            type="button"
                            onClick={() => router.push('/admin/projects')}
                            className="text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !formData.project_code || !formData.client_id}
                            className="px-12 py-4 bg-indigo-500 text-white text-[13px] font-bold rounded-xl shadow-xl shadow-indigo-100/50 hover:bg-indigo-600 transition-all uppercase tracking-widest disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Deploy Enterprise Route'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
