
import AuthWrapper from '@/components/Layout/AuthWrapper'; // Client Component

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthWrapper>
      {children}
    </AuthWrapper>
  );
}