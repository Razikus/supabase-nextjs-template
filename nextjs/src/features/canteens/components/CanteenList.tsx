'use client'

import { useQuery } from '@tanstack/react-query'
import {getQueryKey} from "@/lib/tanstackQuery/queryRegistry";

export default function CanteenList() {
    // Get the queryKey from your central registry
    const queryKey = getQueryKey('canteens')

    // useQuery loads and caches the canteens
    const { data, isLoading, error } = useQuery({
        queryKey,
        queryFn: async () => {
            // Call your API route that returns all canteens
            const res = await fetch('/api/canteens')
            if (!res.ok) throw new Error('Failed to load canteens')
            return res.json()
        },
    })

    if (isLoading) return <div>Lade...</div>
    if (error) return <div>Fehler: {(error as Error).message}</div>
    if (!data) return <div>Keine Daten</div>

    return (
        <ul>
            {data.map((canteen: any) => (
                <li key={canteen.id}>{canteen.name}</li>
            ))}
        </ul>
    )
}