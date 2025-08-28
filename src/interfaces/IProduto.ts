export interface IProdutoImagem {
  id: string;
  imagem_url: string;
  descricao?: string | null;
  ordem?: number;
}


export interface IProdutoFlags {
  delivery: boolean;
  comanda: boolean;
  happy_hour: boolean;
  promocional: boolean;

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