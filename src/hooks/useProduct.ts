import { IProduto } from "@/interfaces/IProduto";
import { produtosService } from "@/services/product.service";
import { notification } from "antd";
import { useEffect, useState } from "react";

interface UseProdutoProps {
    id: string | number;
}

interface UseProdutoResponse {
    produto: IProduto | null;
    produtoLoading: boolean;
    produtoRefresh: () => void;
}

export const useProduto = ({ id }: UseProdutoProps): UseProdutoResponse => {
    const [produto, setProduto] = useState<IProduto | null>(null);
    const [produtoLoading, setProdutoLoading] = useState<boolean>(false);

    const produtoRefresh = () => {
        if (!id || produtoLoading) return;
        setProdutoLoading(true);

        produtosService
            .getById(id)
            .then(res => setProduto(res.data))
            .catch((error) => {
                
                notification.error({
                    message: error.message || 'Erro ao listar produtos',
                });
                setProduto(null);
            })
            .finally(() => setProdutoLoading(false));
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