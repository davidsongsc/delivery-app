'use client';

import ProfileView from '@/components/Profile/View';
import { IUserCreate } from '@/interfaces/IUser';
import { Button, Form, App, Spin } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import UserForm from '../Form';
import { userService } from '@/services/user.service';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import SectionSeparator from '@/components/MiniComponents/SectionSeparator';
import AddressList from '@/components/Address/List';
import ProfileStructure from '@/components/ProfileStructure';
import { useAuth } from '@/contexts/AuthContext';
import getUserPermissions from '@/utils/permissions';
import NotFound from '@/app/not-found';
import AccessDenied from '@/app/access-denied';

const UserEdit: React.FC = () => {
  const { notification } = App.useApp();
  const [form] = Form.useForm<IUserCreate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { user, userLoading } = useUser(
    useMemo(() => ({ id }), [id])
  );

  const { permissions } = useAuth();
  if (!permissions.includes('usuarios_editar')) return AccessDenied();

  useEffect(() => {
    if (user?.id) {
      form.setFieldsValue({
        email: user.email,
        username: user.username,
        is_active: user.is_active,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        cpf: user.cpf,
        rg: user.rg,
      });
    }
  }, [user, form]);

  const submitData = useCallback(() => {
    if (isLoading || !user?.id) return;

    form.validateFields().then(values => {
      setIsLoading(true);

      const dataToUpdate: Partial<IUserCreate> = {
        email: values.email,
        username: values.username,
        is_active: values.is_active,
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        cpf: values.cpf,
        rg: values.rg,
      };

      // Envia senha somente se informada
      if (values.password) {
        dataToUpdate.password = values.password;
        dataToUpdate.password_confirmation = values.password_confirmation;
      }

      userService
        .update(user.id, dataToUpdate)
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
  }, [form, isLoading, user, notification, router]);

  return (
    <div className="w-7xl container ">
      <ProfileStructure
        user={user}
        isLoading={userLoading}
        navTitle="Sistema > Usuarios"
        title="Editar Usuarios"
        menuButtons={[
          {
            title: 'Informações',
            link: `/dashboard/configuracoes/usuarios/${id}/editar`,
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
            link: `/dashboard/configuracoes/usuarios/cadastrar`,
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
            {permissions.includes('permissoes_visualizar') && user?.perfis?.length! > 0 && (
              <>
                <SectionSeparator title="Cargos" />
                <div className="container-conteudo-small mb-1">
                  {user?.perfis ? (
                    <ProfileView userData={user} />
                  ) : (
                    <p>Nenhum perfil associado ao usuário.</p>
                  )}
                </div>
              </>
            )}
          </div>
          <div className='col-span-6'>
            {permissions.includes('endereco_visualizar') &&
              <>
                <SectionSeparator title="Endereços" />
                <div className="container-conteudo-small mb-4">
                  <AddressList field="user_id" value={id} />
                </div>
              </>}
          </div>
        </div>
      </ProfileStructure>
    </div>
  );
};

export default React.memo(UserEdit);
