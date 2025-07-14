'use client';

import React from 'react';
import { useTransactions } from '@/hooks/useTransactions';
import TransactionsList from '@/components/TransactionsItem';
import AddTransactionForm from '@/components/TransactionsItem/form';
import { Transaction } from '@/types/Transaction';

interface Props {
    handleReload: () => void;
    transactions: Transaction[];
    loading: boolean;
    error: Error | null;
}
const TransactionPage: React.FC<Props> = ({ handleReload, transactions, loading, error }) => {

    return (
        <div className='flex gap-4 flex-col md:flex-row items-start'>
            <AddTransactionForm handleReload={handleReload} />
            <TransactionsList
                transactions={transactions}
                loading={loading}
                error={error}
            />
        </div>
    );
}

export default React.memo(TransactionPage);