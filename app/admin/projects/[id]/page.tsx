import { dashboardService } from '@/lib/dashboardService'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Project } from '@/lib/types'
import ProjectEditForm from '@/components/ProjectEditForm'
import RedirectManager from '@/components/RedirectManager'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function EditProjectPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const [project, clients] = await Promise.all([
        dashboardService.getProjectById(id),
        dashboardService.getClients()
    ])

    if (!project) {
        redirect('/admin/projects')
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Project</h1>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">Update routing parameters for {project.project_code}</p>
                </div>
                <Link
                    href="/admin/projects"
                    className="flex items-center space-x-2 text-slate-400 hover:text-indigo-600 font-black text-xs uppercase tracking-widest transition-all group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Projects</span>
                </Link>
            </div>

            <ProjectEditForm project={project} clients={clients} />

            <RedirectManager project={project} />
        </div>
    )
}
