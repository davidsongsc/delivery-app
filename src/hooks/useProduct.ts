import { IProduto } from "@/interfaces/IProduto";
import { produtosService } from "@/services/product.service";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { useGlobalLoadingStore } from "@/store/useGlobalLoadingStore";

interface UseProdutoProps {
    id: string;
}

interface UseProdutoResponse {
    produto: IProduto | null;
    produtoLoading: boolean;
    produtoRefresh: () => void;
}

export const useProduto = ({ id }: UseProdutoProps): UseProdutoResponse => {
    const [produto, setProduto] = useState<IProduto | null>(null);
    const [produtoLoading, setProdutoLoading] = useState<boolean>(false);

    const startGlobalLoading = useGlobalLoadingStore(state => state.startLoading);
    const stopGlobalLoading = useGlobalLoadingStore(state => state.stopLoading);

    const produtoRefresh = () => {
        if (!id || produtoLoading) return;
        setProdutoLoading(true);
        startGlobalLoading('produto'); // inicia o loading global

        produtosService
            .getById(id)
            .then(res => setProduto(res.data))
            .catch((error) => {
                notification.error({
                    message: error.message || 'Erro ao listar produto',
                });
                setProduto(null);
            })
            .finally(() => {
                setProdutoLoading(false);
                stopGlobalLoading('produto'); // encerra o loading global
            });
    };

    useEffect(() => {
        if (id) {
            produtoRefresh();
        }
    }, [id]);

    return {
        produto,
        produtoLoading,
        produtoRefresh,
    };
};
