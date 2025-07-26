import axios from 'axios';

export type Loja = {
  nome_fantasia: string;
  cnpj: string;
  site?: string;
  page: string;
  telefone: string;
};

type ApiResponse = {
  results: Loja[];
};

export const getLojaByPage = async (page: string): Promise<Loja | null> => {
  try {
    const res = await axios.get<ApiResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/corporation-page/?filter_page=${page}`
    );

    const lojas = res.data.results;

    if (Array.isArray(lojas) && lojas.length > 0) {
      return lojas[0]; 
    }

    return null;
  } catch (error) {
    console.error('Erro ao buscar loja:', error);
    return null;
  }
};
