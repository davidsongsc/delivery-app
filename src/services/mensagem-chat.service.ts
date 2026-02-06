// services/wahaChat.service.ts
import apiClient from './apiClient';

export interface MensagemChat {
  id?: string;
  corpo: string;
  from?: string;
  fromMe?: boolean;
  created_at?: string;
}

const route = '/msg/waha-chats';

const getMessages = async (chatId: string, limit = 50): Promise<MensagemChat[]> => {
  const response = await apiClient.get(`${route}/${chatId}/messages/`, {
    params: { limit },
  });

  if (response.data.messages) {
    return response.data.messages.map((m: any) => ({
      id: m.id || m._id,
      corpo: m.body || m._data?.Message?.conversation || m._data?.Message?.extendedTextMessage?.text || '',
      from: m.from || '',
      fromMe: m.fromMe || false,
      created_at: m.created_at || m._data?.Message?.timestamp,
    }));
  }

  return [];
};

const sendMessage = async (chatId: string, body: string) => {
  const response = await apiClient.post(`${route}/send-message/`, { chatId, body });
  return response.data;
};

export const wahaChatService = {
  getMessages,
  sendMessage,
};
