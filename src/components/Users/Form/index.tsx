'use client';

import PageSection from '@/components/MiniComponents/PageSection';
import { IUserCreate } from '@/interfaces/IUser';
import formatPhone from '@/utils/formatPhone';
import { Form, FormInstance, Input, Select, Checkbox } from 'antd';
import React from 'react';

interface UserFormProps {
  form: FormInstance<IUserCreate>;
  isEditing?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ form, isEditing = false }) => {
  return (
    <Form form={form} layout="vertical" requiredMark={false}>
      <div className='grid grid-cols-12 gap-x-1 border rounded-lg  shadow'>
        <div className='col-span-2 bg-darkBg rounded-lg p-2 m-1'>
          <h2 className="text-2xl font-semibold mb-4 col-span-6">Login</h2>

          <div className="grid grid-cols-6 gap-x-4">

            <Form.Item<IUserCreate>
              className="col-span-6"
              label={<span className="font-bold">Email:</span>}
              name="email"
              rules={[{ required: true, message: 'Campo obrigatório' }]}
            >
              <Input placeholder="Digite o email..." />
            </Form.Item>

            <Form.Item<IUserCreate>
              className="col-span-6"
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
              className="col-span-6 "
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
            <Form.Item<IUserCreate>
              className="col-span-3"
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
              className="col-span-3 "
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
              className="col-span-3 "
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


        <div className='col-span-3 bg-darkBg rounded-lg p-2 m-1'>
          <Form.Item<IUserCreate>
            className="col-span-2 "
            label={<span className="font-bold">Usuário (username):</span>}
            name="username"
            rules={[{ required: true, message: 'Campo obrigatório' }]}
          >
            <Input placeholder="Digite o nome de usuário..." />
          </Form.Item>
          <Form.Item<IUserCreate>
            className="col-span-2 "
            label="Senha App"
            name="userpass"
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
            className="col-span-2 "
            label="Confirmação de senha App"
            name="userpass_confirmation"
            dependencies={['userpass']}
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
                      if (!value || getFieldValue('userpass') === value) {
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
        <div className='col-span-3 bg-darkBg rounded-lg p-2 m-1'>
          <Form.Item<IUserCreate>
            className="col-span-3"
            label={<span className="font-bold">Telefone:</span>}
            name="phone"
            getValueFromEvent={(e) => formatPhone(e.target.value)}
          >
            <Input placeholder="Digite o telefone..." maxLength={15} />
          </Form.Item>

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

        </div>

      </div>


    </Form>
  );
};

export default React.memo(UserForm);