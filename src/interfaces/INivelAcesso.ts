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

export interface Perfil {
  id: string;
  nome: string;
  descricao: string;
  tipo: TipoPerfil;
}

export interface AuthResponse {
  refresh: string;
  access: string;
  user_id: string;
  username: string;
  email: string;
  is_active: boolean;
  perfis: Perfil[];
}
