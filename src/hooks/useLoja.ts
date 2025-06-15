import { useEffect, useState } from 'react';
import { getLojaByPage, Loja } from '@/services/lojas.service';
import { useLojaStore } from '@/store/useLojaStore';

export const useLoja = (page: string) => {
  const { loja, setLoja } = useLojaStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLoja = async () => {
      if (loja && loja.page === page) return; 

      setLoading(true);
      const fetchedLoja = await getLojaByPage(page);
      setLoja(fetchedLoja);
      setLoading(false);
    };

    fetchLoja();
  }, [page]);

  return { loja, loading };
};
