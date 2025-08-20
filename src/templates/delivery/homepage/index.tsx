'use client';

import React from 'react';
import Delivery from '@/templates/delivery/delivery';
import { ICorporation } from '@/interfaces/ICorporation';
interface HomePageDeliveryProps {
    className?: string
}

const HomePageDelivery: React.FC<HomePageDeliveryProps> = ({ className }) => {
    

    return (
        <div className={className}>
            <Delivery />
        </div>
    )
}

export default React.memo(HomePageDelivery);