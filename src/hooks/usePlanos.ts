import { useEffect, useState } from 'react';
import { getPlanosPublicos, Plano } from '@/services/planos.service';

export const usePlanosPublicos = () => {
  const [data, setData] = useState<Plano[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getPlanosPublicos();
        setData(result);
      } catch (err) {
        setError('Erro ao carregar os planos');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { data, loading, error };
};
