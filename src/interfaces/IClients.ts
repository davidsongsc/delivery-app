export interface IClients {
  id: string
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  observacoes: string;
  ativo: boolean
  created_at?: string
  updated_at?: string
  created_by?: string | null
  updated_by?: string | null
}

export interface IClientsCreate {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  observacoes: string;
  ativo: boolean
}