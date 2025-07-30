'use client';
import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, Button, Layout, Space } from 'antd';
import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/contexts/AuthContext';
import LogoIcon from '@/components/MiniComponents/LogoIcon';
import getUserPermissions from '@/utils/permissions';

const { Header } = Layout;

const HeaderPage: NextPage = () => {
  const { logout } = useAuthStore((state) => state);
  const hydrated = useAuthStore((state) => state.hydrated);
  const { user } = useAuth();
  const permissions = getUserPermissions(user);
  const router = useRouter();

  const menuItems = [
    {
      key: 'sistema',
      label: 'Sistema',
      children: [
        permissions.includes('sistema_configuracoes') && {
          key: '/dashboard/configuracoes/sistema',
          label: 'Configurações',
        },
        permissions.includes('sistema_empresas') && {
          key: '/dashboard/configuracoes/empresas',
          label: 'Empresas',
        },
      ].filter(Boolean),
    },
    {
      key: 'colaboradores',
      label: 'Colaboradores',
      children: [
        permissions.includes('usuarios_listar') && {
          key: '/dashboard/configuracoes/usuarios',
          label: 'Usuários',
        },
        permissions.includes('permissoes_visualizar') && {
          key: '/dashboard/configuracoes/permissoes',
          label: 'Permissões',
        },
      ].filter(Boolean),
    },
    {
      key: 'produtos',
      label: 'Produtos',
      children: [
        permissions.includes('estoque_visualizar') && {
          key: '/dashboard/configuracoes/usuarios',
          label: 'Estoque',
        },
        permissions.includes('produto_visualizar') && {
          key: '/dashboard/configuracoes/permissoes',
          label: 'Produto',
        },
        permissions.includes('composicao_visualizar') && {
          key: '/dashboard/configuracoes/permissoes',
          label: 'Composição',
        },
        permissions.includes('adicional_visualizar') && {
          key: '/dashboard/configuracoes/permissoes',
          label: 'Item Adicional',
        },
      ].filter(Boolean),
    },
  ].filter((item) => item.children?.length);

  if (!hydrated) return null;

  return (
    <>
      <Header className="shadow-md px-4 flex items-center justify-between sticky top-0 z-50
      ">
        <div className="flex items-center gap-4">
          <LogoIcon texto="Loja-vel Tech Solutions" />
        </div>
        <Space size="middle">
          <Link href="/" passHref>
            <Button type="text">Início</Button>
          </Link>

          {user ? (
            <>
              <Link href="/consulta-financeira" passHref>
                <Button type="text">Nova simulação</Button>
              </Link>
             
              <Button type="text" onClick={logout}>
                Sair
              </Button>
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

      {user && (
        <Menu
          mode="horizontal"
          onClick={({ key }) => router.push(key)}
          className="text-black shadow-sm "
          items={menuItems}
        />
      )}
    </>
  );
};

export default React.memo(HeaderPage);
