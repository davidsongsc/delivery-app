'use client';

import ProfileView from '@/components/Profile/View';
import { IUserCreate } from '@/interfaces/IUser';
import { Button, Form, App, Spin } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import UserForm from '../Form';
import { useParams, useRouter } from 'next/navigation';
import SectionSeparator from '@/components/MiniComponents/SectionSeparator';
import AddressList from '@/components/Address/List';
import ProfileStructure from '@/components/ProfileStructure';
import { useAuth } from '@/contexts/AuthContext';
import getUserPermissions from '@/utils/permissions';
import NotFound from '@/app/not-found';
import { IClientsCreate } from '@/interfaces/IClients';
import { clienteService } from '@/services/clients.service';
import { useClient } from '@/hooks/useClient';

const ClienteEdit: React.FC = () => {
  const { notification } = App.useApp();
  const [form] = Form.useForm<IClientsCreate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { cliente, clienteLoading } = useClient(
    useMemo(() => ({ id }), [id])
  );

  const { user } = useAuth();
  const permissions = getUserPermissions(user);
  if (!permissions.includes('afiliados_editar')) return NotFound();

  useEffect(() => {
    if (cliente?.id) {
      form.setFieldsValue({
        email: cliente.email,
        nome: cliente.nome,
        ativo: cliente.ativo,
        telefone: cliente.telefone,
        observacoes: cliente.observacoes,

      });
    }
  }, [cliente, form]);

  const submitData = useCallback(() => {
    if (isLoading || !cliente?.id) return;
    form.validateFields().then(values => {
      setIsLoading(true);

      const dataToUpdate: Partial<IClientsCreate> = {
        ...values,
      };

      // Envia senha somente se informada


      clienteService
        .update(cliente.id, dataToUpdate)
        .then(() => {
          notification.success({
            message: 'Colaborador atualizado com sucesso!',
          });
          router.back();
        })
        .catch((error) => {
          // Exibe mensagens detalhadas de erro (caso o backend retorne)
          const detail = error?.response?.data?.detail;
          const msg = detail || 'Erro ao atualizar colaborador';
          notification.error({ message: msg });
        })
        .finally(() => setIsLoading(false));
    });
  }, [form, isLoading, cliente, notification, router]);

  return (
    <div className="w-7xl container ">
      <ProfileStructure
        isLoading={isLoading}
        navTitle="Sistema > Clientes"
        title="Editar"
        menuButtons={[
          {
            title: 'Informações',
            link: `/dashboard/configuracoes/clientes/${id}/editar`,
            isActive: true,
          },
          {
            title: 'Salvar',
            onClick: submitData,
            isActive: false,
            isVisible: permissions.includes('usuarios_editar'),
          },
          {
            title: 'Novo Usuário',
            link: `/dashboard/configuracoes/clientes/cadastrar`,
            isActive: false,
          },
        ]}
      >
        <SectionSeparator title="Geral" >
          <div className="container-conteudo-small ">
            <UserForm form={form} isEditing />
          </div>
        </SectionSeparator>

        <div className='grid grid-cols-6 gap-4'>


          <div className='col-span-6'>
            {permissions.includes('endereco_visualizar') &&
              <>
                <SectionSeparator title="Endereços" />
                <div className="container-conteudo-small mb-4">
                  <AddressList field="client_id" value={id} />
                </div>
              </>}
          </div>

        </div>
      </ProfileStructure>
    </div>
  );
};

export default React.memo(ClienteEdit);
