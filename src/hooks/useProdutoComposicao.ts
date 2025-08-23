import { useState, useEffect } from "react";
import { produtoComposicaoService } from "@/services/product-composition.service";
import { IProdutoComposicao } from "@/interfaces/IProdutoComposicao";

interface ProdutoComposicaoProps {
  id: string;
}

interface ProdutoComposicaoResponse {
  composicao: IProdutoComposicao | null;
  composicaoLoading: boolean;
  composicaoRefresh: () => void;
}

export const useProdutoComposicao = ({ id }: ProdutoComposicaoProps): ProdutoComposicaoResponse => {
  const [data, setData] = useState<IProdutoComposicao | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    produtoComposicaoService.getById(id)
      .then(res => setData(res.data))
      .catch(() => console.log("Erro ao buscar composição"))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  return {
    composicao: data,
    composicaoLoading: isLoading,
    composicaoRefresh: fetchData,
  };
};
