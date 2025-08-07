'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useLoginModal } from '@/contexts/LoginModalContext';  // import do modal
import { useEffect, useState } from 'react';
import External from '@/components/header/external';
import AppLoading from '@/components/AppLoading';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, checkAuth } = useAuth();
  const { openModal } = useLoginModal();  // pega a função para abrir o modal
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      const verify = async () => {
        try {
          await checkAuth();
        } finally {
          setChecking(false);
        }
      };
      verify();
    } else {
      setChecking(false);
    }
  }, [checkAuth, isAuthenticated]);

  useEffect(() => {
    if (!checking && !isAuthenticated) {
      // Em vez de redirecionar, abre o modal de login
      openModal();
    }
  }, [checking, isAuthenticated, openModal]);

  if (checking) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <AppLoading />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // evita flicker, modal abrirá em paralelo
  }

  return (
    <>
      <External />
      {children}
    </>
  );
}
