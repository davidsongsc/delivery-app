import React, { useEffect, useRef, useState } from 'react';
import './styles.css'; 
import LogoIcon from '../MiniComponents/LogoIcon';
import { Card } from 'antd';
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

            className={`opacity-0 transition-opacity duration-1000 ease-in-out ${loaded ? 'opacity-100' : ''} ${className || ''}`}
        >
            <Card
                className="w-full max-w-sm mx-auto shadow-lg bg-[#FEFEFE] flex flex-col items-center justify-center p-6" // Tailwind no Card do Antd
                variant={false}
            >

                <LogoIcon tamanho={80} texto='Carragando...' animacao={true} />
                <p className="mt-4 text-xl font-semibold text-gray-800">Carragando...</p>
            </Card>
        </div>
    );
};

export default React.memo(AppLoading);