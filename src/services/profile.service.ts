import { IUserCreate } from "@/interfaces/IUser";
import apiClient from "./apiClient";

const create = async (data: IUserCreate) =>
  apiClient.post(`/api/profiles/`, data);

const update = async (id: string, data: Partial<IUserCreate>) =>
  apiClient.put(`/api/profiles/${id}/`, data);

const remove = async (id: string) => apiClient.delete(`/api/profiles/${id}`);

const getAll = async (query: string = "") =>
  apiClient.get(`/api/profiles` + query);

const getById = async (id: string) => apiClient.get(`/api/profiles/${id}`);

export const profileService = {
  create,
  update,
  remove,
  getAll,
  getById,
};
