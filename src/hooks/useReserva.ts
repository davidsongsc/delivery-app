import { IPerfil } from '@/interfaces/IPerfil';
import { profileService } from '@/services/profile.service';
import { reservaService } from '@/services/reserva.service';
import { useEffect, useState } from 'react';

interface UseReservaProps {
  id: string;
}

interface UseReservaResponse {
  reserva: IPerfil | null;
  reservaLoading: boolean;
  reservaRefresh: () => void;
}

export const useReserva = ({ id }: UseReservaProps): UseReservaResponse => {
  const [data, setData] = useState<IPerfil | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    reservaService
      .getById(id)
      .then(res => {
        setData(res.data ?? res);
      })
      .catch(() => {
        console.error("Erro ao buscar perfil");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return {
    reserva: data,
    reservaLoading: isLoading,
    reservaRefresh: fetchData,
  };
};
