import React, { useState } from 'react';
import { Flex, Layout, Button, Drawer } from 'antd';
import './styles.css';
import { useAuthStore } from '@/store/authStore';
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

           


            <Layout className='d-layout'>
                
                <Cardapio produtos={listaProdutos} />
                
            </Layout>
        </>
    );
};

export default React.memo(PainelPedido);
