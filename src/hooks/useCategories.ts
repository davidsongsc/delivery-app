import { categoryService } from '@/services/category.service'; // ajuste o caminho se precisar
import { parseFilters } from '@/utils/parseFilters';
import { App } from 'antd';
import { useEffect, useState } from 'react';
import { ICategory } from '@/interfaces/ICategory';

interface UseCategoriasProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseCategoriasResponse {
  categorias: ICategory[];
  categoriasTotal: number;
  categoriasRefresh: () => void;
  categoriasLoading: boolean;
}

export const useCategorias = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = '&orderBy=created_at&orderType=DESC',
}: UseCategoriasProps): UseCategoriasResponse => {
  const { notification } = App.useApp();
  const [categorias, setCategorias] = useState<ICategory[]>([]);
  const [categoriasLoading, setCategoriasLoading] = useState<boolean>(false);
  const [categoriasTotal, setCategoriasTotal] = useState<number>(0);

  const categoriasRefresh = () => {
    if (categoriasLoading) return;
    setCategoriasLoading(true);

    const query = parseFilters(filters);

    categoryService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then(res => {
        setCategorias(res.data.results);
        setCategoriasTotal(res.data.count);
      })
      .catch(() => {
        notification.error({
          message: 'Erro ao buscar Categorias',
        });
      })
      .finally(() => setCategoriasLoading(false));
  };

  useEffect(() => {
    categoriasRefresh();
  }, [page, limit, filters, orderers]);

  return {
    categorias,
    categoriasTotal,
    categoriasRefresh,
    categoriasLoading,
  };
};
