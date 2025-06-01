'use client'
import React, { useState } from 'react';
import { Menu, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { FaShoppingCart } from "react-icons/fa";
import CarrinhoPedido from '@/components/SalesCart/Cart';
import Image from 'next/image';
import './styles.css';
import { useAuthStore } from '@/store/authStore';
import { useDeliveryStore } from '@/store/deliveryStore';
import { useRouter } from 'next/navigation';
import { useCategoriasStore } from '@/store/categoriasStore';
import { useBreakpoint } from '@/utils/useBreakpoint';

const Header = () => {
    const router = useRouter();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [open, setOpen] = useState(false);
    const categorias = useCategoriasStore((state) => state.categorias);
    const breakpoint = useBreakpoint();
    const isSmallScreen = breakpoint === 'mobile' || breakpoint === 'tablet';

    const user = useAuthStore((state) => state.user);
    const itensPedido = useDeliveryStore((state) => state.itensPedido);
    const totalItens = itensPedido.reduce((acc, item) => acc + item.quantidade, 0);

    const cardapioChildren = categorias
        .filter((cat) => cat !== 'Todos')
        .map((cat) => ({
            key: `/loja/cardapio/${cat.toLowerCase()}`,
            label: cat,
        }));

    const showDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    const handleDrawerToggle = () => setOpenDrawer(!openDrawer);

    const onMenuClick = (e: any) => {
        if (e.key === 'carrinho') {
            showDrawer();
        } else {
            router.push(e.key);
            setOpenDrawer(false);
        }
    };

    const menuItemsDesktop = [
        { key: '/loja', label: 'Início' },
        {
            key: '/loja/cardapio',
            label: 'Cardápio',
            children: cardapioChildren,

        },
        { key: '/loja/promocoes', label: 'Promoções' },
        { key: '/loja/sobre', label: 'Sobre Nós' },
        { key: 'carrinho', label: 'Carrinho' },
    ];

    const menuItemsMobile = [
        { key: '/loja', label: 'Início' },
        { key: '/loja/cardapio', label: 'Cardápio' },
        ...categorias
            .filter((cat) => cat !== 'Todos')
            .map((cat) => ({
                key: `/loja/cardapio/${cat.toLowerCase()}`,
                label: `- ${cat}`,
            })),
        { key: '/loja/promocoes', label: 'Promoções' },
        { key: 'carrinho', label: 'Carrinho' },
    ];


    return (
        <header className="m_fundo_c text-d_primary shadow-md md:px-20 xl:px-40 2xl:px-60 py-3 flex items-center justify-between">
            <div className='absolute right-[250px] top-[15px] flex flex-row items-center justify-Start'>
                <span className="flex items-start gap-2 cursor-pointer">
                    {totalItens > 0 && (
                        <span
                            onClick={showDrawer}
                            className="absolute -top-[-27px] -right-20 bg-red-600 text-white text-[26px] font-bold rounded-md h-12 w-[100px] p-3 flex items-center justify-between"
                        >
                            {totalItens} <FaShoppingCart />
                        </span>
                    )}
                </span>
            </div>
            <div className="flex items-center gap-2 logo-empresa w-1/4">
                <Image
                    src="/files/logo/novocpx.png"
                    alt="Logo"
                    width={100}
                    height={100}
                />
                <span className="text-lg' font-bold text-black">Gourmet CPX</span>
            </div>

            <nav className="flex-1 justify-center hidden lg:flex ">
                <Menu
                    mode="horizontal"
                    items={menuItemsDesktop}
                    onClick={onMenuClick}
                    className="border-none bg-transparent text-white w-1/2"
                />
            </nav>

            {isSmallScreen && (
                <button
                    onClick={handleDrawerToggle}
                    className="fixed bottom-4 right-4 z-50 bg-d_am_acento text-white p-4 rounded-full shadow-lg hover:bg-d_am_acento/90 transition"
                >
                    <MenuOutlined style={{ fontSize: 24 }} />
                </button>
            )}

            <Drawer
                title="Menu"
                placement="right"
                closable
                onClose={handleDrawerToggle}
                open={openDrawer}
                bodyStyle={{ padding: 0, backgroundColor: '#1C1C1E' }}
                width={useBreakpoint() === 'mobile' ? '100%' : '300px'}
            >
                <Menu
                    mode="vertical"
                    items={menuItemsMobile}
                    onClick={onMenuClick}
                    className="text-white"
                />
            </Drawer>


            <Drawer
                title="Seu Pedido"
                placement="right"
                onClose={closeDrawer}
                open={open}
                width={useBreakpoint() === 'mobile' ? '100%' : '50%'}
                bodyStyle={{ padding: 0 }}
            >
                <CarrinhoPedido />
            </Drawer>

        </header>
    );
};

export default React.memo(Header);
