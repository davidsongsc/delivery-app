'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

interface LogoIconProps {
  texto?: string;
  tamanho?: number;
  animacao?: boolean;
  tcor?: string;
}

const LogoIcon: React.FC<LogoIconProps> = ({
  texto = 'Lojavel',
  tamanho = 40,
  animacao = false,
  tcor = 'text-d_primary',
}) => {
  const { user, isAuthenticated } = useAuth();

  const fallbackLogo = '/files/imagens/logo/lojavel_logo2.png';

  const [logoSrc, setLogoSrc] = useState(fallbackLogo);

  useEffect(() => {
    if (isAuthenticated && user?.corporation?.logo) {
      setLogoSrc(process.env.NEXT_PUBLIC_API_URL + user.corporation.logo);
    }
  }, [isAuthenticated, user]);

  return (
    <div className="flex items-center gap-2 shrink-0">
      <Image
        src={logoSrc}
        width={tamanho}
        height={tamanho}
        alt="Logo"
        className={animacao ? 'animate-pulse' : ''}
      />
      <span className={`text-xl font-bold ${tcor} ${animacao ? 'animate-pulse' : ''}`}>{texto}</span>
    </div>
  );
};

export default React.memo(LogoIcon);
