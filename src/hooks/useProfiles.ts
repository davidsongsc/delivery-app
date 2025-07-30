import { parseFilters } from '@/utils/parseFilters';
import { App } from 'antd';
import { useEffect, useState } from 'react';
import { IUser } from '@/interfaces/IUser';
import { profileService } from '@/services/profile.service';

interface UseProfilesProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseProfilesResponse {
  profiles: IUser[];
  profilesTotal: number;
  profilesRefresh: () => void;
  profilesLoading: boolean;
}

export const useProfiles = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = '&orderBy=created_at&orderType=DESC',
}: UseProfilesProps): UseProfilesResponse => {
  const [data, setData] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [dataInfo, setDataInfo] = useState<any>(null);
  const { notification } = App.useApp();
  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    profileService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then((res) => {
        const users = res.data?.profiles?.result ?? [];
        const total = res.data?.profiles?.total ?? 0;

        setData(users);
        setTotal(total);
        setDataInfo(res);
        console.log("Resposta completa:", res); // Aqui funciona corretamente

      })
      .catch((error) => {
        console.error("Erro ao listar usuários:", error); // Mostra detalhes do erro

        notification.error({
          message: 'Erro ao listar usuários',
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, filters, orderers]);

  return {
    profiles: data,
    profilesTotal: total,
    profilesRefresh: fetchData,
    profilesLoading: isLoading,
  };
};
