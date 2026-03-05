'use server'

import { createAdminClient } from '@/lib/supabase-server'
import bcrypt from 'bcrypt'

const MASTER_KEY = process.env.ADMIN_MASTER_KEY || 'super-secret-key-change-me'

export async function resetAdminCredentials(formData: FormData) {
    const masterKey = formData.get('masterKey') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (masterKey !== MASTER_KEY) {
        return { success: false, error: 'Invalid Master Key' }
    }

    if (!email || !password) {
        return { success: false, error: 'Email and Password are required' }
    }

    const supabase = await createAdminClient()
    if (!supabase) {
        return { success: false, error: 'Database is not configured. Add Supabase credentials to .env.local.' }
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        // Check if admin exists
        const { data: existingAdmin } = await supabase
            .from('admins')
            .select('id')
            .eq('email', email)
            .single()

        let error
        if (existingAdmin) {
            // Update existing
            const { error: updateError } = await supabase
                .from('admins')
                .update({ password_hash: hashedPassword })
                .eq('id', existingAdmin.id)
            error = updateError
        } else {
            // Create new
            const { error: insertError } = await supabase
                .from('admins')
                .insert({
                    email,
                    password_hash: hashedPassword
                })
            error = insertError
        }

        if (error) throw error

        return { success: true }
    } catch (err) {
        console.error('Reset error:', err)
        return { success: false, error: 'Database error occurred' }
    }
}
