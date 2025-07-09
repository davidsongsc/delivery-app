import React from 'react';
import { Button } from 'antd';
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
    title = 'Automatize a gestão do seu empreendimento!',
    subtitle = 'Economize tempo e aumente a satisfação dos seus clientes com nossa plataforma completa de agendamentos e pagamentos.',
    primaryCtaText = 'Experimente Grátis',
    secondaryCtaText = 'Ver Planos',
}) => {
    const router = useRouter();
    return (
        <section className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-10">
            <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col-reverse md:flex-row items-center justify-between">
                <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0 px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                        <SplitText text={title} />
                    </h1>
                    <BlurText className="text-lg md:text-xl mb-8 opacity-90" text={subtitle} />

                    <div className="flex justify-center md:justify-start gap-4">
                        <Button size="large" type="primary" className="px-6 py-3 rounded-2xl">
                            {primaryCtaText}
                        </Button>
                        <Button size="large" ghost className="px-6 py-3 rounded-2xl border-white text-white" onClick={() => router.push('/planos')}>
                            {secondaryCtaText}
                        </Button>

                        <Button
                            size="large"
                            ghost
                            className="px-6 py-3 rounded-2xl border-white text-white"
                            onClick={() => window.open('/loja', '_blank')}
                        >
                            Loja
                        </Button>

                    </div>
                </div>

                <div className="w-full md:w-1/4 flex justify-center md:justify-end px-4 gap-2">
                    <Image
                        src="/files/logo/saas.png"
                        alt="Dashboard demo"
                        height={200}
                        width={400}
                        className="w-1/4 md:w-full rounded-full"
                    />
                    <Image
                        src="/files/logo/saas2.png"
                        alt="Dashboard demo"
                        height={200}
                        width={400}
                        className="w-1/4 md:w-full rounded-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default React.memo(HeroSection);
