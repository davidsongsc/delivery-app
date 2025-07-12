import { useEffect, useState, useCallback } from 'react';
import { FinancialStats } from '@/types/FinancialStats';
import { getFinancialStats } from '@/services/financialService';

export const useFinancialStats = () => {
    const [stats, setStats] = useState<FinancialStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getFinancialStats();
            setStats(data);
        } catch (err) {
            setError('Erro ao carregar estatísticas');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return { stats, loading, error, refetch: fetchStats };
};
