'use client';

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';

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

const PromocionalSlider: React.FC<PromocionalSliderProps> = ({ Promocionals }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto mt-4 px-2">
      <Slider {...settings}>
        {Promocionals.map((Promocional) => (
          <div key={Promocional.id} className="relative h-[250px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={Promocional.imageUrl}
              alt={Promocional.title || 'Promocional'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
            {(Promocional.title || Promocional.description) && (
              <div className={`absolute inset-0 bg-${Promocional.corsys} flex flex-col justify-center p-6 text-white`}>
                {Promocional.title && <h2 className="text-2xl md:text-4xl font-bold">{Promocional.title}</h2>}
                {Promocional.description && <p className="text-sm md:text-lg mt-2">{Promocional.description}</p>}
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PromocionalSlider;
