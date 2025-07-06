import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function DashboardLayout({ children: children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }


  return <>{children}</>;
}
