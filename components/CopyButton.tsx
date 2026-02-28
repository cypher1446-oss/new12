'use client'

import { useState, useEffect } from 'react'

interface CopyButtonProps {
    projectCode: string
}

export default function CopyButton({ projectCode }: CopyButtonProps) {
    const [copied, setCopied] = useState(false)
    const [baseUrl, setBaseUrl] = useState('')

    useEffect(() => {
        // Handle base URL generation on client side to ensure window.location is available
        const appUrl = process.env.NEXT_PUBLIC_APP_URL
        const calculatedBaseUrl = appUrl
            ? (appUrl.endsWith('/') ? appUrl.slice(0, -1) : appUrl)
            : (typeof window !== 'undefined' ? window.location.origin : '')

        setBaseUrl(calculatedBaseUrl)
    }, [])

    const fullUrl = `${baseUrl}/track?code=${projectCode}&uid=[UID]`

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(fullUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    return (
        <div className="flex items-center space-x-2 mt-1">
            <span className="text-[10px] text-gray-500 font-mono truncate max-w-[200px] bg-gray-50 px-1 rounded border border-gray-100 italic">
                {fullUrl}
            </span>
            <button
                onClick={handleCopy}
                className={`p-1 rounded hover:bg-gray-100 transition-colors ${copied ? 'text-green-600' : 'text-gray-400'}`}
                title="Copy tracking link"
            >
                {copied ? (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3" />
                    </svg>
                )}
            </button>
            {copied && <span className="text-[10px] text-green-600 font-medium animate-fade-in">Copied!</span>}
        </div>
    )
}
