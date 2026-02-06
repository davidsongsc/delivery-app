'use client';
import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import SuppliersList from '@/components/Suppliers/List';
import { useAuth } from '@/contexts/AuthContext';

const RegisterCorporation = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return null;

  return <SuppliersList />;
};

export default React.memo(RegisterCorporation);
