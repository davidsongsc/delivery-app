'use client';

import { useEffect, useState } from 'react';
import { Frown, Smile } from 'lucide-react';
import RouterButtonRouter from '@/components/MiniComponents/RouterButton';
import { useRouter } from 'next/navigation';
import { App } from 'antd';
export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(15);
  const { notification } = App.useApp();
  useEffect(() => {
    if (countdown === 4) {
      notification.error({
        message: 'Página nao encontrada',
        description: 'A pagina que voce esta tentando acessar nao existe, foi removida ou esta temporariamente indisponivel.',
      })
    }
    if (countdown === 0) {
      notification.open({
        message: 'Redirecionando...',
        description: 'Você foi direcionado para a página inicial',
        duration: 3,
      });
      router.push('/');
      return;
    }

    const timerId = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [countdown, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-4">
      {countdown < 1 ? <Smile className="w-16 h-16 text-green-500 mb-4 animate-pulse-frown" /> : <Frown className="w-16 h-16 text-red-500 mb-4 animate-pulse-frown" />}

      <h1 className="text-4xl font-bold mb-2">Página não encontrada</h1>
      <p className="text-lg text-center mb-2 max-w-md">
        A página que você está tentando acessar não existe, foi removida ou está temporariamente indisponível.
      </p>

      <p className="text-md text-center mb-6 max-w-md text-gray-600">
        Redirecionando em <strong>{countdown}</strong> segundo{countdown !== 1 ? 's' : ''}
        ...
      </p>

      <RouterButtonRouter
        href="/"
        className="bg-blue-600 h-12 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition text-xl"
      >
        Voltar agora
      </RouterButtonRouter>
    </div>
  );
}
