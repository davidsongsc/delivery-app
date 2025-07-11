// Este é um Server Component.
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AuthWrapper from '@/components/Layout/AuthWrapper'; // Client Component

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get('token')?.value;

  // A verificação de segurança acontece aqui, no servidor.
  // Se não houver token, o usuário é redirecionado antes que o Client Component seja renderizado.
  if (!token) {
    redirect('/login');
  }

  // Se houver um token, o Client Component é renderizado.
  return (
    <AuthWrapper>
      {children}
    </AuthWrapper>
  );
}