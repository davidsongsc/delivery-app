import { IItemPedido } from "./IItemPedido";


export interface IPedido {
    id: number;
    mesa: number;
    mesa_numero: number;
    data_abertura: string;
    data_fechamento: string | null;
    total_pedido: number;
    status: 'aberto' | 'fechado' | 'pago';
    itens: IItemPedido[];
}
