import axios from 'axios';

export type Loja = {
  nome_fantasia: string;
  cnpj: string;
  site?: string;
  page: string;
  telefone: string;
};

type ApiResponse = Loja[];

export const getLojaByPage = async (page: string): Promise<Loja | null> => {
  try {
    const res = await axios.get<ApiResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/corporation-user/?page=${page}`
    );

    const lojas = res.data;

    if (Array.isArray(lojas) && lojas.length > 0) {
      return lojas[0];
    }

    return null;
  } catch (error) {
    console.error('Erro ao buscar loja:', error);
    return null;
  }
};
