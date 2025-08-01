import { useEffect, useState, useCallback } from 'react';
import { ICaixa } from '@/interfaces/ICaixa';
import { caixaService } from '@/services/caixa.service';

interface useCaixaResponse {
  caixas: ICaixa[];           // Pode vir múltiplos caixas para o operador
  isLoading: boolean;
  error: string | null;
  refreshCaixa: () => void;
}

export const useCaixaByOperador = (operadorId: string): useCaixaResponse => {
  const [caixas, setCaixas] = useState<ICaixa[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCaixa = useCallback(() => {
    if (!operadorId) return;

    setIsLoading(true);
    setError(null);

    caixaService
      .getByOperador(operadorId)
      .then(response => {
        console.log('Caixas do operador:', response.data.results);
        setCaixas(response.data.results || []);
      })
      .catch(() => {
        setError('Erro ao buscar caixas do operador.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [operadorId]);

  useEffect(() => {
    fetchCaixa();
  }, [fetchCaixa]);

  return {
    caixas,
    isLoading,
    error,
    refreshCaixa: fetchCaixa,
  };
};
