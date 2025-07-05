'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Card, Button, Divider, Select, Input, Modal, Checkbox } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDeliveryStore } from '@/store/deliveryStore';
import { IItem } from '@/interfaces/IPedido';
import { useCategoriasStore } from '@/store/categoriasStore';
import { useProdutosStore } from '@/store/produtosStore';

import { IProduto } from '@/interfaces/IProduto';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CardapioProps {
    produtos: IProduto[];
}

const Cardapio: React.FC<CardapioProps> = ({ produtos }) => {
    const [filtroCategoria, setFiltroCategoria] = useState<string>('Todos');
    const [busca, setBusca] = useState<string>('');
    const setProdutos = useProdutosStore(state => state.setProdutos);
    const router = useRouter();

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
        const todasCategorias = ['Todos', ...únicas];
        useCategoriasStore.getState().setCategorias(todasCategorias); // Atualiza o Zustand
        return todasCategorias;
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
    useEffect(() => {
        setProdutos(produtos);
    }, [produtos, setProdutos]);
    return (
        <div className="p-4 mx-auto md:px-2 xl:px-4 2xl:px-6 space-y-6">
            <div className="flex flex-col gap-4">
                <div className="flex overflow-x-auto gap-2 pb-2">
                    {categorias.map((categoria) => (
                        <button
                            key={categoria}
                            onClick={() => {
                                if (categoria === 'Todos') {
                                    setFiltroCategoria('Todos');
                                    setBusca('');
                                    router.push('/loja/cardapio');

                                } else {
                                    setFiltroCategoria(categoria);
                                }
                            }}
                            className={`flex-shrink-0 px-4 py-2 rounded-full border whitespace-nowrap transition 
    ${filtroCategoria === categoria ? 'bg-d_primary text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                        >
                            {categoria}
                        </button>

                    ))}
                </div>

                <Input.Search
                    placeholder="Buscar por nome ou descrição"
                    allowClear
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full"
                />
            </div>

            {categoriasFiltradas.map(categoria => (
                <div key={categoria}>
                    <h2 className="text-2xl font-bold text-d_primary mb-4">{categoria}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
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
                                                width={800} height={600}
                                                src={`/files/imagens/cardapio/${produto.id}.png`}
                                                className="h-60 object-cover transition-transform duration-300 ease-in-out hover:scale-125 w-full"
                                            />
                                        </div>
                                    }
                                    className="shadow rounded-xl bg-d_am_fundo_c border border-d_am_fundo_e"
                                    actions={[
                                        <Button
                                            type="primary"
                                            icon={<ShoppingCartOutlined />}
                                            onClick={() => abrirModal(produto)}
                                            className="bg-d_am_fundo_c text-d_tx_primary"
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
                <Image
                    alt={produtoSelecionado?.nome!}
                    width={800} height={600}
                    src={`/files/imagens/cardapio/${produtoSelecionado?.id}.png`}
                    className="h-60 object-cover transition-transform duration-300 ease-in-out  w-full"
                />
                <p className="text-white bg-black p-2 h-[80px] overflow-hidden text-ellipsis line-clamp-3 mb-4">
                    {produtoSelecionado?.descricao}
                </p>
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
