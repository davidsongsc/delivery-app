import { ISupplierCreate } from "@/interfaces/ISupplier";
import apiClient from "./apiClient";
const create = async (data: ISupplierCreate) =>
  apiClient.post(`/api/suppliers/`, data);

const update = async (id: string, data: Partial<ISupplierCreate>) =>
  apiClient.put(`/api/suppliers/${id}/`, data);

const remove = async (id: string) => apiClient.delete(`/api/suppliers/${id}/`);

const getAll = async (query: string = "") =>
  apiClient.get(`/api/suppliers` + query);

const getById = async (id: string) => apiClient.get(`/api/suppliers/${id}`);

export const supplierService = {
  create,
  update,
  remove,
  getAll,
  getById,
};
