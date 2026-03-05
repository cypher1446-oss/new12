'use client'

import { Client } from '@/lib/types'
import { useRouter, useSearchParams } from 'next/navigation'

export default function DashboardFilters({ clients }: { clients: Client[] }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentClientId = searchParams.get('clientId') || 'all'

    const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString())
        if (e.target.value === 'all') {
            params.delete('clientId')
        } else {
            params.set('clientId', e.target.value)
        }
        router.push(`/admin/dashboard?${params.toString()}`)
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center mb-6">
            <div className="w-full sm:w-64">
                <label htmlFor="client-filter" className="sr-only">Filter by Client</label>
                <select
                    id="client-filter"
                    value={currentClientId}
                    onChange={handleClientChange}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="all">All Clients</option>
                    {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                            {client.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="w-full sm:w-64">
                <select
                    disabled
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed sm:text-sm rounded-md"
                >
                    <option>All Countries</option>
                </select>
            </div>

            <div className="flex-1 flex justify-end w-full">
                <span className="text-xs text-gray-400 italic">Filters update metrics instantly</span>
            </div>
        </div>
    )
}
