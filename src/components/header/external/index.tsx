'use client'
import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Drawer } from 'antd';
import type { MenuProps } from "antd";

import { MenuOutlined } from '@ant-design/icons';
import { FaShoppingCart } from "react-icons/fa";
import CarrinhoPedido from '@/components/SalesCart/Cart';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
import { useDeliveryStore } from '@/store/deliveryStore';
import { useRouter } from 'next/navigation';
import { useCategoriasStore } from '@/store/categoriasStore';
import { useBreakpoint } from '@/utils/useBreakpoint';
import { ICorporation } from '@/interfaces/ICorporation';
import { useLoja } from '@/contexts/LojaContext';
import Head from 'next/head';



const Header = () => {
    const { corporation } = useLoja();
    const lojaObj = corporation.result[0];
    const router = useRouter();
    const [imageSrc, setImageSrc] = useState(lojaObj.logo_url);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    console.log('Corporation:', lojaObj);
    const categorias = useCategoriasStore((state) => state.categorias);
    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === 'mobile' || breakpoint === 'tablet';

    const user = useAuthStore((state) => state.user);
    const itensPedido = useDeliveryStore((state) => state.itensPedido);
    const totalItens = itensPedido.reduce((acc, item) => acc + item.quantidade, 0);

    const cardapioChildren = categorias
        .filter((cat) => cat !== 'Todos')
        .map((cat) => ({
            key: `#${cat.toLowerCase()}`,
            label: cat.charAt(0).toUpperCase() + cat.slice(1),
        }));


    const menuItemsDesktop = [
        { key: `/${lojaObj.page}`, label: 'Início' },
        { key: `/${lojaObj.page}/cardapio`, label: 'Cardápio', children: cardapioChildren },
        { key: `/${lojaObj.page}/promocoes`, label: 'Promoções' },
        { key: `/${lojaObj.page}/sobre`, label: 'Sobre Nós' },
        { key: 'carrinho', label: 'Carrinho' },
    ];

    const menuItemsMobile = [
        { key: `/${lojaObj.page}`, label: 'Início' },

        { key: `/${lojaObj.page}/promocoes`, label: 'Promoções' },
        { key: 'carrinho', label: 'Carrinho' },
    ];

    const handleMenuClick = (e: any) => {
        if (e.key === 'carrinho') setOpenCart(true);
        else {
            router.push(e.key);
            setOpenDrawer(false);
        }
    };
    useEffect(() => {
        document.title = `${lojaObj.nome}`;
    }, [lojaObj.nome]);

    return (
        <>

            <header className="bg-primary text-white shadow-lg fixed w-full z-50 px-4 md:px-10 py-3 flex items-center justify-between">

                <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/loja')}>
                    <Image
                        src={imageSrc}
                        alt="Logo"
                        width={60}
                        height={60}
                        className="rounded-full"
                        onError={() => setImageSrc("/files/imagens/logo/lojavel_logo2.png")}
                    />
                    <span className="text-xl font-bold drop-shadow-lg">{corporation.result[0].nome}</span>
                </div>


                {/* Menu Desktop */}
                {!isMobile && (
                    <Menu
                        mode="horizontal"
                        items={menuItemsDesktop}
                        onClick={handleMenuClick}
                        className="bg-primary border-none flex-1 justify-center text-white font-semibold"
                    />
                )}

                {/* Carrinho Desktop */}
                {!isMobile && (
                    <button
                        onClick={() => { if (totalItens > 0) setOpenCart(true) }}
                        className="relative bg-yellow-400 text-black p-3 rounded-full shadow-xl hover:bg-yellow-500 transition"
                    >
                        <FaShoppingCart size={24} />
                        {totalItens > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold rounded-full px-2">
                                {totalItens}
                            </span>
                        )}
                    </button>
                )}

                {/* Menu Mobile */}
                {isMobile && (
                    <button
                        onClick={() => setOpenDrawer(true)}
                        className="bg-yellow-400 text-black p-3 rounded-full shadow-lg hover:bg-yellow-500 transition"
                    >
                        <MenuOutlined style={{ fontSize: 24 }} />
                    </button>
                )}

                {/* Drawer Mobile */}
                <Drawer
                    title="Menu"
                    placement="right"
                    closable
                    onClose={() => setOpenDrawer(false)}
                    open={openDrawer}
                    bodyStyle={{ backgroundColor: '#1C1C1E', padding: 0 }}
                    width={isMobile ? '100%' : 300}
                >
                    <Menu
                        mode="vertical"
                        items={menuItemsMobile}
                        onClick={handleMenuClick}
                        className="bg-black text-white"
                    />
                </Drawer>

                {/* Drawer Carrinho */}
                <Drawer
                    title="Seu Pedido"
                    placement="right"
                    onClose={() => setOpenCart(false)}
                    open={openCart}
                    width={isMobile ? '100%' : 350}
                    bodyStyle={{ padding: 0, backgroundColor: '#fff' }}
                >
                    <CarrinhoPedido />
                </Drawer>

            </header>
        </>
    );
};

export default React.memo(Header);
