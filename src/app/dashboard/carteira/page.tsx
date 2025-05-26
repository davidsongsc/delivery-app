'use client';

import React from 'react';
import WalletSummaryCard from '@/components/WalletSummaryCard';
import TransactionsList from '@/components/TransactionsItem';


export default function WalletPage() {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Minha Carteira</h1>
            <WalletSummaryCard />
            <h2 className="text-xl font-semibold mt-8">Últimos Lançamentos</h2>
            <TransactionsList />
        </div>
    );
}