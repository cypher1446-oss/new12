import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const supabase = await createAdminClient()
        if (!supabase) {
            return NextResponse.json({ error: 'Supabase client not initialized' }, { status: 500 })
        }

        // Test reading from suppliers
        const { data: readData, error: readError } = await supabase.from('suppliers').select('*').limit(1)

        // Test inserting into suppliers
        const mockSupplier = {
            name: 'Diagnostic Test',
            supplier_token: 'DIAGNOSTIC_' + Date.now(),
            status: 'active'
        }
        const { data: insertData, error: insertError } = await supabase.from('suppliers').insert([mockSupplier]).select()

        return NextResponse.json({
            read: { data: readData, error: readError },
            insert: { data: insertData, error: insertError }
        })
    } catch (e: any) {
        return NextResponse.json({ error: e.message || 'Unknown error' }, { status: 500 })
    }
}
