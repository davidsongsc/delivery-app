export interface IItens {
    id: string;
    tenant: string;
    nome: string;
    descricao?: string;
    ativo: boolean;
    categoria: string;

    created_at?: string;
    updated_at?: string;
    created_by?: string;
    updated_by?: string;
}

export interface IItensCreate {
    tenant: string;
    nome: string;
    descricao?: string;
    ativo: boolean;
    categoria: string;
}