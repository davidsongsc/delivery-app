'use client';
import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

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
    const { user, isAuthenticated } = useAuth();

    const logoCorporation = user?.corporation?.logo;
    const fallbackLogo = '/files/imagens/logo/lojavel_logo2.png';

    // Monta a URL final com verificação
    const logoSrc =
        isAuthenticated && logoCorporation
            ? process.env.NEXT_PUBLIC_API_URL + logoCorporation
            : fallbackLogo;


    return (
        <div className="flex items-center gap-2 shrink-0">
            <Image
                src={logoSrc}
                width={tamanho}
                height={tamanho}
                alt="Logo"
                className={animacao ? 'animate-pulse' : ''} />
            <span className={`text-xl font-bold ${tcor} ${animacao ? 'animate-pulse' : ''}`}>{texto}</span>
        </div>
    );
};

export default React.memo(LogoIcon);
