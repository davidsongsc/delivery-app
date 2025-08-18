import apiClient from "./apiClient";
import { IReservasCreate } from "@/interfaces/IReservas";

const create = async (data: IReservasCreate) =>
  apiClient.post(`/api/reservas/`, data);

const update = async (id: string, data: Partial<IReservasCreate>) =>
  apiClient.put(`/api/reservas/${id}/`, data);

const remove = async (id: string) => apiClient.delete(`/api/reservas/${id}/`);

const getAll = async (query: string = "") =>
  apiClient.get(`/api/reservas` + query);

const getById = async (id: string) => apiClient.get(`/api/reservas/${id}/`);


export const reservaService = {
  create,
  update,
  remove,
  getAll,
  getById,
};
