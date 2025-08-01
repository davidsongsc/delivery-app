'use client';

import { IPerfil } from '@/interfaces/IPerfil';
import { Button, Form, App } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProfileStructure from '@/components/ProfileStructure';
import SectionSeparator from '@/components/MiniComponents/SectionSeparator';
import { profileService } from '@/services/profile.service';
import ProfileForm from '../Form'; // seu form de perfil aqui

const ProfileEdit: React.FC = () => {
  const { notification } = App.useApp();
  const [form] = Form.useForm<IPerfil>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [profile, setProfile] = useState<IPerfil | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const fetchProfile = useCallback(() => {
    setLoadingProfile(true);
    profileService
      .getById(id)
      .then(data => setProfile(data))
      .finally(() => setLoadingProfile(false));
  }, [id]);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        nome: profile.nome,
        descricao: profile.descricao,
        tipo_id: profile.tipo?.id ?? null, // seta o id do tipo ou limpa
      });
    }
  }, [profile, form]);


  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const submitData = useCallback(() => {
    if (isLoading || !profile?.id) return;

    form.validateFields().then(values => {
      setIsLoading(true);

      const updatedData: Partial<IPerfil> = {
        nome: values.nome,
        descricao: values.descricao,
        tipo_id: values.tipo_id, // usado para atualizar tipo
      };

      profileService
        .update(profile.id, updatedData)
        .then(() => {
          notification.success({
            message: 'Perfil atualizado com sucesso!',
          });
          router.back();
        })
        .catch(error => {
          const detail = error?.response?.data?.detail || 'Erro ao atualizar perfil';
          notification.error({ message: detail });
        })
        .finally(() => setIsLoading(false));
    });

  }, [form, isLoading, profile, notification, router]);

  return (
    <div className="container w-7xl">
      <SectionSeparator title="Informações do Perfil">
        <div className="container-conteudo-small mb-4">
          <ProfileForm form={form} isEditing />
          <Button type="primary" className="mt-4" onClick={submitData} loading={isLoading}>
            Salvar
          </Button>
        </div>
      </SectionSeparator>
    </div>
  );
};

export default React.memo(ProfileEdit);
