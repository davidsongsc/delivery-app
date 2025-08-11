import { IUserCreate } from "@/interfaces/IUser";
import apiClient from "./apiClient";
import { IAffiliateCreate } from "@/interfaces/IAffiliate";


const route = "/api/affiliates";

const create = async (data: IAffiliateCreate) =>
  apiClient.post(`/api/affiliates/`, data);

const update = async (id: string, data: Partial<IAffiliateCreate>) =>
  apiClient.put(`/api/affiliates/${id}/`, data);

const remove = async (id: string) => apiClient.delete(`/api/affiliates/${id}/`);

const getAll = async (query: string = "") =>
  apiClient.get(`/api/affiliates` + query);

const getById = async (id: string) => apiClient.get(`/api/affiliates/${id}`);

export const affiliateService = {
  create,
  update,
  remove,
  getAll,
  getById,
};
