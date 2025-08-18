"use client";
import AuthWrapper from '@/components/Layout/AuthWrapper'; // Client Component
import HeaderPage from '@/components/header/site';
import { useAuth } from '@/contexts/AuthContext';
import Notification from '@/components/DashBoardComponents/Notifications';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    < >
      {user && <Notification user={user} />}
      <HeaderPage />
      {children}

    </>
  );
}

