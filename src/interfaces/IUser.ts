import { IPerfil } from "./IPerfil";

export interface Permissao {
    id: number;
    codigo: "pode_editar" | "pode_visualizar" | "pode_excluir" | "pode_gerenciar_usuarios";
    nome: string;
}

export interface Nivel {
    id: string;
    nome: string;
    descricao: string;
    permissoes: Permissao[];
}

export interface TipoPerfil {
    id: string;
    nome: string;
    descricao: string;
    nivel: Nivel;
    ativo: boolean;
}



export interface AccessLevel {
    level: string;
    permissions: string[];
    pages?: string[];
}

export interface IUser {
    id: string;
    email: string;
    username: string;
    phone?: string;
    cpf?: string;
    rg?: string;
    first_name?: string;
    last_name?: string;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    access_level?: AccessLevel;
    perfis: IPerfil[];
    corporation?: string;
    tenant?: string;
    created_at?: string;
    updated_at?: string;
    created_by?: {
        id: string;
    };
    updated_by?: {
        id: string;
    };
}

export type IUserCreate = Omit<IUser, 'id' | 'is_active' | 'is_staff' | 'is_superuser' | "tenant" | "created_at" | "updated_at" | "password" | "created_by" | "updated_by"> & {
    tenant: string;
    is_active: boolean;
    password: string;
    password_confirmation: string;
};

export type IUserUpdate = Omit<IUser, 'id' | 'is_active' | 'is_staff' | 'is_superuser' | "created_at" | "updated_at" | "password"> & {
    password: string;
    password_confirmation: string;
};
