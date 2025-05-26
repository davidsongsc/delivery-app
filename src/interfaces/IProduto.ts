export interface IProduto {
    id: number | string;
    nome: string;
    valor: number;
    desconto: number;
    remover: string[];
    adicionar: string[] | { item: string, valor: number }[];
    quantidade: number;
    categoria: string;
    descricao: string;
    composicao?: string[];
}