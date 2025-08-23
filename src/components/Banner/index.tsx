'use client';

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import DOMPurify from 'dompurify';
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
    speed: 2100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 12000,
    arrows: false,
    customPaging: () => (
      <div className="hidden"></div>
    ),
    dotsClass: 'slick-dots flex justify-center gap-3 mt-4',
  };

  const createMarkup = (description?: string) => {
    if (!description) return { __html: '' };
    let html = description.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br />');
    html = `<p>${html}</p>`;
    if (typeof window !== 'undefined') return { __html: DOMPurify.sanitize(html) };
    return { __html: '' };
  };

  return (
    <div className="w-full max-w-screen-2xl mx-2 mt-6 overflow-hidden bg-terciary">
      <Slider {...settings} className="w-full">
        {banners.map((banner) => (
          <div key={banner.id} className="flex flex-col md:flex-row gap-6 rounded-xl overflow-hidden w-full px-1 ">

            <div className={`flex-1 bg-${banner.corsys || 'red-600'} flex flex-col items-center justify-center  rounded-xl shadow-lg `}>
              {banner.title && (
                <h2 className={`text-center text-xl md:text-xl font-bold text-primary mb-2 `}>{banner.title}</h2>
              )}
              <Image
                src={banner.imageUrl}
                alt={banner.title || 'Banner'}
                height={400}
                width={400}
                className="rounded-lg object-contain"
                priority
              />
            </div>

            {(banner.description) && (
              <div className="flex-1 bg-white flex flex-col justify-center p-4 rounded-xl shadow-lg mt-2 max-h-[500px] overflow-y-auto">

                <p
                  className="text-sm md:text-lg text-gray-800"
                  dangerouslySetInnerHTML={createMarkup(banner.description)}
                />

              </div>

            )}

          </div>
        ))}
      </Slider>
    </div>
  );
};

export default React.memo(BannerSlider);
