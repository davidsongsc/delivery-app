import { IUser } from "@/interfaces/IUser";
import { userService } from "@/services/user.service";
import { useEffect, useState } from "react";

interface UseUserProps {
  id: string;
}

interface UseUserResponse {
  user: IUser | null;
  userLoading: boolean;
  userRefresh: () => void;
}

export const useUser = ({ id }: UseUserProps): UseUserResponse => {
  const [data, setData] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    userService
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
    user: data,
    userLoading: isLoading,
    userRefresh: fetchData,
  };
};
