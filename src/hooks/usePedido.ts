import { App } from 'antd';
import { useEffect, useState } from 'react';
import { comandaService } from '@/services/comanda.service';
import { parseFilters } from '@/utils/parseFilters'; // Assumindo que essa função existe
import { IPedido } from '@/interfaces/IPedido';

interface UsePedidosProps {
  page?: number;
  limit?: number;
  filters?: object;
}

interface UsePedidosResponse {
  pedidos: IPedido[];
  pedidosTotal: number;
  pedidosRefresh: () => void;
  pedidosLoading: boolean;
}

export const usePedidos = ({
  page = 1,
  limit = 10,
  filters = {},
}: UsePedidosProps): UsePedidosResponse => {
  const [data, setData] = useState<IPedido[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const { notification } = App.useApp();

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    comandaService.pedidos.getAll(`?page=${page}&per_page=${limit}${query}`)
      .then((res) => {
        const pedidos = res.data?.results ?? []; // A API do Django com DRF retorna results
        const total = res.data?.total ?? 0;

        setData(pedidos);
        setTotal(total);
      })
      .catch((error) => {
        console.error('Erro ao listar pedidos:', error);
        notification.error({
          message: 'Erro ao listar pedidos',
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, filters]);

  return {
    pedidos: data,
    pedidosTotal: total,
    pedidosRefresh: fetchData,
    pedidosLoading: isLoading,
  };
};
