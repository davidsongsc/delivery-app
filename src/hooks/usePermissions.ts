import { parseFilters } from '@/utils/parseFilters';
import { App } from 'antd';
import { useEffect, useState } from 'react';
import { IUser, Permissao } from '@/interfaces/IUser';
import { permissionService } from '@/services/permission.service';

interface UsePermissionsProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UsePermissionsResponse {
  permissions: Permissao[];
  permissionsTotal: number;
  permissionsRefresh: () => void;
  permissionsLoading: boolean;
}

export const usePermissions = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = '&orderBy=created_at&orderType=DESC',
}: UsePermissionsProps): UsePermissionsResponse => {
  const [data, setData] = useState<Permissao[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [dataInfo, setDataInfo] = useState<any>(null);
  const { notification } = App.useApp();
  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    permissionService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then((res) => {
        const dataInfo = res.data?.permissions?.result ?? [];
        const total = res.data?.permissions?.total ?? 0;

        setData(dataInfo);
        setTotal(total);
        setDataInfo(res);
        console.log("Resposta completa:", res);

      })
      .catch((error) => {
        console.error("Erro ao listar usuários:", error);

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
    permissions: data,
    permissionsTotal: total,
    permissionsRefresh: fetchData,
    permissionsLoading: isLoading,
  };
};
