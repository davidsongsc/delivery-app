"use client";
import { ClientOnly } from '@/components/ClientOnly';
import HeaderPage from '@/components/header/site';
import { useAuth } from '@/contexts/AuthContext';
import Notification from '@/components/DashBoardComponents/Notifications';
import AppLoading from '@/components/AppLoading';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <ClientOnly fallback={<AppLoading />}>
      {user && <Notification user={user} />}
      <HeaderPage />
      {children}

    </ClientOnly>
  );
}

