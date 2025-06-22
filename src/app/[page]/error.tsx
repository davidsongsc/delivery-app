// app/loja/[page]/error.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseAppError } from '@/lib/errors';

interface Props {
  error: Error;
  reset: () => void;
}

export default function LojaError({ error, reset }: Props) {
  const router = useRouter();

 useEffect(() => {
  const parsed = parseAppError(error);

  if (parsed.code === 'VALIDATION_ERROR') {
    alert(parsed.message);
    reset();
  } else if (parsed.redirectTo) {
    setTimeout(() => {
      router.replace('/');
    }, 10); // pequeno delay para evitar erro do App Router
  }
}, [error, router, reset]);


  return null;
}
