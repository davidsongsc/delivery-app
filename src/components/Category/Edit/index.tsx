'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Switch, Button, notification } from 'antd';
import { ICategory, ICategoryCreate } from '@/interfaces/ICategory';
import { categoryService } from '@/services/category.service';
import { useAuth } from '@/contexts/AuthContext';

const { Option } = Select;

interface CategoriaEditModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdated: (categoriaAtualizada: ICategory) => void;
  categoryToEdit: ICategory | null;
  parentCategories?: ICategory[];
}

export const CategoriaEditModal: React.FC<CategoriaEditModalProps> = ({
  visible,
  onClose,
  onUpdated,
  categoryToEdit,
  parentCategories = [],
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<ICategoryCreate>();
  const { user } = useAuth();
  const tenant = user?.tenant;
  useEffect(() => {
    if (categoryToEdit) {
      form.setFieldsValue({
        nome: categoryToEdit.nome,
        tipo: categoryToEdit.tipo,
        ativo: categoryToEdit.ativo,
        parent: categoryToEdit.parent ? categoryToEdit.parent.id : undefined,
      });
    } else {
      form.resetFields();
    }
  }, [categoryToEdit, form]);

  const handleFinish = async (values: ICategoryCreate) => {
    if (!categoryToEdit) return;
    setLoading(true);
    try {
      const valuesWithTenant = {
        ...values,
        tenant: tenant, 
      };

      const response = await categoryService.update(categoryToEdit.id.toString(), valuesWithTenant);
      notification.success({ message: 'Categoria atualizada com sucesso!' });
      onUpdated(response.data);
      form.resetFields();
      onClose();
    } catch (error) {
      notification.error({ message: 'Erro ao atualizar categoria.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Editar Categoria"
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
            options={parentCategories
              .filter(cat => !categoryToEdit || cat.id !== categoryToEdit.id) // evitar auto-referência
              .map(cat => ({
                label: cat.nome,
                value: cat.id,
              }))}
          />
        </Form.Item>

        <Form.Item label="Ativo" name="ativo" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Atualizar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
