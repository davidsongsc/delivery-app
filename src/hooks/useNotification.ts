import { useState, useEffect, useRef } from 'react';
import { notification } from 'antd';

interface NotificationMessage {
  type: string;
  titulo: string;
  corpo: string;
  remetente: string;
  remetente_id: string;
  destinatario_id: string;
}


export const useNotifications = (userId: string | null) => {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const wsProtocol = apiBaseUrl?.startsWith('https') ? 'wss:' : 'ws:';
    const wsHost = apiBaseUrl?.replace(/^https?:\/\//, '');

    const wsUrl = `${wsProtocol}//${wsHost}/ws/notifications/${userId}/`;
    console.log(`Conectando ao WebSocket em: ${wsUrl}`);

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('WebSocket conectado');
      setIsConnected(true);
      notification.success({ message: 'Conexão estabelecida com notificações' });
    };

    ws.current.onmessage = (event) => {
      try {
        const data: NotificationMessage = JSON.parse(event.data);
        console.log('Notificação recebida:', data);

        // Adiciona à lista interna
        setNotifications((prev) => [...prev, data]);

        // Exibe notificação visual
        notification.info({
          message: data.titulo || 'Nova notificação',
          description: data.corpo,
          placement: 'topRight',
          duration: 5,
        });
      } catch (error) {
        console.error('Erro ao processar mensagem do WebSocket', error);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket erro:', error);
      setIsConnected(false);
      notification.error({ message: 'Erro na conexão WebSocket' });
    };

    ws.current.onclose = () => {
      console.log('WebSocket desconectado');
      setIsConnected(false);
      notification.warning({ message: 'Conexão WebSocket encerrada' });
    };

    return () => {
      ws.current?.close();
    };
  }, [userId]);

  // Função para enviar mensagem via WebSocket, se quiser implementar envio
  const sendNotification = (payload: Partial<NotificationMessage>) => {
    if (ws.current && isConnected) {
      ws.current.send(JSON.stringify(payload));
    } else {
      notification.error({ message: 'WebSocket não está conectado' });
    }
  };

  return { notifications, isConnected, sendNotification };
};
