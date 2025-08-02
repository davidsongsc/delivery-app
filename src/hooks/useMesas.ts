// hooks/useMesas.ts
import { App } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { IMesa } from '@/interfaces/IMesa';
import { mesasService } from '@/services/mesas.service';

interface UseMesasResponse {
  mesas: IMesa[];
  mesasLoading: boolean;
  mesasRefresh: () => void;
}

export const useMesas = (tenantId: string | null): UseMesasResponse => {
  const [data, setData] = useState<IMesa[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { notification } = App.useApp();
  const ws = useRef<WebSocket | null>(null);

  const fetchData = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      // Faz a requisição HTTP inicial para obter a lista completa de mesas
      const response = await mesasService.getAll();
      setData(response.data.results || []);
    } catch (error) {
      console.error('Erro ao listar mesas:', error);
      notification.error({
        message: 'Erro ao listar mesas',
        description: 'Não foi possível carregar os dados das mesas.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // --- Lógica do WebSocket ---
    // A execução do WebSocket é condicional ao tenantId
    if (!tenantId) {
      console.log('Tenant ID não fornecido. Conexão WebSocket não iniciada.');
      return;
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/comandas/${tenantId}/`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onmessage = (event) => {
      const update = JSON.parse(event.data);
      if (update.type === 'mesa_update') {
        // Atualiza o estado da mesa em tempo real
        setData(prevMesas => prevMesas.map(mesa =>
          mesa.id === update.mesa_id ? { ...mesa, status: update.status } : mesa
        ));
      }
    };

    // Fechar a conexão ao desmontar
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [tenantId]);

  return {
    mesas: data,
    mesasLoading: isLoading,
    mesasRefresh: fetchData,
  };
};
