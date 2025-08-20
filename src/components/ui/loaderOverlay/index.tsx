'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalLoadingStore } from '@/store/useGlobalLoadingStore';
import { useEffect, useRef } from 'react';
import { notification } from 'antd';

export default function LoaderOverlay() {
  const isLoading = useGlobalLoadingStore((s) => s.isLoading);
  const stopGlobalTimeout = useGlobalLoadingStore((s) => s.stopGlobalTimeout);
  const stopLoading = useGlobalLoadingStore((s) => s.stopLoading);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading) {
      timeoutRef.current = setTimeout(() => {
        stopLoading('global_timeout'); 
        notification.info({
          message: 'Operação em segundo plano',
          description: 'O carregamento demorou mais que o esperado e foi passado para segundo plano.',
          duration: 5,
        });
      }, 9000);
    } else if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      stopGlobalTimeout(); 
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isLoading, stopLoading, stopGlobalTimeout]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-t-transparent border-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
