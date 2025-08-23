'use client';

import { ReactNode } from 'react';
import { LojaProvider } from '@/contexts/LojaContext';
import { useParams } from 'next/navigation';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const params = useParams();
  const initialPage = params?.page || 'loja';

  return <LojaProvider initialPage={initialPage}>{children}</LojaProvider>;
}
