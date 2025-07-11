'use client';

import React, { useState } from 'react';
import { createTransaction } from '@/services/financialService';
import { formatCurrencyToNumber, formatDisplayCurrency } from '@/utils/formatForm';
import { notification } from 'antd';
import { useTransactions } from '@/hooks/useTransactions';
interface Props {
  refresh: () => void;
}
const AddTransactionForm: React.FC<Props> = ({ refresh }) => {
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        type: 'EXPENSE' as 'INCOME' | 'EXPENSE',
        payment_method: 'CASH' as 'CASH' | 'BANK_TRANSFER' | 'PIX',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (name === 'type') {
            setFormData((prev) => ({ ...prev, [name]: value as 'INCOME' | 'EXPENSE' }));
        } else if (name === 'payment_method') {
            setFormData((prev) => ({ ...prev, [name]: value as 'CASH' | 'BANK_TRANSFER' | 'PIX' }));
        } else if (name === 'amount') {
            // Atualiza com máscara visual
            setFormData((prev) => ({ ...prev, [name]: formatDisplayCurrency(value) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async () => {
        const numericAmount = formatCurrencyToNumber(formData.amount);

        if (!numericAmount || isNaN(numericAmount)) {
            notification.error({
                message: 'Erro ao criar transação',
                description: 'Por favor, insira um valor numérico para a transação.'
            })
            return;
        }

        try {
            await createTransaction({
                ...formData,
                amount: numericAmount.toString(),
            });

            notification.success({
                message: 'Transação criada com sucesso!',
            });
            refresh();
            setOpen(false);
        } catch (err: any) {
            const errorMsg = err.response?.data ? JSON.stringify(err.response.data) : 'Erro desconhecido';
            console.error('Erro ao criar transação:', errorMsg);
            notification.error({
                message: 'Erro ao criar transação',
                description: errorMsg
            })
        }
    };

    return (
        <div>
            <button onClick={() => setOpen(!open)} className="bg-blue-600 text-white px-4 py-2 rounded">
                Nova Transação
            </button>

            {open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4">Nova Transação</h2>
                        <input
                            name="amount"
                            placeholder="Valor"
                            onChange={handleChange}
                            value={formData.amount}
                            className="mb-2 w-full border p-2"
                        />
                        <input
                            name="description"
                            placeholder="Descrição"
                            onChange={handleChange}
                            value={formData.description}
                            className="mb-2 w-full border p-2"
                        />
                        <input
                            name="date"
                            type="date"
                            onChange={handleChange}
                            value={formData.date}
                            className="mb-2 w-full border p-2"
                        />
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="mb-2 w-full border p-2"
                        >
                            <option value="INCOME">Receita</option>
                            <option value="EXPENSE">Despesa</option>
                        </select>
                        <select
                            name="payment_method"
                            value={formData.payment_method}
                            onChange={handleChange}
                            className="mb-2 w-full border p-2"
                        >
                            <option value="CASH">Dinheiro</option>
                            <option value="BANK_TRANSFER">Transferência</option>
                            <option value="PIX">Pix</option>
                        </select>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setOpen(false)}
                                className="mr-2 px-4 py-2 bg-gray-200"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-green-600 text-white rounded"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default React.memo(AddTransactionForm);