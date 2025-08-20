'use client';

import { useEffect } from 'react';
import { useLojaStore } from '@/store/useLojaStore';
import PromocionalSlider from '@/components/Promocional';
import HomePageDelivery from '@/templates/delivery/homepage';
import { ICorporation } from '@/interfaces/ICorporation';
import dynamic from 'next/dynamic';
const AppHeader = dynamic(() => import('@/components/header/external'), { ssr: false });

import BannerSlider from '../Banner';
import { banners } from '@/enum/banners.enum';

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
      <AppHeader />
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 mt-24">
        <div className="col-span-2">
          <PromocionalSlider />

          {/* BannerSlider só aparece em telas XL ou maiores */}
          <div className="hidden xl:block">
            <BannerSlider banners={banners} />
          </div>
        </div>

        <HomePageDelivery className="col-span-10" />
      </div>
    </>

  );
}
