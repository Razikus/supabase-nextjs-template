import { NextResponse } from 'next/server'
import { createSSRClient } from '@/lib/supabase/server'

export async function GET() {
    const supabase = await createSSRClient()
    const { data, error } = await supabase.from('canteens').select('*')
    if (error) {
        // Return error as JSON and 500 status
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
    // Return all canteens as JSON
    return NextResponse.json(data)
}