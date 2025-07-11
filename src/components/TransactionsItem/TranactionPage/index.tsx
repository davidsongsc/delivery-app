'use client';

import React from 'react';
import { useTransactions } from '@/hooks/useTransactions';
import TransactionsList from '@/components/TransactionsItem';
import AddTransactionForm from '@/components/TransactionsItem/form';
export default function TransactionsPage() {
    const { transactions, loading, error, refresh } = useTransactions();

    return (
        <div>
            <AddTransactionForm refresh={refresh} />
            <TransactionsList
                transactions={transactions}
                loading={loading}
                error={error}
            />
        </div>
    );
}
