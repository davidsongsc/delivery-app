import { Permissao } from '@/interfaces/IUser';
import { permissionService } from '@/services/permission.service';
import { useEffect, useState } from 'react';

interface UsePermissionProps {
  id: string;
}

interface UsePermissionResponse {
  permissao: Permissao | null;
  permissaoLoading: boolean;
  permissaoRefresh: () => void;
}

export const usePermission = ({ id }: UsePermissionProps): UsePermissionResponse => {
  const [data, setData] = useState<Permissao | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    permissionService
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
    permissao: data,
    permissaoLoading: isLoading,
    permissaoRefresh: fetchData,
  };
};
