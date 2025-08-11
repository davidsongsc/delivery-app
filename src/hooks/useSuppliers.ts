import { parseFilters } from '@/utils/parseFilters';
import { App } from 'antd';
import { useEffect, useState } from 'react';
import { affiliateService } from '@/services/affiliate.service';
import { IAffiliate } from '@/interfaces/IAffiliate';
import { supplierService } from '@/services/supplier.service';

interface UserSuppliersProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UserSuppliersResponse {
  suppliers: IAffiliate[];
  suppliersTotal: number;
  suppliersRefresh: () => void;
  suppliersLoading: boolean;
}

export const userSuppliers = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = '&orderBy=created_at&orderType=DESC',
}: UserSuppliersProps): UserSuppliersResponse => {
  const [data, setData] = useState<IAffiliate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const { notification } = App.useApp();
  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    supplierService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then((res) => {
        const suppliers = res.data?.suppliers.result ?? [];
        const total = res.data?.suppliers.total ?? 0;

        setData(suppliers);
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
    suppliers: data,
    suppliersTotal: total,
    suppliersRefresh: fetchData,
    suppliersLoading: isLoading,
  };
};
