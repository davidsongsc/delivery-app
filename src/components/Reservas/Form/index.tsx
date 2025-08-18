'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useMesas } from '@/hooks/useMesas';
import { IReservasCreate } from '@/interfaces/IReservas';
import { DatePicker } from 'antd';
import { Form, FormInstance, Input, Select, Checkbox } from 'antd/es/index';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import React from 'react';


const RichEditor = dynamic(
  () => import("@/components/MiniComponents/RichEditor"),
  { ssr: false }
);

interface UserFormProps {
  form: FormInstance<IReservasCreate>;
  isEditing?: boolean;
}

const ReservasForm: React.FC<UserFormProps> = ({ form, isEditing = false }) => {
  const { user } = useAuth(); // Assume que useAuth fornece o objeto de usuário

  const { mesas, mesasLoading, mesasRefresh } = useMesas(user?.tenant!);

  return (


    <Form form={form} layout="vertical" requiredMark={false}>
      <div className='grid grid-cols-12 gap-x-1 border rounded-lg  shadow'>
        <div className='col-span-12 bg-darkBg rounded-lg p-2 m-1 grid grid-cols-12 gap-x-2'>

          <Form.Item<IReservasCreate>
            className="col-span-3"
            label={<span className="font-bold">Nome:</span>}
            name="cliente_nome"
            rules={[{ required: true, message: 'Campo obrigatório' }]}
          >
            <Input type='text' placeholder="Digite o email..." />
          </Form.Item>

          <Form.Item<IReservasCreate>
            className="col-span-3"
            label={<span className="font-bold">Telefone:</span>}
            name="telefone"
            rules={[{ required: true, message: 'Campo obrigatório' }]}
          >
            <Input type='phone' placeholder="Digite o email..." />
          </Form.Item>

          <Form.Item<IReservasCreate>
            className="col-span-3"
            label={<span className="font-bold">Email:</span>}
            name="email"
            rules={[{ required: true, message: 'Campo obrigatório' }]}
          >
            <Input type='email' placeholder="Digite o email..." />
          </Form.Item>
          <Form.Item<IReservasCreate>
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
          <Form.Item<IReservasCreate>
            className="col-span-3"
            label={<span className="font-bold">Mesa:</span>}
            name="mesa"
            rules={[{ required: true, message: 'Selecione a mesa' }]}
          >
            <Select
              loading={mesasLoading}
              placeholder="Selecione uma mesa"
              onDropdownVisibleChange={(open) => {
                if (open) mesasRefresh();
              }}
            >
              {mesas?.map((mesa) => (
                <Select.Option key={mesa.id} value={mesa.id}>
                  Mesa {mesa.numero} — {mesa.status}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<IReservasCreate>
            className="col-span-3"
            label={<span className="font-bold">Quantidade de pessoas:</span>}
            name="quantidade_pessoas"
            rules={[{ required: true, message: 'Campo obrigatório' }]}
          >
            <Input type='number' placeholder="10" />
          </Form.Item>

          <Form.Item
            label="Data e Hora"
            name="data_hora"
            initialValue={dayjs()}
            className='col-span-3'
            rules={[
              { required: true, message: "Campo obrigatório" },
            ]}
          >
            <DatePicker format="DD/MM/YYYY HH:mm" />
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

export default React.memo(ReservasForm);