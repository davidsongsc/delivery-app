import React, { useCallback, useState } from 'react';
import { Flex, Layout } from 'antd';
import { cliente, loja, pedido } from '@/components/serverside';
import CarrinhoTotalVenda from './TotalSale';
import CarrinhoItens from './Itens';
import CarrinhoHeader from './header';

import './styles.css';
import { IPedido } from '@/interfaces/IPedido';

const CarrinhoPedido: React.FC = () => {
    const { Header, Footer, Sider, Content } = Layout;
    const [taxaEntrega, setTaxaEntrega] = useState(6.5);
    const [itensPedido, setItensPedido] = useState(pedido.itens);
    const pedidoCorrigido: IPedido = {
        ...pedido,
        itens: pedido.itens.map(item => ({
            ...item,
            adicionar: item.adicionar.map(ad =>
                typeof ad === 'string' ? { item: ad, valor: 0 } : ad
            )
        }))
    };
    const alterarQuantidade = useCallback((index: number, operacao: 'incrementar' | 'decrementar') => {
        setItensPedido((prev) =>
            prev.map((item, i) => {
                if (i !== index) return item;
                const novaQuantidade =
                    operacao === 'incrementar'
                        ? item.quantidade + 1
                        : Math.max(1, item.quantidade - 1);
                return { ...item, quantidade: novaQuantidade };
            })
        );
    }, []);

    return (
        <Sider width="40%" className='bg-d_am_acento slider-fixed'>
            <div className='d-layout-slider'>
                <CarrinhoHeader loja={loja} cliente={cliente} pedido={pedidoCorrigido} />
                <div className='px-2 border-b border-gray-200 text-left h-[55vh] overflow-y-scroll scroll-bar'>

                    <CarrinhoItens />

                </div>
                <div className='px-2 py-4 border-t border-gray-300 text-right text-sm font-bold space-y-1'>
                    <CarrinhoTotalVenda />
                </div>
            </div>
        </Sider>
    );
}

export default React.memo(CarrinhoPedido);