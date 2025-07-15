'use client';
import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import CorporationListPage from '@/components/Corporation/list';

const RegisterCorporation = () => {
  const user = useAuthStore((state) => state.user);
   

  if (!user) return null; 

  return <CorporationListPage />;
};

export default React.memo(RegisterCorporation);
