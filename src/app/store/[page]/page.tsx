'use client';

import { useLoja } from '@/contexts/LojaContext';
import LojaClient from '@/components/loja';

export default function LojaPage() {
  const { corporation, loading } = useLoja();
  
  if (loading) return <p>Carregando...</p>;
  console.log(corporation);
  return null;
}
