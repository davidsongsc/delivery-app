import { IClients } from "@/interfaces/IClients";
import { IUser } from "@/interfaces/IUser";
import { clienteService } from "@/services/clients.service";
import { userService } from "@/services/user.service";
import { useEffect, useState } from "react";

interface UserClientProps {
  id: string;
}

interface UserClientResponse {
  cliente: IClients | null;
  clienteLoading: boolean;
  clienteRefresh: () => void;
}

export const useClient = ({ id }: UserClientProps): UserClientResponse => {
  const [data, setData] = useState<IClients | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    clienteService
      .getById(id)
      .then(res => {
        setData(res.data);
      })
      .catch(() => {
        console.log("Erro ao buscar usuário");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return {
    cliente: data,
    clienteLoading: isLoading,
    clienteRefresh: fetchData,
  };
};
