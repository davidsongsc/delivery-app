'use client';

import React from 'react';
import { Transaction } from '@/types/Transaction';
import { formatCurrency } from '@/utils/formatCurrency';
import { CreditCard, DollarSign, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

interface Props {
    transactions: Transaction[];
    loading: boolean;
    error: Error | null;
}

const TransactionsList: React.FC<Props> = ({ transactions, loading, error }) => {
    if (loading) return <p>Carregando transações...</p>;
    if (error) return <p className="text-red-500">Erro ao carregar transações</p>;

    const getIcon = (type: 'INCOME' | 'EXPENSE') => {
        return type === 'INCOME' ? (
            <ArrowUpCircle className="text-green-500 w-5 h-5" />
        ) : (
            <ArrowDownCircle className="text-red-500 w-5 h-5" />
        );
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Transações Recentes</h2>
            </div>

            <ul className="space-y-3">
                {transactions
                    .slice()
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((t) => (
                        <li
                            key={t.uid}
                            className="flex items-center justify-between bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition"
                        >
                            <div className="flex items-center gap-3">
                                {getIcon(t.type)}
                                <div>
                                    <p className="text-sm font-medium text-gray-800">
                                        {t.description || 'Sem descrição'}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(t.date).toLocaleDateString('pt-BR')} ·{' '}
                                        {t.payment_method.replace('_', ' ')}
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <span
                                    className={`text-sm font-semibold ${
                                        t.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                                    }`}
                                >
                                    {t.type === 'INCOME' ? '+' : '-'} {formatCurrency(Number(t.amount))}
                                </span>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default React.memo(TransactionsList);
