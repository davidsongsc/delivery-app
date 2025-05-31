'use client';

import React from 'react';
import { useAuthStore } from '@/store/authStore';
import PainelPedido from '@/components/painel';
import PromocionalSlider from '@/components/Promocional';
import { listaProdutos } from '@/components/serverside';
import Cardapio from '@/components/Cardapio';
const Delivery: React.FC = () => {

    return (
        <div className='grid grid-cols-1 gap-4'>
 

            <Cardapio produtos={listaProdutos} />

        </div>
    )
}

export default React.memo(Delivery);