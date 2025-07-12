'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import WalletSummaryCard from '@/components/WalletSummaryCard';
import { Card, Spin, Typography, Avatar, Tag, Divider, Space, Button } from 'antd';
import {
  UserOutlined,
  CrownOutlined,
  ToolOutlined,
  IdcardOutlined,
  PhoneOutlined,
  MailOutlined,
  FileSearchOutlined,
  FileDoneOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import TransactionsPage from '@/components/TransactionsItem/TranactionPage';

const { Title, Text } = Typography;

const PerfilPage = () => {
  const { user, isAuthenticated, loading, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      checkAuth();
    }
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full shadow-2xl rounded-2xl p-6">
        <div className="flex flex-col items-center gap-4">
          <Avatar size={80} icon={<UserOutlined />} />
          <Title level={3}>
            {user.first_name || user.username}{' '}
            {user.is_superuser && <CrownOutlined style={{ color: '#fadb14' }} />}
            {user.is_staff && !user.is_superuser && <ToolOutlined style={{ color: '#1890ff' }} />}
          </Title>

          <div className="flex flex-col items-start w-full gap-2 mt-4">
            <Space>
              <MailOutlined />
              <Text>Email:</Text>
              <Text strong>{user.email}</Text>
            </Space>

            {user.phone_number && (
              <Space>
                <PhoneOutlined />
                <Text>Telefone:</Text>
                <Text strong>{user.phone_number}</Text>
              </Space>
            )}

            {user.cpf && (
              <Space>
                <IdcardOutlined />
                <Text>CPF:</Text>
                <Text strong>{user.cpf}</Text>
              </Space>
            )}

            {user.rg && (
              <Space>
                <IdcardOutlined />
                <Text>RG:</Text>
                <Text strong>{user.rg}</Text>
              </Space>
            )}

            {user.other_doc && (
              <Space>
                <IdcardOutlined />
                <Text>Outro Documento:</Text>
                <Text strong>{user.other_doc}</Text>
              </Space>
            )}

            {user.invited_by && (
              <Space>
                <SafetyOutlined />
                <Text>Convidado por:</Text>
                <Tag color="blue">{user.invited_by}</Tag>
              </Space>
            )}

            {user.access_level && (
              <Space>
                <Text>Nível de Acesso:</Text>
                <Tag color="purple">{String(user.access_level)}</Tag>
              </Space>
            )}
          </div>

          {(user.is_superuser || user.is_staff) && (
            <>

              <Divider />

              <div className='grid grid-cols-1 sm:grid-cols-2 '>
                <div className="p-6 space-y-6">
                  <h1 className="text-2xl font-bold">Minha Carteira</h1>
                  <WalletSummaryCard />
                </div>


              </div>
              <Divider />
              <div className="w-full">
                <Title level={4}>Área Administrativa</Title>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-3 mt-2">

                  <Button
                    type="primary"
                    icon={<FileSearchOutlined />}
                    onClick={() => router.push('/consulta-financeira/')}
                  >
                    Simular Financiamento                  </Button>
                  <Button
                    type="dashed"
                    icon={<FileDoneOutlined />}
                    onClick={() => router.push('/admin/relatorios')}
                  >
                    Relatórios Financiamento                 </Button>
                  <Button
                    type="primary"
                    icon={<FileSearchOutlined />}
                    onClick={() => router.push('/admin/register/')}
                  >
                    Cadastrar Cliente (Empresa)
                  </Button>
                  <Button
                    type="dashed"
                    icon={<FileDoneOutlined />}
                    onClick={() => router.push('/admin/relatorios')}
                  >
                    Relatórios                  </Button>
                  <Button
                    type="primary"
                    icon={<FileSearchOutlined />}
                    onClick={() => router.push('/admin/register/')}
                  >
                    Cadastrar Afiliados (Empresa)
                  </Button>
                  <Button
                    type="dashed"
                    icon={<FileDoneOutlined />}
                    onClick={() => router.push('/admin/relatorios')}
                  >
                    Produtos
                  </Button>

                  <Button
                    type="primary"
                    icon={<FileSearchOutlined />}
                    onClick={() => router.push('/admin/register/')}
                  >
                    Planos
                  </Button>
                  <Button
                    type="dashed"
                    icon={<FileDoneOutlined />}
                    onClick={() => router.push('/admin/relatorios')}
                  >
                    Administrativo
                  </Button>


                  <Button
                    type="primary"
                    icon={<FileSearchOutlined />}
                    onClick={() => router.push('/admin/register/')}
                  >
                    Feedback
                  </Button>
                  <Button
                    type="dashed"
                    icon={<FileDoneOutlined />}
                    onClick={() => router.push('/admin/relatorios')}
                  >
                    Serviços
                  </Button>

                </div>
              </div>
              <Divider />
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PerfilPage;
