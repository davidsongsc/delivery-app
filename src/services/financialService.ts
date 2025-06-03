import apiClient from '@/services/apiClient';

import { Transaction } from '@/types/Transaction';
import { Category } from '@/types/Category';
import { FinancialGoal } from '@/types/FinancialGoal';
import { Budget } from '@/types/Budget';
import { Invoice } from '@/types/Invoice';
import { FinancialStats } from '@/types/FinancialStats';
const rota: string = '/api';
export const getTransactions = async () => {
    const res = await apiClient.get(`${rota}/transactions/`);
    console.log(`${rota}/transactions/`)
    return res.data as Transaction[];
};

export const createTransaction = async (data: Partial<Transaction>) => {
    const res = await apiClient.post(`${rota}/transactions/`, data);
    return res.data as Transaction;
};

// Estatísticas Financeiras (exemplo simples)
export const getFinancialStats = async () => {
    const res = await apiClient.get('/transactions/stats/');
    return res.data as FinancialStats;
};

export const getGoals = async () => {
    const res = await apiClient.get(`${rota}/goals/`);
    return res.data as FinancialGoal[];
};

export const createGoal = async (data: Partial<FinancialGoal>) => {
    const res = await apiClient.post(`${rota}/goals/`, data);
    return res.data as FinancialGoal;
};

export const getBudgets = async () => {
    const res = await apiClient.get(`${rota}/budgets/`);
    return res.data as Budget[];
};

export const createBudget = async (data: Partial<Budget>) => {
    const res = await apiClient.post(`${rota}/budgets/`, data);
    return res.data as Budget;
};

export const getInvoices = async () => {
    const res = await apiClient.get(`${rota}/invoices/`);
    return res.data as Invoice[];
};

export const createInvoice = async (data: Partial<Invoice>) => {
    const res = await apiClient.post(`${rota}/invoices/`, data);
    return res.data as Invoice;
};


