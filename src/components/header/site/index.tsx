'use client';
import React from 'react';
import { NextPage } from 'next';
import { Layout, Menu, Card, Button, Tooltip } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

const { Header } = Layout;

const HeaderPage: NextPage = () => {
  const { user, logout } = useAuthStore((state) => state);
  return (
    <>
      <Header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">


          <div className="flex items-center gap-2 shrink-0">
            <Image src="/files/imagens/logo.png" width={40} height={40} alt="Logo" />
            <span className="text-xl font-bold text-blue-600">DrSaas</span>
          </div>


          <div className="flex flex-1 justify-end">
            <Menu
              mode="horizontal"
              className="border-b-0 w-2/3"
              items={[
                { key: 'home', label: <Link href="/">Início</Link> },
                { key: 'social', label: <Link href="/">Fale Conosco</Link> },
                { key: 'marketing', label: <Link href="/">Marketing</Link> },
                { key: 'store', label: <Link href="/loja">Loja</Link> },
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
                  )
                },
                { key: 'register', label: <Link href={user ? '/dashboard' : '/register'}>{user ? 'Perfil' : 'Cadastre-se'}</Link> },
                { key: 'work', label: <Link href="/">Trabalhe Conosco</Link> },
                { key: 'support', label: <Link href="/">Suporte</Link> },
              ]}
            />
          </div>
        </div>
      </Header>


    </>
  );
};

export default React.memo(HeaderPage);
