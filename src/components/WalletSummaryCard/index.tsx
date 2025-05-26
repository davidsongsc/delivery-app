'use client';

import React from 'react';
import { useFinancialStats } from '@/hooks/useFinancialStats';
import { formatCurrency } from '@/utils/formatCurrency';

const WalletSummaryCard = () => {
    const { stats, loading } = useFinancialStats();

    if (loading) return <p>Carregando estatísticas...</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-100 p-4 rounded shadow text-center">
                <h3 className="text-sm text-gray-600">Receitas</h3>
                <p className="text-xl font-bold text-green-700">{formatCurrency(stats?.total_income || 0)}</p>
            </div>

            <div className="bg-red-100 p-4 rounded shadow text-center">
                <h3 className="text-sm text-gray-600">Despesas</h3>
                <p className="text-xl font-bold text-red-700">{formatCurrency(stats?.total_expense || 0)}</p>
            </div>

            <div className="bg-blue-100 p-4 rounded shadow text-center">
                <h3 className="text-sm text-gray-600">Saldo Total</h3>
                <p className={`text-xl font-bold ${stats?.balance && stats.balance >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                    {formatCurrency(stats?.balance || 0)}
                </p>
            </div>
        </div>
    );
};

export default WalletSummaryCard;