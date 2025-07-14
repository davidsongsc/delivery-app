'use client';

import TransactionsList from '@/components/TransactionsItem';
import AddTransactionForm from '@/components/TransactionsItem/form';
import { useTransactions } from '@/hooks/useTransactions';
import React from 'react';


export default function LaunchPage() {
    const { transactions, loading, error, refresh } = useTransactions();

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Lançamentos</h1>
                <AddTransactionForm handleReload={refresh} />
            </div>
            <TransactionsList transactions={transactions} loading={loading} error={error} />
        </div>
    );
}