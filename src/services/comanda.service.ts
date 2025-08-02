
import { IMesa } from '@/interfaces/IMesa';
import apiClient from './apiClient';
import { IProduto } from '@/interfaces/IProduto';
import { IPedido } from '@/interfaces/IPedido';
import { IItemPedido } from '@/interfaces/IItemPedido';






// --- Definição do serviço de API para Comandas, Mesas e Pedidos ---

export const comandaService = {

  // Métodos para o endpoint de MESAS
  mesas: {
    baseURL: '/api/mesas/',
    getAll: () => apiClient.get<IMesa[]>(this.mesas.baseURL),
    getById: (id: string | number) => apiClient.get<IMesa>(`${this.mesas.baseURL}${id}/`),
    create: (data: Partial<IMesa>) => apiClient.post<IMesa>(this.mesas.baseURL, data),
    update: (id: string | number, data: Partial<IMesa>) => apiClient.put<IMesa>(`${this.mesas.baseURL}${id}/`, data),
    delete: (id: string | number) => apiClient.delete(`${this.mesas.baseURL}${id}/`),
  },

  // Métodos para o endpoint de PEDIDOS
  pedidos: {
    baseURL: '/api/pedidos/',
    getAll: () => apiClient.get<IPedido[]>(this.pedidos.baseURL),
    getById: (id: string | number) => apiClient.get<IPedido>(`${this.pedidos.baseURL}${id}/`),
    create: (data: Partial<IPedido>) => apiClient.post<IPedido>(this.pedidos.baseURL, data),
    update: (id: string | number, data: Partial<IPedido>) => apiClient.put<IPedido>(`${this.pedidos.baseURL}${id}/`, data),
    delete: (id: string | number) => apiClient.delete(`${this.pedidos.baseURL}${id}/`),
    getByMesa: (mesaId: string | number) =>
      apiClient.get<{ results: Pedido[] }>(`${this.pedidos.baseURL}?mesa=${mesaId}`),
  },

  // Métodos para o endpoint de ITENS DE PEDIDO
  itens: {
    baseURL: '/api/itens-pedido/',
    getAll: () => apiClient.get<IItemPedido[]>(this.itens.baseURL),
    getById: (id: string | number) => apiClient.get<IItemPedido>(`${this.itens.baseURL}${id}/`),
    create: (data: Partial<IItemPedido>) => apiClient.post<IItemPedido>(this.itens.baseURL, data),
    update: (id: string | number, data: Partial<IItemPedido>) => apiClient.put<IItemPedido>(`${this.itens.baseURL}${id}/`, data),
    delete: (id: string | number) => apiClient.delete(`${this.itens.baseURL}${id}/`),
  },
};
