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
} from 'antd';
import { IMesa } from '@/interfaces/IMesa';
import { useProdutos } from '@/hooks/useProducts';
import { IProduto } from '@/interfaces/IProduto';
import { useDebounce } from '@/hooks/useDebounce';
import { useAuth } from '@/contexts/AuthContext';

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

    const pageSize = 10;

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

    const total = useMemo(
        () =>
            itensSelecionados.reduce(
                (acc, item) => acc + Number(item.preco) * item.quantidade,
                0
            ),
        [itensSelecionados]
    );

    const categoriasUnicas = useMemo(() => {
        const lista = produtos
            .map((p) => p.categoria)
            .filter((c) => c?.id)
            .reduce((acc, cat) => {
                if (!acc.find((c) => c.id === cat.id)) acc.push(cat);
                return acc;
            }, [] as IProduto['categoria'][]);

        return lista;
    }, [produtos]);

    return (
        <Card
            title={`Comanda - Mesa ${mesa.numero}`}
            extra={<Button onClick={onClose}>Fechar</Button>}
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                <Title level={5}>Categorias</Title>

                <Space wrap>
                    {categoriasUnicas.map((cat) => (
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
                        options={categoriasUnicas.map((cat) => ({
                            value: cat.id,
                            label: cat.nome,
                        }))}
                        style={{ width: 250 }}
                    />
                </Space>

                <Title level={5}>Produtos</Title>

                {produtosLoading ? (
                    <Spin />
                ) : (
                    <Space wrap>
                        {produtos.map((item) => (
                            <Button
                                key={item.id}
                                className='h-32 w-32'
                                type="default"
                                disabled={!item.ativo}
                                onClick={() => adicionarItem(item)}
                            >
                                <span>
                                    {item.nome}
                                </span>
                            </Button>
                        ))}
                    </Space>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                    <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
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

                <Divider />

                <Title level={5}>Itens Selecionados</Title>
                <List
                    dataSource={itensSelecionados}
                    locale={{ emptyText: 'Nenhum item adicionado' }}
                    renderItem={(item) => (
                        <List.Item>
                            <Space>
                                <Text>{item.nome}</Text>
                                <InputNumber
                                    min={0}
                                    value={item.quantidade}
                                    onChange={(qtd) => alterarQuantidade(item.id, Number(qtd))}
                                />
                            </Space>
                        </List.Item>
                    )}
                />

                <Divider />
                <Title level={5}>Total: R$ {total.toFixed(2)}</Title>

                <Button type="primary" disabled={itensSelecionados.length === 0}>
                    Salvar Comanda
                </Button>
            </Space>
        </Card>
    );
};

export default ComandaMesa;
