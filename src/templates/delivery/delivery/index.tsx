'use client';

import React from 'react';
import { useAuthStore } from '@/store/authStore';
import PainelPedido from '@/components/painel';

const Delivery: React.FC = () => {

    return (

        <PainelPedido />
    )
}

export default React.memo(Delivery);