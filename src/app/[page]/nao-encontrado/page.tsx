// app/nao-encontrado/page.tsx
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Frown } from 'lucide-react';

export default function NotFoundPersonalizada() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-4">
      <Frown className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">Página não encontrada</h1>
      {slug && (
        <p className="text-lg mb-6">
          A loja <span className="font-bold">{slug}</span> não foi encontrada.
        </p>
      )}
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
