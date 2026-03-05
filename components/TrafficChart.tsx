export default function TrafficChart() {
    // Simple mock data for the trend line
    const data = [30, 45, 35, 60, 55, 75, 65, 90, 80, 100, 95, 110]
    const max = Math.max(...data)
    const width = 500
    const height = 150

    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width
        const y = height - (val / max) * height
        return `${x},${y}`
    }).join(' ')

    return (
        <div className="bg-white p-6 rounded-lg shadow mt-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Traffic Overview</h3>
                <span className="text-xs text-gray-400">Last 12 hours</span>
            </div>
            <div className="mt-2 h-64 bg-gray-50 flex flex-col items-center justify-center border border-gray-100 rounded-lg p-4">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full text-indigo-500 overflow-visible">
                    {/* Gradient for area */}
                    <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Area under the path */}
                    <path
                        d={`M 0,${height} ${points} V ${height} Z`}
                        fill="url(#areaGradient)"
                    />

                    {/* The line path */}
                    <polyline
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={points}
                    />

                    {/* Points */}
                    {data.map((val, i) => {
                        const x = (i / (data.length - 1)) * width
                        const y = height - (val / max) * height
                        return (
                            <circle key={i} cx={x} cy={y} r="3" className="fill-white stroke-indigo-500 stroke-2 hover:r-4 transition-all" />
                        )
                    })}
                </svg>

                <div className="flex justify-between w-full mt-4 text-[10px] text-gray-400">
                    <span>08:00</span>
                    <span>10:00</span>
                    <span>12:00</span>
                    <span>14:00</span>
                    <span>16:00</span>
                    <span>18:00</span>
                    <span>20:00</span>
                </div>
            </div>
        </div>
    )
}
