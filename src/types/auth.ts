import { IPerfil } from "@/interfaces/IPerfil";

export interface AuthResponse {
  access: string;
  refresh: string;
  access_level: {
    level: string;
    permissions: string[];
  };
}

export interface JwtPayload {
  uid: string;
  username: string;
  email: string;
  exp: number;
  iat: number;
  // Outros campos personalizados no token, se houver
}

export interface NivelAcesso {
  id: string;
  nome: string;
  descricao: string;
  pode_editar: boolean;
  pode_visualizar: boolean;
  pode_excluir: boolean;
  pode_gerenciar_usuarios: boolean;
}

export interface TipoPerfil {
  id: string;
  nome: string;
  descricao: string;
  nivel: NivelAcesso;
  ativo: boolean;
}


export interface AuthResponse {
  refresh: string;
  access: string;
  user_id: string;
  username: string;
  email: string;
  is_active: boolean;
  perfis: IPerfil[];
}

export interface access {
  level?: string; // Pode ser o nome do nível, ex: "Apagar"
  permissions?: string[]; // Pode ser uma lista como ['pode_editar', 'pode_visualizar']
  pages?: string[]; // Futuro: páginas permitidas
}
