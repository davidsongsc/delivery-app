'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox, Select, FormInstance } from 'antd';
import { ITipoPerfil } from '@/interfaces/IPerfil';
import { nivelPermissaoService } from '@/services/nivel.permissao.service';

interface TipoPerfilFormProps {
    form: FormInstance<ITipoPerfil>;
    isEditing?: boolean;
}

const TipoPerfilForm: React.FC<TipoPerfilFormProps> = ({ form, isEditing = false }) => {
    const [niveis, setNiveis] = useState<{ id: string; nome: string }[]>([]);

    useEffect(() => {
        nivelPermissaoService.getAll().then(response => {
            setNiveis(response.data.results || []);
        });
    }, []);

    return (
        <Form form={form} layout="vertical" requiredMark={false}>
            <Form.Item
                name="nome"
                label={<span className="font-bold">Nome</span>}
                rules={[{ required: true, message: 'O nome é obrigatório' }]}
            >
                <Input placeholder="Nome do tipo de perfil" />
            </Form.Item>

            <Form.Item
                name="descricao"
                label={<span className="font-bold">Descrição</span>}
            >
                <Input.TextArea rows={3} placeholder="Descrição opcional" />
            </Form.Item>

            <Form.Item
                name="ativo"
                valuePropName="checked"
            >
                <Checkbox>Ativo</Checkbox>
            </Form.Item>

            <Form.Item
                name="nivel"
                label={<span className="font-bold">Nível de Permissão</span>}
                rules={[{ required: false }]}
            >
                <Select
                    placeholder="Selecione um nível"
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.children as string).toLowerCase().includes(input.toLowerCase())
                    }
                >
                    {niveis.map((nivel) => (
                        <Select.Option key={nivel.id} value={nivel.id}>
                            {nivel.nome}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    );
};

export default React.memo(TipoPerfilForm);
