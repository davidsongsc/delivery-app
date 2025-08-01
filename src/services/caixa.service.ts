// services/caixa.service.ts
import apiClient from './apiClient';
import { ICaixa } from '@/interfaces/ICaixa';

const baseURL = '/api/caixas/';
interface AbrirCaixaPayload {
  operador: string; // id do operador (usuário)
  saldo_inicial: number;
  nome?: string;
  tenant?: string; // se precisar enviar o tenant (corporation)
}
export const caixaService = {
  getAll: () => apiClient.get<{ results: ICaixa[] }>(baseURL),
  getById: (id: string) => apiClient.get<ICaixa>(`${baseURL}${id}/`),
  create: (data: Partial<ICaixa>) => apiClient.post<ICaixa>(baseURL, data),
  update: (id: string, data: Partial<ICaixa>) => apiClient.put<ICaixa>(`${baseURL}${id}/`, data),
  delete: (id: string) => apiClient.delete(`${baseURL}${id}/`),
  abrirCaixa: (data: AbrirCaixaPayload) => apiClient.post('/api/caixas/', data),

  getByOperador: (operadorId: string) =>
    apiClient.get<{ results: ICaixa[] }>(`${baseURL}?operador=${operadorId}`),
};
