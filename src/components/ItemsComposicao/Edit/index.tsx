'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Switch, Button, notification } from 'antd';
import { categoryService } from '@/services/category.service';
import { useAuth } from '@/contexts/AuthContext';
import { IItens, IItensCreate } from '@/interfaces/IITens';

const { Option } = Select;

interface ItemEditModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdated: (ItemAtualizada: IItens) => void;
  categoryToEdit: IItens | null;
  parentCategories?: IItens[];
}

export const ItemEditModal: React.FC<ItemEditModalProps> = ({
  visible,
  onClose,
  onUpdated,
  categoryToEdit,
  parentCategories = [],
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<IItensCreate>();
  const { user } = useAuth();
  const tenant = user?.tenant;
  useEffect(() => {
    if (categoryToEdit) {
      form.setFieldsValue({
        ...categoryToEdit,
        tenant: categoryToEdit.tenant || tenant,
      });
    } else {
      form.resetFields();
    }
  }, [categoryToEdit, form]);

  const handleFinish = async (values: IItensCreate) => {
    if (!categoryToEdit) return;
    setLoading(true);
    try {
      const valuesWithTenant = {
        ...values,
        tenant: tenant, 
      };

      const response = await categoryService.update(categoryToEdit.id.toString(), valuesWithTenant);
      notification.success({ message: 'Item atualizada com sucesso!' });
      onUpdated(response.data);
      form.resetFields();
      onClose();
    } catch (error) {
      notification.error({ message: 'Erro ao atualizar Item.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Editar Item"
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
          <Input placeholder="Nome da Item" />
        </Form.Item>

        <Form.Item
          label="Descrição"
          name="descricao"
          
        >
          <Input.TextArea placeholder="Descrição da Item" rows={4} />
        </Form.Item>

        <Form.Item label="Item Pai" name="parent">
          <Select
            allowClear
            placeholder="Selecione a Item pai (opcional)"
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
