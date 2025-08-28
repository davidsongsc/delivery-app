'use client'; 

import { LojaProvider } from '@/contexts/LojaContext';
import { useParams } from 'next/navigation';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const params = useParams();
  const initialPage = params?.page || 'loja';

  return <LojaProvider initialPage={initialPage}>{children}</LojaProvider>;
}
