// @/hooks/useProdutoMutations.ts
import { produtosService } from "@/services/product.service";
import { App } from "antd";
import { useGlobalLoadingStore } from "@/store/useGlobalLoadingStore";
import { IProduto, IProdutoCreate, IProdutoPartialUpdate } from "@/interfaces/IProduto";
import { useState } from "react";
import { AxiosResponse } from 'axios'; // Importe AxiosResponse para tipar a promessa

interface UseProdutoMutationsResponse {
    creating: boolean;
    updating: boolean;
    deleting: boolean;
    createProduto: (data: IProdutoCreate, onSuccess?: (data: IProduto) => void) => Promise<void>;
    updateProduto: (id: string, data: Partial<IProdutoCreate>, onSuccess?: () => void) => Promise<void>;
    patchProduto: (id: string, data: IProdutoPartialUpdate, onSuccess?: () => void) => Promise<void>;
    deleteProduto: (id: string, onSuccess?: () => void) => Promise<void>;
}

export const useProdutoMutations = (): UseProdutoMutationsResponse => {
    const { notification } = App.useApp();
    const [creating, setCreating] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const startGlobalLoading = useGlobalLoadingStore(state => state.startLoading);
    const stopGlobalLoading = useGlobalLoadingStore(state => state.stopLoading);

    const mutate = async <T,>(
        promise: Promise<AxiosResponse<T>>, // A promessa deve retornar um AxiosResponse com o tipo genérico T
        setLoading: (state: boolean) => void,
        loadingKey: string,
        successMessage: string,
        errorMessage: string,
        onSuccess?: (data: T) => void, // onSuccess deve receber o tipo T
    ) => {
        try {
            setLoading(true);
            startGlobalLoading(loadingKey);
            const response = await promise;
            notification.success({ message: successMessage });
            onSuccess?.(response.data); // Passa os dados da resposta para o callback
        } catch (error: any) {
            notification.error({
                message: error.message || errorMessage,
            });
        } finally {
            setLoading(false);
            stopGlobalLoading(loadingKey);
        }
    };

    const createProduto = async (data: IProdutoCreate, onSuccess?: (data: IProduto) => void) => {
        await mutate<IProduto>( // Passa o tipo IProduto para o mutate
            produtosService.create(data),
            setCreating,
            "createProduto",
            "Produto criado com sucesso!",
            "Erro ao criar produto",
            onSuccess,
        );
    };

    // As demais funções de mutação (update, patch, delete) não precisam receber dados de retorno, então a tipagem é mais simples.
    // O delete, por exemplo, não retorna nada.

    const updateProduto = async (id: string, data: Partial<IProdutoCreate>, onSuccess?: () => void) => {
        await mutate<void>( // O update pode não retornar dados, então passamos 'void'
            produtosService.update(id, data),
            setUpdating,
            "updateProduto",
            "Produto atualizado com sucesso!",
            "Erro ao atualizar produto",
            onSuccess,
        );
    };

    const patchProduto = async (id: string, data: IProdutoPartialUpdate, onSuccess?: () => void) => {
        await mutate<void>(
            produtosService.partialUpdate(id, data),
            setUpdating,
            "patchProduto",
            "Produto atualizado parcialmente!",
            "Erro ao atualizar parcialmente",
            onSuccess,
        );
    };

    const deleteProduto = async (id: string, onSuccess?: () => void) => {
        await mutate<void>(
            produtosService.remove(id),
            setDeleting,
            "deleteProduto",
            "Produto removido com sucesso!",
            "Erro ao remover produto",
            onSuccess,
        );
    };

    return {
        creating,
        updating,
        deleting,
        createProduto,
        updateProduto,
        patchProduto,
        deleteProduto,
    };
};