'use client'

import Image from 'next/image'
import { useState } from 'react'

interface BrandLogoProps {
    className?: string
    alt?: string
    fallbackText?: string
    fallbackClassName?: string
}

export default function BrandLogo({
    className = "h-6 w-auto",
    alt = "Opinion Insights",
    fallbackText = "Opinion Insights",
    fallbackClassName = "text-xs font-black text-slate-900 tracking-tighter uppercase"
}: BrandLogoProps) {
    const [error, setError] = useState(false)

    if (error) {
        return <span className={fallbackClassName}>{fallbackText}</span>
    }

    return (
        <Image
            src="/logo.svg"
            alt={alt}
            width={120}
            height={40}
            className={className}
            onError={() => setError(true)}
        />
    )
}
