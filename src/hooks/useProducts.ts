import { produtosService } from "@/services/product.service";
import { parseFilters } from "@/utils/parseFilters";
import { App } from "antd";
import { useEffect, useState } from "react";
import { IProduto } from "../interfaces/IProduto";
import { useGlobalLoadingStore } from "@/store/useGlobalLoadingStore";

interface UseProdutosProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseProdutosResponse {
  produtos: IProduto[];
  produtosTotal: number;
  produtosRefresh: () => void;
  produtosLoading: boolean;
}

export const useProdutos = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = "&orderBy=created_at&orderType=DESC",
}: UseProdutosProps): UseProdutosResponse => {
  const { notification } = App.useApp();
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [produtosLoading, setProdutosLoading] = useState<boolean>(false);
  const [produtosTotal, setProdutosTotal] = useState<number>(0);

  const startGlobalLoading = useGlobalLoadingStore((state) => state.startLoading);
  const stopGlobalLoading = useGlobalLoadingStore((state) => state.stopLoading);

  const produtosRefresh = () => {
    if (produtosLoading) return;

    setProdutosLoading(true);
    startGlobalLoading("produtos"); // ativa overlay global

    const query = parseFilters(filters);

    produtosService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then((res) => {
        setProdutos(res.data.products.result);
        setProdutosTotal(res.data.products.total);
      })
      .catch((error) => {
        notification.error({
          message: error.message || "Erro ao listar produtos",
        });
      })
      .finally(() => {
        setProdutosLoading(false);
        stopGlobalLoading("produtos"); // desativa overlay global
      });
  };

  useEffect(() => {
    produtosRefresh();
  }, [page, limit, filters, orderers]);

  return {
    produtos,
    produtosTotal,
    produtosRefresh,
    produtosLoading,
  };
};
