import { App } from 'antd';
import { useEffect, useState } from 'react';
import { comandaService } from '@/services/comanda.service';
import { IItemPedido } from '@/interfaces/IItemPedido';

interface UseItensPedidoProps {
    pedidoId: string | number;
}

interface UseItensPedidoResponse {
    itens: IItemPedido[];
    itensLoading: boolean;
    itensRefresh: () => void;
}

export const useItensPedido = ({ pedidoId }: UseItensPedidoProps): UseItensPedidoResponse => {
    const [data, setData] = useState<IItemPedido[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { notification } = App.useApp();

    const fetchData = () => {
        if (isLoading) return;
        setIsLoading(true);

        comandaService.itens.getAll(`?pedido=${pedidoId}`)
            .then((res) => {
                const itens = res.data?.results ?? [];
                setData(itens);
            })
            .catch((error) => {
                console.error('Erro ao listar itens do pedido:', error);
                notification.error({
                    message: 'Erro ao listar itens do pedido',
                });
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        if (pedidoId) {
            fetchData();
        }
    }, [pedidoId]);

    return {
        itens: data,
        itensLoading: isLoading,
        itensRefresh: fetchData,
    };
};