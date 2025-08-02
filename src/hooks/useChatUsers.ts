import { App } from 'antd';
import { useEffect, useState } from 'react';
import { chatUserService } from '@/services/chat-user.service';
import { IUser } from '@/interfaces/IUser';

interface UseChatUsersResponse {
  users: IUser[];
  usersLoading: boolean;
  usersRefresh: () => void;
}

export const useChatUsers = (): UseChatUsersResponse => {
  const [data, setData] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { notification } = App.useApp();

  const fetchData = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await chatUserService.getAll();
      // O endpoint retorna um objeto com 'results', então acessamos ele.
      setData(response.data.results);
    } catch (error) {
      console.error('Erro ao listar usuários para chat:', error);
      notification.error({
        message: 'Erro ao carregar usuários do chat',
        description: 'Não foi possível carregar a lista de usuários.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    users: data,
    usersLoading: isLoading,
    usersRefresh: fetchData,
  };
};
