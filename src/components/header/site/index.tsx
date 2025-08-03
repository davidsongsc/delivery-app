'use client';
import React, { useEffect, useState } from 'react'; // Import useState
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, Button, Layout, Space } from 'antd';
import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/contexts/AuthContext';
import LogoIcon from '@/components/MiniComponents/LogoIcon';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { generateMenuItems } from '@/utils/menuItems';

const { Header } = Layout;

const HeaderPage: NextPage = () => {
  const { logout } = useAuthStore((state) => state);
  const hydrated = useAuthStore((state) => state.hydrated);
  const { user } = useAuth();

  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const menuItems = generateMenuItems(user);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!hydrated || !isClient) {
    return (
      <Header className="shadow-md px-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <LogoIcon texto="Lojavel System" />
        </div>
        <Space size="middle">
          <Link href="/" passHref>
            <Button type="text">Início</Button>
          </Link>
          {!user ? (
            <>
              <Link href="/login" passHref>
                <Button type="text">Login</Button>
              </Link>
              <Link href="/register" passHref>
                <Button type="primary">Cadastre-se</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/assinatura" passHref>
                <Button type="primary">Assinatura</Button>
              </Link>
            </>
          )}
        </Space>
      </Header>
    );
  } else {
    return (
      <>
        <Header className="shadow-md px-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <LogoIcon texto={user?.corporation ? user.corporation.nome : '"Loja-vel Tech Solutions"'} />
          </div>
          <Space size="middle">
            <Link href="/" passHref>
              <Button type="text">Início</Button>
            </Link>

            {user ? (
              <>
                <Link href="/assinaturas" passHref>
                  <Button type="text">Assinatura</Button>
                </Link>
                <Link href="/consulta-financeira" passHref>
                  <Button type="text">Nova simulação</Button>
                </Link>
                <Link href="/dashboard" passHref>
                  <Button type="primary">Perfil</Button>
                </Link>

              </>
            ) : (
              <>
                <Link href="/login" passHref>
                  <Button type="text">Login</Button>
                </Link>
                <Link href="/register" passHref>
                  <Button type="primary">Cadastre-se</Button>
                </Link>
              </>
            )}
          </Space>
        </Header>

        {user && ( // Only render this div if user exists and is on the client
          <div className='grid grid-cols-12 gap-4 border-b border-gray-100 cursor-pointer'>
            <Menu
              mode="horizontal"
              onClick={({ key }) => router.push(key)}
              className="text-black shadow-sm col-span-9"
              items={menuItems}
            />

            <div className="flex items-center gap-4 col-span-3 p-2">
              <div className="flex items-center gap-2">
                <UserOutlined />
                <span>{user.first_name}</span>
              </div>
              <div className="flex items-center gap-2">
                |
                {user.perfis?.length > 0 && (
                  <> {user.perfis[user.perfis.length - 1].nome}</>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button type="text" onClick={logout}>
                  Sair
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default React.memo(HeaderPage);