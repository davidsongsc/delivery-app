'use client';
import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import SuppliersList from '@/components/Suppliers/List';

const RegisterCorporation = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return <SuppliersList />;
};

export default React.memo(RegisterCorporation);
