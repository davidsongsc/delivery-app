'use client';
import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import MemberShipListPage from '@/components/MemberShip/list';

const RegisterCorporation = () => {
  const user = useAuthStore((state) => state.user);
   

  if (!user) return null; 

  return <MemberShipListPage />;
};

export default React.memo(RegisterCorporation);
