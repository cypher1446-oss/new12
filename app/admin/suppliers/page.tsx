import { dashboardService } from '@/lib/dashboardService'
import SupplierManager from '@/components/SupplierManager'

export const dynamic = 'force-dynamic'

export default async function AdminSuppliersPage() {
    const [suppliers, projects] = await Promise.all([
        dashboardService.getSuppliers(),
        dashboardService.getProjects()
    ])

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                        Supplier Management
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        Add suppliers, configure their redirect URLs, and link them to projects.
                    </p>
                </div>
                <div className="px-4 py-2 bg-violet-50 text-violet-600 rounded-2xl border border-violet-100 flex items-center shadow-sm mt-4 sm:mt-0">
                    <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse mr-2" />
                    <span className="text-[11px] font-black uppercase tracking-widest">
                        {suppliers.length} Suppliers
                    </span>
                </div>
            </div>
            <SupplierManager suppliers={suppliers} projects={projects} />
        </div>
    )
}
