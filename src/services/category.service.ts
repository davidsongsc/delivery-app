import apiClient from "./apiClient";
import { ICategory, ICategoryCreate } from "@/interfaces/ICategory";

const create = async (data: ICategoryCreate) =>
  apiClient.post(`/api/categories/`, data);

const update = async (id: string, data: Partial<ICategory>) =>
  apiClient.put(`/api/categories/${id}/`, data);

const remove = async (id: string) => apiClient.delete(`/api/categories/${id}/`);

const getAll = async (query: string = "") =>
  apiClient.get(`/api/categories` + query);

const getById = async (id: string) => apiClient.get(`/api/categories/${id}`);

export const categoryService = {
  create,
  update,
  remove,
  getAll,
  getById,
};
