import { IPerfil } from '@/interfaces/IPerfil';
import { profileService } from '@/services/profile.service';
import { useEffect, useState } from 'react';

interface UseProfileProps {
  id: string;
}

interface UseProfileResponse {
  profile: IPerfil | null;
  profileLoading: boolean;
  profileRefresh: () => void;
}

export const useProfile = ({ id }: UseProfileProps): UseProfileResponse => {
  const [data, setData] = useState<IPerfil | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    profileService
      .getById(id)
      .then(res => {
        // Ajuste caso o serviço retorne o objeto direto ou dentro de res.data
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
    profile: data,
    profileLoading: isLoading,
    profileRefresh: fetchData,
  };
};
