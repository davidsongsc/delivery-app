'use client';

import { IReservasCreate } from '@/interfaces/IReservas';
import { Form, FormInstance, Input, DatePicker, InputNumber } from 'antd';
import dynamic from 'next/dynamic';
import React from 'react';

const RichEditor = dynamic(
  () => import("@/components/MiniComponents/RichEditor"),
  { ssr: false }
);

interface ReservaClienteFormProps {
  form: FormInstance<IReservasCreate>;
}

const ReservaClienteForm: React.FC<ReservaClienteFormProps> = ({ form }) => {
  return (
    <Form form={form} layout="vertical" requiredMark={false}>
      <div className='grid grid-cols-12 gap-x-2 border rounded-lg shadow p-4'>

        <Form.Item<IReservasCreate>
          className="col-span-6"
          label="cliente_nome"
          name="cliente_nome"
          rules={[{ required: true, message: 'Informe seu nome' }]}
        >
          <Input placeholder="Digite seu nome" />
        </Form.Item>

        <Form.Item<IReservasCreate>
          className="col-span-6"
          label="Telefone"
          name="telefone"
          rules={[{ required: true, message: 'Informe seu telefone' }]}
        >
          <Input placeholder="(xx) xxxxx-xxxx" />
        </Form.Item>

        <Form.Item<IReservasCreate>
          className="col-span-6"
          label="Email"
          name="email"
          rules={[{ type: 'email', message: 'Digite um email válido' }]}
        >
          <Input placeholder="Digite seu email (opcional)" />
        </Form.Item>

        <Form.Item<IReservasCreate>
          className="col-span-3"
          label="Qtd. Pessoas"
          name="quantidade_pessoas"
          initialValue={2}
          rules={[{ required: true, message: 'Informe a quantidade' }]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>

        <Form.Item<IReservasCreate>
          className="col-span-6"
          label="Data e Hora"
          name="data_hora"
          rules={[{ required: true, message: 'Selecione data e hora' }]}
        >
          <DatePicker showTime className="w-full" format="DD/MM/YYYY HH:mm" />
        </Form.Item>

        <Form.Item<IReservasCreate>
          className="col-span-12"
          label="Observações"
          name="observacoes"
        >
          <RichEditor />
        </Form.Item>

      </div>
    </Form>
  );
};

export default React.memo(ReservaClienteForm);
