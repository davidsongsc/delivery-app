// app/loja/[page]/error.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  error: Error;
  reset: () => void;
}

export default function LojaError({ error }: Props) {
  const router = useRouter();

  useEffect(() => {
    const [code, slug] = error.message.split('|');

    if (code === 'NOT_FOUND') {
      router.replace(`/nao-encontrado?slug=${slug}`);
    }
  }, [error, router]);

  return null; // enquanto redireciona
}
