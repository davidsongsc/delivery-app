import apiClient from "./apiClient";
const create = async (data: any) =>
  apiClient.post(`/api/permissions/`, data);

const update = async (id: string, data: Partial<any>) =>
  apiClient.put(`/api/permissions/${id}/`, data);

const remove = async (id: string) => apiClient.delete(`/api/permissions/${id}/`);

const getAll = async (query: string = "") =>
  apiClient.get(`/api/permissions` + query);

const getById = async (id: string) => apiClient.get(`/api/permissions/${id}`);

export const permissionService = {
  create,
  update,
  remove,
  getAll,
  getById,
};
