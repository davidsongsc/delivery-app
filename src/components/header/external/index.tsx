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

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [open, setOpen] = useState(false);

    const user = useAuthStore((state) => state.user);
    const itensPedido = useDeliveryStore((state) => state.itensPedido);
    const totalItens = itensPedido.reduce((acc, item) => acc + item.quantidade, 0);

    const showDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    const handleDrawerToggle = () => setOpenDrawer(!openDrawer);

    const menuItemsDesktop = [
        { key: 'home', label: 'Início' },
        {
            key: '/cardapio',
            href: '/cardapio',
            label: 'Cardápio',
            children: [
                { key: '/cardapio', hrfef: '/cardapio', label: 'Hambúrgueres' },
                { key: 'combos', label: 'Combos' },
                { key: 'bebidas', label: 'Bebidas' },
                { key: 'sobremesas', label: 'Sobremesas' },
            ],
        },
        { key: 'promo', label: 'Promoções' },
        { key: 'sobre', label: 'Sobre Nós' },
        {
            key: 'carrinho', label: 'Carrinho',
        },
    ];

    const menuItemsMobile = [
        { key: 'home', label: 'Início' },
        {
            key: 'menu',
            label: 'Cardápio',
            children: [
                { key: 'burgers', label: 'Hambúrgueres' },
                { key: 'combos', label: 'Combos' },
                { key: 'bebidas', label: 'Bebidas' },
                { key: 'sobremesas', label: 'Sobremesas' },
            ],
        },
        { key: 'promo', label: 'Promoções' },
        { key: 'carrinho', label: <span onClick={showDrawer}>Carrinho</span> },
    ];

    return (
        <header className="bg-d_am_fundo_c text-d_primary shadow-md px-4 lg:px-12 py-3 flex items-center justify-between">
            <div className='absolute right-[250px] top-[15px] flex flex-row items-center'>
                <span
                    className=" flex items-start gap-2 cursor-pointer"
                >
                    {totalItens > 0 && (
                        <span onClick={showDrawer} className="absolute -top-[-10px] -right-20 bg-red-600 text-white text-[26px] font-bold rounded-md h-12 w-[100px] p-3 flex items-center justify-between">
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
                    className="border-none bg-transparent text-white w-1/4"
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
                styles={{ body: { padding: 0, backgroundColor: '#1C1C1E' } }}
            >
                <Menu mode="vertical" items={menuItemsMobile} className="text-white bg-[#1C1C1E]" />
            </Drawer>

            <Drawer
                title="Seu Pedido"
                placement="right"
                onClose={closeDrawer}
                open={open}
                width="40%"
                styles={{ body: { padding: 0 } }}
            >
                <CarrinhoPedido />
            </Drawer>


        </header>
    );
};

export default React.memo(Header);
