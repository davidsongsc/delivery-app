import React, { useMemo, useState } from 'react';
import { Card, Button, Divider, Select, Input, Modal, Checkbox } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDeliveryStore } from '@/store/deliveryStore';
import { IItem } from '@/interfaces/IPedido';
import { IProduto } from '@/interfaces/IProduto';
import Image from 'next/image';

interface CardapioProps {
    produtos: IProduto[];
}

const Cardapio: React.FC<CardapioProps> = ({ produtos }) => {
    const [filtroCategoria, setFiltroCategoria] = useState<string>('Todos');
    const [busca, setBusca] = useState<string>('');

    const [modalAberto, setModalAberto] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState<IProduto | null>(null);
    const [adicionarSelecionado, setAdicionarSelecionado] = useState<string[]>([]);
    const [removerSelecionado, setRemoverSelecionado] = useState<string[]>([]);

    const abrirModal = (produto: IProduto) => {
        setProdutoSelecionado(produto);
        setAdicionarSelecionado([]);
        setRemoverSelecionado([]);
        setModalAberto(true);
    };

    const confirmarAdicao = () => {
        if (!produtoSelecionado) return;

        const adicionaisFormatados = (produtoSelecionado.adicionar || []).map(a =>
            typeof a === 'string' ? { item: a, valor: 0 } : a
        );

        const adicionaisSelecionados = adicionaisFormatados.filter(a =>
            adicionarSelecionado.includes(a.item)
        );

        const item: IItem = {
            id: produtoSelecionado.id as number,
            nome: produtoSelecionado.nome,
            valor: produtoSelecionado.valor,
            desconto: produtoSelecionado.desconto || 0,
            quantidade: 1,
            adicionar: adicionaisSelecionados,
            remover: removerSelecionado,
            categoria: produtoSelecionado.categoria,
            descricao: produtoSelecionado.descricao,
        };

        useDeliveryStore.getState().adicionarItem(item);
        setModalAberto(false);
    };


    const categorias = useMemo(() => {
        const únicas = [...new Set(produtos.map(p => p.categoria || 'Outros'))];
        return ['Todos', ...únicas];
    }, [produtos]);

    const produtosFiltrados = useMemo(() => {
        return produtos.filter(produto => {
            const correspondeCategoria = filtroCategoria === 'Todos' || (produto.categoria || 'Outros') === filtroCategoria;
            const correspondeBusca = produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
                produto.descricao.toLowerCase().includes(busca.toLowerCase());
            return correspondeCategoria && correspondeBusca;
        });
    }, [produtos, filtroCategoria, busca]);

    const categoriasFiltradas = [...new Set(produtosFiltrados.map(p => p.categoria || 'Outros'))];

    return (
        <div className="p-4 sm:px-80 space-y-6">
            {/* Filtros */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <Select
                    value={filtroCategoria}
                    onChange={setFiltroCategoria}
                    options={categorias.map(c => ({ label: c, value: c }))}
                    className="w-full md:w-1/3"
                    placeholder="Filtrar por categoria"
                />
                <Input.Search
                    placeholder="Buscar por nome ou descrição"
                    allowClear
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full md:w-2/3"
                />
            </div>

            {/* Listagem por categoria */}
            {categoriasFiltradas.map(categoria => (
                <div key={categoria}>
                    <h2 className="text-2xl font-bold text-d_primary mb-4">{categoria}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {produtosFiltrados
                            .filter(p => (p.categoria || 'Outros') === categoria)
                            .map(produto => (
                                <Card
                                    key={produto.id}
                                    bordered={false}
                                    cover={
                                        <div className="overflow-hidden rounded-t-md">
                                            <Image
                                                alt={produto.nome}
                                                width={80} height={80}
                                                src={`/files/imagens/cardapio/${produto.id}.png`}
                                                className="h-60 object-cover transition-transform duration-300 ease-in-out hover:scale-125 w-full"
                                            />
                                        </div>
                                    }
                                    className="shadow rounded-md bg-d_secondary"
                                    actions={[
                                        <Button
                                            type="primary"
                                            icon={<ShoppingCartOutlined />}
                                            onClick={() => abrirModal(produto)}
                                            className="bg-d_secondary text-d_tx_primary"
                                        >
                                            Adicionar
                                        </Button>
                                    ]}
                                >
                                    {/* Título manualmente posicionado abaixo da imagem */}
                                    <h3 className="text-xl font-bold text-d_tx_primary mt-0">{produto.nome}</h3>

                                    <p className="text-primary px-2 h-[60px] overflow-hidden text-ellipsis line-clamp-3">
                                        {produto.descricao}
                                    </p>


                                    <Divider />

                                    <p className="text-d_tx_primary text-xl font-bold">
                                        R$ {produto.valor.toFixed(2)}
                                    </p>
                                </Card>

                            ))}
                    </div>
                </div>
            ))}

            {/* Modal de adicionais e composição (remoção) */}
            <Modal
                title={produtoSelecionado?.nome}
                open={modalAberto}
                onCancel={() => setModalAberto(false)}
                onOk={confirmarAdicao}
                okText="Adicionar ao Pedido"
                cancelText="Cancelar"
            >
                {/* Adicionais */}
                {Array.isArray(produtoSelecionado?.adicionar) && produtoSelecionado.adicionar.length > 0 && (
                    <>
                        <h3 className="text-lg font-semibold mb-2">Adicionais</h3>
                        <Checkbox.Group
                            className="grid grid-cols-1 gap-2 mb-4"
                            value={adicionarSelecionado}
                            onChange={(val) => setAdicionarSelecionado(val as string[])}
                        >
                            {produtoSelecionado.adicionar.map((a, i) => {
                                const label = typeof a === 'string'
                                    ? a
                                    : `${a.item} (+R$ ${a.valor.toFixed(2)})`;
                                const value = typeof a === 'string' ? a : a.item;
                                return <Checkbox key={i} value={value}>{label}</Checkbox>;
                            })}
                        </Checkbox.Group>
                    </>
                )}


                {/* Composição (remoção) */}
                {Array.isArray(produtoSelecionado?.composicao) && produtoSelecionado.composicao.length > 0 && (
                    <>
                        <h3 className="text-lg font-semibold mb-2">Remover da composição</h3>
                        <Checkbox.Group
                            className="grid grid-cols-1 gap-2"
                            value={removerSelecionado}
                            onChange={(val) => setRemoverSelecionado(val as string[])}
                        >
                            {produtoSelecionado.composicao.map((comp, i) => (
                                <Checkbox key={i} value={comp}>{comp}</Checkbox>
                            ))}
                        </Checkbox.Group>
                    </>
                )}

            </Modal>
        </div>
    );
};

export default React.memo(Cardapio);
