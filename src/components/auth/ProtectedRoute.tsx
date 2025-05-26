'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    const token = useAuthStore((state) => state.token);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
            setIsChecking(false);
        } else {
            setIsAuthenticated(false);
            setIsChecking(false);
            router.push('/login');
        }
    }, [token, setIsAuthenticated, router]);

    // Enquanto verifica, mostra nada ou um loading
    if (isChecking) return null;

    // Se não autenticado, não renderiza nada
    if (!isAuthenticated) return null;

    // Se autenticado, libera acesso
    return <>{children}</>;
}