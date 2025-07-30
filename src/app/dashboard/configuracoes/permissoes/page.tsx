'use client';
import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import ProfileList from '@/components/Profile/List';

const RegisterCorporation = () => {
  const user = useAuthStore((state) => state.user);
   
  if (!user) return null; 

  return <ProfileList />;
};

export default React.memo(RegisterCorporation);
