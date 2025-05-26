'use client';

import { Layout, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { HomeOutlined, UserOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

const { Header } = Layout;

const AppHeader = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  const [current, setCurrent] = useState('home');

  const handleClick = async (e: any) => {
    setCurrent(e.key);

    if (e.key === 'logout') {
      await logout();
      router.push('/login');
    } else if (e.key === 'login') {
      router.push('/login');
    } else if (e.key === 'home') {
      router.push('/dashboard');
    } else if (e.key === 'profile') {
      router.push('/profile');
    }
  };

  // Deixar a página sincronizada com auth
  useEffect(() => {
    if (!isAuthenticated) {
      setCurrent('');
    }
  }, [isAuthenticated]);

  return (
    <Header className="flex items-center flex-col justify-between bg-white shadow-md h-screen">
      <div className="text-xl font-bold text-black cursor-pointer" onClick={() => router.push('/')}>
        Barbeiroshop
      </div>

      <Menu
        theme="light"
        mode="vertical"
        selectedKeys={[current]}
        onClick={handleClick}
        className="flex-1 justify-end"
      >
        {isAuthenticated ? (
          <>
            <Menu.Item key="home" icon={<HomeOutlined />}>
              Início
            </Menu.Item>

            <Menu.Item key="dashboard/profile" icon={<UserOutlined />}>
              Perfil
            </Menu.Item>

            <Menu.Item key="dashboard/dashboard" icon={<UserOutlined />}>
              Galeria
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
              Sair
            </Menu.Item>
          </>
        ) : (
          <Menu.Item key="login" icon={<LoginOutlined />}>
            Login
          </Menu.Item>
        )}
      </Menu>

      {isAuthenticated && user && (
        <div className="hidden sm:block ml-4 text-black">
          Olá, <strong>{user.first_name}</strong>
        </div>
      )}
    </Header>
  );
};

export default AppHeader;
