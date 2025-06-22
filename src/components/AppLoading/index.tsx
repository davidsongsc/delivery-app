// components/AnimatedLogo.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'antd'; // Importando um componente Ant Design para demonstração
import './styles.css'; // Importando um arquivo CSS externo
import LogoIcon from '../MiniComponents/LogoIcon';
interface AnimatedLogoProps {
    className?: string; // Para passar classes Tailwind CSS externas
}

const AppLoading: React.FC<AnimatedLogoProps> = ({ className }) => {
    const logoRef = useRef<HTMLDivElement>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Adiciona a classe 'opacity-100' após o componente ser montado,
        // o que aciona a transição CSS definida pelo Tailwind.
        if (logoRef.current) {
            // Pequeno delay para garantir que a opacidade inicial de 0 seja aplicada antes da transição
            const timer = setTimeout(() => {
                setLoaded(true);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <div
            ref={logoRef}
            // Tailwind CSS classes:
            // initial opacity-0 for fade-in effect
            // transition-opacity duration-1000 ease-in-out for the animation
            // dynamic class 'opacity-100' added via state
            className={`opacity-0 transition-opacity duration-1000 ease-in-out ${loaded ? 'opacity-100' : ''} ${className || ''}`}
        >
            <Card
                className="w-full max-w-sm mx-auto shadow-lg bg-[#FEFEFE] flex flex-col items-center justify-center p-6" // Tailwind no Card do Antd
                bordered={false}
            >
                {/*
          ATENÇÃO: SUBSTITUA O CONTEÚDO ABAIXO PELO SEU CÓDIGO SVG DO LOGO LOJAVEL.
          Este é apenas um SVG de exemplo.
        */}
                <LogoIcon tamanho={80} texto='Carragando...' animacao={true} />
                <p className="mt-4 text-xl font-semibold text-gray-800">Seu Shopping Virtual!</p>
            </Card>
        </div>
    );
};

export default React.memo(AppLoading);