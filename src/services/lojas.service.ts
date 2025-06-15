import axios from 'axios';

export type Loja = {
  nome_fantasia: string;
  cnpj: string;
  site?: string;
  page: string;
  telefone: string;
};

export const getLojaByPage = async (page: string): Promise<Loja | null> => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/corporation-user/?page=${page}`);
    const lojas = res.data;
    return lojas.length ? lojas[0] : null;
  } catch (error) {
    console.error("Erro ao buscar loja:", error);
    return null;
  }
};
