'use client';
import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, Button, Layout, Space, Grid } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import LogoIcon from '@/components/MiniComponents/LogoIcon';
import { generateMenuItems } from '@/utils/menuItems';
import UserMenu from '@/components/MiniComponents/UserMenu';

const { Header } = Layout;
const { useBreakpoint } = Grid;

const HeaderPage: NextPage = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const menuItems = generateMenuItems(user);
  const screens = useBreakpoint();
  const isXlOrLarger = screens.xl;
  const isLgOrLarger = screens.lg;
  const isMdOrLarger = screens.md;
  const isSmOrLarger = screens.sm;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Header className={`shadow-md px-3 flex items-center justify-between sticky top-0 z-50 bg-primary ${isAuthenticated ? 'hidden' : ''}`}>
        <div className="flex items-center gap-2">
          {mounted && <LogoIcon texto={user?.corporation?.nome || 'Lojavel'} />}

        </div>
        <Space size="middle">
          <Link href="/" passHref>
            <Button type="default">Início</Button>
          </Link>

          {mounted && user ? (
            <>
              <Link href="/assinaturas" passHref>
                <Button type="default">Assinatura</Button>
              </Link>
              <Link href="/consulta-financeira" passHref>
                <Button type="default">Nova simulação</Button>
              </Link>
              <Link href="/dashboard" passHref>
                <Button type="default">Perfil</Button>
              </Link>
            </>
          ) : (
            mounted && (
              <>
                <Link href="/register" passHref>
                  <Button type="primary">Cadastre-se</Button>
                </Link>
              </>
            )
          )}
        </Space>
      </Header >

      {mounted && user && (
        <div className="grid grid-cols-2 md:grid-cols-12   border-b border-gray-100 cursor-pointer  shadow-sm  ">
          <Menu
            mode="horizontal"
            onClick={({ key }) => router.push(key)}
            className="text-black shadow-sm col-span-2 md:col-span-10 "
            items={menuItems}
          />

          <div className="flex items-center gap-2 col-span-2  justify-between w-full">
           
            <UserMenu />

          </div>
        </div>
      )
      }
    </>
  );
};

export default React.memo(HeaderPage);
