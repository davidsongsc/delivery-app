'use client';

import React from 'react';
import { useFinancialStats } from '@/hooks/useFinancialStats';
import { formatCurrency } from '@/utils/formatCurrency';
import {
    ArrowUpCircle,
    ArrowDownCircle,
    Wallet,
} from 'lucide-react';
import TransactionsPage from '../TransactionsItem/TranactionPage';

const WalletSummaryCard = () => {
    const { stats, loading } = useFinancialStats();

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((_, i) => (
                    <div
                        key={i}
                        className="animate-pulse bg-gray-100 h-28 rounded-lg shadow-inner"
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* RECEITAS */}
            <div className="bg-green-50 p-5 rounded-xl shadow flex items-center gap-4">
                <ArrowUpCircle className="text-green-600 w-8 h-8" />
                <div>
                    <h3 className="text-sm text-gray-500">Receitas</h3>
                    <p className="text-lg font-bold text-green-700">
                        {formatCurrency(stats?.total_income || 0)}
                    </p>
                </div>
            </div>

            {/* DESPESAS */}
            <div className="bg-red-50 p-5 rounded-xl shadow flex items-center gap-4">
                <ArrowDownCircle className="text-red-600 w-8 h-8" />
                <div>
                    <h3 className="text-sm text-gray-500">Despesas</h3>
                    <p className="text-lg font-bold text-red-700">
                        {formatCurrency(stats?.total_expense || 0)}
                    </p>
                </div>
            </div>

            {/* SALDO TOTAL */}
            <div className="bg-blue-50 p-5 rounded-xl shadow flex items-center gap-4">
                <Wallet className={`w-8 h-8 ${stats?.balance! >= 0 ? 'text-green-700' : 'text-red-700'}`} />
                <div>
                    <h3 className="text-sm text-gray-500">Saldo Total</h3>
                    <p className={`text-lg font-bold ${stats?.balance! >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                        {formatCurrency(stats?.balance || 0)}
                    </p>
                </div>
            </div>
            
            <div className="p-6 space-y-6 col-span-1 md:col-span-3 ">
                <TransactionsPage />
            </div>
        </div>
    );
};

export default WalletSummaryCard;
