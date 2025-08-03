export interface IProduto {
  id: number | string;
  nome: string;
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
  imagens?: string[];
}

export type IProdutoCreate = Omit<IProduto, 'id' | "created_by" | "updated_by"> & {
  
};