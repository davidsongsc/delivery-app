'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from 'antd';
import LogoIcon from '../MiniComponents/LogoIcon';

interface AnimatedLogoProps {
  className?: string;
}

const AppLoading: React.FC<AnimatedLogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center justify-center min-h-screen ${className || ''}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="w-full max-w-sm"
      >
        <Card
          className="shadow-xl bg-white/80 backdrop-blur-lg rounded-2xl flex flex-col items-center justify-center p-8 border border-gray-100"
          bordered={false}
        >
          <motion.div
            className="flex items-center justify-center"
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          >
            <LogoIcon tamanho={80} texto="" animacao={true} />
          </motion.div>

          <motion.p
            className="mt-6 text-lg font-semibold text-gray-700 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Carregando...
          </motion.p>
        </Card>
      </motion.div>
    </div>
  );
};

export default React.memo(AppLoading);
