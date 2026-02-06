'use client';

import SelectCategoryAutoComplete from '@/components/Category/AutoComplete';
import { IProdutoCreate } from '@/interfaces/IProduto';
import { Form, FormInstance, Input, Select, InputNumber, Upload, Modal } from 'antd';
import React, { useCallback, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import flagsConfig from '@/components/constants/flags';
import FlagSwitch from '@/components/MiniComponents/FlagsSwitch';
import SectionSeparator from '@/components/MiniComponents/SectionSeparator';
import Image from 'next/image';
import { formatCurrencyBR, parseCurrencyBR } from '@/utils/formatCurrency';
import dynamic from 'next/dynamic';

const RichEditor = dynamic(
  () => import("@/components/MiniComponents/RichEditor"),
  { ssr: false }
);

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

  const formatPrecoValue = useCallback((value: number | string) => {
    if (typeof value === 'number') {
      return formatCurrencyBR(String(value));
    }
    return value;
  }, []);

  const parsePrecoValue = useCallback((value: string) => {
    return parseCurrencyBR(value);
  }, []);

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
                  label={<span className="font-bold text-sm">Nome Cardápio:</span>}
                  name="nome"
                  className="col-span-6"
                  rules={[{ required: true, message: 'Campo obrigatório' }]}
                >
                  <Input placeholder="Digite o nome do produto..." />
                </Form.Item>
                <Form.Item<IProdutoCreate>
                  label={<span className="font-bold text-sm">Nome Sistema:</span>}
                  name="nome_interno"
                  className="col-span-6"
                  rules={[{ required: true, message: 'Campo obrigatório' }]}
                >
                  <Input placeholder="Digite o nome do produto..." />
                </Form.Item>
                <Form.Item<IProdutoCreate>
                  label={<span className="font-bold text-sm">Categoria:</span>}
                  name="categoria_id"
                  className="col-span-12 md:col-span-6"
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
                  className="col-span-12 md:col-span-6"
                >
                  <Input placeholder="Código interno (opcional)" />
                </Form.Item>


              </div>
              <div className="grid grid-cols-12 gap-1">
                <Form.Item<IProdutoCreate>
                  label={<span className="font-bold text-sm">Preço (R$):</span>}
                  name="preco"
                  className="col-span-6 md:col-span-3"
                  initialValue={0}
                  rules={[{ required: true, message: 'Campo obrigatório' }]}
                >
                  <Input
                    disabled={!permissions?.includes('produtos_editar_preco')}
                    placeholder="R$ 0,00"
                    formatter={formatPrecoValue}
                    parser={parsePrecoValue}
                  />
                </Form.Item>
                <Form.Item<IProdutoCreate>
                  label={<span className="font-bold text-sm">Desconto (%):</span>}
                  name="desconto"
                  className="col-span-6 md:col-span-3"
                  initialValue={0}
                >
                  <InputNumber
                    min={0}
                    max={100}
                    placeholder="0"
                    className="w-full"
                    disabled={!permissions?.includes('produtos_editar_desconto')} />
                </Form.Item>
                <Form.Item<IProdutoCreate>
                  label={<span className="font-bold">Estoque:</span>}
                  name="estoque"
                  className="col-span-6 md:col-span-3"
                  rules={[{ required: true, message: 'Campo obrigatório' }]}
                  initialValue={10}
                >
                  <InputNumber
                    min={0}
                    className="w-full"
                    placeholder="0"
                    disabled={!permissions?.includes('produtos_editar_estoque')} />
                </Form.Item>
                <Form.Item
                  label={<span className="font-semibold ">Status</span>}
                  name="ativo"
                  initialValue={true}
                  className="col-span-6 md:col-span-3"
                >
                  <Select
                    disabled={!permissions?.includes('produtos_editar_status')}
                    options={[
                      { label: "Disponível", value: true },
                      { label: "Indisponível", value: false },
                    ]}
                    className="w-full"
                    size="medium"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-span-6 bg-darkBg p-2 rounded-lg">
              <Form.Item<IProdutoCreate>
                label={<h3 className="font-bold text-xl">Galeria:</h3>}
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
                  beforeUpload={() => false}
                  onPreview={handlePreview}
                >
                  {permissions?.includes('produtos_editar_imagem') && uploadButton}
                </Upload>
              </Form.Item>
            </div>
          </div>
        </SectionSeparator>

        <SectionSeparator title="Detalhes Operacionais" expanded={true}>
          <div className='grid grid-cols-6 md:grid-cols-12 gap-1 container-conteudo-small '>
            <div className="grid grid-cols-2 gap-x-4 border p-4 rounded-lg bg-gray-100 col-span-6">
              <div className="col-span-2">
                <h2 className="text-2xl font-semibold mb-4">Gestão do Produto</h2>
                <hr className='mb-4' />
                <div className="grid grid-cols-12 gap-74">
                  {flagsConfig.map(({ key, label }) => (

                    <FlagSwitch key={key} name={['flags', key]} label={label} />

                  ))}

                </div>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-x-4 border p-4 rounded-lg bg-gray-100 col-span-6">
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
            <div className=" border p-4 rounded-lg bg-gray-100 col-span-6 md:col-span-12">
              <Form.Item<IProdutoCreate>
                className="form-observations"
                name="descricao"
              >
                <RichEditor />
              </Form.Item>
            </div>
          </div>

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