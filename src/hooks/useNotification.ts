import { useEffect, useRef, useState } from 'react';
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
  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);

  useEffect(() => {
    if (!userId) return;

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || window.location.origin;
    const isSecure = apiBaseUrl.startsWith('https');
    const wsProtocol = isSecure ? 'wss' : 'ws';

    // Ajusta URL WebSocket para produção local/domínio
    const wsUrl = `${wsProtocol}://${window.location.host}/ws/notifications/${userId}/`;

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      setIsConnected(true);
      notification.success({ message: 'Conexão WebSocket estabelecida.' });
    };

    ws.current.onmessage = (event) => {
      try {
        const data: NotificationMessage = JSON.parse(event.data);
        setNotifications((prev) => [...prev, data]);

        notification.info({
          message: data.titulo || 'Nova notificação',
          description: data.corpo,
          placement: 'topRight',
          duration: 5,
        });
      } catch (err) {
        console.error('Erro ao processar mensagem WS', err);
      }
    };

    ws.current.onerror = (error) => {
      setIsConnected(false);
      notification.error({ message: 'Erro na conexão WebSocket.' });
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      notification.warning({ message: 'Conexão WebSocket encerrada.' });
    };

    return () => {
      ws.current?.close();
    };
  }, [userId]);

  return { notifications, isConnected };
};
