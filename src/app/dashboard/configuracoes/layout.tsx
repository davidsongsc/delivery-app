import HeaderPage from '@/components/header/site';
import FooterSection from '@/components/MiniComponents/Footer';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  
  
  return (
    <>
      <HeaderPage />
      {children}
      <FooterSection />
    </>)
}
