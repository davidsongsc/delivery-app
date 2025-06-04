'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Form, Input, Checkbox, Button, message } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import apiClient from '@/services/apiClient'
import axios from 'axios'
import { useCorporationStore } from '@/store/useCorporationStore';
import CorporationRegisterForm from '../form';
interface CorporationForm {
    cnpj: string
    razao_social: string
    nome_fantasia: string
    inscricao_estadual?: string
    inscricao_municipal?: string
    telefone?: string
    celular?: string
    email?: string
    site?: string
    representante_nome: string
    representante_cpf: string
    representante_cargo: string
    aceite_termo_privacidade: boolean
    consentimento_marketing: boolean
}

const CorporationRegister: React.FC = () => {
     const router = useRouter();
    
    const { registerCorporation, loading } = useCorporationStore();

    const onFinish = async (values: CorporationForm) => {
        if (!values.aceite_termo_privacidade) {
            message.error('Você deve aceitar os termos de privacidade para continuar.')
            return
        }

        

        try {
            const response = await apiClient.post('/api/corporation-user/', values);
            message.success('Empresa cadastrada com sucesso!');
            router.push('/corporation');
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
        <CorporationRegisterForm onFinish={onFinish} loading={loading} />
    )
}

export default React.memo(CorporationRegister);