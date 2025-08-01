
import AuthWrapper from '@/components/Layout/AuthWrapper'; // Client Component
import CaixaModal from '@/components/Caixa/Model';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthWrapper>
      <CaixaModal />
      {children}
    </AuthWrapper>
  );
}