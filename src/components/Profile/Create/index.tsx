'use client';

import PageTitle from '@/components/MiniComponents/PageTitle';
import { Button, Form, App } from 'antd';
import React, { useCallback, useState } from 'react';
import ProfileForm from '../Form';
import { useRouter } from 'next/navigation';
import { IPerfil } from '@/interfaces/IPerfil';
import { profileService } from '@/services/profile.service';

const ProfileCreate: React.FC = () => {
  const { notification } = App.useApp();
  const [form] = Form.useForm<IPerfil>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const submitData = useCallback(() => {
    if (isLoading) return;

    form.validateFields().then(values => {
      setIsLoading(true);

      profileService
        .create(values)
        .then((res) => {
          notification.success({
            message: 'Perfil criado com sucesso!',
          });

          router.push(`/dashboard/configuracoes/permissoes/${res.data.id}/editar`);
        })
        .catch(() => {
          notification.error({
            message: 'Erro ao criar perfil',
          });
        })
        .finally(() => setIsLoading(false));
    });
  }, [form, isLoading]);

  return (
    <div className="w-7xl container mx-auto pb-4">
      <PageTitle hasBackButton navTitle="Sistema > Perfis >" title="Cadastrar Perfil" />
      <div className="container-conteudo-small">
        <ProfileForm form={form} />
        <Button type="primary" className="mt-4" onClick={submitData} loading={isLoading}>
          Cadastrar
        </Button>
      </div>
    </div>
  );
};

export default React.memo(ProfileCreate);
