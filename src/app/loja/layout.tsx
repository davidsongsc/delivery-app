import AppHeader from '@/components/header/external';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {


  return (
    <>
      <AppHeader />
      {children}
    </>)
}
