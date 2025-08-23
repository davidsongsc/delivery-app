import apiClient from "./apiClient";
import { IProdutoComposicao, IProdutoComposicaoCreate } from "@/interfaces/IProdutoComposicao";

const create = async (data: IProdutoComposicaoCreate) =>
  apiClient.post("/api/product-compositions/", data);

const update = async (id: string, data: Partial<IProdutoComposicaoCreate>) =>
  apiClient.put(`/api/product-compositions/${id}/`, data);

const remove = async (id: string) =>
  apiClient.delete(`/api/product-compositions/${id}/`);

const getAll = async (query: string = "") =>
  apiClient.get("/api/product-compositions" + query);

const getById = async (id: string) =>
  apiClient.get(`/api/product-compositions/by-product/${id}`);

export const produtoComposicaoService = {
  create,
  update,
  remove,
  getAll,
  getById,
};
