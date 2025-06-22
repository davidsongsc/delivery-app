// app/loja/[page]/not-found.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Frown } from 'lucide-react';
import { Button } from 'antd';

export default function LojaNotFound() {
    const router = useRouter();
    const { page } = useParams();
    const safeName = decodeURIComponent(String(page || '').replace(/[^a-zA-Z0-9-_. ]/g, ''));

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-4">
            <Frown className="w-16 h-16 text-red-500 mb-4" />
            <h1 className="text-3xl font-bold mb-2">Loja não encontrada</h1>

            <p className="text-lg text-center mb-2 max-w-md">
                A loja <strong className="text-blue-600 break-all">"{safeName}"</strong> não foi localizada.
            </p>

            <p className="text-md text-center mb-6 max-w-md">
                Verifique se o endereço está correto ou tente buscar novamente.
            </p>

            <Button  onClick={() => router.back()} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >Voltar</Button>
        </div>
    );
}
