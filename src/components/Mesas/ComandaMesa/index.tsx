'use client';

import React, { useState, useMemo } from 'react';
import {
    Button,
    Card,
    Typography,
    Space,
    Divider,
    InputNumber,
    Spin,
    Select,
    List,
    Row,
    Col,
    Badge,
} from 'antd';
import { IMesa } from '@/interfaces/IMesa';
import { useProdutos } from '@/hooks/useProducts';
import { IProduto } from '@/interfaces/IProduto';
import { useDebounce } from '@/hooks/useDebounce';
import { useAuth } from '@/contexts/AuthContext';
import { useCategorias } from '@/hooks/useCategories';

const { Title, Text } = Typography;

interface Props {
    mesa: IMesa;
    onClose: () => void;
}

const ComandaMesa: React.FC<Props> = ({ mesa, onClose }) => {
    const { user } = useAuth();
    const [page, setPage] = useState(1);
    const [categoriaFiltro, setCategoriaFiltro] = useState<string | undefined>();
    const [itensSelecionados, setItensSelecionados] = useState<
        (IProduto & { quantidade: number })[]
    >([]);

    const pageSize = 12;

    const filters = useMemo(() => {
        const base = { tenant: user?.tenant };
        if (categoriaFiltro) base['categoria_id'] = categoriaFiltro;
        return base;
    }, [user, categoriaFiltro]);

    const debouncedFilters = useDebounce(filters, 300);

    const produtoParams = useMemo(
        () => ({
            page,
            limit: pageSize,
            filters: debouncedFilters,
            orderers: '&orderBy=nome&orderType=ASC',
        }),
        [page, pageSize, debouncedFilters]
    );

    const {
        produtos,
        produtosLoading,
        produtosTotal,
    } = useProdutos(produtoParams);


    const total = useMemo(
        () =>
            itensSelecionados.reduce(
                (acc, item) => acc + Number(item.preco) * item.quantidade,
                0
            ),
        [itensSelecionados]
    );

    const tenant = user?.tenant;

    const filtrosMemorizados = useMemo(() => {
        if (!tenant) return {};
        return { tenant };
    }, [tenant]);

    const { categorias, categoriasLoading, categoriasTotal } = useCategorias({
        page: 1,
        limit: 100,
        filters: filtrosMemorizados,
    });

    const adicionarItem = (produto: IProduto) => {
        const jaExiste = itensSelecionados.find((i) => i.id === produto.id);
        if (jaExiste) {
            setItensSelecionados((prev) =>
                prev.map((i) =>
                    i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
                )
            );
        } else {
            setItensSelecionados((prev) => [...prev, { ...produto, quantidade: 1 }]);
        }
    };

    const alterarQuantidade = (id: string, quantidade: number) => {
        if (quantidade <= 0) {
            setItensSelecionados((prev) => prev.filter((i) => i.id !== id));
        } else {
            setItensSelecionados((prev) =>
                prev.map((i) => (i.id === id ? { ...i, quantidade } : i))
            );
        }
    };


    return (
        <Card
            title={
                <Space>
                    <Badge status="processing" />
                    <Text strong>Comanda - Mesa {mesa.numero}</Text>
                </Space>
            }
            extra={<Button onClick={onClose}>Fechar</Button>}
        >
            <Row gutter={24}>
                {/* Coluna da Comanda (esquerda) */}
                <Col span={10}>
                    <Card title="Itens da Comanda" bordered={false}>
                        <List
                            dataSource={itensSelecionados}
                            locale={{ emptyText: 'Nenhum item adicionado' }}
                            renderItem={(item) => (
                                <List.Item
                                    actions={[
                                        <InputNumber
                                            min={1}
                                            max={99}
                                            value={item.quantidade}
                                            onChange={(qtd) => alterarQuantidade(item.id, Number(qtd))}
                                        />,
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={item.nome}
                                        description={`R$ ${Number(item.preco).toFixed(2)}`}
                                    />
                                    <Text strong>
                                        R$ {(Number(item.preco) * item.quantidade).toFixed(2)}
                                    </Text>
                                </List.Item>
                            )}
                            footer={
                                <div style={{ textAlign: 'right' }}>
                                    <Divider />
                                    <Text strong style={{ fontSize: '1.2em' }}>
                                        Total: R$ {total.toFixed(2)}
                                    </Text>
                                    <div style={{ marginTop: 16 }}>
                                        <Button
                                            type="primary"
                                            size="large"
                                            disabled={itensSelecionados.length === 0}
                                        >
                                            Confirmar Comanda
                                        </Button>
                                    </div>
                                </div>
                            }
                        />
                    </Card>
                </Col>

                {/* Coluna dos Produtos (direita) */}
                <Col span={14}>
                    <Card title="Cardápio" bordered={false}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Title level={5} style={{ marginTop: 0 }}>Categorias</Title>

                            <Space wrap>
                                {categorias
                                    .filter(cat => produtos.some(prod => prod.categoria.id === cat.id && prod.flags?.comanda)) // só categorias com produtos "comanda"
                                    .map((cat) => (
                                        <Button
                                            key={cat.id}
                                            type={categoriaFiltro === cat.id ? 'primary' : 'default'}
                                            onClick={() => {
                                                setCategoriaFiltro(cat.id);
                                                setPage(1);
                                            }}
                                        >
                                            {cat.nome}
                                        </Button>
                                    ))}

                                <Button
                                    danger
                                    onClick={() => {
                                        setCategoriaFiltro(undefined);
                                        setPage(1);
                                    }}
                                >
                                    Limpar Filtro
                                </Button>
                            </Space>

                            <Divider style={{ margin: '12px 0' }} />

                            <Space style={{ marginBottom: 12 }}>
                                <Select
                                    allowClear
                                    placeholder="Filtrar por categoria"
                                    value={categoriaFiltro}
                                    onChange={(value) => {
                                        setCategoriaFiltro(value);
                                        setPage(1);
                                    }}
                                    options={categorias.map((cat) => ({
                                        value: cat.id,
                                        label: cat.nome,
                                    }))}
                                    style={{ width: 250 }}
                                />
                            </Space>

                            {produtosLoading ? (
                                <Spin />
                            ) : (
                                <Row gutter={[16, 16]}>
                                    {produtos
                                        .filter(item => item.flags?.comanda)
                                        .map((item) => (
                                            <Col span={4} key={item.id} >
                                                <Card
                                                    hoverable

                                                    onClick={() => item.ativo && adicionarItem(item)}
                                                    style={{
                                                        cursor: item.ativo ? 'pointer' : 'not-allowed',
                                                        opacity: item.ativo ? 1 : 0.6,
                                                        transition: 'opacity 0.3s ease-in-out',
                                                        height: '150px',
                                                        width: '150px',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        backgroundColor: item.ativo ? '#f5f5f5' : '#ccc',
                                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                                    }}
                                                >
                                                    <Card.Meta
                                                        title={
                                                            <div className='flex flex-col items-center'>
                                                                <span className='font-bold uppercase'>{item.nome_interno}</span>
                                                                <span className='text-sm text-gray-500'> ({item.estoque})</span>
                                                            </div>}

                                                        description={
                                                            <>
                                                                {!item.ativo && (
                                                                    <Text type="danger" style={{ display: 'block' }}>
                                                                        Indisponível
                                                                    </Text>
                                                                )}
                                                            </>
                                                        }
                                                    />
                                                </Card>
                                            </Col>
                                        ))}
                                </Row>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                                <Button
                                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                    disabled={page === 1}
                                >
                                    Anterior
                                </Button>
                                <Text>
                                    Página {page} / {Math.ceil(produtosTotal / pageSize)}
                                </Text>
                                <Button
                                    onClick={() => setPage((p) => p + 1)}
                                    disabled={page * pageSize >= produtosTotal}
                                >
                                    Próxima
                                </Button>
                            </div>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </Card>
    );
};

export default ComandaMesa;