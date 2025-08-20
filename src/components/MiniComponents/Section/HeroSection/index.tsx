'use client';
import React, { useCallback } from 'react';
import { Button, notification } from 'antd/es';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BlurText from '../../AnimateText/BlurText';
import SplitText from '@/components/MiniComponents/AnimateText/SplitText';

interface HeroSectionProps {
    title?: string;
    subtitle?: string;
    primaryCtaText?: string;
    secondaryCtaText?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
    title = 'Transforme sua ideia em tecnologia sob medida',
    subtitle = 'Desenvolvemos softwares personalizados para impulsionar a inovação e o crescimento do seu negócio.',
    primaryCtaText = 'Solicitar Orçamento',
    secondaryCtaText = 'Ver Projetos',
}) => {
    const router = useRouter();

    const openNotificationWithIcon = useCallback(() => {
        setTimeout(() => {
            notification.warning({
                message: 'Algo deu errado',
                description: 'Tivemos um problema ao iniciar o seu projeto. Por favor, tente novamente mais tarde.',
            });
        }, 2000);
    }, []);

    return (
        <section className="w-full bg-gradient-to-r from-primary to-secondary text-white py-16">
            <div className="container mx-auto px-6 py-12 md:px-12 lg:px-24 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
                
                {/* Texto */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                        <SplitText text={title} />
                    </h1>
                    <BlurText className="text-lg sm:text-xl lg:text-2xl mb-8 opacity-90" text={subtitle} />

                    <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                        <Button
                            size="large"
                            type="primary"
                            className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition"
                            onClick={() => openNotificationWithIcon()}
                        >
                            {primaryCtaText}
                        </Button>

                        <Button
                            size="large"
                            ghost
                            className="px-6 py-3 rounded-xl border-white text-white hover:bg-white hover:text-blue-900 transition"
                            onClick={() => router.push('/planos')}
                        >
                            {secondaryCtaText}
                        </Button>
                    </div>
                </div>

                {/* Imagens / Mockups */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end gap-4">
                    <div className="relative w-48 sm:w-64 md:w-80 lg:w-96 h-60 sm:h-72 md:h-80 lg:h-96 shadow-xl rounded-2xl overflow-hidden">
                        <Image
                            src="/files/logo/saas.png"
                            alt="Dashboard demo"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <div className="relative w-48 sm:w-64 md:w-80 lg:w-96 h-60 sm:h-72 md:h-80 lg:h-96 shadow-xl rounded-2xl overflow-hidden">
                        <Image
                            src="/files/logo/saas2.png"
                            alt="Dashboard demo"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(HeroSection);
