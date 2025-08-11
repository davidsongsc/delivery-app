import { App } from 'antd';
import { useEffect, useState } from 'react';
import { profileTypeService } from '@/services/profile.type.service';
import { ITipoPerfil } from '@/interfaces/IPerfil';
import { parseFilters } from '@/utils/parseFilters';

interface UseProfileTypesProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseProfileTypesResponse {
  tipos: ITipoPerfil[];
  tiposTotal: number;
  tiposRefresh: () => void;
  tiposLoading: boolean;
}

export const useProfileTypes = ({
  page = 1,
  limit = 100, 
  filters = {},
  orderers = '&orderBy=created_at&orderType=DESC',
}: UseProfileTypesProps = {}): UseProfileTypesResponse => {
  const [tipos, setTipos] = useState<ITipoPerfil[]>([]);
  const [tiposTotal, setTiposTotal] = useState<number>(0);
  const [tiposLoading, setTiposLoading] = useState<boolean>(false);

  const { notification } = App.useApp();

  const fetchData = () => {
    if (tiposLoading) return;
    setTiposLoading(true);

    const query = filters ? parseFilters(filters) : '';

    profileTypeService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then(res => {
        const results = res.data?.results ?? [];
        const total = res.data?.total ?? results.length;

        setTipos(results);
        setTiposTotal(total);
      })
      .catch(() => {
        notification.error({
          message: 'Erro ao listar tipos de perfil',
        });
      })
      .finally(() => setTiposLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, filters, orderers]);

  return {
    tipos,
    tiposTotal,
    tiposRefresh: fetchData,
    tiposLoading,
  };
};
