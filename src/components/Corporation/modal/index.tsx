'use client';
import React from 'react';
import { Modal, message } from 'antd';
import { useCorporationStore } from '@/store/useCorporationStore';
import CorporationRegisterForm from '../form';
import axios from 'axios';

interface CorporationForm {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  inscricao_estadual?: string;
  inscricao_municipal?: string;
  telefone?: string;
  celular?: string;
  email?: string;
  site?: string;
  representante_nome: string;
  representante_cpf: string;
  representante_cargo: string;
  aceite_termo_privacidade: boolean;
  consentimento_marketing: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void; // callback opcional após cadastro
}

const CorporationRegisterModal: React.FC<Props> = ({ open, onClose, onSuccess }) => {
  const { registerCorporation, loading } = useCorporationStore();

  const onFinish = async (values: CorporationForm) => {
    if (!values.aceite_termo_privacidade) {
      message.error('Você deve aceitar os termos de privacidade para continuar.');
      return;
    }

    try {
      await registerCorporation(values);
      onSuccess?.(); // chama callback se fornecida
      onClose();     // fecha o modal
    } catch (error) {
      // Erro já tratado no store com notification
    }
  };

  return (
    <Modal
      title="Cadastrar Empresa"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={800}
      style={{ top: 20 }}
      
    >
      <CorporationRegisterForm onFinish={onFinish} loading={loading} />
    </Modal>
  );
};

export default CorporationRegisterModal;
