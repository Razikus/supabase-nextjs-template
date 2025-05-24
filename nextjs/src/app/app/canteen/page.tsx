'use client'

import {useQuery} from '@tanstack/react-query'
import {useState, useTransition} from 'react'
import {getQueryKey, useServerActionMutation} from "@/lib/tanstackQuery/queryRegistry";

export default function CanteensPage() {
    // QueryKey for canteens from registry
    const queryKey = getQueryKey('canteens')

    // Hook for creating a new canteen (calls server action and invalidates the list)
    const createCanteen = useServerActionMutation('canteens')
    const [pending, startTransition] = useTransition()
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    // Query for loading canteens
    const {data, isLoading, error} = useQuery({
        queryKey,
        queryFn: async () => {
            const res = await fetch('/api/canteens')
            if (!res.ok) throw new Error('Failed to load canteens')
            return res.json()
        },
    })

    // Form submit handler for creating new canteen
    async function handleCreateCanteen(formData: FormData) {
        setErrorMsg(null)
        const name = formData.get('name') as string
        if (!name || name.length < 2) {
            setErrorMsg('Name zu kurz')
            return
        }
        try {
            await createCanteen({name})
        } catch (e: any) {
            setErrorMsg(e?.message ?? 'Unbekannter Fehler')
        }
    }

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Kantinen Übersicht</h1>

            <form
                className="flex gap-2 mb-6"
                action={formData => startTransition(() => handleCreateCanteen(formData))}
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Neue Kantine"
                    required
                    minLength={2}
                    className="border rounded px-2 py-1 flex-1"
                    disabled={pending}
                />
                <button
                    type="submit"
                    disabled={pending}
                    className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                    Hinzufügen
                </button>
            </form>

            {errorMsg && <div className="text-red-600 mb-4">{errorMsg}</div>}
            {isLoading && <div>Lade...</div>}
            {error && <div>Fehler: {(error as Error).message}</div>}
            {data && (
                <ul className="space-y-2">
                    {data.map((canteen: any) => (
                        <li
                            key={canteen.id}
                            className="border rounded p-2 shadow-sm bg-white"
                        >
                            {canteen.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}