import { IAddress } from "@/interfaces/IAddress";
import { addressService } from "@/services/address.service";
import { parseFilters } from "@/utils/parseFilters";
import { App } from "antd";
import { useEffect, useState } from "react";

interface UseAddressesProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseAddressesResponse {
  addresses: IAddress[];
  addressesTotal: number;
  addressesRefresh: () => void;
  addressesLoading: boolean;
}

export const useAddresses = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = "&orderBy=created_at&orderType=DESC",
}: UseAddressesProps): UseAddressesResponse => {
  const { notification } = App.useApp();
  const [data, setData] = useState<IAddress[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    addressService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then(res => {
        setData(res.data.addresses.result);
        setTotal(res.data.addresses.total);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar endereços",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, filters, orderers]);

  return {
    addresses: data,
    addressesTotal: total,
    addressesRefresh: fetchData,
    addressesLoading: isLoading,
  };
};
