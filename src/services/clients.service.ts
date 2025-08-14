import { IUserCreate } from "@/interfaces/IUser";
import apiClient from "./apiClient";
import { IClientsCreate } from "@/interfaces/IClients";

const create = async (data: IClientsCreate) =>
  apiClient.post(`/api/clients/`, data);

const update = async (id: string, data: Partial<IClientsCreate>) =>
  apiClient.put(`/api/clients/${id}/`, data);

const remove = async (id: string) => apiClient.delete(`/api/clients/${id}/`);

const getAll = async (query: string = "") =>
  apiClient.get(`/api/clients` + query);

const getById = async (id: string) => apiClient.get(`/api/clients/${id}`);

export const clienteService = {
  create,
  update,
  remove,
  getAll,
  getById,
};
