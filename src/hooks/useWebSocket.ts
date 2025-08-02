import { useState, useEffect, useRef } from 'react';
import { notification } from 'antd';

interface WebSocketMessage {
  type: string;
  titulo: string;
  corpo: string;
  remetente: string;
  remetente_id: string;
  destinatario_id: string;
}

export const useWebSocket = (tenantId: string | null) => {
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!tenantId) {
      return;
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const wsProtocol = apiBaseUrl?.startsWith('https') ? 'wss:' : 'ws:';
    const wsHost = apiBaseUrl?.replace(/^https?:\/\//, '');

    const wsUrl = `${wsProtocol}//${wsHost}/ws/corporation/${tenantId}/`;
    console.log(`Tentando conectar ao WebSocket em: ${wsUrl}`);

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('Conexão WebSocket estabelecida.');
      setIsConnected(true);
      notification.success({ message: 'Conectado ao painel de mensagens.' });
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Mensagem recebida:', data);
      notification.success({
        message: 'Mensagem recebida com sucesso!',
        description: data.corpo, // Ajustado para usar 'corpo'
      });
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    ws.current.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
      setIsConnected(false);
      notification.error({ message: 'Erro ao conectar ao painel de mensagens.' });
    };

    ws.current.onclose = () => {
      console.log('Conexão WebSocket fechada.');
      setIsConnected(false);
      notification.warning({ message: 'Desconectado do painel de mensagens.' });
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [tenantId]);

  const sendMessage = (corpo: string, destinatarioId: string) => {
    console.log('Enviando mensagem:', corpo);
    console.log('Destinatário ID:', destinatarioId);
    if (ws.current && isConnected) {
      const messagePayload = {
        type: 'direct_message',
        titulo: '', // Adicionando a chave 'titulo' para o backend
        corpo: corpo, // Alterado de 'content' para 'corpo'
        destinatario_id: destinatarioId,
      };
      ws.current.send(JSON.stringify(messagePayload));
    } else {
      notification.error({ message: 'Não foi possível enviar a mensagem. Conexão não está ativa.' });
    }
  };

  return { messages, isConnected, sendMessage };
};
