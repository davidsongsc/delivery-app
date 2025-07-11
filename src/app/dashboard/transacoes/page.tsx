'use client'

import TransactionsList from "@/components/TransactionsItem";
import { useTransactions } from "@/hooks/useTransactions";

export default function TransactionsPage() {
    const { transactions, loading, error, refresh } = useTransactions();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Minhas Transações</h1>
            <TransactionsList transactions={transactions} loading={loading} error={error} />
        </div>
    );
}