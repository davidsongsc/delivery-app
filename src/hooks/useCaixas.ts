// hooks/useCaixas.ts
import { useEffect, useState, useCallback } from 'react';
import { caixaService } from '@/services/caixa.service';
import { ICaixa } from '@/interfaces/ICaixa';

export const useCaixas = () => {
  const [caixas, setCaixas] = useState<ICaixa[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCaixas = useCallback(() => {
    setLoading(true);
    caixaService
      .getAll()
      .then((res) => {
        setCaixas(res.data.results);
      })
      .catch(() => {
        console.error('Erro ao carregar caixas');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchCaixas();
  }, [fetchCaixas]);

  return {
    caixas,
    loading,
    refresh: fetchCaixas,
  };
};
