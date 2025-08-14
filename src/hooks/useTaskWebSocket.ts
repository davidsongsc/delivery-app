import { useState, useEffect, useRef } from 'react';
import { notification } from 'antd';

export interface TaskMessage {
  id: string;
  type: string;
  title: string;
  status: 'pending' | 'in_progress' | 'done' | 'overdue' | 'canceled';
  payload?: {
    description?: string;
    observations?: any[];
  };
  assignee_id: string;
  created_by_id: string;
}

export const useTaskWebSocket = (tenantId: string | null) => {
  const [tasks, setTasks] = useState<TaskMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!tenantId) return;

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const wsProtocol = apiBaseUrl?.startsWith('https') ? 'wss:' : 'ws:';
    const wsHost = apiBaseUrl?.replace(/^https?:\/\//, '');
    const wsUrl = `${wsProtocol}//${wsHost}/ws/tasks/`;

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('Task WebSocket conectado');
      setIsConnected(true);
      notification.success({ message: 'Conectado ao painel de tarefas.' });
    };

    ws.current.onmessage = (event) => {
      const data: TaskMessage = JSON.parse(event.data);
      console.log('Task recebida:', data);

      setTasks((prev) => {
        const existingIndex = prev.findIndex((t) => t.id === data.id);
        if (existingIndex >= 0) {
          const newTasks = [...prev];
          newTasks[existingIndex] = { ...newTasks[existingIndex], ...data };
          return newTasks;
        }
        return [...prev, data];
      });
    };

    ws.current.onerror = (error) => {
      console.error('Erro no WebSocket de tarefas:', error);
      setIsConnected(false);
      notification.error({ message: 'Erro na conexão WebSocket de tarefas.' });
    };

    ws.current.onclose = () => {
      console.log('Task WebSocket desconectado');
      setIsConnected(false);
      notification.warning({ message: 'Desconectado do painel de tarefas.' });
    };

    return () => {
      ws.current?.close();
    };
  }, [tenantId]);

  const sendTask = (title: string, description: string, assigneeId: string) => {
    if (!ws.current || !isConnected) {
      notification.error({ message: 'Não foi possível enviar a task. Conexão não está ativa.' });
      return;
    }

    const payload = {
      type: 'create_task',
      title,
      payload: { description, observations: [] },
      assignee_id: assigneeId,
      tenant_id: tenantId,
    };

    ws.current.send(JSON.stringify(payload));
    console.log('Task enviada:', payload);
  };

  return { tasks, isConnected, sendTask };
};
