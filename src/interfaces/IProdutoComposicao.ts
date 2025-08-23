export interface IProdutoComposicao {
  id: string;
  produto: string;           // ID do produto
  item: string;              // ID do item
  item_nome?: string;        // Nome do item (read-only do serializer)
  tipo?: 'AD' | 'RM';        // exemplo de TipoComposicao (adicional ou remoção)
  quantidade: number;
  preco_extra: number;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

export interface IProdutoComposicaoCreate {
  produto: string;
  item: string;
  tipo?: 'AD' | 'RM';
  quantidade: number;
  preco_extra?: number;
}
