export interface IProduto {
  id: number | string;
  nome: string;
  valor: number;
  desconto: number;
  remover: string[];
  adicionar: { item: string, valor: number }[]; 
  quantidade: number;
  categoria: string;
  descricao: string;
  composicao?: string[];
}
