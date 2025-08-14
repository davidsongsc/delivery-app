'use client';

import React, { useState } from 'react';
import { Modal, Form, Input, Select, Switch, Button, notification } from 'antd';
import { ICategory, ICategoryCreate } from '@/interfaces/ICategory';
import { categoryService } from '@/services/category.service';
import { useAuth } from '@/contexts/AuthContext';

const { Option } = Select;

interface CategoriaCreateModalProps {
  visible: boolean;
  onClose: () => void;
  onCreated: (novaCategoria: ICategory) => void;
  parentCategories?: ICategory[];
}

export const CategoriaCreateModal: React.FC<CategoriaCreateModalProps> = ({
  visible,
  onClose,
  onCreated,
  parentCategories = [],
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<ICategoryCreate>();
  const { user } = useAuth();
  const tenant = user?.tenant;
  const handleFinish = async (values: ICategoryCreate) => {
    setLoading(true);
    try {
      const valuesWithTenant = {
        ...values,
        tenant: tenant,
      };
      const response = await categoryService.create(valuesWithTenant);
      notification.success({ message: 'Categoria criada com sucesso!' });
      onCreated(response.data);
      form.resetFields();
      onClose();
    } catch (error) {
      notification.error({ message: 'Erro ao criar categoria.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Criar Categoria"
      open={visible}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ ativo: true, tipo: 'PRODUTO' }}
      >
        <Form.Item
          label="Nome"
          name="nome"
          rules={[{ required: true, message: 'Por favor, informe o nome.' }]}
        >
          <Input placeholder="Nome da categoria" />
        </Form.Item>

        <Form.Item
          label="Tipo"
          name="tipo"
          rules={[{ required: true, message: 'Por favor, selecione o tipo.' }]}
        >
          <Select>
            <Option value="PRODUTO">Produto</Option>
            <Option value="SERVICO">Serviço</Option>
            <Option value="OUTRO">Outro</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Categoria Pai" name="parent">
          <Select
            allowClear
            placeholder="Selecione a categoria pai (opcional)"
            options={parentCategories.map(cat => ({
              label: cat.nome,
              value: cat.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Ativo"
          name="ativo"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Criar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
