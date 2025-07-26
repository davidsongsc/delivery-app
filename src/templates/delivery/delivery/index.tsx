'use client';

import React from 'react';
import { listaProdutos } from '@/components/serverside';
import Cardapio from '@/components/Cardapio';
const Delivery: React.FC = () => {

    return (
        <div >


            <Cardapio produtos={listaProdutos} />

        </div>
    )
}

export default React.memo(Delivery);