'use client';

import React from 'react';
import SimuladorFinanceira from '@/templates/financeira';
import HeaderFinanceira from '@/components/header/financeira';

export default function WalletPage() {
    return (
        <>
            <HeaderFinanceira />
            <SimuladorFinanceira />
        </>
    );
}