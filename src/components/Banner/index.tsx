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
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    customPaging: (i: number) => (
      <button>
        <span className="w-3 h-3 block bg-gray-400 rounded-full" />
      </button>
    ),
    dotsClass: 'slick-dots flex justify-center gap-3 mt-4',
  };

  // Função para converter \n em <br> e sanitizar o HTML
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
    <div className="w-full max-w-screen-2xl mx-auto mt-4 px-2 overflow-hidden">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className='grid grid-cols-12 rounded overflow-hidden w-full'>

            <div className=''>
              {(banner.title || banner.description) && (
                <div className='grid grid-cols-6 xl:grid-cols-12'>
                  <div
                    className={` bg-${banner.corsys} flex flex-col justify-center p-2 text-white col-span-6 mx-8 rounded-xl`}
                  >
                    <Image
                      src={banner.imageUrl}
                      alt={banner.title || 'Banner'}
                      height={500}
                      width={500}
                      className="mx-auto rounded-lg shadow-lg object-contain"
                      priority
                    />

                  </div>
                  <div
                    className={` bg-white flex flex-col justify-center p-6 text-white col-span-6 rounded-lg mx-8 h-full`}
                  >
                    {banner.title && (
                      <h2 className="text-2xl md:text-4xl font-bold text-grafite">{banner.title}</h2>
                    )}
                    {banner.description && (
                      <p
                        className="text-sm md:text-lg mt-2 text-aço"
                        dangerouslySetInnerHTML={createMarkup(banner.description)}
                      />
                    )}
                  </div>
                </div>
              )}

            </div>

          </div>
        ))}

      </Slider>
    </div>
  );
};

export default BannerSlider;
