export interface IReservas {
    id: string;
    tenant: string;
    cliente_nome: string;
    telefone: string;
    email: string;
    quantidade_pessoas: number;
    data_hora: string;
    status: 'pendente' | 'confirmada' | 'cancelada' | 'finalizada';
    created_at?: string;
    updated_at?: string;
    created_by?: string | null;
    updated_by?: string | null;
}

export interface IReservasCreate {
    tenant: string;
    cliente_nome: string;
    telefone: string;
    email: string;
    quantidade_pessoas: number;
    data_hora: string;
}