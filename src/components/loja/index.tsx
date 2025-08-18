'use client';

import { useEffect } from 'react';
import { useLojaStore } from '@/store/useLojaStore';
import PromocionalSlider from '@/components/Promocional';
import HomePageDelivery from '@/templates/delivery/homepage';
import { ICorporation } from '@/interfaces/ICorporation';
import dynamic from 'next/dynamic';
const AppHeader = dynamic(() => import('@/components/header/external'), { ssr: false });

type Props = {
  loja: ICorporation | null;
};

export default function LojaClient({ loja }: Props) {
  const setLoja = useLojaStore((state) => state.setLoja);

  useEffect(() => {
    setLoja(loja);
  }, [loja]);

  return (
    <>
      <AppHeader loja={loja!}/>
      <div className="grid grid-cols-1 xl:grid-cols-12  gap-4">
        <PromocionalSlider className='col-span-2' />
        <HomePageDelivery className='col-span-10' />
      </div>
    </>
  );
}
