import { createAdminClient } from '@/lib/supabase-server'
import { KPIStats, ProjectAnalytics, Client, Project } from '@/lib/types'

const notConfiguredError = { message: 'Supabase not configured' }

export const dashboardService = {
    async getProjectAnalytics(clientId?: string): Promise<ProjectAnalytics[]> {
        const supabase = await createAdminClient()
        if (!supabase) return []
        let query = supabase.rpc('get_project_analytics')
        const { data, error } = await query
        if (error) return []
        return data as ProjectAnalytics[]
    },

    async getClients(): Promise<Client[]> {
        const supabase = await createAdminClient()
        if (!supabase) return []
        const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
        if (error) return []
        return data as Client[]
    },

    async createClient(name: string): Promise<{ data: Client | null; error: any }> {
        const supabase = await createAdminClient()
        if (!supabase) return { data: null, error: notConfiguredError }
        const { data, error } = await supabase
            .from('clients')
            .insert([{ name }])
            .select()
            .single()
        return { data, error }
    },

    async deleteClient(id: string): Promise<{ error: any }> {
        const supabase = await createAdminClient()
        if (!supabase) return { error: notConfiguredError }
        const { error } = await supabase
            .from('clients')
            .delete()
            .eq('id', id)
        return { error }
    },

    async getProjects(): Promise<(Project & { client_name: string })[]> {
        const supabase = await createAdminClient()
        if (!supabase) return []
        const { data, error } = await supabase
            .from('projects')
            .select(`
                *,
                clients (
                    name
                )
            `)
            .is('deleted_at', null)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching projects:', error)
            return []
        }

        return (data as any[]).map(p => ({
            ...p,
            client_name: p.clients?.name || 'Unknown Client'
        }))
    },

    async createProject(project: any): Promise<{ data: Project | null; error: any }> {
        const supabase = await createAdminClient()
        if (!supabase) return { data: null, error: notConfiguredError }
        const { data, error } = await supabase
            .from('projects')
            .insert([{ ...project, status: 'active' }])
            .select()
            .single()
        return { data, error }
    },

    async updateProjectStatus(id: string, status: 'active' | 'paused'): Promise<{ error: any }> {
        const supabase = await createAdminClient()
        if (!supabase) return { error: notConfiguredError }
        const { error } = await supabase
            .from('projects')
            .update({ status })
            .eq('id', id)
        return { error }
    },

    async deleteProject(id: string): Promise<{ error: any }> {
        const supabase = await createAdminClient()
        if (!supabase) return { error: notConfiguredError }
        const { error } = await supabase
            .from('projects')
            .update({
                deleted_at: new Date().toISOString(),
                status: 'deleted'
            })
            .eq('id', id)
        return { error }
    },

    async getKPIs(): Promise<any> {
        const metrics = await this.getProjectHealthMetrics()
        const projects = await this.getProjects()

        const clicks_today = metrics.reduce((sum, m) => sum + (m.clicks_today || 0), 0)
        const completes_today = metrics.reduce((sum, m) => sum + (m.completes_today || 0), 0)
        const duplicates_today = metrics.reduce((sum, m) => sum + (m.duplicates_today || 0), 0)
        const security_terminates_today = metrics.reduce((sum, m) => sum + (m.security_terminates_today || 0), 0)
        const quotafull_today = metrics.reduce((sum, m) => sum + (m.quotafull_today || 0), 0)
        const terminates_today = metrics.reduce((sum, m) => sum + (m.terminates_today || 0), 0)
        const in_progress_today = metrics.reduce((sum, m) => sum + (m.in_progress_today || 0), 0)
        const active_projects = projects.filter(p => p.status === 'active').length

        return {
            clicks_today,
            completes_today,
            duplicates_today,
            security_terminates_today,
            quotafull_today,
            terminates_today,
            in_progress_today,
            active_projects,
            total_projects: projects.length
        }
    },

    async getProjectHealthMetrics(): Promise<any[]> {
        const supabase = await createAdminClient()
        if (!supabase) return []

        // Fetch all active projects
        const { data: projects, error: projectsError } = await supabase
            .from('projects')
            .select('id, project_code')
            .is('deleted_at', null)

        if (projectsError || !projects) return []

        // Fetch all responses from today
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const { data: responses, error: responsesError } = await supabase
            .from('responses')
            .select('project_id, status')
            .gte('created_at', today.toISOString())

        if (responsesError || !responses) return []

        // Process metrics
        const metrics = projects.map(p => {
            const projResponses = responses.filter(r => r.project_id === p.id)

            // "Clicks" should represent all entries. Previously, if a response became 'complete', 
            // it was no longer 'in_progress', dropping the click count. This fixes that.
            const clicks_today = projResponses.length
            const completes_today = projResponses.filter(r => r.status === 'complete').length
            const duplicates_today = projResponses.filter(r => ['duplicate_ip', 'duplicate_string'].includes(r.status)).length
            const security_terminates_today = projResponses.filter(r => r.status === 'security_terminate').length
            const quotafull_today = projResponses.filter(r => ['quota', 'quota_full'].includes(r.status)).length
            const terminates_today = projResponses.filter(r => ['terminate', 'terminated'].includes(r.status)).length
            const in_progress_today = projResponses.filter(r => r.status === 'in_progress').length

            const conversion_rate = clicks_today > 0 ? (completes_today / clicks_today) * 100 : 0

            return {
                project_id: p.id,
                project_code: p.project_code,
                clicks_today,
                completes_today,
                duplicates_today,
                security_terminates_today,
                quotafull_today,
                terminates_today,
                in_progress_today,
                conversion_rate
            }
        })

        return metrics
    },

    async getProjectById(id: string): Promise<Project | null> {
        const supabase = await createAdminClient()
        if (!supabase) return null
        const { data, error } = await supabase.from('projects').select('*').eq('id', id).single()
        if (error) return null
        return data as Project
    },

    async updateProject(id: string, project: Partial<Project>): Promise<{ error: any }> {
        const supabase = await createAdminClient()
        if (!supabase) return { error: notConfiguredError }
        const { error } = await supabase.from('projects').update(project).eq('id', id)
        return { error }
    },

    async getResponses(filters?: { ip?: string; status?: string; device_type?: string }): Promise<any[]> {
        const supabase = await createAdminClient()
        if (!supabase) return []
        let query = supabase
            .from('responses')
            .select(`
                *,
                projects (
                    project_name
                )
            `)
            .order('created_at', { ascending: false })
            .limit(200)

        if (filters?.ip) query = query.ilike('ip', `%${filters.ip}%`)
        if (filters?.status && filters.status !== 'all') query = query.eq('status', filters.status)
        if (filters?.device_type && filters.device_type !== 'all') query = query.eq('device_type', filters.device_type)

        const { data, error } = await query
        if (error) {
            console.error('Error fetching responses:', error)
            return []
        }

        return data.map(r => ({
            ...r,
            uid: r.uid || 'N/A',
            project_code: r.project_code || 'Unknown',
            project_name: (r.projects as any)?.project_name || r.project_code || 'Unknown',
            ip: r.ip || null,
        }))
    },

    async flushResponses(): Promise<{ error: any }> {
        const supabase = await createAdminClient()
        if (!supabase) return { error: notConfiguredError }
        const { error } = await supabase
            .from('responses')
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000')
        return { error }
    }
}
