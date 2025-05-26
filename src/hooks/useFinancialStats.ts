import { useEffect, useState } from 'react';
import { FinancialStats } from '@/types/FinancialStats';
import { getFinancialStats } from '@/services/financialService';

export const useFinancialStats = () => {
    const [stats, setStats] = useState<FinancialStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getFinancialStats();
                setStats(data);
            } catch (err) {
                setError('Erro ao carregar estatísticas');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
};