'use client';

import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        useAuthStore.persist.rehydrate(); // ✅ Agora sim!
        setIsHydrated(true);
    }, []);

    if (!isHydrated) return null;

    return <>{children}</>;
}