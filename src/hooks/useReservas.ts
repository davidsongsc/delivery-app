import { parseFilters } from '@/utils/parseFilters';
import { App } from 'antd';
import { useEffect, useState } from 'react';
import { IUser } from '@/interfaces/IUser';
import { reservaService } from '@/services/reserva.service';

interface UseReservasProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseReservasResponse {
  reservas: IUser[];
  reservasTotal: number;
  reservasRefresh: () => void;
  reservasLoading: boolean;
}

export const useReservas = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = '&orderBy=created_at&orderType=DESC',
}: UseReservasProps): UseReservasResponse => {
  const [data, setData] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [dataInfo, setDataInfo] = useState<any>(null);
  const { notification } = App.useApp();
  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    reservaService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then((res) => {
        const users = res.data?.reservas?.result ?? [];
        const total = res.data?.reservas?.total ?? 0;

        setData(users);
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
    reservas: data,
    reservasTotal: total,
    reservasRefresh: fetchData,
    reservasLoading: isLoading,
  };
};
