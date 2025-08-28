'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useLoginModal } from '@/contexts/LoginModalContext';  // import do modal
import { useEffect, useState } from 'react';
import AppLoading from '@/components/AppLoading';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, checkAuth } = useAuth();
  const { openModal } = useLoginModal();  
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      const verify = async () => {
        try {
          await checkAuth();
        } finally {
          setChecking(false);
        }
      };
      verify();
    } else {
      setChecking(false);
    }
  }, [checkAuth, isAuthenticated]);

  useEffect(() => {
    if (!checking && !isAuthenticated) {
      openModal();
    }
  }, [checking, isAuthenticated, openModal]);

  if (checking) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <AppLoading />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <>
      
      {children}
    </>
  );
}
