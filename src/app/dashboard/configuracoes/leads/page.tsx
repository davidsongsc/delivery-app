'use client';
import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import LeadList from '@/components/Leads/List';

const RegisterCorporation = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return <LeadList />;
};

export default React.memo(RegisterCorporation);
