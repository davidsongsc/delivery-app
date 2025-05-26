import React, { useState } from 'react';
import { Flex, Layout, Button, Drawer } from 'antd';
import './styles.css';
import { useAuthStore } from '@/store/authStore';
import CarrinhoPedido from '@/components/SalesCart/Cart';
import { FaShoppingCart } from "react-icons/fa";
import Cardapio from '../Cardapio';
import { useDeliveryStore } from '@/store/deliveryStore';

import { listaProdutos } from '@/components/serverside';
const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
};

const PainelPedido: React.FC = () => {
    const user = useAuthStore((state) => state.user);
    const [open, setOpen] = useState(false);
    const itensPedido = useDeliveryStore((state) => state.itensPedido);
    const totalItens = itensPedido.reduce((acc, item) => acc + item.quantidade, 0);

    const showDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    return (
        <>

            <Button
                type="primary"
                onClick={showDrawer}
                icon={<FaShoppingCart size={20} />}
                className='bg-d_am_acento relative'
                style={{
                    position: 'fixed',
                    right: 20,
                    bottom: 20,
                    zIndex: 1000,
                    borderRadius: '50%',
                    height: 50,
                    width: 50,
                }}
            >
                {totalItens > 0 && (
                    <span
                        className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    >
                        {totalItens}
                    </span>
                )}
            </Button>


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

            <Layout className='d-layout'>
                <Header style={headerStyle}>Header</Header>
                <Cardapio produtos={listaProdutos} onAdicionar={() => { }} />
                <Footer style={footerStyle}>Footer</Footer>
            </Layout>
        </>
    );
};

export default React.memo(PainelPedido);
