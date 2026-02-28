'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateProjectStatusAction } from '@/app/actions'

export default function ProjectStatusToggle({ id, initialStatus }: { id: string, initialStatus: 'active' | 'paused' }) {
    const [status, setStatus] = useState(initialStatus)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const toggleStatus = async () => {
        setLoading(true)
        const newStatus = status === 'active' ? 'paused' : 'active'
        const { error } = await updateProjectStatusAction(id, newStatus)

        if (error) {
            alert('Failed to update status: ' + error.message)
        } else {
            setStatus(newStatus)
            router.refresh()
        }
        setLoading(false)
    }

    return (
        <button
            onClick={toggleStatus}
            disabled={loading}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${status === 'active' ? 'bg-indigo-600' : 'bg-gray-200'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${status === 'active' ? 'translate-x-5' : 'translate-x-0'
                    }`}
            />
        </button>
    )
}
