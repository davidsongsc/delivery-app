'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createTransaction } from '@/services/financialService';
import { formatCurrencyToNumber, formatDisplayCurrency } from '@/utils/formatForm';
import { notification } from 'antd';
import { X, Car, Bike } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFinancialStats } from '@/hooks/useFinancialStats';

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
    const { refetch } = useFinancialStats();
    const modalRef = useRef(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (name === 'amount') {
            setFormData((prev) => ({ ...prev, [name]: formatDisplayCurrency(value) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async () => {
        const numericAmount = formatCurrencyToNumber(formData.amount);

        if (!numericAmount || isNaN(numericAmount)) {
            notification.error({
                message: 'Erro',
                description: 'Insira um valor numérico válido.',
            });
            return;
        }

        try {
            await createTransaction({
                ...formData,
                amount: numericAmount.toString(),
            });

            notification.success({ message: 'Transação registrada com sucesso!' });
            refresh();
            refetch();
            setOpen(false);
        } catch (err: any) {
            const errorMsg = err.response?.data ? JSON.stringify(err.response.data) : 'Erro desconhecido';
            notification.error({
                message: 'Erro ao criar transação',
                description: errorMsg,
            });
        }
    };

    // Fechar com ESC
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Fechar clicando fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !(modalRef.current as any).contains(event.target)) {
                setOpen(false);
            }
        };
        if (open) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
                Nova Transação
            </button>

            <AnimatePresence>
                {open && (


                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >

                        <motion.div
                            ref={modalRef}
                            className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            {/* Botão de fechar */}
                            <button
                                className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
                                onClick={() => setOpen(false)}
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-xl font-semibold mb-4">Nova Transação</h2>
                            <div className="flex gap-2 mb-4">
                                <button
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                                    onClick={() =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            amount: '1.400,00',
                                            description: 'Venda de carro',
                                            type: 'INCOME',
                                        }))
                                    }
                                >
                                    <Car className="w-5 h-5" />
                                    Carro
                                </button>

                                <button
                                    className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                                    onClick={() =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            amount: '500,00',
                                            description: 'Venda de moto',
                                            type: 'INCOME',
                                        }))
                                    }
                                >
                                    <Bike className="w-5 h-5" />
                                    Moto
                                </button>
                            </div>
                            <div className="space-y-3">
                                <input
                                    name="amount"
                                    placeholder="Valor (R$)"
                                    onChange={handleChange}
                                    value={formData.amount}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    name="description"
                                    placeholder="Descrição"
                                    onChange={handleChange}
                                    value={formData.description}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2"
                                />
                                <input
                                    name="date"
                                    type="date"
                                    onChange={handleChange}
                                    value={formData.date}
                                    className="w-full p-2 border rounded"
                                />
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="INCOME">Receita</option>
                                    <option value="EXPENSE">Despesa</option>
                                </select>
                                <select
                                    name="payment_method"
                                    value={formData.payment_method}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="CASH">Dinheiro</option>
                                    <option value="BANK_TRANSFER">Transferência</option>
                                    <option value="PIX">Pix</option>
                                </select>
                            </div>

                            <div className="flex justify-end mt-6 gap-2">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                                >
                                    Salvar
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default React.memo(AddTransactionForm);
