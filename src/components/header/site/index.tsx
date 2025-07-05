'use client';
import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import LogoIcon from '@/components/MiniComponents/LogoIcon';

const { Header } = Layout;

const HeaderPage: NextPage = () => {
  const { logout } = useAuthStore((state) => state);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(useAuthStore.getState().user);
    const unsub = useAuthStore.subscribe((state) => setUser(state.user));
    return () => unsub();
  }, []);

  return (
    <Header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <LogoIcon />
        <div className="flex flex-1 justify-end">
          <Menu
            mode="horizontal"
            className="border-b-0 w-2/3"
            items={[
              { key: 'home', label: <Link href="/">Início</Link> },
              
              {
                key: 'login',
                label: user ? (
                  <button onClick={logout}>
                    <span>Sair</span>
                  </button>
                ) : (
                  <Link href="/login">
                    <span>Login</span>
                  </Link>
                ),
              },
              {
                key: 'register',
                label: (
                  <Link href={user ? '/dashboard' : '/register'}>
                    {user ? 'Perfil' : 'Cadastre-se'}
                  </Link>
                ),
              },
            ]}
          />
        </div>
      </div>
    </Header>
  );
};

export default React.memo(HeaderPage);
