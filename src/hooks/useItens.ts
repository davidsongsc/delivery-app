import { useState, useEffect } from "react";
import { App } from "antd";
import { itensService } from "@/services/itens.service";
import { IItens } from "@/interfaces/IITens";
import { parseFilters } from "@/utils/parseFilters";

interface UseItensProps {
  search?: string;       
  page?: number;
  limit?: number;
  filters?: object;
}

interface UseItensResponse {
  itens: IItens[];
  itensTotal: number;
  itensLoading: boolean;
  itensRefresh: () => void;
}

export const useItens = ({
  search = "",
  page = 1,
  limit = 10,
  filters = {},
}: UseItensProps): UseItensResponse => {
  const [itens, setItens] = useState<IItens[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { notification } = App.useApp();

  const fetchItens = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters({ ...filters, search });

    itensService
      .getAll(`?page=${page}&per_page=${limit}${query}`)
      .then(res => {
        const result = res.data.items?.result || [];
        const totalItems = res.data.items?.total || 0;

        setItens(result);
        setTotal(totalItems);
      })
      .catch(err => {
        console.error("Erro ao buscar itens:", err);
        notification.error({ message: "Erro ao buscar itens" });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchItens();
  }, [search, page, limit]);

  return { itens, itensTotal: total, itensLoading: isLoading, itensRefresh: fetchItens };
};
