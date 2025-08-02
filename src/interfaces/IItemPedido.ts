export interface IItemPedido {
  id: number;
  pedido: number;
  produto: number;
  produto_nome: string;
  produto_preco: number;
  quantidade: number;
  preco_unitario: number;
  observacoes: string | null;
}
