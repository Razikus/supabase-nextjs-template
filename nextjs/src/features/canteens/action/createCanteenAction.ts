'use server'
import { createSSRClient } from "@/lib/supabase/server";

/**
 * Server Action to insert a new canteen.
 * @param name Name of the canteen to insert.
 */
export async function createCanteen({ name }: { name: string }) {
    const supabase = await createSSRClient()
    const { data, error } = await supabase
        .from('canteens')
        .insert([{ name }])
        .select()
        .single()
    if (error) throw error
    return data
}