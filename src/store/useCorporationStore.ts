import { create } from 'zustand';
import apiClient from '@/services/apiClient';
import { notification } from 'antd';
import { CorporationForm } from './CorporationRegisterForm';

interface CorporationState {
  loading: boolean;
  error: string | null;
  registerCorporation: (data: CorporationForm) => Promise<void>;
}

export const useCorporationStore = create<CorporationState>((set) => ({
  loading: false,
  error: null,

  registerCorporation: async (data) => {
    set({ loading: true, error: null });
    try {
      await apiClient.post('/api/corporation-user/', data);
      notification.success({
        message: 'Empresa cadastrada com sucesso!',
      });
      set({ loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.detail || error.message || 'Erro desconhecido',
      });
      notification.error({
        message: 'Erro ao cadastrar empresa',
        description: error.response?.data?.detail || error.message || 'Tente novamente mais tarde',
      });
      throw error;
    }
  },
}));
