'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Card, Col, Row, Spin, Tag, Typography, Button, Space, Modal, notification, Divider } from 'antd';
import { UserOutlined, PlusOutlined, EnvironmentOutlined, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import AppLoading from '@/components/AppLoading';
import { useMesas } from '@/hooks/useMesas';
import { mesasService } from '@/services/mesas.service';
import { IMesa } from '@/interfaces/IMesa';
import { useAuth } from '@/contexts/AuthContext';
import getUserPermissions from '@/utils/permissions';
import NotFound from '@/app/not-found';
import PageTitle from '@/components/MiniComponents/PageTitle';

const { Title, Text } = Typography;

// MOCK: Componente para fazer um pedido
const FazerPedido = ({ mesa, onClose }: { mesa: IMesa, onClose: () => void }) => (
    <Card title={`Pedido - Mesa ${mesa.numero}`} extra={<Button onClick={onClose}>Fechar</Button>}>
        <p>Ação: Abrir/Editar pedido</p>
        <p>Status da mesa: {mesa.status.toUpperCase()}</p>
        <Button type="primary" style={{ marginTop: 16 }}>Salvar Pedido</Button>
    </Card>
);

const MesasComponent: React.FC = () => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [selectedMesa, setSelectedMesa] = useState<IMesa | null>(null);
    const { user, isAuthenticated, isLoading } = useAuth(); // Assume que useAuth fornece o objeto de usuário

    // Lógica para verificar permissões
    const permissions = useMemo(() => user ? getUserPermissions(user) : [], [user]);

    const canCreateMesas = permissions.includes('permissoes_criar_mesa');
    const canVisualizeMesas = permissions.includes('permissoes_visualizar');
    const canComandas = permissions.includes('comandas_visualizar');
    if (!canComandas) return NotFound();
    // O hook agora suporta paginação   
    const tenantId = user?.tenant;
    const { mesas, mesasLoading, mesasRefresh } = useMesas(tenantId, page, 50);

    const getStatusColor = useCallback((mesa: IMesa) => {
        const isOcupada = mesa.pedidos && mesa.pedidos.length > 0;
        return isOcupada ? 'red' : 'green';
    }, []);

    const handleMesaClick = useCallback((mesa: IMesa) => {
        setSelectedMesa(mesa);
    }, []);

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleCreateMesa = async () => {
        if (!tenantId) {
            notification.error({
                message: 'Erro',
                description: 'Tenant ID não disponível. Não é possível criar a mesa.',
            });
            return;
        }

        const nextMesaNumber = mesas.length > 0 ? Math.max(...mesas.map(m => m.numero)) + 1 : 1;

        const newMesaData: Partial<IMesa> = {
            // Envia o tenantId na requisição POST
            tenant: tenantId,
            numero: nextMesaNumber,
            status: 'livre',
            tipo: 'MESA'
        };

        try {
            await mesasService.create(newMesaData);
            notification.success({
                message: 'Mesa criada',
                description: `Mesa ${nextMesaNumber} criada com sucesso!`,
            });
            mesasRefresh(); // Atualiza a lista de mesas
        } catch (error) {
            console.error('Erro ao criar mesa:', error);
            notification.error({
                message: 'Erro ao criar mesa',
                description: 'Ocorreu um erro ao tentar criar a nova mesa.',
            });
        }
    };

    if (mesasLoading || isLoading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <AppLoading />
            </div>
        );
    }

    if (selectedMesa) {
        return (
            <FazerPedido mesa={selectedMesa} onClose={() => setSelectedMesa(null)} />
        );
    }

    if (!canVisualizeMesas || !isAuthenticated) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <Title level={2}>Acesso negado</Title>
                <Text>Você não tem permissão para visualizar este conteúdo.</Text>
            </div>
        );
    }

    if (mesas.length === 0) {
        return (
            <div className='h-screen'>
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <Title level={2}>Nenhuma mesa encontrada</Title>
                    {canCreateMesas && (
                        <Button type="primary" onClick={handleCreateMesa} icon={<PlusCircleOutlined />}>
                            Criar Nova Mesa
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <>
            <PageTitle title="Mesas"
                subtitle="Gerenciamento de mesas"
                action={canCreateMesas && <Button type="primary" onClick={handleCreateMesa} icon={<PlusCircleOutlined />}>Criar Nova Mesa</Button>} />
            <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <Space>
                        {canVisualizeMesas && (
                            <Button onClick={mesasRefresh} icon={<ReloadOutlined />}>
                                Atualizar Mesas
                            </Button>
                        )}

                    </Space>
                </div>
                <Row gutter={[8, 8]}>
                    {mesas.map((mesa) => (
                        <Col key={mesa.id} xs={12} sm={8} lg={4} xl={3}>
                            <Card
                                hoverable
                                bodyStyle={{ padding: 12, position: 'relative', minHeight: 120 }}
                                style={{
                                    borderRadius: '8px',
                                    border: `1px solid ${getStatusColor(mesa)}`,
                                    cursor: 'pointer',
                                    position: 'relative',
                                }}
                                onClick={() => handleMesaClick(mesa)}
                            >
                                {/* Tag de status no canto superior esquerdo */}
                                <div style={{ position: 'absolute', top: 8, left: 8 }}>
                                    <Tag color={getStatusColor(mesa)}>{mesa.pedidos.length > 0 ? 'OCUPADA' : 'LIVRE'}</Tag>
                                </div>

                                {/* Ícones de pessoa no canto superior direito */}
                                <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 2 }}>
                                    {mesa.pedidos.length > 0 &&
                                        mesa.pedidos[0].itens.length > 0 && (
                                            <>
                                                {Array(
                                                    Math.min(
                                                        mesa.pedidos[0].itens.reduce((acc, item) => acc + item.quantidade, 0),
                                                        3
                                                    )
                                                )
                                                    .fill(null)
                                                    .map((_, i) => (
                                                        <UserOutlined key={i} style={{ fontSize: 14 }} />
                                                    ))}
                                                {mesa.pedidos[0].itens.reduce((acc, item) => acc + item.quantidade, 0) > 3 && (
                                                    <Text style={{ fontSize: 12 }}>...</Text>
                                                )}
                                            </>
                                        )}
                                </div>

                                {/* Número da mesa centralizado */}
                                <div style={{ textAlign: 'center', marginTop: 24 }}>
                                    <Title level={2} style={{ margin: 0 }}>
                                        {mesa.numero}
                                    </Title>
                                </div>

                                {/* Tipo da mesa no canto inferior esquerdo */}
                                <div style={{ position: 'absolute', bottom: 8, left: 12 }}>
                                    <Space size={4}>
                                        <EnvironmentOutlined style={{ color: '#aaa' }} />
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            {mesa.tipo}
                                        </Text>
                                    </Space>
                                </div>
                            </Card>
                        </Col>

                    ))}
                </Row>
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <Button onClick={handleLoadMore} disabled={mesasLoading}>
                        Exibir Mais Mesas
                    </Button>
                </div>
            </div>
        </>
    );
};

export default React.memo(MesasComponent);
