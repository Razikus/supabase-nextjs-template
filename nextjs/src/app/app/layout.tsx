'use client';
import AppLayout from '@/components/AppLayout';
import {GlobalProvider} from '@/lib/context/GlobalContext';
import {TanstackQueryClientProvider} from "@/providers/query-provider";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <TanstackQueryClientProvider>
            <GlobalProvider>
                <AppLayout>{children}</AppLayout>
            </GlobalProvider>
        </TanstackQueryClientProvider>
    );
}