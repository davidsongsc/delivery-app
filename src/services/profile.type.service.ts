import { ITipoPerfil } from "@/interfaces/IPerfil"; 
import apiClient from "./apiClient";

const create = async (data: ITipoPerfil) =>
  apiClient.post(`/api/profiles-types/`, data);

const update = async (id: string, data: Partial<ITipoPerfil>) =>
  apiClient.put(`/api/profiles-types/${id}/`, data);

const remove = async (id: string) =>
  apiClient.delete(`/api/profiles-types/${id}/`);

const getAll = async (query: string = "") =>
  apiClient.get(`/api/profiles-types${query}`);

const getById = async (id: string) =>
  apiClient.get(`/api/profiles-types/${id}/`);

export const profileTypeService = {
  create,
  update,
  remove,
  getAll,
  getById,
};
