'use client';
import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, Button, Layout, Space } from 'antd/es';
import { useAuth } from '@/contexts/AuthContext';
import LogoIcon from '@/components/MiniComponents/LogoIcon';
import { generateMenuItems } from '@/utils/menuItems';
import UserMenu from '@/components/MiniComponents/UserMenu';

const { Header } = Layout;

const HeaderPage: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const menuItems = generateMenuItems(user);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Header className="shadow-md px-4 flex items-center justify-between sticky top-0 z-50 bg-primary ">
        <div className="flex items-center gap-4">
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
      </Header>

      {mounted && user && (
        <div className="grid grid-cols-12 gap-4 border-b border-gray-100 cursor-pointer rounded-b-md shadow-sm m-2">
          <Menu
            mode="horizontal"
            onClick={({ key }) => router.push(key)}
            className="text-black shadow-sm col-span-9"
            items={menuItems}
          />

          <div className="flex items-center gap-4 col-span-3 p-2 justify-between">
            <div className="flex items-center gap-2">

            </div>
            <UserMenu />

          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(HeaderPage);
