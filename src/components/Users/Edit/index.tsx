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

const UserEdit: React.FC = () => {
  const { notification } = App.useApp();
  const [form] = Form.useForm<IUserCreate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { user, userLoading } = useUser(
    useMemo(() => ({ id }), [id])
  );

  const { user: authUser } = useAuth();
  const permissions = getUserPermissions(authUser);

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
        isLoading={userLoading}
        navTitle="Sistema > Usuarios"
        title="Editar Usuarios"
        menuButtons={[
          {
            title: 'Informações',
            link: `/dashboard/configuracoes/colaboradores/${id}/editar`,
            isActive: true,
          },
          {
            title: 'Empresas vínculadas',
            link: `/dashboard/configuracoes/colaboradores/${id}/empresas`,
            isActive: false,
          },
        ]}
      >
        <SectionSeparator title="Geral" >
          <div className="container-conteudo-small mb-4">
            <UserForm form={form} isEditing />
            <>
              {permissions.includes('usuarios_criar') && (
                <Button type="primary" className="mt-4" onClick={submitData} loading={isLoading}>
                  Salvar
                </Button>
              )}</>

          </div>
        </SectionSeparator>
        {permissions.includes('permissoes_visualizar') && user?.perfis?.length! > 0 && (
          <SectionSeparator title="Perfil" >
            <div className="container-conteudo-small mb-1">
              {user?.perfis.map((perfil) => (
                <ProfileView key={perfil.id} perfil={perfil} />
              ))}
            </div>
          </SectionSeparator>
        )}
        {permissions.includes('endereco_visualizar') &&
          <>
            <SectionSeparator title="Endereços" >
              <div className="container-conteudo-small mb-4">
                <AddressList field="user_id" value={id} />
              </div>
            </SectionSeparator>
          </>}


      </ProfileStructure>
    </div>
  );
};

export default React.memo(UserEdit);
