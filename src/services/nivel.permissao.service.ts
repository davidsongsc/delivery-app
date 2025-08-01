import { IUserCreate } from "@/interfaces/IUser";
import apiClient from "./apiClient";

const create = async (data: IUserCreate) =>
  apiClient.post(`/api/niveis-permissao/`, data);

const update = async (id: string, data: Partial<IUserCreate>) =>
  apiClient.put(`/api/niveis-permissao/${id}/`, data);

const remove = async (id: string) => apiClient.delete(`/api/niveis-permissao/${id}/`);

const getAll = async (query: string = "") =>
  apiClient.get(`/api/niveis-permissao` + query);

const getById = async (id: string) => apiClient.get(`/api/niveis-permissao/${id}`);

export const nivelPermissaoService = {
  create,
  update,
  remove,
  getAll,
  getById,
};
