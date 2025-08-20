'use client';

import { useLoja } from '@/contexts/LojaContext';
import LojaClient from '@/components/loja';
import AppLoading from '@/components/AppLoading';

export default function LojaPage() {
  const { corporation, loading } = useLoja();

  if (loading) return <AppLoading />;

  return <>
  
    <LojaClient loja={corporation!} />
  </>;
}
