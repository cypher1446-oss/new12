'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientAction } from '@/app/actions'

export default function ClientForm() {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim()) return

        setLoading(true)
        setError(null)

        const { error } = await createClientAction(name)

        if (error) {
            setError(error.message || 'Failed to create client')
        } else {
            setName('')
            router.refresh()
        }
        setLoading(false)
    }

    return (
        <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Client</h3>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow">
                    <input
                        type="text"
                        placeholder="Client Name (e.g. Acme Corp)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 px-3 border"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading || !name.trim()}
                    className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 h-10"
                >
                    {loading ? 'Adding...' : 'Add Client'}
                </button>
            </form>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    )
}
