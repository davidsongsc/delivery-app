'use client';
import React, { useEffect } from 'react';
import ReservasList from '@/components/Reservas/List';
import { useAuth } from '@/contexts/AuthContext';
const RegisterCorporation = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return <ReservasList />;
};

export default React.memo(RegisterCorporation);
