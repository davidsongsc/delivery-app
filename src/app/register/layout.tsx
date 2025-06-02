import HeaderPage from '@/components/header/site';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {


  return (
    <>
      <HeaderPage />
      {children}
    </>)
}
