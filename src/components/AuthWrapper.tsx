// AuthWrapper.tsx

'use client';

import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        useAuthStore.persist.rehydrate();
        setHydrated(true);
    }, []);

    if (!hydrated) return <div>Carregando autenticação...</div>;

    return <>{children}</>;
}