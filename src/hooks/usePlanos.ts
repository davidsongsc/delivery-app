import { useEffect, useState } from 'react';
import { getPlanosCompletos, Plano, PlanosCompletosResponse } from '@/services/planos.service';

export const usePlanosCompletos = () => {
  const [plans, setPlans] = useState<Plano[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result: PlanosCompletosResponse = await getPlanosCompletos();
        setPlans(result.plans);
        setFeatures(result.features);
      } catch (err) {
        setError('Erro ao carregar os planos completos');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { plans, features, loading, error };
};
