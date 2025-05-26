'use client';

import TransactionsList from '@/components/TransactionsItem';
import AddTransactionForm from '@/components/TransactionsItem/form';
import React from 'react';


export default function LaunchPage() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Lançamentos</h1>
                <AddTransactionForm />
            </div>
            <TransactionsList />
        </div>
    );
}