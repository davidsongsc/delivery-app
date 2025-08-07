import apiClient from "./apiClient";
import {  IPerfilCreate } from "@/interfaces/IPerfil";

const create = async (data: IPerfilCreate) =>
  apiClient.post(`/api/profiles/`, data);

const update = async (id: string, data: Partial<IPerfilCreate>) =>
  apiClient.put(`/api/profiles/${id}/`, data);

const remove = async (id: string) => apiClient.delete(`/api/profiles/${id}/`);

const getAll = async (query: string = "") =>
  apiClient.get(`/api/profiles` + query);

const getById = async (id: string) => apiClient.get(`/api/profiles/${id}/`);

export const profileService = {
  create,
  update,
  remove,
  getAll,
  getById,
};
