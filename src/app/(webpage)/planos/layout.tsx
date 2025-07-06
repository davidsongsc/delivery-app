'use client';

import { useEffect } from "react";
import { usePlanStore } from "@/store/planosStore";

export default function ClientLayout({ children }: { children: React.ReactNode }) {

    const { loading, fetchPlanos } = usePlanStore();

    useEffect(() => {
        fetchPlanos();
    }, []);
    return loading ? (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary" />
        </div>
    ) : (
        <>{children}</>
    );

}
