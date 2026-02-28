import AdminHeader from '@/components/AdminHeader'
import AdminSidebar from '@/components/AdminSidebar'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-100">
            <AdminSidebar />
            <div className="md:pl-64 flex flex-col flex-1 min-h-screen">
                <AdminHeader />
                <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
