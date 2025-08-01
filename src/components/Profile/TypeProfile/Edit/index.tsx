'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Form, Button, App } from 'antd';
import { useRouter, useParams } from 'next/navigation';
import TipoPerfilForm from '../Form';
import SectionSeparator from '@/components/MiniComponents/SectionSeparator';
import { useProfileType } from '@/hooks/useProfileType'; // <- importa seu hook
import { ITipoPerfil } from '@/interfaces/IPerfil';
import { profileTypeService } from '@/services/profile.type.service';

const TipoPerfilEdit: React.FC = () => {
  const { notification } = App.useApp();
  const [form] = Form.useForm<ITipoPerfil>();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { profileType, profileTypeLoading, profileTypeRefresh } = useProfileType({ id });

  const [saving, setSaving] = useState(false);

  // Preenche os campos do formulário quando os dados forem carregados
  useEffect(() => {
    if (profileType) {
      form.setFieldsValue({
        nome: profileType.nome,
        descricao: profileType.descricao,
        ativo: profileType.ativo,
      });
    }
  }, [profileType, form]);

  // Submissão do formulário
  const onFinish = useCallback((values: Partial<ITipoPerfil>) => {
    if (!id) return;

    setSaving(true);
    profileTypeService.update(id, values)
      .then(() => {
        notification.success({ message: 'Tipo Perfil atualizado com sucesso!' });
        router.back();
      })
      .catch(() => {
        notification.error({ message: 'Erro ao atualizar Tipo Perfil.' });
      })
      .finally(() => setSaving(false));
  }, [id, router, notification]);

  return (
    <div className="container w-7xl">
      <SectionSeparator title="Tipo de Perfil">
        <div className="container-conteudo-small mb-4">
          <Form form={form} onFinish={onFinish} layout="vertical">
            <TipoPerfilForm loading={profileTypeLoading || saving} />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={saving}
                className="bg-blue-600 hover:bg-blue-700 transition"
              >
                Salvar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </SectionSeparator>
    </div>
  );
};

export default React.memo(TipoPerfilEdit);
