'use client'

import { useState } from 'react'
import { resetAdminCredentials } from './actions'

export default function SecretResetPage() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        const formData = new FormData(e.currentTarget)
        const result = await resetAdminCredentials(formData)

        if (result.success) {
            setMessage({ type: 'success', text: 'Admin credentials updated successfully! You can now login.' })
            e.currentTarget.reset()
        } else {
            setMessage({ type: 'error', text: result.error || 'Failed to update credentials' })
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-red-500 mb-2">⚠️ RESTRICTED AREA</h1>
                    <p className="text-gray-400 text-sm">Emergency Admin Credential Reset</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Master Key</label>
                        <input
                            type="password"
                            name="masterKey"
                            required
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                            placeholder="Enter master key..."
                        />
                    </div>

                    <div className="h-px bg-gray-700 my-6"></div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">New Username (Email)</label>
                        <input
                            type="text"
                            name="email"
                            required
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            placeholder="admin"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {message && (
                        <div className={`p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-900/50 text-green-200 border border-green-800' : 'bg-red-900/50 text-red-200 border border-red-800'}`}>
                            {message.text}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Updating Credentials...' : 'Reset Admin Access'}
                    </button>
                </form>
            </div>
        </div>
    )
}
