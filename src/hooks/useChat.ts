import { useState, useEffect } from 'react';
import { notification } from 'antd';
import { wahaChatService, MensagemChat } from '@/services/mensagem-chat.service';

export const useChat = (chatId: string | null, pollingInterval = 60000) => {
  const [messages, setMessages] = useState<MensagemChat[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    if (!chatId) return;

    try {
      setLoading(true);
      const msgs = await wahaChatService.getMessages(chatId);

      // Adiciona somente mensagens novas
      setMessages(prev => {
        const existingIds = new Set(prev.map(m => m.id));
        const newMsgs = msgs.filter(m => !existingIds.has(m.id));
        return newMsgs.length ? [...prev, ...newMsgs] : prev;
      });
    } catch (err) {
      console.error('Erro ao buscar mensagens Waha:', err);
      notification.error({ message: 'Erro ao buscar mensagens do chat' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, pollingInterval);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  const sendMessage = async (body: string) => {
    if (!chatId) return;

    try {
      const sentMsg = await wahaChatService.sendMessage(chatId, body);
      setMessages(prev => [...prev, sentMsg]); // adiciona direto a mensagem enviada
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      notification.error({ message: 'Erro ao enviar mensagem' });
    }
  };

  return { messages, loading, fetchMessages, sendMessage };
};
