import apiClient from "./apiClient";

export type Plano = {
  uid: string;
  name: string;
  price: string;
  tag: string;
  tagColor: string;
  features: string[];
  observations: string;
};

export type PlanosCompletosResponse = {
  features: string[];
  plans: Plano[];
};



export const getPlanosCompletos = async (): Promise<PlanosCompletosResponse> => {
  const res = await apiClient.get('/usuarios/planos-completos/');
  return res.data.results as PlanosCompletosResponse;
};