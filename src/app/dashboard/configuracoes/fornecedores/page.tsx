'use client';
import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import AffiliatesList from '@/components/Affiliates/List';

const RegisterCorporation = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return <AffiliatesList />;
};

export default React.memo(RegisterCorporation);
