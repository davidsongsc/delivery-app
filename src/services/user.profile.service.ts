import apiClient from "./apiClient";
import { IUserProfileCreate } from "@/interfaces/IUserProfile";

const create = async (data: IUserProfileCreate) =>
  apiClient.post(`/api/usuarios-perfis/`, data);

const update = async (id: string, data: Partial<IUserProfileCreate>) =>
  apiClient.put(`/api/usuarios-perfis/${id}/`, data);

const remove = async (id: string) => apiClient.delete(`/api/usuarios-perfis/${id}/`);

const getAll = async (query: string = "") =>
  apiClient.get(`/api/usuarios-perfis` + query);

const getById = async (id: string) => apiClient.get(`/api/usuarios-perfis/${id}`);
const getByUserId = async (id: string) => apiClient.get(`/api/usuarios-perfis/by-user/${id}`);

export const usuarioPerfilService = {
  create,
  update,
  remove,
  getAll,
  getById,
  getByUserId
};
