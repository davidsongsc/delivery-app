'use client';

import React, { useEffect } from 'react';
import PromocionalSlider from '@/components/Promocional';
import dynamic from 'next/dynamic';
const AppHeader = dynamic(() => import('@/components/header/external'), { ssr: false });

import Cardapio from '@/components/Cardapio';
import BannerLateral from '../MiniComponents/BarraLateral';
import FooterDelivery from '../MiniComponents/FooterDelivery';

const LojaClient: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />

      <main className="flex-1">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 mt-24">
          <div className="col-span-2 relative">
            <h1 className="text-2xl font-extrabold tracking-tight text-d_primary uppercase mx-4 my-4">
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
      </main>

      <FooterDelivery />
    </div>
  );
};

export default React.memo(LojaClient);
