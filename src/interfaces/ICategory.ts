export interface ICategory {
    id: string | number;
    nome: string;
    ativo: boolean;
    tipo: 'PRODUTO' | 'SERVICO' | 'OUTRO';
    parent?: ICategory | null;         // Referência à categoria pai (se houver)
    subcategorias?: ICategory[];       // Para casos de resposta aninhada (recursiva)
}

export interface ICategoryCreate extends Omit<ICategory, 'id'> { }