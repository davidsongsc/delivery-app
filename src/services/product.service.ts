import apiClient from './apiClient';
import { IProdutoCreate, IProduto } from '@/interfaces/IProduto';

const toFormData = (data: Record<string, any>) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // Se for lista de arquivos
    if (Array.isArray(value) && value[0] instanceof File) {
      value.forEach((file, idx) => {
        formData.append(`${key}`, file);
      });
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};

const getAll = async (query: string = "") =>
  apiClient.get<{ results: IProduto[]; count: number }>(`/api/products/` + query);

const getById = async (id: string | number) =>
  apiClient.get<IProduto>(`/api/products/${id}/`);

const create = async (data: Partial<IProdutoCreate>) => {
  const formData = toFormData(data);
  return apiClient.post<IProdutoCreate>(`/api/products/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const update = async (id: string | number, data: Partial<IProdutoCreate>) => {
  const formData = toFormData(data);
  return apiClient.put<IProdutoCreate>(`/api/products/${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
const partialUpdate = async (id: string | number, data: Partial<IProdutoCreate>) => {
  const formData = toFormData(data);
  return apiClient.patch<IProdutoCreate>(`/api/products/${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
const remove = async (id: string | number) =>
  apiClient.delete(`/api/products/${id}/`);

export const produtosService = {
  getAll,
  getById,
  create,
  update,
  partialUpdate,
  remove,
};