import React, { useCallback, useState } from 'react';
import { Flex, Layout } from 'antd';
import { cliente, loja, pedido } from '@/components/serverside';
import CarrinhoTotalVenda from './TotalSale';
import CarrinhoItens from './Itens';
import CarrinhoHeader from './header';
import { useBreakpoint } from '@/utils/useBreakpoint';

import './styles.css';
import { IPedido } from '@/interfaces/IPedido';

const CarrinhoPedido: React.FC = () => {
    const { Header, Footer, Sider, Content } = Layout;

    const pedidoCorrigido: IPedido = {
        ...pedido,
        itens: pedido.itens.map(item => ({
            ...item,
            adicionar: item.adicionar.map(ad =>
                typeof ad === 'string' ? { item: ad, valor: 0 } : ad
            )
        }))
    };


    return (
        <Sider width={useBreakpoint() === 'mobile' ? '100%' : '50%'} className='bg-d_am_acento slider-fixed'>
            <div className='d-layout-slider'>
                <CarrinhoHeader loja={loja} cliente={cliente} pedido={pedidoCorrigido} />
                <div className={`px-2 border-b border-gray-200 text-left ${useBreakpoint() === 'mobile' ? 'h-[39vh]' : 'h-[55vh]'}  overflow-y-scroll scroll-bar`}>

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