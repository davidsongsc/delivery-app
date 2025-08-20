// DashboardLayout.tsx
import { LojaProvider } from '@/contexts/LojaContext';

export default function DashboardLayout({ children, params }: { children: React.ReactNode, params: { page: string } }) {
  return (
    <>
 
      <LojaProvider initialPage={params.page}>{children}</LojaProvider>
    </>
  );
}
