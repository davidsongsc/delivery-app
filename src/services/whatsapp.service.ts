import apiClient from './apiClient';
import { WhatsAppChat } from '@/hooks/useWhatsAppChats';

const route = '/msg/whatsapp-chats/';

const getAll = async (): Promise<WhatsAppChat[]> => {
  const response = await apiClient.get(route);
  return response.data.chats;
};

export const whatsAppService = {
  getAll,
};
