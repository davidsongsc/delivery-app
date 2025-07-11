"use client";

import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import External from '@/components/header/external';
import { Spin } from 'antd'; // Importe um componente de loading do antd

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, hydrated, checkAuth, setHydrated } = useAuthStore();
  const router = useRouter();

  // useEffect para a lógica de autenticação
  useEffect(() => {
    // Se o estado ainda não foi hidratado, o que acontece apenas no primeiro render
    if (!hydrated) {
      // Chama a função de verificação
      checkAuth();
      // Define o estado como hidratado após a verificação
      setHydrated();
    }
  }, [hydrated, checkAuth, setHydrated]);

  // Se o estado não foi hidratado, mostre o loader
  if (!hydrated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Carregando..." />
      </div>
    );
  }

  // Se o usuário não está autenticado, redireciona
  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  // Se tudo estiver certo, renderiza o conteúdo
  return (
    <>
      <External />
      {children}
    </>
  );
}