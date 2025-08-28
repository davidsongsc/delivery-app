'use client'

import React, { useEffect, useState } from 'react'
import { Modal, Form, InputNumber, Select, Button, notification, Radio } from 'antd'
import { produtoComposicaoService } from '@/services/product-composition.service'
import { ItensSelect } from '../Select'
import { tipoOptions } from '../Table'
import { Tooltip } from 'antd/lib'

interface ProdutoComposicaoCreateModalProps {
  visible: boolean;
  onClose: () => void;
  produtoId: string;
  onCreated: (novaComp: any) => void;
  composicaoRefresh?: () => void;
}


export const ProdutoComposicaoCreateModal: React.FC<ProdutoComposicaoCreateModalProps> = ({
  visible,
  onClose,
  produtoId,
  onCreated,
  composicaoRefresh,
}) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleFinish = async (values: any) => {
    setLoading(true)
    try {
      const payload = {
        produto: produtoId,   // nome correto do campo no backend
        item: values.item,     // id do item selecionado
        tipo: values.tipo,
        quantidade: values.quantidade,
        preco_extra: values.preco_extra || 0,
      }

      const response = await produtoComposicaoService.create(payload)
      notification.success({ message: 'Item adicionado à composição!' })
      composicaoRefresh?.()
      onCreated(response.data)
      form.resetFields()
      onClose()
    } catch (error) {
      console.error(error)
      notification.error({ message: 'Erro ao adicionar item.' })
    } finally {
      setLoading(false)
    }
  }

  const tipoSelecionado = Form.useWatch('tipo', form);

  return (
    <Modal
      title="Adicionar Item à Composição"
      width={600}
      open={visible}
      onCancel={() => {
        form.resetFields()
        onClose()
      }}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Item"
          name="item"
          rules={[{ required: true, message: 'Selecione o item.' }]}
        >
          <ItensSelect
            placeholder="Selecione o item"
            value={form.getFieldValue('item')}
            onChange={(val) => form.setFieldsValue({ item: val })}
          />
        </Form.Item>

        <Form.Item
          label="Tipo de Composição"
          name="tipo"
          initialValue="BS"
          rules={[{ required: true, message: 'Selecione o tipo.' }]}
        >
          <Radio.Group
            buttonStyle="solid"
            className="flex flex-wrap gap-2"
          >
            {tipoOptions.map(opt => (
              <Radio.Button
                key={opt.value}
                value={opt.value}
                className={`
        flex-1
        rounded-md
        
        text-gray-700
        hover:bg-primary hover:text-white
        checked:bg-red-600 checked:text-white
        transition-colors duration-200
        text-center
      `}
              >
                {opt.label}
              </Radio.Button>
            ))}
          </Radio.Group>

        </Form.Item>


        <Form.Item
          label={
            <span>
              Limite de Quantidade{' '}
              <Tooltip title="O cliente pode escolher até essa quantidade, os adicionais serão cobrados à parte.">
                <span className="text-gray-400 cursor-help">(?)</span>
              </Tooltip>
            </span>
          }
          name="quantidade"
          initialValue={1}
          rules={[{ required: true, message: 'Informe a quantidade.' }]}
        >
          <InputNumber min={1} className="w-full" disabled={!['BS', 'AD', 'AL', 'OP'].includes(tipoSelecionado)} />
        </Form.Item>

        <Form.Item
          label={
            <span>
              Preço Extra{' '}
              <Tooltip title="O valor adicional cobrado por unidade acima do limite.">
                <span className="text-gray-400 cursor-help">(?)</span>
              </Tooltip>
            </span>
          }
          name="preco_extra"
          initialValue={0}
        >
          <InputNumber
            min={0}
            step={0.01}
            className="w-full"
            disabled={!['BS', 'AD', 'AL', 'OP'].includes(tipoSelecionado)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            className="bg-red-600 hover:bg-red-700"
          >
            Adicionar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
