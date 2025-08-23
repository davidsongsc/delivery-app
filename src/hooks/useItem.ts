import { useState, useEffect } from "react";
import { itensService } from "@/services/itens.service";
import { IItens } from "@/interfaces/IITens";

interface ItensProps {
  id: string;
}

interface ItensResponse {
  item: IItens | null;
  itemLoading: boolean;
  itemRefresh: () => void;
}

export const useItem
 = ({ id }: ItensProps): ItensResponse => {
  const [data, setData] = useState<IItens | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    itensService
      .getById(id)
      .then(res => setData(res.data))
      .catch(() => console.log("Erro ao buscar itens"))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  return {
    item: data,
    itemLoading: isLoading,
    itemRefresh: fetchData,
  };
};
