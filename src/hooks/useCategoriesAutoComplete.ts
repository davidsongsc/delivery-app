import { useEffect, useState } from 'react';
import { categoryService } from '@/services/category.service';
import { ICategory } from '@/interfaces/ICategory';

interface UseCategoriesAutoCompleteProps {
  page?: number;
  per_page?: number;
  filters?: object;
}

export const useCategoriesAutoComplete = ({
  page = 1,
  per_page = 10,
  filters = {},
}: UseCategoriesAutoCompleteProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const query = new URLSearchParams({
      page: page.toString(),
      per_page: per_page.toString(),
      ...filters,
    }).toString();

    categoryService
      .getAll(`?${query}`)
      .then((res) => {
        setCategories(res.data.results);
      })
      .catch(() => {
        // Trate erros aqui se quiser
      })
      .finally(() => setLoading(false));
  }, [page, per_page, filters]);

  return { categories, loading };
};
