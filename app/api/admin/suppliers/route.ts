import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function GET() {
    const supabase = await createAdminClient();
    if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

    console.log('[Suppliers API] Attempting to fetch suppliers...');
    const { data, error, status, statusText } = await supabase
        .from('suppliers')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('[Suppliers API GET] Error details:', {
            message: error.message,
            status: status,
            statusText: statusText,
            details: (error as any).details,
            hint: (error as any).hint
        });
        return NextResponse.json({
            error: error.message,
            status: status,
            statusText: statusText,
            details: (error as any).details,
            hint: (error as any).hint
        }, { status: 500 });
    }

    console.log('[Suppliers API] Successfully fetched', data?.length, 'suppliers');
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const supabase = await createAdminClient();
    if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

    try {
        const body = await req.json();
        const { data, error } = await supabase
            .from('suppliers')
            .insert([body])
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}

export async function PATCH(req: NextRequest) {
    const supabase = await createAdminClient();
    if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

    try {
        const body = await req.json();
        const { id, ...updates } = body;

        if (!id) return NextResponse.json({ error: "Missing supplier ID" }, { status: 400 });

        const { data, error } = await supabase
            .from('suppliers')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}
