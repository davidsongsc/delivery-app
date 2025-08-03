import { useEffect, useState } from 'react';
import { categoryService } from '@/services/category.service'; // ajuste o caminho
import { ICategory } from '@/interfaces/ICategory';

interface UseCategoriaProps {
  id: string | number;
}

interface UseCategoriaResponse {
  categoria: ICategory | null;
  categoriaLoading: boolean;
  categoriaRefresh: () => void;
}

export const useCategoria = ({ id }: UseCategoriaProps): UseCategoriaResponse => {
  const [categoria, setCategoria] = useState<ICategory | null>(null);
  const [categoriaLoading, setCategoriaLoading] = useState<boolean>(false);

  const categoriaRefresh = () => {
    if (categoriaLoading) return;
    setCategoriaLoading(true);

    categoryService
      .getById(id)
      .then(res => {
        setCategoria(res.data);
      })
      .catch(() => {
        console.error('Erro ao buscar categoria');
      })
      .finally(() => setCategoriaLoading(false));
  };

  useEffect(() => {
    if (id) {
      categoriaRefresh();
    }
  }, [id]);

  return {
    categoria,
    categoriaLoading,
    categoriaRefresh,
  };
};
