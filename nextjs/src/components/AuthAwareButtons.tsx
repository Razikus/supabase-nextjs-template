"use client";
import { useState, useEffect } from 'react';
import { createSPASassClient } from '@/lib/supabase/client';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from "next/link";

export default function AuthAwareButtons({ variant = 'primary' }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const supabase = await createSPASassClient();
                const { data: { user } } = await supabase.getSupabaseClient().auth.getUser();
                setIsAuthenticated(!!user);
            } catch (error) {
                console.error('Error checking auth status:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return null;
    }

    // Navigation buttons for the header
    if (variant === 'nav') {
        return isAuthenticated ? (
            <Link
                href="/app"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 btn-press cursor-pointer"
            >
                Ir al Dashboard
            </Link>
        ) : (
            <>
                {/* <Link href="/auth/login" className="text-secondary-600 hover:text-secondary-900 transition-colors duration-200 cursor-pointer">
                    Iniciar Sesión
                </Link> */}
                <Link
                    href="/auth/login"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 btn-press cursor-pointer"
                >
                    Ingresar
                </Link>
            </>
        );
    }

    // Primary buttons for the hero section
    return isAuthenticated ? (
        <Link
            href="/app"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors duration-200 btn-press cursor-pointer"
        >
            Ir al Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
    ) : (
        <>
            <Link
                href="/auth/login"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors duration-200 btn-press cursor-pointer"
            >
                Comenzar
                <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
                href="#funcionalidades"
                className="inline-flex items-center px-6 py-3 rounded-xl border border-secondary-300 text-white font-medium hover:bg-white/10 transition-colors duration-200 cursor-pointer"
            >
                Conocer Más
                <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
        </>
    );
}