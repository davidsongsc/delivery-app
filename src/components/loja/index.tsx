'use client';

import React, { useEffect } from 'react';
import { useLojaStore } from '@/store/useLojaStore';
import PromocionalSlider from '@/components/Promocional';
import { ICorporation } from '@/interfaces/ICorporation';
import dynamic from 'next/dynamic';
const AppHeader = dynamic(() => import('@/components/header/external'), { ssr: false });

import BannerSlider from '../Banner';
import { banners } from '@/enum/banners.enum';
import Cardapio from '@/components/Cardapio';
import BannerLateral from '../MiniComponents/BarraLateral';

const LojaClient: React.FC<{ loja: ICorporation }> = ({ loja }) => {
  const setLoja = useLojaStore((state) => state.setLoja);

  useEffect(() => {
    setLoja(loja);
  }, [loja]);

  return (
    <>
      <AppHeader />
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 mt-24">
        <div className="col-span-2 relative">
          <h1 className="text-3xl font-extrabold tracking-tight text-d_primary uppercase mx-4 my-4">
            Novidades
          </h1>
          <div className="mt-10">
            <PromocionalSlider />
          </div>
          <BannerLateral />
        </div>


        <div className="col-span-10">
          <Cardapio />
        </div>
      </div>
    </>
  );
};

export default React.memo(LojaClient);
