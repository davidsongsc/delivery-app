'use client';

import flagsConfig from '@/components/constants/flags';
import FlagSwitch from '@/components/MiniComponents/FlagsSwitch';
import { IProdutoCreate } from '@/interfaces/IProduto';
import { Form, FormInstance, Input, Select, Switch, Checkbox, Upload } from 'antd';
import React, { useEffect, useState } from 'react';


interface ProductFormProps {
  form: FormInstance<IProdutoCreate>;
  isEditing?: boolean;
  permissions?: string[];
}

const ProductFormOptions: React.FC<ProductFormProps> = ({ form, isEditing = false, permissions }) => {

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item<IProdutoCreate> name="nome" hidden>
          <Input />
        </Form.Item>

        <Form.Item<IProdutoCreate> name="preco" hidden>
          <Input />
        </Form.Item>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-1'>
          <div className="grid grid-cols-2 gap-x-4 border p-4 rounded-lg bg-gray-100">

            <div className="col-span-2">
              <h2 className="text-2xl font-semibold mb-4">Gestão do Produto</h2>
              <hr className='mb-4' />
              <div className="grid grid-cols-12 gap-1">
                {flagsConfig.map(({ key, label }) => (
                  <div className="col-span-12" key={key}>
                    <FlagSwitch name={key} label={label} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-x-4 border p-4 rounded-lg bg-gray-100 col-span-1">
            <div className="col-span-4 md:col-span-6">
              <h2 className="text-2xl font-semibold mb-4">Atributos Físicos</h2>
              <hr className='mb-4' />
              <div className="grid grid-cols-1 gap-1">
                <Form.Item<IProdutoCreate>
                  label={<span className="font-bold">Peso (kg):</span>}
                  name="peso"
                  className='h-10'
                >
                  <Input placeholder="0.00" />
                </Form.Item>

                <Form.Item<IProdutoCreate>
                  label={<span className="font-bold">Volume (m³):</span>}
                  name="volume"
                >
                  <Input placeholder="0.00" />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-x-4 border p-4 rounded-lg bg-gray-100 col-span-2">
            <div className="col-span-12 md:col-span-6">
              <h2 className="text-2xl font-semibold mb-4">Montagem / Composição</h2>
              <div className="grid grid-cols-12 gap-1">
                <Form.Item<IProdutoCreate>
                  label={<span className="font-bold">Itens para Remoção:</span>}
                  name="remover"
                  className="col-span-12"
                >
                  <Select mode="tags" placeholder="Ex: tomate, cebola..." />
                </Form.Item>

                <Form.Item<IProdutoCreate>
                  label={<span className="font-bold">Itens para Adicionar:</span>}
                  name="adicionar"
                  className="col-span-12"
                >
                  {/* Você pode criar um componente customizado para lidar com múltiplos itens + valor */}
                  <Input.TextArea rows={3} placeholder='Formato: [{"item":"bacon","valor":3.5}]' />
                </Form.Item>

                <Form.Item<IProdutoCreate>
                  label={<span className="font-bold">Composição (fixa):</span>}
                  name="composicao"
                  className="col-span-12"
                >
                  <Select mode="tags" placeholder="Ex: pão, carne, queijo..." />
                </Form.Item>
              </div>
            </div>

          </div>
        </div>
        {/* Campos ocultos (tenant, etc.) */}
        <Form.Item name="tenant" hidden>
          <Input />
        </Form.Item>
      </Form >
    </>
  );
};

export default React.memo(ProductFormOptions);