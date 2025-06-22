import { notFound } from 'next/navigation';
import { getLojaByPage } from '@/services/lojas.service';
import LojaClient from '@/components/loja';
export default async function LojaPage({ params }: { params: { page: string } }) {
  const loja = await getLojaByPage(params.page);

  if (!loja) return notFound();

  return <LojaClient loja={loja} />;
}
