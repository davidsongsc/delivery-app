'use client';
import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import UsersList from '@/components/Users/List';

const RegisterCorporation = () => {
  const user = useAuthStore((state) => state.user);
   
  if (!user) return null; 

  return <UsersList />;
};

export default React.memo(RegisterCorporation);
