'use client';

import React, { useState } from 'react';
import SimuladorFinanceira from '@/templates/financeira';
import HeaderFinanceira from '@/components/header/financeira';

export default function WalletPage() {
    const [etapaAtual, setEtapaAtual] = useState(0);

    return (
        <>
            <HeaderFinanceira etapaAtual={etapaAtual} />
            <SimuladorFinanceira setEtapaAtual={setEtapaAtual} />
        </>
    );
}