'use client';

import { IClientsCreate } from '@/interfaces/IClients';
import { Form, FormInstance, Input, Select, Checkbox } from 'antd';
import dynamic from 'next/dynamic';
import React from 'react';


const RichEditor = dynamic(
  () => import("@/components/MiniComponents/RichEditor"),
  { ssr: false }
);

interface UserFormProps {
  form: FormInstance<IClientsCreate>;
  isEditing?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ form, isEditing = false }) => {
  return (
    <Form form={form} layout="vertical" requiredMark={false}>
      <div className='grid grid-cols-12 gap-x-1 border rounded-lg  shadow'>
        <div className='col-span-12 bg-darkBg rounded-lg p-2 m-1 grid grid-cols-12 gap-x-2'>

          <Form.Item<IClientsCreate>
            className="col-span-3"
            label={<span className="font-bold">Nome:</span>}
            name="nome"
            rules={[{ required: true, message: 'Campo obrigatório' }]}
          >
            <Input type='text' placeholder="Digite o email..." />
          </Form.Item>

          <Form.Item<IClientsCreate>
            className="col-span-3"
            label={<span className="font-bold">Telefone:</span>}
            name="telefone"
            rules={[{ required: true, message: 'Campo obrigatório' }]}
          >
            <Input type='phone' placeholder="Digite o email..." />
          </Form.Item>

          <Form.Item<IClientsCreate>
            className="col-span-3"
            label={<span className="font-bold">Email:</span>}
            name="email"
            rules={[{ required: true, message: 'Campo obrigatório' }]}
          >
            <Input type='email' placeholder="Digite o email..." />
          </Form.Item>
          <Form.Item<IClientsCreate>
            className="col-span-3"
            label="Status"
            name="ativo"
            initialValue={true}
            rules={[{ required: true, message: 'Campo obrigatório' }]}
          >
            <Select>
              <Select.Option value={true}>Ativo</Select.Option>
              <Select.Option value={false}>Inativo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item<IProdutoCreate>
            label={<span className="font-bold">Observacoes:</span>}
            name="observacoes"
            className="col-span-12 form-observations"
          >
            {/* Você pode criar um componente customizado para lidar com múltiplos itens + valor */}
            <RichEditor />
          </Form.Item>


        </div>



      </div>


    </Form>
  );
};

export default React.memo(UserForm);