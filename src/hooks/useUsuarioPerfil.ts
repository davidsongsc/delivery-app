import { IUserProfile } from '@/interfaces/IUserProfile';
import { usuarioPerfilService } from '@/services/user.profile.service';
import { useEffect, useState } from 'react';

interface UsePermissionProps {
  id: string;
}

interface UsePermissionResponse {
  usuarioPerfil: IUserProfile | null;
  usuarioPerfilLoading: boolean;
  usuarioPerfilRefresh: () => void;
}

export const useUsuarioPerfil = ({ id }: UsePermissionProps): UsePermissionResponse => {
  const [data, setData] = useState<IUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    usuarioPerfilService
      .getByUserId(id)
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
    usuarioPerfil: data,
    usuarioPerfilLoading: isLoading,
    usuarioPerfilRefresh: fetchData,
  };
};
