'use client';
import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import ClienteList from '@/components/Clients/List';
const RegisterCorporation = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return <ClienteList />;
};

export default React.memo(RegisterCorporation);
