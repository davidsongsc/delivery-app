export interface IPermissao {
  id: number;
  codigo: string;
  nome: string;
}

export interface INivelPermissao {
  id: string;
  nome: string;
  descricao: string;
  permissoes: IPermissao[];
}

export interface ITipoPerfil {
  id: string;
  nome: string;
  descricao: string;
  ativo: boolean;
  nivel: INivelPermissao;
}

export interface IPerfil {
  id: string;
  nome: string;
  descricao: string;
  tipo: ITipoPerfil;
}

// Exemplo de array de perfis
export type PerfisResponse = IPerfil[];

export interface IPerfilCreate {
  id?: string;
  nome: string;
  descricao?: string;
  tipo: string; // ID do tipo
  nivel: string; // ID do nível
}

export interface IPerfilUpdate extends IPerfilCreate {}
