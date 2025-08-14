import { useState, useEffect, useRef } from 'react';
import { notification } from 'antd';

interface WebSocketMessage {
  type: string;
  mensagem_id?: string;
  titulo?: string;
  corpo?: string;
  remetente?: string;
  remetente_id?: string;
  destinatario_id?: string;
  status_recebida?: boolean;
  status_lida?: boolean;
  online_users?: { id: string; username: string }[];
  status?: 'received' | 'read';
  user_id?: string;
  error?: string;
}

export const useWebSocket = (
  tenantId: string | null,
  userId: string | null // ID do usuário autenticado, necessário para enviar como remetente
) => {
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<{ id: string; username: string }[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!tenantId || !userId) return;

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const wsProtocol = apiBaseUrl?.startsWith('https') ? 'wss:' : 'ws:';
    const wsHost = apiBaseUrl?.replace(/^https?:\/\//, '');

    const wsUrl = `${wsProtocol}//${wsHost}/ws/corporation/${tenantId}/`;

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('WebSocket conectado');
      setIsConnected(true);
      notification.success({ message: 'Conectado ao painel de mensagens.' });

      // Solicita lista de usuários online
      ws.current?.send(JSON.stringify({ type: 'get_online_status' }));
    };

    ws.current.onmessage = (event) => {
      const data: WebSocketMessage = JSON.parse(event.data);
      console.log('Mensagem recebida:', data);

      if (data.error) {
        notification.error({ message: 'Erro', description: data.error });
        return;
      }

      switch (data.type) {
        case 'message':
          setMessages((prev) => [...prev, data]);

          // Enviar confirmação de recebimento (ack)
          ws.current?.send(
            JSON.stringify({
              type: 'message_received',
              mensagem_id: data.mensagem_id,
              remetente_id: data.remetente_id,
            })
          );
          notification.info({
            message: `Mensagem de ${data.remetente}`,
            description: data.corpo,
          });
          break;

        case 'message_status_update':
          // Atualiza o status da mensagem localmente
          setMessages((prev) =>
            prev.map((msg) =>
              msg.mensagem_id === data.mensagem_id
                ? { ...msg, status_recebida: data.status === 'received' ? true : msg.status_recebida, status_lida: data.status === 'read' ? true : msg.status_lida }
                : msg
            )
          );
          break;

        case 'online_status':
          setOnlineUsers(data.online_users || []);
          break;

        default:
          console.log('Tipo de mensagem desconhecido:', data.type);
      }
    };

    ws.current.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
      setIsConnected(false);
      notification.error({ message: 'Erro na conexão WebSocket.' });
    };

    ws.current.onclose = () => {
      console.log('WebSocket desconectado');
      setIsConnected(false);
      notification.warning({ message: 'Desconectado do painel de mensagens.' });
    };

    return () => {
      ws.current?.close();
    };
  }, [tenantId, userId]);

  const sendMessage = (corpo: string, destinatarioId: string, titulo = '') => {
    if (ws.current && isConnected) {
      const messagePayload = {
        type: 'direct_message',
        remetente: userId,
        destinatario: destinatarioId,
        mensagem: corpo,
        titulo,
      };
      ws.current.send(JSON.stringify(messagePayload));
      console.log('Mensagem enviada:', messagePayload);
    } else {
      notification.error({ message: 'Não foi possível enviar a mensagem. Conexão não está ativa.' });
    }
  };

  const confirmRead = (mensagemId: string, remetenteId: string) => {
    if (ws.current && isConnected) {
      ws.current.send(
        JSON.stringify({
          type: 'message_read',
          mensagem_id: mensagemId,
          remetente_id: remetenteId,
        })
      );
    }
  };

  return { messages, onlineUsers, isConnected, sendMessage, confirmRead };
};
