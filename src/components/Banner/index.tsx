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
  function createMarkup(description?: string) {
    if (!description) return { __html: '' };

    // Substitui \n\n por fechamento e abertura de parágrafo, \n por <br />
    let html = description
      .replace(/\n\n/g, '</p><p>')  // quebras duplas viram parágrafos
      .replace(/\n/g, '<br />');    // quebras simples viram <br />

    // Envolve todo em <p> para manter consistência
    html = `<p>${html}</p>`;

    const cleanHTML = DOMPurify.sanitize(html);

    return { __html: cleanHTML };
  }

  return (
    <div className="w-full max-w-screen-2xl mx-auto mt-4 px-2 ">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className='grid grid-cols-12 rounded overflow-hidden'>

            <div className='col-span-6'>
              {(banner.title || banner.description) && (
                <div
                  className={` bg-${banner.corsys} flex flex-col justify-center p-6 text-white`}
                >
                  {banner.title && (
                    <h2 className="text-2xl md:text-4xl font-bold">{banner.title}</h2>
                  )}
                  {banner.description && (
                    <p
                      className="text-sm md:text-lg mt-2"
                      dangerouslySetInnerHTML={createMarkup(banner.description)}
                    />
                  )}
                </div>
              )}

            </div>
            <div
              className={` bg-${banner.corsys} flex flex-col justify-center p-6 text-white`}
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
          </div>
        ))}

      </Slider>
    </div>
  );
};

export default BannerSlider;
