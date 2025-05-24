'use client'



import {createCanteen} from "@/features/canteens/action/createCanteenAction";

type ServerActionFn = (...args: any[]) => Promise<any>

type RegistryEntry = {
    queryKey: unknown[]
    serverAction?: ServerActionFn
}

// Central registry for query keys and optional server actions
export const queryRegistry: Record<string, RegistryEntry> = {
    canteens: {
        queryKey: ['canteens'],
        serverAction: createCanteen
    },
    // Add more entries as needed...
}

// Helper to retrieve a query key by name
export function getQueryKey(key: string): unknown[] {
    const entry = queryRegistry[key]
    if (!entry) throw new Error(`No queryKey found for "${key}"`)
    return entry.queryKey
}

import { useQueryClient } from '@tanstack/react-query'

// React hook to execute a registered server action and invalidate the associated query key
export function useServerActionMutation(key: string) {
    const queryClient = useQueryClient()
    const entry = queryRegistry[key]
    if (!entry || !entry.serverAction) throw new Error(`No serverAction registered for "${key}"`)

    // Wrapper for mutation and cache invalidation
    const mutationFn = async (...args: any[]) => {
        const result = await entry.serverAction!(...args)
        await queryClient.invalidateQueries({ queryKey: entry.queryKey })
        return result
    }

    return mutationFn
}