'use client';

import PageSection from '@/components/MiniComponents/PageSection';
import { IUserCreate } from '@/interfaces/IUser';
import { Form, FormInstance, Input, Select, Checkbox } from 'antd';
import React from 'react';

interface UserFormProps {
  form: FormInstance<IUserCreate>;
  isEditing?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ form, isEditing = false }) => {
  return (
    <Form form={form} layout="vertical" requiredMark={false}>
      <h1 className="text-3xl font-semibold mb-4">{isEditing ? 'Editar Usuário' : 'Dados do Usuário'}</h1>

      <div className="grid grid-cols-12 gap-x-4">
        <Form.Item<IUserCreate>
          className="col-span-12 md:col-span-4"
          label={<span className="font-bold">Usuário (username):</span>}
          name="username"
          rules={[{ required: true, message: 'Campo obrigatório' }]}
        >
          <Input placeholder="Digite o nome de usuário..." />
        </Form.Item>

        <Form.Item<IUserCreate>
          className="col-span-12 md:col-span-4"
          label={<span className="font-bold">Email:</span>}
          name="email"
          rules={[{ required: true, message: 'Campo obrigatório' }]}
        >
          <Input placeholder="Digite o email..." />
        </Form.Item>
        <Form.Item<IUserCreate>
          className="col-span-12 md:col-span-4"
          label={<span className="font-bold">Telefone:</span>}
          name="phone"
        >
          <Input placeholder="Digite o telefone..." />
        </Form.Item>

      </div>
      <h2 className="text-2xl font-semibold mb-4">Informações pessoais</h2>
      <div className="grid grid-cols-12 gap-x-4">

        <Form.Item<IUserCreate>
          className="col-span-12 md:col-span-3"
          label={<span className="font-bold">Nome:</span>}
          name="first_name"
        >
          <Input placeholder="Digite o primeiro nome..." />
        </Form.Item>

        <Form.Item<IUserCreate>
          className="col-span-12 md:col-span-3"
          label={<span className="font-bold">Sobrenome:</span>}
          name="last_name"
        >
          <Input placeholder="Digite o sobrenome..." />
        </Form.Item>
        <Form.Item<IUserCreate>
          className="col-span-12 md:col-span-3"
          label={<span className="font-bold">CPF:</span>}
          name="cpf"
        >
          <Input placeholder="Digite o CPF..." />
        </Form.Item>

        {/* RG */}
        <Form.Item<IUserCreate>
          className="col-span-12 md:col-span-3"
          label={<span className="font-bold">RG:</span>}
          name="rg"
        >
          <Input placeholder="Digite o RG..." />
        </Form.Item>
        <Form.Item<IUserCreate>
          className="col-span-12 md:col-span-6"
          label={<span className="font-bold">Corporação:</span>}
          name="corporation"
        >
          <Input placeholder="Digite a corporação..." />
        </Form.Item>

        <Form.Item<IUserCreate>
          className="col-span-12 md:col-span-6"
          label={<span className="font-bold">Tenant:</span>}
          name="tenant"
        >
          <Input placeholder="Digite o ID do tenant..." /> {/* Ou um Select */}
        </Form.Item>
      </div>
      <div className='grid grid-cols-12 gap-x-4'>
        <div className='col-span-12 md:col-span-6'>
          <h2 className="text-2xl font-semibold mb-4">Configurações de Acesso</h2>
          <div className="grid grid-cols-12 gap-x-4">
            <Form.Item<IUserCreate>
              className="col-span-12 md:col-span-6"
              label="Status"
              name="is_active"
              initialValue={true}
              rules={[{ required: true, message: 'Campo obrigatório' }]}
            >
              <Select>
                <Select.Option value={true}>Ativo</Select.Option>
                <Select.Option value={false}>Inativo</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item<IUserCreate>
              className="col-span-12 md:col-span-3"
              name="is_staff"
              initialValue={false}
              label="Supersivor"
            >
              <Select>
                <Select.Option value={true}>Sim</Select.Option>
                <Select.Option value={false}>Não</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item<IUserCreate>
              className="col-span-12 md:col-span-3"
              name="is_superuser"
              initialValue={false}
              label="Gerente"
            >
              <Select>
                <Select.Option value={true}>Sim</Select.Option>
                <Select.Option value={false}>Não</Select.Option>
              </Select>
            </Form.Item>

          </div>
        </div>
        <div className='col-span-12 md:col-span-6'>
          <h2 className="text-2xl font-semibold mb-4">Acesso ao Sistema</h2>
          <div className="grid grid-cols-12 gap-4">

            <Form.Item<IUserCreate>
              className="col-span-12 md:col-span-6"
              label="Senha"
              name="password"
              rules={
                isEditing
                  ? []
                  : [{ required: true, message: 'Campo obrigatório' }]
              }
            >
              <Input.Password placeholder="Digite uma senha" />
            </Form.Item>

            {/* Confirmação de senha */}
            <Form.Item<IUserCreate>
              className="col-span-12 md:col-span-6"
              label="Confirmação de senha"
              name="password_confirmation"
              dependencies={['password']}
              rules={
                isEditing
                  ? []
                  : [
                    {
                      required: true,
                      message: 'Por favor, confirme sua senha!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('As senhas não são iguais!')
                        );
                      },
                    }),
                  ]
              }
            >
              <Input.Password placeholder="Confirme sua senha" />
            </Form.Item>
          </div>
        </div>

      </div>
    </Form>
  );
};

export default React.memo(UserForm);