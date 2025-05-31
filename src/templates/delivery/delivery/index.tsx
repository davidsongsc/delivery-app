'use client';

import React from 'react';
import { useAuthStore } from '@/store/authStore';
import PainelPedido from '@/components/painel';
import PromocionalSlider from '@/components/Promocional';

const Delivery: React.FC = () => {
    const Promocionals = [
        {
            id: '1',
            imageUrl: '/files/imagens/cardapio/3.png',
            title: 'Super Combo Gourmet',
            description: 'Hambúrguer + Batata + Açaí por R$39,90',
        },
        {
            id: '4',
            imageUrl: '/files/imagens/cardapio/7.png',
            title: 'Novidade!',
            description: 'Esfirra de Frango com Cream Cheasse.',
        },
    ];
    return (
        <>
            <PromocionalSlider Promocionals={Promocionals} />
            <PainelPedido />
        </>
    )
}

export default React.memo(Delivery);