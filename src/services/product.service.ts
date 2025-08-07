import apiClient from './apiClient';
import { IProdutoCreate } from '@/interfaces/IProduto';

const toFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();

  // Campos simples
  if (data.nome) formData.append('nome', data.nome);
  if (data.nome_interno) formData.append('nome_interno', data.nome_interno);
  if (data.preco !== undefined) formData.append('preco', String(data.preco));
  if (data.desconto !== undefined) formData.append('desconto', String(data.desconto));
  if (data.estoque !== undefined) formData.append('estoque', String(data.estoque));
  if (data.quantidade !== undefined) formData.append('quantidade', String(data.quantidade));
  formData.append('descricao', data.descricao || '');
  formData.append('promocional', data.promocional ? 'true' : 'false');
  formData.append('ativo', data.ativo ? 'true' : 'false');

  // Campo categoria_id (string UUID)
  if (data.categoria_id) {
    formData.append('categoria_id', data.categoria_id);
  }

  if (data.tenant) formData.append('tenant', data.tenant);

  // Arrays simples
  (data.remover || []).forEach(item => formData.append('remover', item));
  (data.composicao || []).forEach(item => formData.append('composicao', item));
  (data.adicionar || []).forEach(item => formData.append('adicionar', JSON.stringify(item)));

  // Imagens: separar novas e IDs a manter
  const imagens = data.imagens || [];

  // IDs das imagens existentes a manter
  const imagensIdsManter = imagens
    .filter((img: any) => !img.originFileObj) // já existentes
    .map((img: any) => img.uid);
  formData.append('imagens_ids_manter', JSON.stringify(imagensIdsManter));

  // Imagens novas
  imagens
    .filter((img: any) => img.originFileObj)
    .forEach((img: any) => formData.append('imagens', img.originFileObj));

  return formData;
};

const create = async (data: IProdutoCreate) => {
  const formData = toFormData(data);
  return apiClient.post('/api/products/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const update = async (id: string | number, data: Partial<IProdutoCreate>) => {
  const formData = toFormData(data);
  return apiClient.put(`/api/products/${id}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const partialUpdate = async (id: string | number, data: Partial<IProdutoCreate>) => {
  const formData = toFormData(data);
  return apiClient.patch(`/api/products/${id}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const getAll = (query = '') =>
  apiClient.get<{ results: IProdutoCreate[]; count: number }>(`/api/products/${query}`);

const getById = (id: string | number) =>
  apiClient.get<IProdutoCreate>(`/api/products/${id}/`);

const remove = (id: string | number) => apiClient.delete(`/api/products/${id}/`);

export const produtosService = {
  create,
  update,
  partialUpdate,
  getAll,
  getById,
  remove,
};
