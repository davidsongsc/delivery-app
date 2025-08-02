// services/mesas.service.ts

import apiClient from './apiClient';
import { IMesa } from '@/interfaces/IMesa'; // Importe a interface da Mesa

const baseURL = '/api/mesas/';

export const mesasService = {
  getAll: () => apiClient.get<IMesa[]>(baseURL),
  getById: (id: string | number) => apiClient.get<IMesa>(`${baseURL}${id}/`),
  create: (data: Partial<IMesa>) => apiClient.post<IMesa>(baseURL, data),
  update: (id: string | number, data: Partial<IMesa>) => apiClient.put<IMesa>(`${baseURL}${id}/`, data),
  delete: (id: string | number) => apiClient.delete(`${baseURL}${id}/`),
};
