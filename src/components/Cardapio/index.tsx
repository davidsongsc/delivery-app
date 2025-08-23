'use client';
import './styles.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card, Button, Divider, Select, Input } from 'antd'; // Removed Modal and Checkbox as they are now handled by ProductModal
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDeliveryStore } from '@/store/deliveryStore';
import { IItem } from '@/interfaces/IPedido';
import { useCategoriasStore } from '@/store/categoriasStore';
import { useProdutosStore } from '@/store/produtosStore';

import { IProduto } from '@/interfaces/IProduto'; // Assuming IProduto interface is defined
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Constants } from '../constants';
import { useDebounce } from '@/hooks/useDebounce';
import { useLoja } from '@/contexts/LojaContext';

import ProductModal from '@/components/Products/modal';
import { useProdutosPublicos } from '@/hooks/useProductsPublic';
import { useCategoriasPublicas } from '@/hooks/usePublicCategory';

const Cardapio: React.FC = () => {


    const { corporation, loading } = useLoja();
    if (!corporation) return null;
    const lojaId = corporation?.result?.[0]?.id;
    const { categorias, categoriasLoading } = useCategoriasPublicas(lojaId)
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(Constants.per_page);
    const [filters, setFilters] = useState<object>({});
    const [category, setCategory] = useState<string | undefined>(undefined);
    const [busca, setBusca] = useState<string>('');
    const debouncedBusca = useDebounce(busca, 700);
    const loaderRef = useRef<HTMLDivElement>(null);
    const debouncedCategory = useDebounce(category, 700);


    const [filtroCategoria, setFiltroCategoria] = useState<string>('Todos');
    const setProdutos = useProdutosStore(state => state.setProdutos);
    const [modalAberto, setModalAberto] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState<IProduto | null>(null);
    const [adicionarSelecionado, setAdicionarSelecionado] = useState<string[]>([]);
    const [removerSelecionado, setRemoverSelecionado] = useState<string[]>([]);
    console.log('id do tenant', lojaId, corporation);
    const { produtos, produtosLoading, hasMore, produtosRefresh } = useProdutosPublicos({
        tenantId: lojaId || "",
        page,          // passa a página atual
        limit: 100,      // quantidade por página
        categoryName: debouncedCategory,
        searchQuery: debouncedBusca,
    });

    const abrirModal = (produto: IProduto) => {
        setProdutoSelecionado(produto);
        setAdicionarSelecionado([]);
        setRemoverSelecionado([]);
        setModalAberto(true);
    };

    // Function to confirm addition to cart
    const confirmarAdicao = () => {
        if (!produtoSelecionado) return;

        // Ensure 'adicionar' items are in { item: string, valor: number } format
        const adicionaisFormatados = (produtoSelecionado.adicionar || []).map(a =>
            typeof a === 'string' ? { item: a, valor: 0 } : a
        );

        // Filter selected 'adicionar' items
        const adicionaisSelecionados = adicionaisFormatados.filter(a =>
            adicionarSelecionado.includes(a.item)
        );

        const item: IItem = {
            id: produtoSelecionado.id,
            nome: produtoSelecionado.nome,
            valor: parseFloat(produtoSelecionado.preco),
            desconto: produtoSelecionado.desconto || 0,
            quantidade: 1,
            adicionar: adicionarSelecionado,
            remover: removerSelecionado,
            categoria: produtoSelecionado.categoria.nome,
            descricao: produtoSelecionado.descricao,
            imagem: produtoSelecionado.imagens?.[0]?.imagem_url || 'https://placehold.co/800x600/CCCCCC/FFFFFF?text=No+Image',
        };
        console.log('Item adicionado ao carrinho:', item);
        // Add the item to the global delivery store
        useDeliveryStore.getState().adicionarItem(item);
        setModalAberto(false); // Close the modal
    };

    const categoriasNomes = useMemo(() => {
        const todas = categorias.flatMap(cat =>
            [cat.nome, ...cat.subcategorias.map(sub => sub.nome)]
        )
        const únicas = Array.from(new Set(todas))
        const resultado = ['Todos', ...únicas]
        useCategoriasStore.getState().setCategorias(resultado)
        return resultado
    }, [categorias])


    const produtosFiltrados = useMemo(() => {
        return produtos.filter(produto => {
            const correspondeCategoria = filtroCategoria === 'Todos' || (produto.categoria.nome || 'Outros') === filtroCategoria;
            const correspondeBusca = produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
                (produto.descricao && produto.descricao.toLowerCase().includes(busca.toLowerCase()));
            return correspondeCategoria && correspondeBusca;
        });
    }, [produtos, filtroCategoria, busca]);


    const categoriasFiltradas = [...new Set(produtosFiltrados.map(p => p.categoria.nome || 'Outros'))];

    useEffect(() => {
        setProdutos(produtos);
    }, [produtos]);

    const handleScroll = () => {
        if (!hasMore || produtosLoading) return;

        const scrollPosition = window.innerHeight + window.scrollY;
        const threshold = document.body.offsetHeight - 200; // 200px antes do final

        if (scrollPosition >= threshold) {
            setPage(prev => prev + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, produtosLoading]);

    return (
        <div className="p-4 mx-auto md:px-2 xl:px-4 2xl:px-6 space-y-8">

            <Input.Search
                placeholder="🍔 Buscar no cardápio..."
                allowClear
                onChange={(e) => setBusca(e.target.value)}
                className="w-full rounded-full shadow-sm border-2 border-gray-200"
                size="large"
            />
            <div className="flex overflow-x-auto gap-3 pb-3 scrollbar-hide">
                {categoriasNomes.map((categoria) => (
                    <button
                        key={categoria}
                        onClick={() => setFiltroCategoria(categoria)}
                        className={`flex-shrink-0 px-6 py-2.5 rounded-full font-bold transition shadow-sm
          ${filtroCategoria === categoria
                                ? 'bg-d_primary text-white scale-105'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                    >
                        {categoria}
                    </button>
                ))}
            </div>




            {categoriasFiltradas.map(categoria => (
                <div id={categoria} key={categoria} className="pt-8 mt-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-extrabold tracking-tight text-d_primary uppercase">
                            {categoria}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {produtosFiltrados
                                .filter(p => (p.categoria.nome || 'Outros') === categoria)
                                .map(produto => (
                                    <div
                                        key={produto.id}
                                        className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition"
                                    >
                                        {/* Imagem grande */}
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <Image
                                                src={produto.imagens?.[0]?.imagem_url || 'https://placehold.co/600x400/CCCCCC/FFFFFF?text=No+Image'}
                                                alt={produto.nome}
                                                fill
                                                className="object-cover hover:scale-110 transition-transform"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 flex flex-col p-4">
                                            <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-1">
                                                {produto.nome}
                                            </h3>
                                            <p className="text-gray-600 text-sm flex-1 line-clamp-2">
                                                {produto.descricao || "Sem descrição."}
                                            </p>

                                            {/* Preço + botão */}
                                            <div className="flex items-center justify-between mt-4">
                                                <p className="text-2xl font-extrabold text-d_primary">
                                                    R$ {parseFloat(produto.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                </p>
                                                <button
                                                    onClick={() => abrirModal(produto)}
                                                    className="bg-d_primary text-white px-5 py-2 rounded-full font-bold shadow-md hover:bg-d_primary/90 active:scale-95 transition"
                                                >
                                                    Adicionar +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            ))}

            <ProductModal
                modalAberto={modalAberto}
                setModalAberto={setModalAberto}
                produtoSelecionado={produtoSelecionado}
                confirmarAdicao={confirmarAdicao}
                adicionarSelecionado={adicionarSelecionado}
                setAdicionarSelecionado={setAdicionarSelecionado}
                removerSelecionado={removerSelecionado}
                setRemoverSelecionado={setRemoverSelecionado}
            />
        </div >
    );
};

export default React.memo(Cardapio);
