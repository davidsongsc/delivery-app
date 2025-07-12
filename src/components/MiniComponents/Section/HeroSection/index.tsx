import React, { useCallback } from 'react';
import { Button, notification } from 'antd';
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
            })
        }, 2000)

    }, []);
    return (
        <section className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-10">
            <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col-reverse md:flex-row items-center justify-between">
                <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0 px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                        <SplitText text={title} />
                    </h1>
                    <BlurText className="text-lg md:text-xl mb-8 opacity-90" text={subtitle} />

                    <div className="flex justify-center md:justify-start gap-4">
                        <Button size="large" type="primary" className="px-6 py-3 rounded-2xl" onClick={() => openNotificationWithIcon()}>
                            {primaryCtaText}
                        </Button>
                        <Button disabled size="large" ghost className="px-6 py-3 rounded-2xl border-white text-white" onClick={() => router.push('/planos')}>
                            {secondaryCtaText}
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
