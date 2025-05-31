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

const Header = () => {
    const router = useRouter();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [open, setOpen] = useState(false);
    const categorias = useCategoriasStore((state) => state.categorias);

    const user = useAuthStore((state) => state.user);
    const itensPedido = useDeliveryStore((state) => state.itensPedido);
    const totalItens = itensPedido.reduce((acc, item) => acc + item.quantidade, 0);

    const cardapioChildren = categorias
        .filter((cat) => cat !== 'Todos')
        .map((cat) => ({
            key: `/cardapio/${cat.toLowerCase()}`,
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
            setOpenDrawer(false); // Fecha o drawer do menu no mobile ao navegar
        }
    };

    const menuItemsDesktop = [
        { key: '/', label: 'Início' },
        {
            key: '/cardapio',
            label: 'Cardápio',
            children: cardapioChildren,

        },
        { key: '/promocoes', label: 'Promoções' },
        { key: '/sobre', label: 'Sobre Nós' },
        { key: 'carrinho', label: 'Carrinho' }, // abre drawer
    ];

    const menuItemsMobile = [
        { key: '/', label: 'Início' },
        {
            key: '/cardapio',
            label: 'Cardápio',
            children: [
                { key: '/cardapio/hamburgueres', label: 'Hambúrgueres' },
                { key: '/cardapio/combos', label: 'Combos' },
                { key: '/cardapio/bebidas', label: 'Bebidas' },
                { key: '/cardapio/sobremesas', label: 'Sobremesas' },
            ],
        },
        { key: '/promocoes', label: 'Promoções' },
        { key: 'carrinho', label: 'Carrinho' }, // abre drawer
    ];

    return (
        <header className="bg-d_am_fundo_c text-d_primary shadow-md px-4 lg:px-12 py-3 flex items-center justify-between">
            <div className='absolute right-[250px] top-[15px] flex flex-row items-center'>
                <span className="flex items-start gap-2 cursor-pointer">
                    {totalItens > 0 && (
                        <span
                            onClick={showDrawer}
                            className="absolute -top-[-10px] -right-20 bg-red-600 text-white text-[26px] font-bold rounded-md h-12 w-[100px] p-3 flex items-center justify-between"
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
                <span className="text-lg font-bold text-black">Gourmet CPX</span>
            </div>

            <nav className="flex-1 justify-center hidden lg:flex ">
                <Menu
                    mode="horizontal"
                    items={menuItemsDesktop}
                    onClick={onMenuClick}
                    className="border-none bg-transparent text-white w-1/3"
                />
            </nav>

            <div className="lg:hidden">
                <Button
                    type="text"
                    icon={<MenuOutlined style={{ color: 'white', fontSize: 24 }} />}
                    onClick={handleDrawerToggle}
                />
            </div>

            <Drawer
                title="Menu"
                placement="right"
                closable
                onClose={handleDrawerToggle}
                open={openDrawer}
                bodyStyle={{ padding: 0, backgroundColor: '#1C1C1E' }}
            >
                <Menu
                    mode="vertical"
                    items={menuItemsMobile}
                    onClick={onMenuClick}
                    className="text-white bg-[#1C1C1E]"
                />
            </Drawer>

            <Drawer
                title="Seu Pedido"
                placement="right"
                onClose={closeDrawer}
                open={open}
                width="40%"
                bodyStyle={{ padding: 0 }}
            >
                <CarrinhoPedido />
            </Drawer>
        </header>
    );
};

export default React.memo(Header);
