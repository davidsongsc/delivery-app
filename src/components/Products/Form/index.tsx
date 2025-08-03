'use client';

import SelectCategoryAutoComplete from '@/components/Category/AutoComplete';
import { IProdutoCreate } from '@/interfaces/IProduto';
import { Form, FormInstance, Input, Select, InputNumber, Checkbox, Upload } from 'antd';
import React from 'react';

const { Option } = Select;

interface ProductFormProps {
  form: FormInstance<IProdutoCreate>;
  isEditing?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ form, isEditing = false }) => {

  return (
    <Form form={form} layout="vertical" requiredMark={false}>
      <h1 className="text-3xl font-semibold mb-4">{isEditing ? 'Editar Produto' : 'Novo Produto'}</h1>

      <div className='grid grid-cols-12 gap-4 mb-4 '>
        {/* Identificação */}
        <div className="col-span-12 md:col-span-3  bg-darkBg rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Identificação</h2>
          <div className="grid grid-cols-12 gap-4">
            <Form.Item<IProdutoCreate>
              label={<span className="font-bold">Nome:</span>}
              name="nome"
              className="col-span-12"
              rules={[{ required: true, message: 'Campo obrigatório' }]}
            >
              <Input placeholder="Digite o nome do produto..." />
            </Form.Item>
            <Form.Item<IProdutoCreate>
              label={<span className="font-bold">Categoria:</span>}
              name="categoria_id"
              className="col-span-12"
              rules={[{ required: true, message: 'Selecione uma categoria' }]}
            >
              <SelectCategoryAutoComplete />
            </Form.Item>
            <Form.Item<IProdutoCreate>
              label={<span className="font-bold">Descrição:</span>}
              name="descricao"
              className="col-span-12"
            >
              <Input.TextArea rows={4} placeholder="Descreva o produto..." />
            </Form.Item>

            <Form.Item<IProdutoCreate>
              label={<span className="font-bold">SKU:</span>}
              name="sku"
              className="col-span-6"
            >
              <Input placeholder="Código interno (opcional)" />
            </Form.Item>


          </div>
        </div>

        {/* Preço e Estoque */}
        <div className="col-span-12 md:col-span-3 bg-darkBg rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Preço e Estoque</h2>
          <div className="grid grid-cols-12 gap-4">
            <Form.Item<IProdutoCreate>
              label={<span className="font-bold">Preço (R$):</span>}
              name="preco"
              className="col-span-12"
              rules={[{ required: true, message: 'Campo obrigatório' }]}
            >
              <Input placeholder="0.00" />
            </Form.Item>

            <Form.Item<IProdutoCreate>
              label={<span className="font-bold">Desconto (%):</span>}
              name="desconto"
              className="col-span-6"
            >
              <InputNumber min={0} max={100} className="w-full" />
            </Form.Item>

            <Form.Item<IProdutoCreate>
              label={<span className="font-bold">Estoque:</span>}
              name="estoque"
              className="col-span-6"
              rules={[{ required: true, message: 'Campo obrigatório' }]}
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>

            <Form.Item<IProdutoCreate>
              label={<span className="font-bold">Quantidade Padrão:</span>}
              name="quantidade"
              className="col-span-6"
            >
              <InputNumber min={1} className="w-full" />
            </Form.Item>

            <Form.Item<IProdutoCreate>
              label={<span className="font-bold">Produto Promocional:</span>}
              name="promocional"
              className="col-span-6"
              valuePropName="checked"
            >
              <Checkbox>Sim</Checkbox>
            </Form.Item>
          </div>
        </div>
        <div className='col-span-12 md:col-span-6 bg-darkBg p-4 rounded-lg'>
          <Form.Item<IProdutoCreate>
            label={<span className="font-bold">Imagens:</span>}
            name="imagens"
            valuePropName="fileList"
            getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
            className="col-span-12"
          >
            <Upload
              listType="picture-card"
              beforeUpload={() => false}
              multiple
              accept="image/*"
            >
              <div>
                <span>+ Upload</span>
              </div>
            </Upload>
          </Form.Item>

        </div>



      </div>
      <div className="grid grid-cols-12 gap-x-4 border p-4 rounded-lg bg-gray-100">
        {/* Status */}
        <div className="col-span-12 md:col-span-3">
          <h2 className="text-2xl font-semibold mb-4">Status</h2>
          <div className="grid grid-cols-12 gap-4">
            <Form.Item<IProdutoCreate>
              label={<span className="font-bold">Ativo:</span>}
              name="ativo"
              className="col-span-6"
              valuePropName="checked"
              initialValue={true}
            >
              <Checkbox>Este produto está ativo</Checkbox>
            </Form.Item>
          </div>
        </div>



        {/* Atributos Físicos */}
        <div className="col-span-12 md:col-span-3">
          <h2 className="text-2xl font-semibold mb-4">Atributos Físicos</h2>
          <div className="grid grid-cols-12 gap-4">
            <Form.Item<IProdutoCreate>
              label={<span className="font-bold">Peso (kg):</span>}
              name="peso"
              className="col-span-6"
            >
              <Input placeholder="0.00" />
            </Form.Item>

            <Form.Item<IProdutoCreate>
              label={<span className="font-bold">Volume (m³):</span>}
              name="volume"
              className="col-span-6"
            >
              <Input placeholder="0.00" />
            </Form.Item>
          </div>
        </div>


        {/* Composição e adicionais */}
        <div className="col-span-12 md:col-span-6">
          <h2 className="text-2xl font-semibold mb-4">Montagem / Composição</h2>
          <div className="grid grid-cols-12 gap-4">
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

      {/* Campos ocultos (tenant, etc.) */}
      <Form.Item name="tenant" hidden>
        <Input />
      </Form.Item>
    </Form>
  );
};

export default React.memo(ProductForm);