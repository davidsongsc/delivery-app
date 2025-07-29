import { IAddressCreate } from "@/interfaces/IAddress";
import apiService from "./api.service";

const create = async (data: IAddressCreate) =>
  apiService.post("/api/addresses/", data);

const update = async (id: string, data: IAddressCreate) =>
  apiService.put(`/api/addresses/${id}/`, data);

const remove = async (id: string) => apiService.delete(`/api/addresses/${id}/`);

const getAll = async (query: string = "") =>
  apiService.get("/api/addresses" + query);

const getById = async (id: string) => apiService.get(`/api/addresses/${id}`);

export const addressService = {
  create,
  update,
  remove,
  getAll,
  getById,
};
