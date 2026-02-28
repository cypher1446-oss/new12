'use client'

import { createClientAction, deleteClientAction } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeleteClientButton({ id, name }: { id: string, name: string }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete client "${name}"? This may affect associated projects.`)) {
            return
        }

        setLoading(true)
        const { error } = await deleteClientAction(id)
        if (error) {
            alert('Error deleting client: ' + error.message)
        } else {
            router.refresh()
        }
        setLoading(false)
    }

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="text-red-600 hover:text-red-900 text-sm font-medium disabled:opacity-50"
        >
            {loading ? 'Deleting...' : 'Delete'}
        </button>
    )
}
