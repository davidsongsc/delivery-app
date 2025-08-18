'use client';
import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import ReservasList from '@/components/Reservas/List';
const RegisterCorporation = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return <ReservasList />;
};

export default React.memo(RegisterCorporation);
