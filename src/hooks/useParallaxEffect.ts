import { useEffect, useRef } from 'react';

const useParallaxEffect = (strength = 10) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (ref.current) {
                const { clientX, clientY } = e;
                const { offsetWidth, offsetHeight } = ref.current;

                const centerX = offsetWidth / 2;
                const centerY = offsetHeight / 2;

                const moveX = (clientX - centerX) / strength;
                const moveY = (clientY - centerY) / strength;

                ref.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [strength]);

    return ref;
};

export default useParallaxEffect;