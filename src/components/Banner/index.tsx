'use client';

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';

interface Banner {
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
  corsys?: string;
}

interface BannerSliderProps {
  banners: Banner[];
}

const BannerSlider: React.FC<BannerSliderProps> = ({ banners }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto mt-4 px-2">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className="relative h-[250px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={banner.imageUrl}
              alt={banner.title || 'Banner'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
            {(banner.title || banner.description) && (
              <div className={`absolute inset-0 bg-${banner.corsys} flex flex-col justify-center p-6 text-white`}>
                {banner.title && <h2 className="text-2xl md:text-4xl font-bold">{banner.title}</h2>}
                {banner.description && <p className="text-sm md:text-lg mt-2">{banner.description}</p>}
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
