'use client';

import { Form, Input,  FormInstance } from 'antd';
import React, { useEffect, useState } from 'react';
import { IPerfil } from '@/interfaces/IPerfil';
import { profileTypeService } from '@/services/profile.type.service';
import { Select } from 'antd/lib';

interface ProfileFormProps {
  form: FormInstance<IPerfil>;
  isEditing?: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ form, isEditing = false }) => {
  const [tipos, setTipos] = useState<{ id: string; nome: string }[]>([]);
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    profileTypeService.getAll().then((response) => {
      const data = response.data.results;
      setTipos(data);
      setOptions(data.map((tipo) => ({ value: tipo.id, label: tipo.nome })));
    });
  }, []);

  return (
    <Form form={form} layout="vertical" requiredMark={false}>
      <div className="grid grid-cols-12 gap-x-4">
        <Form.Item
          name="nome"
          label={<span className="font-bold">Nome do Cargo:</span>}
          className="col-span-12 md:col-span-6"
          rules={[{ required: true, message: 'Campo obrigatório' }]}
        >
          <Input placeholder="Nome do perfil/cargo" />
        </Form.Item>

        <Form.Item
          name="tipo_id"
          label={<span className="font-bold">Tipo de Perfil:</span>}
          className="col-span-12 md:col-span-6"
          rules={[{ required: true, message: 'Campo obrigatório' }]}
        >
          <Select
            showSearch
            className='w-full'
            placeholder="Digite ou selecione um tipo"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children?.toString().toLowerCase() ?? "").includes(input.toLowerCase())
            }
          >
            {tipos.map((tipo) => (
              <Select.Option key={tipo.id} value={tipo.id}>
                {tipo.nome}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>



        <Form.Item
          name="descricao"
          label={<span className="font-bold">Descrição:</span>}
          className="col-span-12"
        >
          <Input.TextArea rows={3} placeholder="Descreva a função do perfil..." />
        </Form.Item>
      </div>
    </Form>
  );
};

export default React.memo(ProfileForm);
