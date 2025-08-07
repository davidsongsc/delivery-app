'use client';

import SelectCategoryAutoComplete from '@/components/Category/AutoComplete';
import { IProdutoCreate } from '@/interfaces/IProduto';
import { Form, FormInstance, Input, Select, InputNumber, Checkbox, Upload, Modal } from 'antd'; // Importe o Modal do Ant Design
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons'; // Importe o ícone de 'mais'

const { Option } = Select;

interface ProductFormProps {
  form: FormInstance<IProdutoCreate>;
  isEditing?: boolean;
  permissions?: string[];
}

const ProductFormInfo: React.FC<ProductFormProps> = ({ form, isEditing = false, permissions }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handlePreview = async (file: any) => {
    const imageUrl = file.url || (file.preview as string);
    setPreviewImage(imageUrl);
    setPreviewVisible(true);
    setPreviewTitle(file.name || '');
  };

  const handleCancel = () => setPreviewVisible(false);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Form form={form} layout="vertical" requiredMark={false}>
        <div className='grid grid-cols-12 gap-1 mb-4 '>
          {/* Identificação */}
          <div className="col-span-12 md:col-span-3 bg-darkBg rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-4">Identificação</h2>
            <div className="grid grid-cols-12 gap-1">
              <Form.Item<IProdutoCreate>
                label={<span className="font-bold">Nome Exibição:</span>}
                name="nome"
                className="col-span-12"
                rules={[{ required: true, message: 'Campo obrigatório' }]}
              >
                <Input placeholder="Digite o nome do produto..." />
              </Form.Item>
              <Form.Item<IProdutoCreate>
                label={<span className="font-bold">Nome Interno:</span>}
                name="nome_interno"
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
          <div className="col-span-12 md:col-span-6 bg-darkBg p-4 rounded-lg">
            <Form.Item<IProdutoCreate>
              label={<h3 className="font-bold text-xl">Imagens:</h3>}
              name="imagens"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) return e;
                return e?.fileList;
              }}
            >
              <Upload
                listType="picture-card"
                multiple
                accept="image/*"
                beforeUpload={(file) => {
                  return false;
                }}
                onPreview={handlePreview}
              >
                {permissions?.includes('produtos_editar_imagem') && uploadButton}
              </Upload>
            </Form.Item>
          </div>
          {/* Preço e Estoque */}
          <div className="col-span-12 md:col-span-3 bg-darkBg rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-4">Preço e Estoque</h2>
            <div className="grid grid-cols-12 gap-1">
              <Form.Item<IProdutoCreate>
                label={<span className="font-bold">Preço (R$):</span>}
                name="preco"
                className="col-span-12"
                rules={[{ required: true, message: 'Campo obrigatório' }]}
              >
                <Input placeholder="0.00" disabled={permissions?.includes('produtos_editar_preco')} value={0} />
              </Form.Item>
              <Form.Item<IProdutoCreate>
                label={<span className="font-bold">Desconto (%):</span>}
                name="desconto"
                className="col-span-6"
              >
                <InputNumber
                  min={0}
                  max={100}
                  placeholder="0"
                  value={0}
                  className="w-full"
                  disabled={permissions?.includes('produtos_editar_desconto')} />
              </Form.Item>
              <Form.Item<IProdutoCreate>
                label={<span className="font-bold">Estoque:</span>}
                name="estoque"
                className="col-span-6"
                rules={[{ required: true, message: 'Campo obrigatório' }]}
              >
                <InputNumber
                  min={0}
                  className="w-full"
                  placeholder="0"
                  value={10}
                  disabled={permissions?.includes('produtos_editar_estoque')} />
              </Form.Item>
              <Form.Item<IProdutoCreate>
                label={<span className="font-bold">Quantidade Padrão:</span>}
                name="quantidade"
                className="col-span-6"
              >
                <InputNumber min={1} className="w-full" disabled={permissions?.includes('produtos_editar_quantidade')} />
              </Form.Item>
              <Form.Item<IProdutoCreate>
                label={<span className="font-bold">Produto Promocional:</span>}
                name="promocional"
                className="col-span-6"
                valuePropName="checked"
              >
                <Checkbox disabled={permissions?.includes('produtos_editar_promocional')}>Sim</Checkbox>
              </Form.Item>

              <Form.Item<IProdutoCreate>
                label={<span className="font-bold">Status:</span>}
                name="ativo"
                className="col-span-6"
                valuePropName="checked"
              >
                <Checkbox disabled={permissions?.includes('produtos_editar_promocional')}>Sim</Checkbox>
              </Form.Item>
            </div>
          </div>
        </div>
        {/* Campos ocultos (tenant, etc.) */}
        <Form.Item name="tenant" hidden>
          <Input />
        </Form.Item>
      </Form>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="Exibição da imagem" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default React.memo(ProductFormInfo);