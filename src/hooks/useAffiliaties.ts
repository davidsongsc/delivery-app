import { parseFilters } from '@/utils/parseFilters';
import { App } from 'antd';
import { useEffect, useState } from 'react';
import { affiliateService } from '@/services/affiliate.service';
import { IAffiliate } from '@/interfaces/IAffiliate';

interface UserAffiliatiesProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UserAffiliatiesResponse {
  affiliaties: IAffiliate[];
  affiliatiesTotal: number;
  affiliatiesRefresh: () => void;
  affiliatiesLoading: boolean;
}

export const userAffiliaties = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = '&orderBy=created_at&orderType=DESC',
}: UserAffiliatiesProps): UserAffiliatiesResponse => {
  const [data, setData] = useState<IAffiliate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const { notification } = App.useApp();
  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    affiliateService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then((res) => {
        const affiliaties = res.data?.affiliates.result ?? [];
        const total = res.data?.affiliates.total ?? 0;

        setData(affiliaties);
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
    affiliaties: data,
    affiliatiesTotal: total,
    affiliatiesRefresh: fetchData,
    affiliatiesLoading: isLoading,
  };
};
