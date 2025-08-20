'use client';

import SelectCategoryAutoComplete from '@/components/Category/AutoComplete';
import { IProdutoCreate } from '@/interfaces/IProduto';
import { Form, FormInstance, Input, Select, InputNumber, Checkbox, Upload, Modal, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import flagsConfig from '@/components/constants/flags';
import FlagSwitch from '@/components/MiniComponents/FlagsSwitch';
import SectionSeparator from '@/components/MiniComponents/SectionSeparator';
import Image from 'next/image';
import dynamic from "next/dynamic";
import { formatCurrencyBR, parseCurrencyBR } from '@/utils/formatCurrency';
const MAX_VALUE = 1_000_000; // 1 milhão

const RichEditor = dynamic(
  () => import("@/components/MiniComponents/RichEditor"),
  { ssr: false }
);

interface ProductFormProps {
  form: FormInstance<IProdutoCreate>;
  isEditing?: boolean;
  permissions?: string[];
  produto?: IProdutoCreate;

}

const ProductFormInfo: React.FC<ProductFormProps> = ({ form, isEditing = false, permissions, produto }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [preco, setPreco] = useState('0,00');


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
        <SectionSeparator title="Informações Gerais">
          <div className='grid grid-cols-12 gap-1 mb-4 container-conteudo-small'>

            <div className="col-span-12 md:col-span-6 bg-darkBg rounded-lg p-4">
              <div className="grid grid-cols-12 gap-1">
                <Form.Item<IProdutoCreate>
                  label={<span className="font-bold text-xl">Nome Cardapio:</span>}
                  name="nome"
                  className="col-span-6"
                  rules={[{ required: true, message: 'Campo obrigatório' }]}
                >
                  <Input placeholder="Digite o nome do produto..." />
                </Form.Item>
                <Form.Item<IProdutoCreate>
                  label={<span className="font-bold text-xl">Nome Sistema:</span>}
                  name="nome_interno"
                  className="col-span-6"
                  rules={[{ required: true, message: 'Campo obrigatório' }]}
                >
                  <Input placeholder="Digite o nome do produto..." />
                </Form.Item>
                <Form.Item<IProdutoCreate>
                  label={<span className="font-bold">Categoria:</span>}
                  name="categoria_id"
                  className="col-span-6"
                  rules={[{ required: true, message: 'Selecione uma categoria' }]}
                >
                  <SelectCategoryAutoComplete
                    value={form.getFieldValue('categoria_id')}
                    onChange={(id) => form.setFieldsValue({ categoria_id: id })}
                  />
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
            <div className="col-span-12 md:col-span-4 bg-darkBg rounded-lg p-4">
              <div className="grid grid-cols-12 gap-1">
                <Form.Item<IProdutoCreate>
                  label={<span className="font-bold text-xl">Preço (R$):</span>}
                  name="preco"
                  className="col-span-6"
                  initialValue={0}
                  rules={[{ required: true, message: 'Campo obrigatório' }]}
                >
                  <Input
                    disabled={!permissions?.includes('produtos_editar_preco')}
                    value={preco}
                    onChange={(e) => {
                      const formatted = formatCurrencyBR(e.target.value);
                      setPreco(formatted);
                      form.setFieldValue('preco', parseCurrencyBR(formatted));
                    }}
                    placeholder="R$ 0,00"
                  />
                </Form.Item>
                <Form.Item<IProdutoCreate>
                  label={<span className="font-bold">Desconto (%):</span>}
                  name="desconto"
                  className="col-span-6"
                  initialValue={0}
                >
                  <InputNumber
                    min={0}
                    max={100}
                    placeholder="0"
                    value={0}
                    className="w-full"
                    disabled={!permissions?.includes('produtos_editar_desconto')} />
                </Form.Item>
                <Form.Item<IProdutoCreate>
                  label={<span className="font-bold">Estoque:</span>}
                  name="estoque"
                  className="col-span-6"
                  rules={[{ required: true, message: 'Campo obrigatório' }]}
                  initialValue={10}
                >
                  <InputNumber
                    min={0}
                    className="w-full"
                    placeholder="0"
                    value={10}
                    disabled={!permissions?.includes('produtos_editar_estoque')} />
                </Form.Item>


                <Form.Item<IProdutoCreate>
                  label={<span className="font-bold">Status:</span>}
                  name="ativo"
                  className="col-span-6"
                  valuePropName="checked"
                  initialValue={true}

                >
                  <Switch
                    disabled={!permissions?.includes('produtos_editar_promocional')}
                    checkedChildren="Sim"
                    unCheckedChildren="Não"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 bg-darkBg p-4 rounded-lg">
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
                  beforeUpload={(file) => false}
                  onPreview={handlePreview}
                >
                  {permissions?.includes('produtos_editar_imagem') && uploadButton}
                </Upload>
              </Form.Item>


            </div>
          </div>
        </SectionSeparator>
        <SectionSeparator title="Descrição" expanded={false}>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-1 container-conteudo-small'>
            <Form.Item<IProdutoCreate>
              name="descricao"
              className="col-span-12"
            >
              <Input.TextArea rows={4} placeholder="Descreva o produto..." />
            </Form.Item>
          </div>


        </SectionSeparator>

        <SectionSeparator title="Detalhes Operacionais" expanded={false}>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-1 container-conteudo-small'>
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
                    className="col-span-12 form-observations"
                  >
                    {/* Você pode criar um componente customizado para lidar com múltiplos itens + valor */}
                    <RichEditor />
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
        </SectionSeparator>
      </Form >
      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
        width={800}
        style={{ top: 20 }}
      >
        <Image width={800} height={500} alt="Exibição da imagem" className='mx-auto object-contain' src={previewImage} />
      </Modal>
    </>
  );
};

export default React.memo(ProductFormInfo);