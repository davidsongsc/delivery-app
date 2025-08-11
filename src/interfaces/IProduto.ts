export interface IProdutoImagem {
  id: string;
  imagem_url: string;
  descricao?: string | null;
  ordem?: number;
}


export interface IProdutoFlags {
  ativo: boolean;
  is_delivery: boolean;
  is_pickup: boolean;
  is_visible: boolean;
  is_digital: boolean;
  is_scheduled: boolean;
  has_stock_control: boolean;
  is_limited: boolean;
  is_blocked: boolean;
  blocked_reason: string;
  limited_stock: number;
  is_free: boolean;
  is_discounted: boolean;
  requires_preparation: boolean;
}

export interface IProduto {
  id: number | string;
  nome: string;
  nome_interno: string;
  preco: number;
  desconto: number;
  estoque: number;
  remover: string[];
  adicionar: { item: string, valor: number }[];
  quantidade: number;
  categoria_id: string;
  ativo: boolean;
  descricao: string;
  imagem?: string;
  promocional?: boolean;
  composicao?: string[];
  volume?: string;
  peso?: string;
  unidade_medida?: string;
  tenant: string;
  sku?: string;
  imagens?: IProdutoImagem[];
  flags: IProdutoFlags;
}

export type IProdutoCreate = Omit<IProduto, 'id' | 'created_by' | 'updated_by'>;

export type IProdutoUpdate = IProdutoCreate; 

export type IProdutoPatch = Partial<IProdutoCreate>;

export type IProdutoPartialUpdate = Partial<IProdutoUpdate>;