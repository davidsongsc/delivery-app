'use client';

import React from 'react';
import { useTransactions } from '@/hooks/useTransactions';
import { formatCurrency } from '@/utils/formatCurrency';
import { Transaction } from '@/types/Transaction';

interface Props {
    transactions: Transaction[];
    loading: boolean;
    error: Error | null;
}

const TransactionsList: React.FC<Props> = ({ transactions, loading, error }) => {

    if (loading) return <p>Carregando transações...</p>;
    if (error) return <p className="text-red-500">Erro ao carregar transações</p>;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Transações</h2>

            </div>

            <ul className="space-y-2">
                {transactions
                    .slice() // <- cria uma cópia para não mutar o original
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // <- ordena pela data decrescente
                    .map((t) => (
                        <li key={t.uid} className="border p-4 rounded shadow-sm">
                            <div className="flex justify-between">
                                <span>{t.description || 'Sem descrição'}</span>
                                <span
                                    className={
                                        t.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                                    }
                                >
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

        </div>
    );
}


export default React.memo(TransactionsList);    