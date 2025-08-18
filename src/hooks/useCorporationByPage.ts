import { ICorporation } from "@/interfaces/ICorporation";
import { corporationService } from "@/services/corporation.service";
import { useEffect, useState } from "react";

interface UseCorporationProps {
  page: string;
}

interface UseCorporationResponse {
  corporation: ICorporation | null;
  loading: boolean;
  refresh: () => void;
}

export const useCorporationByPage = ({ page }: UseCorporationProps): UseCorporationResponse => {
  const [data, setData] = useState<ICorporation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    if (!page) return;

    setIsLoading(true);

    corporationService
      .getByPage(page)
      .then(res => {
        setData(res.data.corporations);
      })
      .catch(() => {
        console.log("Erro ao buscar empresa pela page");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return {
    corporation: data,
    loading: isLoading,
    refresh: fetchData,
  };
};
