import { useState, useEffect, useRef } from 'react';
import { notification } from 'antd';

export interface MensagemChat {
  id?: string;
  corpo: string;
  from?: string;
  fromMe?: boolean;
  created_at?: string;
}

export const useChatSocket = (chatId: string | null) => {
  const [messages, setMessages] = useState<MensagemChat[]>([]);
  const [connected, setConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatId) return;

    const safeChatId = chatId.replace(/[^a-zA-Z0-9._-]/g, '_');
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const wsProtocol = apiBaseUrl.startsWith('https') ? 'wss' : 'ws';
    const wsHost = apiBaseUrl.replace(/^https?:\/\//, '');
    const wsUrl = `${wsProtocol}://${wsHost}/ws/chat/${safeChatId}/`;

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => setConnected(true);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'chat_message') {
        setMessages((prev) => [...prev, {
          corpo: data.message,
          fromMe: data.fromMe,
          from: data.from,
          id: data.id,
          created_at: data.timestamp
        }]);
      }

      if (data.type === 'history') {
        // Ordena do mais antigo ao mais recente
        const sorted = data.messages
          .map((m: any) => ({
            corpo: m.corpo,
            from: m.from,
            fromMe: m.fromMe,
            id: m.id,
            created_at: m.timestamp
          }))
          .sort((a: any, b: any) => a.created_at - b.created_at);

        setMessages(sorted);
      }
    };

    ws.current.onerror = (err) => {
      console.error('WebSocket erro:', err);
      setConnected(false);
      notification.error({ message: 'Erro na conexão WebSocket' });
    };

    ws.current.onclose = () => {
      setConnected(false);
      notification.warning({ message: 'WebSocket desconectado' });
    };

    return () => ws.current?.close();
  }, [chatId]);

  const sendMessage = (corpo: string) => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      notification.error({ message: 'Conexão inativa. Não foi possível enviar a mensagem.' });
      return;
    }

    ws.current.send(JSON.stringify({ message: corpo }));
    setMessages((prev) => [...prev, { corpo, fromMe: true }]);
  };

  return { messages, sendMessage, connected, messagesEndRef };
};
