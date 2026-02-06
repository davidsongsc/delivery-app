import { useState, useEffect } from 'react';
import { WhatsAppChat } from '@/interfaces/WhatsAppChat';
import { whatsAppService } from '@/services/whatsapp.service';

interface UseWhatsAppChatsResponse {
  chats: WhatsAppChat[];
  loading: boolean;
  refresh: () => void;
}

export const useWhatsAppChats = (): UseWhatsAppChatsResponse => {
  const [chats, setChats] = useState<WhatsAppChat[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchChats = () => {
    if (loading) return;
    setLoading(true);

    whatsAppService
      .getAll()
      .then(data => setChats(data))
      .catch(err => console.error('Erro ao listar conversas:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return { chats, loading, refresh: fetchChats };
};
