import { ITipoPerfil } from "@/interfaces/IPerfil";
import { profileTypeService } from "@/services/profile.type.service";
import { userService } from "@/services/user.service";
import { useEffect, useState } from "react";

interface UseProfileTypeProps {
  id: string;
}

interface UseProfileTypeResponse {
  profileType: ITipoPerfil | null;
  profileTypeLoading: boolean;
  profileTypeRefresh: () => void;
}

export const useProfileType = ({ id }: UseProfileTypeProps): UseProfileTypeResponse => {
  const [data, setData] = useState<ITipoPerfil | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    profileTypeService
      .getById(id)
      .then(res => {
        setData(res.data);
      })
      .catch(() => {
        console.log("Erro ao buscar tipo Perfil");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return {
    profileType: data,
    profileTypeLoading: isLoading,
    profileTypeRefresh: fetchData,
  };
};
