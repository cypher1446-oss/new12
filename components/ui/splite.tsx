'use client'

import { Suspense, lazy, useEffect, useRef, useState } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
    scene: string
    className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const handleMouseMove = (e: MouseEvent) => {
            // Only handle real user mouse events to prevent infinite loops
            if (!e.isTrusted) return

            if (!containerRef.current) return
            const canvas = containerRef.current.querySelector('canvas')
            if (!canvas) return

            // Dispatch a synthetic event to the canvas so the Spline runtime
            // register movement even when the mouse is outside the canvas bounds
            const syntheticEvent = new MouseEvent('mousemove', {
                clientX: e.clientX,
                clientY: e.clientY,
                movementX: e.movementX,
                movementY: e.movementY,
                bubbles: true,
                cancelable: true,
            })
            canvas.dispatchEvent(syntheticEvent)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    if (!isMounted) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <span className="text-xs font-mono text-text-muted">Loading 3D Engine...</span>
            </div>
        )
    }

    return (
        <div ref={containerRef} className="w-full h-full">
            <Suspense
                fallback={
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs font-mono text-text-muted">Loading 3D...</span>
                    </div>
                }
            >
                <Spline
                    scene={scene}
                    className={className}
                />
            </Suspense>
        </div>
    )
}
