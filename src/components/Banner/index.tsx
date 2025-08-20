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
    speed: 1900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
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
    <div className="w-full max-w-screen-2xl mx-auto mt-6 px-4 overflow-hidden">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className="flex flex-col md:flex-row gap-6 rounded-xl overflow-hidden w-full px-2">
            
            <div className={`flex-1 bg-${banner.corsys || 'red-600'} flex items-center justify-center p-4 rounded-xl shadow-lg`}>
              <Image
                src={banner.imageUrl}
                alt={banner.title || 'Banner'}
                height={400}
                width={400}
                className="rounded-lg object-contain"
                priority
              />
            </div>

            {(banner.title || banner.description) && (
              <div className="flex-1 bg-white flex flex-col justify-center p-6 rounded-xl shadow-inner">
                {banner.title && (
                  <h2 className="text-2xl md:text-4xl font-bold text-red-700">{banner.title}</h2>
                )}
                {banner.description && (
                  <p
                    className="text-sm md:text-lg mt-3 text-gray-800"
                    dangerouslySetInnerHTML={createMarkup(banner.description)}
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

export default React.memo(BannerSlider);
