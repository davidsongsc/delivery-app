'use client';

import React from 'react';
import BannerSlider from '@/components/Banner';
import PromocionalSlider from '@/components/Promocional';

const HomePageDelivery: React.FC = () => {
    const banners = [
        {
            id: '1',
            imageUrl: '/files/banners/banner1.jpg',
            title: 'Super Combo Gourmet',
            description: 'Hambúrguer + Batata + Açaí por R$39,90',
            corsys: 'd_am_acento'
        },
        {
            id: '2',
            imageUrl: '/files/banners/banner2.jpg',
            title: 'Novidade!',
            description: 'Experimente o novo Burger CPX com pão de brioche.',
            corsys: 'd_am_acento'
        },
    ];

    const Promocionals = [
        {
            id: '1',
            imageUrl: '/files/banners/banner1.jpg',
            title: 'Super Combo Gourmet',
            description: 'Hambúrguer + Batata + Açaí por R$39,90',
        },
        {
            id: '2',
            imageUrl: '/files/imagens/cardapio/1.png',
            title: 'Novidade!',
            description: 'Experimente o novo Burger CPX com pão de brioche.',
            corsys: 'd_primary'
        },
    ];
    return (
        <>
            <BannerSlider banners={banners} />

            <PromocionalSlider Promocionals={Promocionals} />
        </>
    )
}

export default React.memo(HomePageDelivery);