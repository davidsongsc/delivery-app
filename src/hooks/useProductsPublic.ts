import { App } from "antd";
import { useEffect, useState, useCallback } from "react";
import { IProduto } from '@/interfaces/IProduto';
import { useGlobalLoadingStore } from "@/store/useGlobalLoadingStore";
import { produtosPublicosService } from "@/services/product.public.service";

interface UseProdutosPublicosProps {
  tenantId: string;
  page?: number;
  limit?: number;
  categoryName?: string;
  searchQuery?: string;
  orderBy?: string;
  orderType?: 'ASC' | 'DESC';
}

interface UseProdutosPublicosResponse {
  produtos: IProduto[];
  produtosTotal: number;
  produtosRefresh: () => void;
  produtosLoading: boolean;
  hasMore: boolean;
}

export const useProdutosPublicos = ({
  tenantId,
  page = 1,
  limit = 100,
  categoryName,
  searchQuery,
  orderBy = 'nome',
  orderType = 'ASC',
}: UseProdutosPublicosProps): UseProdutosPublicosResponse => {
  const { notification } = App.useApp();
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [prevProdutos, setPrevProdutos] = useState<IProduto[]>([]);
  const [produtosLoading, setProdutosLoading] = useState(false);
  const [produtosTotal, setProdutosTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const startGlobalLoading = useGlobalLoadingStore(state => state.startLoading);
  const stopGlobalLoading = useGlobalLoadingStore(state => state.stopLoading);

  const produtosRefresh = useCallback(() => {
    if (!tenantId || produtosLoading || !hasMore) return;

    setProdutosLoading(true);
    startGlobalLoading("produtos");

    const params = {
      tenant: tenantId,
      page,
      per_page: limit,
      ...(categoryName && { category_name: categoryName }),
      ...(searchQuery && { search: searchQuery }),
      order_by: orderBy,
      order_type: orderType,
    };

    produtosPublicosService.getAllProducts(params)
      .then(res => {
        const novosProdutos = res.data.products.result;

        // Se a resposta for igual à anterior, não atualiza e bloqueia hasMore
        const isSameAsBefore = JSON.stringify(novosProdutos) === JSON.stringify(prevProdutos);
        if (isSameAsBefore) {
          setHasMore(false);
          return;
        }

        setPrevProdutos(novosProdutos);

        setProdutos(prev => page === 1 ? novosProdutos : [...prev, ...novosProdutos]);
        setProdutosTotal(res.data.products.total);
        setHasMore(res.data.products.has_more && novosProdutos.length > 0);
      })
      .catch(error => {
        console.error("Erro ao listar produtos:", error);
        notification.error({
          message: "Erro ao listar produtos",
          description: error.response?.data?.message || "Verifique sua conexão.",
        });
      })
      .finally(() => {
        setProdutosLoading(false);
        stopGlobalLoading("produtos");
      });
  }, [tenantId, page, limit, categoryName, searchQuery, orderBy, orderType, produtosLoading, prevProdutos, startGlobalLoading, stopGlobalLoading, notification, hasMore]);

  useEffect(() => {
    produtosRefresh();
  }, [produtosRefresh]);

  return {
    produtos,
    produtosTotal,
    produtosRefresh,
    produtosLoading,
    hasMore,
  };
};
