import { IProduto } from "@/interfaces/IProduto";
import { produtosService } from "@/services/product.service";
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
        if (produtoLoading) return;
        setProdutoLoading(true);

        produtosService
            .getById(id)
            .then(res => {
                setProduto(res.data);
            })
            .catch(() => {
                console.log("Erro ao buscar produto");
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