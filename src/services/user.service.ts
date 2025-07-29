import { IUserCreate } from "@/interfaces/IUser";
import apiClient from "./apiClient";


const route = "/api/users";

const create = async (data: IUserCreate) =>
  apiClient.post(`/api/users/`, data);

const update = async (id: string, data: Partial<IUserCreate>) =>
  apiClient.put(`/api/users/${id}/`, data);

const remove = async (id: string) => apiClient.delete(`/api/users/${id}`);

const getAll = async (query: string = "") =>
  apiClient.get(`/api/users` + query);

const getById = async (id: string) => apiClient.get(`/api/users/${id}`);

export const userService = {
  create,
  update,
  remove,
  getAll,
  getById,
};
