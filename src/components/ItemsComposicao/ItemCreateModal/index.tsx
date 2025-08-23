'use client'

import React, { useMemo, useState } from 'react'
import { Modal, Form, Input, Button, Select, Switch, notification } from 'antd'
import { itensService } from '@/services/itens.service'
import { useCategorias } from '@/hooks/useCategories'
import { useDebounce } from '@/hooks/useDebounce'
import { useAuth } from '@/contexts/AuthContext'

interface ItemCreateModalProps {
  visible: boolean
  onClose: () => void
  onCreated: (id: string) => void
}

export const ItemCreateModal: React.FC<ItemCreateModalProps> = ({ visible, onClose, onCreated }) => {
  const [form] = Form.useForm()
  const [filters, setFilters] = useState<object>({});
  const debouncedFilter = useDebounce(filters, 2000);
  const { user } = useAuth();
  const currentTenantId = user?.tenant || '';
  const { categorias } = useCategorias(useMemo(() => ({
    page: 1,
    limit: 1000,
    filters: { ...debouncedFilter },

  }), []))

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const payload = {
        ...values,
        tenant: currentTenantId, 
      }
      const res = await itensService.create(payload)
      notification.success({ message: 'Item criado com sucesso!' })
      form.resetFields()
      onCreated(res.data.id)
      onClose()
    } catch (err) {
      notification.error({ message: 'Erro ao criar item.' })
    }
  }

  return (
    <Modal
      title="Criar novo item"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="nome" label="Nome" rules={[{ required: true, message: 'Digite o nome do item' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="descricao" label="Descrição">
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="categoria" label="Categoria" rules={[{ required: true, message: 'Selecione a categoria' }]}>
          <Select placeholder="Selecione uma categoria">
            {categorias.map(cat => (
              <Select.Option key={cat.id} value={cat.id}>
                {cat.nome}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="ativo" label="Ativo" valuePropName="checked" initialValue={true}>
          <Switch />
        </Form.Item>

        <Button type="primary" onClick={handleSubmit} block>
          Salvar
        </Button>
      </Form>
    </Modal>
  )
}
