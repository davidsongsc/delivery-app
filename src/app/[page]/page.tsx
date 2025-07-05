import { notFound } from 'next/navigation';
import { getLojaByPage } from '@/services/lojas.service';
import LojaClient from '@/components/loja';

export const revalidate = 0; 

interface LojaPageProps {
  params: {
    page: string;
  };
}

export default async function LojaPage({ params }: LojaPageProps) {
  const loja = await getLojaByPage(params.page);

  if (!loja) return notFound();

  return <LojaClient loja={loja} />;
}
