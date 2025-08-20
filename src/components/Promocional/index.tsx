'use client';

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import 'slick-carousel/slick/slick.css'; // Mantém só o css básico do slick


interface Promocional {
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
  bgColor?: string; // Cor de fundo do overlay (hex ou rgb)
}

interface PromocionalSliderProps {
  promocionals?: Promocional[];
  className?: string;
}

const PromocionalSlider: React.FC<PromocionalSliderProps> = ({ className }) => {
  const promocionals: Promocional[] = [
    {
      id: '3',
      imageUrl: '/files/imagens/cardapio/3.png',
      title: 'Super Combo Gourmet',
      description: 'Hambúrguer + Batata + Açaí por R$39,90',
      bgColor: 'rgba(0,0,0,0.5)',
    },
    {
      id: '7',
      imageUrl: '/files/imagens/cardapio/7.png',
      title: 'Novidade!',
      description: 'Esfirra de Frango com Cream Cheese',
      bgColor: 'rgba(0,0,0,0.4)',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    customPaging: (i: number) => (
      <div className="hidden"></div>
    ),
    dotsClass: 'slick-dots flex justify-center gap-3 mt-1',
  };

  const createMarkup = (description?: string) => {
    if (!description) return { __html: '' };
    let html = description.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br />');
    html = `<p>${html}</p>`;
    if (typeof window !== 'undefined') {
      return { __html: DOMPurify.sanitize(html) };
    }
    return { __html: '' };
  };

  return (
    <div className={`mt-6 mx-auto px-2 overflow-hidden w-screen xl:w-full ${className}`}>
      <Slider {...settings}>
        {promocionals.map((promo) => (
          <div
            key={promo.id}
            className="relative aspect-[16/9] xl:aspect-[7/7] rounded-xl overflow-hidden shadow-lg mx-auto"
          >
            <Image
              src={promo.imageUrl}
              alt={promo.title || 'Promocional'}
              fill
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
            {(promo.title || promo.description) && (
              <div
                className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center text-white"
                style={{ backgroundColor: promo.bgColor }}
              >
                {promo.title && (
                  <h2 className="text-2xl md:text-4xl font-extrabold uppercase drop-shadow-lg">
                    {promo.title}
                  </h2>
                )}
                {promo.description && (
                  <p
                    className="text-sm md:text-lg mt-2 drop-shadow-sm"
                    dangerouslySetInnerHTML={createMarkup(promo.description)}
                  />
                )}
                <button
                  className="mt-4 px-6 py-3 bg-d_primary text-white font-bold rounded-full shadow-md hover:bg-d_primary/90 transition"
                >
                  Peça Agora
                </button>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default React.memo(PromocionalSlider);
