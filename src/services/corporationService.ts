import { CorporationForm } from '@/store/CorporationRegisterForm';
import apiClient from './apiClient';

export const corporationService = {
  registerCorporation: (data: CorporationForm) => {
    return apiClient.post('/api/corporation-user/', data);
  },
};
