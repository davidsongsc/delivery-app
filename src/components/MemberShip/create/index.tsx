'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Form, Input, Checkbox, Button, message, notification } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import apiClient from '@/services/apiClient'
import axios from 'axios'
import { useCorporationStore } from '@/store/useCorporationStore';
import CorporationRegisterForm from '../form';
export interface CorporationMembership {
    uid: string; // UUID
    user: string; // geralmente o id ou uid do usuário (se quiser objeto, cria interface User)
    corporation: string; // id ou uid da corporation (pode criar interface CorporationUser também)

    cargo: string; // string com valor dos choices (ex: 'ADMIN', 'OUTRO', etc)
    nivel_acesso: Record<string, boolean>; // JSONField com objeto chave-valor booleano

    data_entrada: string; // ISO datetime string
    ultimo_login?: string | null; // ISO datetime string ou null
    usuario_online: boolean;

    dispositivo_conectado?: string | null;
    dispositivos_ativos: string[]; // array no JSONField
    historico_dispositivos: string[]; // array no JSONField

    ativo: boolean;
    ip_ultimo_acesso?: string | null;
    vinculo_confirmado: boolean;

    convidado_por?: string | null; // uid do outro CorporationMembership (self FK)

    data_desvinculo?: string | null; // ISO datetime string ou null
    motivo_desvinculo?: string | null;

    preferencias_interface: Record<string, any>; // JSONField genérico
    notificacoes_habilitadas: boolean;

    
}
const MemberShipRegister: React.FC = () => {
    const router = useRouter();

    const { registerCorporation, loading } = useCorporationStore();

    const onFinish = async (values: CorporationMembership) => {


        try {
            await apiClient.post('/api/memberships/', values);
            message.success('Empresa cadastrada com sucesso!');
            router.push('/usuarios');
        } catch (error: unknown) {
            // Type guard para verificar se o erro é um AxiosError
            if (axios.isAxiosError(error)) {
                message.error(error.response?.data?.detail || 'Erro ao cadastrar Membros');
            } else if (error instanceof Error) {
                // Outro tipo de erro JS padrão
                message.error(error.message);
            } else {
                notification.error({
                    message: 'Erro ao cadastrar membros',
                    description: 'Tente novamente mais tarde',
                })
            }
            console.error(error);
        } finally {

        }

    }

    return (
        <CorporationRegisterForm onFinish={onFinish} loading={loading} />
    )
}

export default React.memo(MemberShipRegister);