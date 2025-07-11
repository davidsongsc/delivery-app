'use client';
import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';

interface LogoIconProps {
    texto?: string;
    tamanho?: number;
    animacao?: boolean;
    tcor?: string;
}

const LogoIcon: NextPage<LogoIconProps> = ({
    texto = 'Lojavel',
    tamanho = 40,
    animacao = false,
    tcor = 'text-d_primary',
}) => {
    return (
        <div className="flex items-center gap-2 shrink-0">
            <Image
                src="/files/imagens/logo/lojavel_logo2.png"
                width={tamanho}
                height={tamanho}
                alt="Logo"
                className={animacao ? 'animate-pulse' : ''} />
            <span className={`text-xl font-bold ${tcor} ${animacao ? 'animate-pulse' : ''}`}>{texto}</span>
        </div>
    );
};

export default React.memo(LogoIcon);
