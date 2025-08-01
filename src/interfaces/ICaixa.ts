export interface IMovimentacao {
  id: string;
  tipo: 'ENTRADA' | 'SAIDA' | string;
  descricao: string;
  valor: number;
  data: string;
}

export interface ICaixa {
  id: string;
  nome: string;
  tenant: string;
  operador: string;
  operador_nome: string;
  status: 'ABERTO' | 'FECHADO' | 'PENDENTE';
  status_display: string;
  saldo_inicial: number;
  saldo_atual: number;
  data_abertura: string;
  data_fechamento: string | null;
  ativo: boolean;
  movimentacoes?: IMovimentacao[];
  created_at: string;
  updated_at: string;
}

export interface ICaixaCreate {
  id?: string;
  nome: string;
  tenant: string;
  operador: string;
  operador_nome: string;
  status: 'ABERTO' | 'FECHADO' | 'PENDENTE';
  saldo_inicial: number;
  ativo: boolean;
}