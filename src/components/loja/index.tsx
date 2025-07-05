'use client';

import { Loja } from '@/services/lojas.service';
import { useEffect } from 'react';
import { useLojaStore } from '@/store/useLojaStore';
import PromocionalSlider from '@/components/Promocional';
import HomePageDelivery from '@/templates/delivery/homepage';

type Props = {
  loja: Loja;
};

export default function LojaClient({ loja }: Props) {
  const setLoja = useLojaStore((state) => state.setLoja);

  useEffect(() => {
    setLoja(loja);
  }, [loja]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12  gap-4">
      <PromocionalSlider className='col-span-2' />
      <HomePageDelivery className='col-span-10' />
    </div>
  );
}
