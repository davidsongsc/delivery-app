'use client';
//import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Form, Input, Checkbox, Button, message } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import apiClient from '@/services/apiClient'
import axios from 'axios'
import { useCorporationStore } from '@/store/useCorporationStore';
import { CorporationForm } from '@/store/CorporationRegisterForm';
import { CorporationMembership } from '../Create';
interface CorporationFormProps {
    onFinish: (values: CorporationMembership) => Promise<void>;
    loading: boolean;
}
const MemberShipRegisterForm: React.FC<CorporationFormProps> = () => {
    // const router = useRouter();

    const { registerCorporation, loading } = useCorporationStore();

    const onFinish = async (values: CorporationForm) => {
        if (!values.aceite_termo_privacidade) {
            message.error('Você deve aceitar os termos de privacidade para continuar.')
            return
        }



        try {
            const response = await apiClient.post('/api/memberships/', values);
            message.success('Empresa cadastrada com sucesso!');
            //router.push('/corporation');
        } catch (error: unknown) {
            // Type guard para verificar se o erro é um AxiosError
            if (axios.isAxiosError(error)) {
                message.error(error.response?.data?.detail || 'Erro ao cadastrar empresa');
            } else if (error instanceof Error) {
                // Outro tipo de erro JS padrão
                message.error(error.message);
            } else {
                message.error('Erro desconhecido ao cadastrar empresa');
            }
            console.error(error);
        } finally {

        }

    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
            <h1 className="text-3xl font-semibold mb-6">Cadastrar Empresa</h1>
            <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    aceite_termo_privacidade: false,
                    consentimento_marketing: false,
                }}
            >
                <div className='grid grid-cols-12 gap-4'>


                    <Form.Item
                        label="Razão Social"
                        name="razao_social"
                        rules={[{ required: true, message: 'Por favor, insira a razão social!' }]}
                        className='col-span-6'
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Nome Fantasia"
                        name="nome_fantasia"
                        rules={[{ required: true, message: 'Por favor, insira o nome fantasia!' }]}
                        className='col-span-6'
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="CNPJ"
                        name="cnpj"
                        rules={[{ required: true, message: 'Por favor, insira o CNPJ!' }]}
                        className='col-span-12'
                    >
                        <Input placeholder="00.000.000/0000-00" />
                    </Form.Item>
                </div>
                <div className='grid grid-cols-12 gap-4'>
                    <Form.Item
                        label="Nome do Representante"
                        name="representante_nome"
                        rules={[{ required: true, message: 'Por favor, insira o nome do representante!' }]}
                        className='col-span-4'
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="CPF do Representante"
                        name="representante_cpf"
                        rules={[{ required: true, message: 'Por favor, insira o CPF do representante!' }]}
                        className='col-span-4'
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Cargo do Representante"
                        name="representante_cargo"
                        rules={[{ required: true, message: 'Por favor, insira o cargo do representante!' }]}
                        className='col-span-4'
                    >
                        <Input />
                    </Form.Item>
                </div>
                <div className='grid grid-cols-12 gap-4'>
                    <Form.Item label="Inscrição Estadual" name="inscricao_estadual" className='col-span-6'>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Inscrição Municipal" name="inscricao_municipal" className='col-span-6'>
                        <Input />
                    </Form.Item>
                </div>
                <div className='grid grid-cols-12 gap-4'>
                    <Form.Item label="Telefone" name="telefone" className='col-span-6'>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Celular" name="celular" className='col-span-6'>
                        <Input />
                    </Form.Item>
                </div>
                <div className='grid grid-cols-12 gap-4'>
                    <Form.Item label="Email" name="email" rules={[{ type: 'email', message: 'E-mail inválido' }]} className='col-span-6'>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Site" name="site" className='col-span-6'>
                        <Input />
                    </Form.Item>

                </div>

                <Form.Item
                    name="aceite_termo_privacidade"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Você deve aceitar os termos de privacidade')),
                        },
                    ]}
                >
                    <Checkbox>
                        Aceito os termos de privacidade
                    </Checkbox>
                </Form.Item>

                <Form.Item name="consentimento_marketing" valuePropName="checked">
                    <Checkbox>
                        Aceito receber comunicações de marketing
                    </Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Cadastrar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default React.memo(MemberShipRegisterForm);