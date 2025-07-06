'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import CorporationListPage from '@/components/Corporation/list';

const RegisterCorporation = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  if (!user) return null; 

  return <CorporationListPage />;
};

export default React.memo(RegisterCorporation);
