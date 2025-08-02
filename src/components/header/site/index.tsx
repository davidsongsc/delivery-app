'use client';
import React, { useEffect, useState } from 'react'; // Import useState
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, Button, Layout, Space } from 'antd';
import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/contexts/AuthContext';
import LogoIcon from '@/components/MiniComponents/LogoIcon';
import getUserPermissions from '@/utils/permissions';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const HeaderPage: NextPage = () => {
  const { logout } = useAuthStore((state) => state);
  const hydrated = useAuthStore((state) => state.hydrated);
  const { user } = useAuth();
  
  const router = useRouter();

  // State to control rendering client-specific parts after hydration
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client side after initial render
    setIsClient(true);
  }, []);

  // Calculate permissions only if user is available and on client side
  const permissions = isClient && user ? getUserPermissions(user) : [];
  console.log('header -> permissions:', permissions);
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
      key: 'usuarios',
      label: 'Usuários',
      children: [
        permissions.includes('usuarios_listar') && {
          key: 'equipe',
          label: 'Equipe',
          children: [
            permissions.includes('caixa_entradas') && { // Note: This permission might be incorrect for "Colaboradores"
              key: '/dashboard/configuracoes/usuarios',
              label: 'Colaboradores',
            },
            permissions.includes('caixa_entradas') && { // Note: This permission might be incorrect for "Gerentes"
              key: '/dashboard/configuracoes/gerentes',
              label: 'Gerentes',
            },
            permissions.includes('permissoes_visualizar') && {
              key: '/dashboard/configuracoes/permissoes',
              label: 'Permissões',
            },
          ].filter(Boolean),
        },
        permissions.includes('caixa_saidas') && { // Note: This permission might be incorrect for "Escala"
          key: 'escalas',
          label: 'Escala',
          children: [
            permissions.includes('escala_servicos') && {
              key: '/dashboard/escalas/servicos',
              label: 'Serviços',
            },
            permissions.includes('escala_apoio') && {
              key: '/dashboard/escalas/apoio',
              label: 'Apoio',
            },
          ].filter(Boolean),
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
    {
      key: 'comandas',
      label: 'Comandas',
      children: [
        permissions.includes('comandas_visualizar') && {
          key: '/mesas',
          label: 'Mesas',
        },
        permissions.includes('comandas_delivery') && {
          key: '/dashboard/configuracoes/permissoes',
          label: 'Delivery',
        },
        permissions.includes('comandas_bar') && {
          key: '/dashboard/configuracoes/permissoes',
          label: 'Bar',
        },
        permissions.includes('comandas_recepcao') && {
          key: '/dashboard/configuracoes/permissoes',
          label: 'Recepção',
        },
      ].filter(Boolean),
    }, {
      key: 'mensagens',
      label: 'Mensagens',
      children: [
        permissions.includes('estoque_visualizar') && {
          key: `/dashboard/mensagens/${user?.tenant}/`,
          label: 'Mensagens',
        },

      ].filter(Boolean),
    },
    {
      key: 'caixa',
      label: 'Caixa',
      children: [
        permissions.includes('caixa_entradas') && {
          key: '/dashboard/caixa',
          label: 'Caixa Operacional',
        },
        permissions.includes('caixa_movimentacoes') && {
          key: 'movimentacoes',
          label: 'Movimentações',

          children: [
            permissions.includes('caixa_entradas') && {
              key: '/dashboard/caixa/movimentacoes/entradas',
              label: 'Entradas',
            },
            permissions.includes('caixa_saidas') && {
              key: '/dashboard/caixa/movimentacoes/saidas',
              label: 'Saídas',
            },
            permissions.includes('caixa_transferencias') && {
              key: '/dashboard/caixa/movimentacoes/transferencias',
              label: 'Transferências',
            },
            permissions.includes('caixa_entradas') && {
              key: '/dashboard/pagamentos',
              label: 'Pagamentos',
            },
          ].filter(Boolean),

        },
        permissions.includes('caixa_acesso') && {
          key: 'relatorios',
          label: 'Relatórios',
          children: [
            permissions.includes('caixa_relatorios_d') && {
              key: '/dashboard/caixa/relatorios/diario',
              label: 'Diário',
            },
            permissions.includes('caixa_relatorios_s') && {
              key: '/dashboard/caixa/relatorios/semanal',
              label: 'Semanal',
            },
            permissions.includes('caixa_relatorios_m') && {
              key: '/dashboard/caixa/relatorios/mensal',
              label: 'Mensal',
            },
            permissions.includes('caixa_relatorios_p') && {
              key: '/dashboard/caixa/relatorios/periodo',
              label: 'Por Período',
            },
            permissions.includes('caixa_fluxo') && {
              key: '/dashboard/caixa/relatorios/fluxo',
              label: 'Fluxo de Caixa',
            },
          ].filter(Boolean),
        },
        permissions.includes('caixa_fechamento') && {
          key: 'fechamentos',
          label: 'Fechamentos',
          children: [
            permissions.includes('caixa_fechamento_d') && {
              key: '/dashboard/caixa/fechamentos/diario',
              label: 'Fechamento Diário',
            },
            permissions.includes('caixa_fechamento_m') && {
              key: '/dashboard/caixa/fechamentos/mensal',
              label: 'Fechamento Mensal',
            },
          ].filter(Boolean),
        },
        permissions.includes('caixa_contas_visualizar') && {
          key: 'contas',
          label: 'Contas',
          children: [
            permissions.includes('caixa_contas_bancarias_visualizar') && {
              key: '/dashboard/caixa/contas/bancarias',
              label: 'Contas Bancárias',
            },
            permissions.includes('caixa_contas_caixas_visualizar') && {
              key: '/dashboard/caixa/contas/caixas',
              label: 'Caixas Internos',
            },
          ].filter(Boolean),
        },
      ].filter(Boolean),
    },
  ].filter((item) => item.children?.length);


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
  }

  // Once hydrated and on client, render the full header with dynamic menu
  return (
    <>
      <Header className="shadow-md px-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <LogoIcon texto="Loja-vel Tech Solutions" />
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
};

export default React.memo(HeaderPage);