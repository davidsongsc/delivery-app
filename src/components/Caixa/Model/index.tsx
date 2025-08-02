// components/CaixaModal.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Button, Space, message, Select, Alert, Spin } from 'antd';
import { DollarSign } from 'lucide-react';
import CaixaResumo from '../Resumo'; // Importe o componente ajustado
import { useCaixaByOperador } from '@/hooks/useCaixa';
import { useAuth } from '@/contexts/AuthContext';
import { caixaService } from '@/services/caixa.service';
import Title from 'antd/es/typography/Title';
import { Option } from 'antd/lib/mentions';

const CaixaModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);
    const [selectedCaixaId, setSelectedCaixaId] = useState<string | null>(null);

    const { user } = useAuth();
    const operadorId = useMemo(() => user?.id ?? '', [user?.id]);
    const { caixas, isLoading, error, refreshCaixa } = useCaixaByOperador(operadorId);

    const handleClose = () => {
        setIsOpen(false);
        setIsMinimized(true);
    };

    const handleReopen = () => {
        setIsOpen(true);
        setIsMinimized(false);
    };

    const handleSelectCaixa = (value: string) => {
        setSelectedCaixaId(value);
    };

    // Adicione o useEffect para selecionar o primeiro caixa automaticamente
    useEffect(() => {
        if (caixas && caixas.length > 0 && !selectedCaixaId) {
            setSelectedCaixaId(caixas[0].id);
        }
    }, [caixas, selectedCaixaId]);

    const abrirCaixa = async () => {
        if (!user?.id) {
            message.error('Usuário não autenticado');
            return;
        }

        try {
            message.loading({ content: 'Abrindo caixa...', key: 'abrir' });

            // Dados para abrir o caixa — ajuste conforme seu backend espera
            const payload = {
                operador: user.id,
                saldo_inicial: 0, // ou outro valor inicial que quiser
                nome: 'Caixa do operador ' + user.first_name,
                tenant: user.tenant, // se for necessário
            };

            await caixaService.abrirCaixa(payload);

            message.success({ content: 'Caixa aberto com sucesso!', key: 'abrir' });
            refreshCaixa();
        } catch (error) {
            message.error({ content: 'Erro ao abrir caixa.', key: 'abrir' });
        }
    };


    const fecharCaixa = async () => {
        try {
            message.loading({ content: 'Fechando caixa...', key: 'fechar' });
            // await caixaService.fecharCaixa(...)
            message.success({ content: 'Caixa fechado com sucesso!', key: 'fechar' });
            refreshCaixa();
        } catch {
            message.error({ content: 'Erro ao fechar caixa.', key: 'fechar' });
        }
    };

    const registrarDesconto = async () => {
        try {
            message.loading({ content: 'Registrando desconto...', key: 'desconto' });
            // await caixaService.registrarDesconto(...)
            message.success({ content: 'Desconto registrado!', key: 'desconto' });
            refreshCaixa();
        } catch {
            message.error({ content: 'Erro ao registrar desconto.', key: 'desconto' });
        }
    };


    const selectedCaixa = caixas.find(c => c.id === selectedCaixaId);

    if (isLoading) {
        return <Spin tip="Carregando caixas..." />;
    }

    if (error) {
        return <Alert message="Erro" description={error} type="error" showIcon />;
    }

    return (
        <>
            <Modal
                open={isOpen}
                onCancel={handleClose}
                footer={null}
                title="Gerenciar Caixas"
                width="100vw"
                style={{ top: 20, padding: 0 }}
                bodyStyle={{ height: 'calc(100vh - 100px)', overflowY: 'auto' }}
                destroyOnClose={false}
                maskClosable={false}
            >
                <Title level={5}>Selecione um Caixa</Title>
                <Select
                    placeholder="Selecione um caixa para operar"
                    style={{ width: '100%', marginBottom: 16 }}
                    onChange={handleSelectCaixa}
                    value={selectedCaixaId}
                >
                    {caixas.map(caixa => (
                        <Option key={caixa.id} value={caixa.id}>
                            {caixa.nome} - {caixa.status_display}
                        </Option>
                    ))}
                </Select>

                {selectedCaixa ? (
                    <>
                        {/* Agora, passamos o objeto 'caixa' inteiro como prop */}
                        <CaixaResumo caixa={selectedCaixa} />
                        <Space style={{ marginTop: 20 }}>
                            {selectedCaixa.status === 'ABERTO' ? (
                                <>
                                    <Button danger onClick={fecharCaixa}>Fechar Caixa</Button>
                                    <Button onClick={registrarDesconto}>Registrar Desconto</Button>
                                </>
                            ) : (
                                <Button type="primary" onClick={abrirCaixa}>Abrir Caixa</Button>
                            )}
                        </Space>
                    </>
                ) : (
                    <Alert
                        message="Aguardando seleção"
                        description="Selecione um caixa para visualizar detalhes e realizar operações."
                        type="info"
                        showIcon
                    />
                )}
            </Modal>

            {/* Ícone flutuante */}
            {isMinimized && (
                <button
                    onClick={handleReopen}
                    className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50 transition"
                    title="Reabrir Caixa"
                >
                    <DollarSign className="w-5 h-5" />
                </button>
            )}
        </>
    );
};

export default React.memo(CaixaModal);