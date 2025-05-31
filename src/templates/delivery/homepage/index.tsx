'use client';

import React from 'react';
import Delivery from '../delivery';

const HomePageDelivery: React.FC = () => {
    

    
    return (
        <div className='grid grid-cols-1 gap-4'>
            
       
            <Delivery />

        </div>
    )
}

export default React.memo(HomePageDelivery);