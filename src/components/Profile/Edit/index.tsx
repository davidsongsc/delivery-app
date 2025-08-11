'use client';

import { IPerfil } from '@/interfaces/IPerfil';
import { Button, Form, App } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProfileForm from '../Form';
import SectionSeparator from '@/components/MiniComponents/SectionSeparator';
import { useProfile } from '@/hooks/useProfile'; // importe seu hook
import { profileService } from '@/services/profile.service';

const ProfileEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { notification } = App.useApp();
  const [form] = Form.useForm<IPerfil>();

  const { profile, profileLoading, profileRefresh } = useProfile({ id });

  useEffect(() => {
    if (profile) {
      const permissoesObj = profile.permissoes?.reduce((acc, perm) => {
        acc[perm.codigo] = true;
        return acc;
      }, {} as Record<string, boolean>) ?? {};

      console.log('Permissões formatadas para form:', permissoesObj);

      form.setFieldsValue({
        nome: profile.nome,
        descricao: profile.descricao,
        tipos: profile.tipos?.map(t => t.id) ?? [],
        permissoes: permissoesObj,
      });
    }
  }, [profile, form]);

  const [isSaving, setIsSaving] = React.useState(false);

  const submitData = useCallback(() => {
    if (isSaving || !profile?.id) return;

    form.validateFields().then(values => {
      setIsSaving(true);

      profileService
        .update(profile.id, {
          nome: values.nome,
          descricao: values.descricao,
          tipo_id: values.tipo_id,
        })
        .then(() => {
          notification.success({ message: 'Perfil atualizado com sucesso!' });
          router.back();
        })
        .catch(error => {
          const detail = error?.response?.data?.detail || 'Erro ao atualizar perfil';
          notification.error({ message: detail });
        })
        .finally(() => setIsSaving(false));
    });
  }, [form, isSaving, profile, notification, router]);

  if (profileLoading) return <p>Carregando perfil...</p>;

  return (
    <div className="container w-7xl">
      <SectionSeparator title="Informações do Perfil">
        <div className="container-conteudo-small mb-4">
          <ProfileForm form={form} isEditing permissoes={profile?.permissoes} />
          <Button
            type="primary"
            className="mt-4"
            onClick={submitData}
            loading={isSaving}
          >
            Salvar
          </Button>
        </div>
      </SectionSeparator>
    </div>
  );
};

export default React.memo(ProfileEdit);
