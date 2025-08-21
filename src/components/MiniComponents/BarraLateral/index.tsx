'use client';

import React, { useEffect, useState } from 'react';
import BannerSlider from '@/components/Banner';
import { banners } from '@/enum/banners.enum';

const BannerLateral: React.FC = () => {
  const [topOffset, setTopOffset] = useState(470); // posição inicial do banner

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY < 300) {
        // Se estiver perto do topo, banner desce um pouco
        setTopOffset(470);
      } else {
        // Quando rolar, banner fica "grudado"
        setTopOffset(65);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="hidden xl:block">
      <div
        className="fixed left-0 w-2/12 z-50"
        style={{ top: `${topOffset}px`, transition: 'top 0.3s ease' }}
      >
        <BannerSlider banners={banners} />
      </div>
    </div>
  );
};

export default BannerLateral;
