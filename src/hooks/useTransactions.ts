import { useEffect, useState } from 'react';

import { Transaction } from '@/types/Transaction';
import { getTransactions } from '@/services/financialService';

export const useTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions();
                setTransactions(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    return { transactions, loading, error };
};