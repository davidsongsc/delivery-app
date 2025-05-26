'use client';

import React from 'react';
import { useTransactions } from '@/hooks/useTransactions';
import { formatCurrency } from '@/utils/formatCurrency';

export default function TransactionsList() {
    const { transactions, loading, error } = useTransactions();

    if (loading) return <p>Carregando transações...</p>;
    if (error) return <p className="text-red-500">Erro ao carregar transações</p>;

    return (
        <ul className="space-y-2">
            {transactions.map((t) => (
                <li key={t.uid} className="border p-4 rounded shadow-sm">
                    <div className="flex justify-between">
                        <span>{t.description || 'Sem descrição'}</span>
                        <span className={t.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}>
                            {t.type === 'INCOME' ? '+' : '-'}{' '}
                            {formatCurrency(parseFloat(t.amount as string))}
                        </span>
                    </div>
                    <small className="text-gray-500">
                        {new Date(t.date).toLocaleDateString()}
                    </small>
                </li>
            ))}
        </ul>
    );
}