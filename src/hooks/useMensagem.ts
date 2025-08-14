// hooks/useMensagens.ts
import { App } from 'antd';
import { useEffect, useState, useRef } from 'react';

interface IMensagem {
  id: string;
  remetente: string;
  destinatario: string;
  titulo: string;
  corpo: string;
  created_at: string;
}

interface UseMensagensResponse {
  messages: IMensagem[];
  sendMessage: (destinatarioId: string, titulo: string, corpo: string) => void;
  isConnected: boolean;
}

export const useMensagens = (tenantId: string | null): UseMensagensResponse => {
  const [messages, setMessages] = useState<IMensagem[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { notification } = App.useApp();
  const ws = useRef<WebSocket | null>(null);

  const sendMessage = (destinatarioId: string, titulo: string, corpo: string) => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      notification.warning({
        message: 'Conexão WebSocket não estabelecida',
        description: 'A mensagem não pôde ser enviada.',
      });
      return;
    }

    const payload = {
      type: 'nova_mensagem',
      destinatario: destinatarioId,
      titulo,
      corpo,
    };

    ws.current.send(JSON.stringify(payload));
  };

  useEffect(() => {
    if (!tenantId) {
      console.log('Tenant ID não fornecido. Conexão WebSocket não iniciada.');
      return;
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/mensagens/${tenantId}/`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      setIsConnected(true);
      console.log('Conectado ao WebSocket de mensagens.');
    };

    ws.current.onmessage = (event) => {
      const update = JSON.parse(event.data);

      if (update.type === 'mensagem_recebida') {
        setMessages(prev => [update.mensagem, ...prev]);
        notification.info({
          message: `Nova mensagem de ${update.mensagem.remetente}`,
          description: update.mensagem.titulo || 'Sem título',
        });
      }
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      console.log('Conexão WebSocket fechada.');
    };

    ws.current.onerror = (err) => {
      setIsConnected(false);
      console.error('Erro no WebSocket de mensagens:', err);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [tenantId]);

  return {
    messages,
    sendMessage,
    isConnected,
  };
};
