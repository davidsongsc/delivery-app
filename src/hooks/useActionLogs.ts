import { categoryService } from '@/services/category.service'; // ajuste o caminho se precisar
import { parseFilters } from '@/utils/parseFilters';
import { App } from 'antd';
import { useEffect, useState } from 'react';
import { ICategory } from '@/interfaces/ICategory';
import { actionLogsService } from '@/services/action-logs.service';

interface UseActionLogsProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseActionLogsResponse {
  actionLogs: ICategory[];
  actionLogsTotal: number;
  actionLogsRefresh: () => void;
  actionLogsLoading: boolean;
}

export const useActionLogs = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = '&orderBy=created_at&orderType=DESC',
}: UseActionLogsProps): UseActionLogsResponse => {
  const { notification } = App.useApp();
  const [actionLogs, setactionLogs] = useState<ICategory[]>([]);
  const [actionLogsLoading, setActionLogsLoading] = useState<boolean>(false);
  const [actionLogsTotal, setActionLogsTotal] = useState<number>(0);

  const actionLogsRefresh = () => {
    if (actionLogsLoading) return;
    setActionLogsLoading(true);

    const query = parseFilters(filters);

    actionLogsService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then(res => {
        setactionLogs(res.data.results);
        setActionLogsTotal(res.data.count);
      })
      .catch(() => {
        notification.error({
          message: 'Erro ao buscar ActionLogs',
        });
      })
      .finally(() => setActionLogsLoading(false));
  };

  useEffect(() => {
    actionLogsRefresh();
  }, [page, limit, filters, orderers]);

  return {
    actionLogs,
    actionLogsTotal,
    actionLogsRefresh,
    actionLogsLoading,
  };
};
