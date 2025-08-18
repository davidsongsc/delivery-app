import { ICorporation } from "@/interfaces/ICorporation";
import apiClient from "./apiClient";

const create = async (data: ICorporation) =>
  apiClient.post(`/api/corporations/`, data);

const update = async (id: string, data: Partial<ICorporation>) =>
  apiClient.put(`/api/corporations/${id}/`, data);

const remove = async (id: string) => apiClient.delete(`/api/corporations/${id}/`);

const getAll = async (query: string = "") =>
  apiClient.get(`/api/corporations` + query);

const getById = async (id: string) => apiClient.get(`/api/corporations/${id}/`);

const getByPage = async (id: string) => apiClient.get(`/api/delivery/?filter_page=${id}`);
const getByCnpj = async (id: string) => apiClient.get(`/api/delivery/?filter_cnpj=${id}`);

export const corporationService = {
  create,
  update,
  remove,
  getAll,
  getById,
  getByPage,
  getByCnpj
};
