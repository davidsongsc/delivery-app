import { ICorporation } from "@/interfaces/ICorporation";
import { corporationService } from "@/services/corporation.service";
import { useEffect, useState } from "react";

interface UseAllCorporationsResponse {
  corporations: ICorporation[] | null;
  loading: boolean;
  refresh: () => void;
}

export const useAllCorporations = (): UseAllCorporationsResponse => {
  const [data, setData] = useState<ICorporation[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;

    setIsLoading(true);

    corporationService
      .getAllPublic()
      .then(res => {
        setData(res.data.corporations || []);
      })
      .catch(() => {
        console.error("Erro ao buscar todas as corporations");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    corporations: data,
    loading: isLoading,
    refresh: fetchData,
  };
};
