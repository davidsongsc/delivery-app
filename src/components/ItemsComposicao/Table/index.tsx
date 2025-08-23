'use client'

import React, { useState } from 'react'
import { Table, InputNumber, Select, Button, notification, Popconfirm, Form, Tag, Space } from 'antd'
import { Edit3, Save, X, Trash2 } from 'lucide-react'
import { IProdutoComposicao } from '@/interfaces/IProdutoComposicao'
import { produtoComposicaoService } from '@/services/product-composition.service'

export const tipoOptions = [
    { value: 'FX', label: 'Fixo', color: 'blue' },
    { value: 'AD', label: 'Adicional', color: 'green' },
    { value: 'RM', label: 'Removível', color: 'red' },
    { value: 'AL', label: 'Alterado', color: 'orange' },
    { value: 'PC', label: 'Personalizado', color: 'purple' },
    { value: 'OP', label: 'Opcional', color: 'cyan' },
    { value: 'BS', label: 'Base', color: 'geekblue' },
    { value: 'CP', label: 'Complementar', color: 'gold' },
    { value: 'VR', label: 'Variação', color: 'magenta' },
    { value: 'CT', label: 'Customizado', color: 'volcano' },
    { value: 'NV', label: 'Nível', color: 'lime' },
    { value: 'PT', label: 'Ponto', color: 'brown' },
]

interface ProdutoComposicaoTableProps {
    composicao: IProdutoComposicao | null
    composicaoLoading?: boolean
    composicaoRefresh: () => void
}

export const ProdutoComposicaoTable: React.FC<ProdutoComposicaoTableProps> = ({ composicao, composicaoLoading, composicaoRefresh }) => {
    const [editingKey, setEditingKey] = useState<string | null>(null)
    const [form] = Form.useForm()

    const isEditing = (record: IProdutoComposicao) => record.id === editingKey

    const edit = (record: IProdutoComposicao) => {
        form.setFieldsValue({
            tipo: record.tipo,
            quantidade: record.quantidade,
            preco_extra: record.preco_extra,
        })
        setEditingKey(record.id)
    }

    const cancel = () => setEditingKey(null)

    const save = async (record: IProdutoComposicao) => {
        try {
            const values = await form.validateFields()
            await produtoComposicaoService.update(record.id, {
                produto: record.produto,
                item: record.item,
                tipo: values.tipo,
                quantidade: values.quantidade,
                preco_extra: values.preco_extra,
            })

            notification.success({ message: 'Item atualizado com sucesso!' })
            setEditingKey(null)
            composicaoRefresh()
        } catch (err) {
            console.error(err)
            notification.error({ message: 'Erro ao atualizar item.' })
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await produtoComposicaoService.remove(id)
            notification.success({ message: 'Item removido da composição.' })
            composicaoRefresh()
        } catch (err) {
            console.error(err)
            notification.error({ message: 'Erro ao remover item.' })
        }
    }

    const columns = [
        {
            title: 'Item',
            dataIndex: 'item_nome',
            key: 'item',
            render: (text: string) => <span className="font-medium">{text}</span>
        },
        {
            title: 'Tipo',
            dataIndex: 'tipo',
            key: 'tipo',
            render: (_: any, record: IProdutoComposicao) =>
                isEditing(record) ? (
                    <Form.Item name="tipo" noStyle>
                        <Select options={tipoOptions.map(o => ({ value: o.value, label: o.label }))} style={{ width: 140 }} />
                    </Form.Item>
                ) : (
                    <Tag color={tipoOptions.find(o => o.value === record.tipo)?.color || 'default'}>
                        {tipoOptions.find(o => o.value === record.tipo)?.label || record.tipo}
                    </Tag>
                ),
        },
        {
            title: 'Qtd',
            dataIndex: 'quantidade',
            key: 'quantidade',
            render: (_: any, record: IProdutoComposicao) =>
                isEditing(record) ? (
                    <Form.Item name="quantidade" noStyle>
                        <InputNumber min={1} />
                    </Form.Item>
                ) : (
                    <span>{record.quantidade}</span>
                ),
        },
        {
            title: 'Preço Extra',
            dataIndex: 'preco_extra',
            key: 'preco_extra',
            render: (_: any, record: IProdutoComposicao) =>
                isEditing(record) ? (
                    <Form.Item name="preco_extra" noStyle>
                        <InputNumber min={0} step={0.01} />
                    </Form.Item>
                ) : (
                    <span>R$ {Number(record.preco_extra).toFixed(2)}</span>
                ),
        },
        {
            title: 'Ações',
            key: 'acoes',
            render: (_: any, record: IProdutoComposicao) => {
                const editable = isEditing(record)
                return editable ? (
                    <Space>
                        <Button type="primary" icon={<Save size={16} />} onClick={() => save(record)} />
                        <Button icon={<X size={16} />} onClick={cancel} />
                    </Space>
                ) : (
                    <Space>
                        <Button type="link" icon={<Edit3 size={16} />} onClick={() => edit(record)} />
                        <Popconfirm
                            title="Deseja realmente remover este item?"
                            onConfirm={() => handleDelete(record.id)}
                        >
                            <Button danger icon={<Trash2 size={16} />} />
                        </Popconfirm>
                    </Space>
                )
            },
        },
    ]

    return (
        <Form form={form} component={false}>
            <Table
                rowKey="id"
                dataSource={composicao?.product_compositions?.result || []}
                columns={columns}
                loading={composicaoLoading}

                bordered
                className="rounded-2xl shadow-sm"
            />
        </Form>
    )
}
