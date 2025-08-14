import { parseFilters } from '@/utils/parseFilters';
import { App } from 'antd';
import { useEffect, useState } from 'react';
import { IAffiliate } from '@/interfaces/IAffiliate';
import { clienteService } from '@/services/clients.service';

interface UserClientesProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UserClientesResponse {
  clientes: IAffiliate[];
  clientesTotal: number;
  clientesRefresh: () => void;
  clientesLoading: boolean;
}

export const userClientes = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = '&orderBy=created_at&orderType=DESC',
}: UserClientesProps): UserClientesResponse => {
  const [data, setData] = useState<IAffiliate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const { notification } = App.useApp();
  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    clienteService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then((res) => {
        const clientes = res.data?.clientes.result ?? [];
        const total = res.data?.clientes.total ?? 0;

        setData(clientes);
        setTotal(total);

      })
      .catch((error) => {
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
    clientes: data,
    clientesTotal: total,
    clientesRefresh: fetchData,
    clientesLoading: isLoading,
  };
};
