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
  corsys?: string;
}

interface PromocionalSliderProps {
  Promocionals: Promocional[];
}

const PromocionalSlider: React.FC = () => {
  const Promocionals = [
    {
      id: '1',
      imageUrl: '/files/imagens/cardapio/3.png',
      title: 'Super Combo Gourmet',
      description: 'Hambúrguer + Batata + Açaí por R$39,90',
      corsys: 'd_am_acento',
    },
    {
      id: '4',
      imageUrl: '/files/imagens/cardapio/7.png',
      title: 'Novidade!',
      description: 'Esfirra de Frango com Cream Cheasse.',
      corsys: '',
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
    customPaging: () => (
      <div className="w-3 h-3 bg-gray-400 rounded-full" />
    ),
    dotsClass: 'slick-dots flex justify-center gap-3 mt-4',
  };

  const createMarkup = (description?: string) => {
    if (!description) return { __html: '' };

    let html = description
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br />');

    html = `<p>${html}</p>`;

    if (typeof window !== 'undefined') {
      return { __html: DOMPurify.sanitize(html) };
    }
    return { __html: '' };
  };


  return (
    <div className=" mt-4 mx-auto px-2 overflow-hidden w-[90%]">

      <Slider {...settings}>
        {Promocionals.map((Promocional) => (
          <div
            key={Promocional.id}
            className="relative h-[250px] md:h-[400px] rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src={`/files/imagens/cardapio/${Promocional.id}.png`}
              alt={Promocional.title || 'Promocional'}
              fill
              className="object-cover  "
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
            {(Promocional.title || Promocional.description) && (
              <div
                className={`absolute inset-0 bg-${Promocional.corsys} flex flex-col justify-center p-6 text-white`}
              >
                {Promocional.title && (
                  <h2 className="text-2xl md:text-4xl font-bold">
                    {Promocional.title}
                  </h2>
                )}
                {Promocional.description && (
                  <p
                    className="text-sm md:text-lg mt-2"
                    dangerouslySetInnerHTML={createMarkup(Promocional.description)}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PromocionalSlider;
