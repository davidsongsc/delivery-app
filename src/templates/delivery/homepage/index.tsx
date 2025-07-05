'use client';

import React from 'react';
import Delivery from '../delivery';
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