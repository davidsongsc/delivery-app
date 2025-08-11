import { ICorporation } from "./ICorporation";

export interface ISupplier {
    id: string;
    nome: string;
    cnpj_cpf?: string | null;
    email?: string | null;
    telefone?: string | null;
    endereco?: string;
    observacoes?: string;
    corporation: string | ICorporation;
    ativo: boolean;
    created_at?: string;
    updated_at?: string;
    created_by?: string | null;
    updated_by?: string | null;
}

export interface ISupplierCreate {
    nome: string;
    cnpj_cpf?: string | null;
    email?: string | null;
    telefone?: string | null;
    endereco?: string;
    observacoes?: string;
    corporation: string;
    ativo: boolean;
}