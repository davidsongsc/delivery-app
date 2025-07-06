import dynamic from 'next/dynamic';

const AppHeader = dynamic(() => import('@/components/header/external'), { ssr: false });

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
