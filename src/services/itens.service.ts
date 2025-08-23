import apiClient from "./apiClient";
import { IProdutoComposicao, IProdutoComposicaoCreate } from "@/interfaces/IProdutoComposicao";

const create = async (data: IProdutoComposicaoCreate) =>
  apiClient.post("/api/itens/", data);

const update = async (id: string, data: Partial<IProdutoComposicaoCreate>) =>
  apiClient.put(`/api/itens/${id}/`, data);

const remove = async (id: string) =>
  apiClient.delete(`/api/itens/${id}/`);

const getAll = async (query: string = "") =>
  apiClient.get("/api/itens" + query);

const getById = async (id: string) =>
  apiClient.get(`/api/itens/${id}`);

export const itensService = {
  create,
  update,
  remove,
  getAll,
  getById,
};
