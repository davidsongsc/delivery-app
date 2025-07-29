'use client';

import React from 'react';
import { useEffect } from 'react';
import { Layout, Input, Dropdown, Avatar, App } from 'antd';
import { SearchOutlined, BellOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useSessionStore } from '@/context/session.context';
import Image from 'next/image';
import { UserRolesTranslated } from '@/enum/UserRoles';
import { useCompanyStore } from '@/context/company.context';
import { useRouter } from 'next/navigation';

const { Header } = Layout;

const AdminUser: React.FC = () => {
  const router = useRouter();
  const { notification } = App.useApp();
  const { session, sessionLogout } = useSessionStore();
  const { company, companyLogout } = useCompanyStore();

  const handleLogout = () => {
    companyLogout();
    sessionLogout();
    notification.info({
      message: "Logout efetuado com sucesso!",
    });
    router.push("/");
  };
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Perfil',
    },
    {
      key: 'settings',
      label: 'Configurações',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Sair',
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (

    <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
      <div className='flex items-center justify-around gap-1 w-[215px] h-[50px] bg-darkSelecao rounded-[7px] cursor-pointer'>
        <div className='flex gap-2 items-center'>
          <Avatar
            icon={<UserOutlined />}
            size="default" />
          <div className='flex flex-col gap-1 '>
            <span className="h-3 text-sm font-bold">
              {session?.user.name}
            </span>
            <span className="h-3 text-sm">
              {UserRolesTranslated[session?.user.role as keyof typeof UserRolesTranslated]}
            </span>
          </div>
        </div>
        <Image src="/images/icons/arrow-down.svg" width={15} height={15} alt="Seta para baixo" />
      </div>
    </Dropdown>

  );
};

export default AdminUser;