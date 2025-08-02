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
    
    // Se o usuário não tiver permissão, não exibe nada ou uma mensagem de acesso negado
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
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <Title level={2}>Nenhuma mesa encontrada</Title>
            </div>
        );
    }
    
    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <Title level={2} style={{ margin: 0 }}>
                    Comandas
                </Title>
                <Space>
                    {canVisualizeMesas && (
                        <Button onClick={mesasRefresh} icon={<ReloadOutlined />}>
                            Atualizar Mesas
                        </Button>
                    )}
                    {canCreateMesas && (
                        <Button type="primary" onClick={handleCreateMesa} icon={<PlusCircleOutlined />}>
                            Criar Nova Mesa
                        </Button>
                    )}
                </Space>
            </div>
            <Row gutter={[16, 16]}>
                {mesas.map((mesa) => (
                    <Col key={mesa.id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            style={{
                                borderRadius: '8px',
                                border: `1px solid ${getStatusColor(mesa)}`,
                                cursor: 'pointer',
                            }}
                            onClick={() => handleMesaClick(mesa)}
                        >
                            <div style={{ textAlign: 'center' }}>
                                <Title level={5} style={{ marginBottom: '8px' }}>
                                    {mesa.numero}
                                </Title>
                                <Tag color={getStatusColor(mesa)} style={{ marginBottom: '8px' }}>
                                    {mesa.pedidos.length > 0 ? 'OCUPADA' : 'LIVRE'}
                                </Tag>
                                
                                <Space size={4} style={{ marginTop: '8px' }}>
                                    <EnvironmentOutlined style={{ color: '#aaa' }} />
                                    <Text type="secondary">{mesa.tipo}</Text>
                                    <Divider type="vertical" />
                                    {mesa.pedidos.length > 0 && mesa.pedidos[0].itens.length > 0 && (
                                        <>
                                            {Array(Math.min(mesa.pedidos[0].itens.reduce((acc, item) => acc + item.quantidade, 0), 3)).fill(null).map((_, i) => (
                                                <UserOutlined key={i} />
                                            ))}
                                            {mesa.pedidos[0].itens.reduce((acc, item) => acc + item.quantidade, 0) > 3 && (
                                                <Text>...</Text>
                                            )}
                                        </>
                                    )}
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
    );
};

export default React.memo(MesasComponent);