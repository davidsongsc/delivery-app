'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useCorporationByPage } from '@/hooks/useCorporationByPage';
import { useSearchParams } from 'next/navigation';

interface LojaContextProps {
  page: string;
  setPage: (page: string) => void;
  corporation: any; // ajuste para o tipo correto de Corporation
  loading: boolean;
}

const LojaContext = createContext<LojaContextProps | undefined>(undefined);


export function LojaProvider({ children, initialPage }: { children: ReactNode, initialPage: string }) {
  const [page, setPage] = useState(initialPage);
  const { corporation, loading } = useCorporationByPage({ page });
  return (
    <LojaContext.Provider value={{ page, setPage, corporation, loading }}>
      {children}
    </LojaContext.Provider>
  );

}


export function useLoja() {
  const context = useContext(LojaContext);
  if (!context) throw new Error('useLoja deve ser usado dentro de LojaProvider');
  return context;
}
