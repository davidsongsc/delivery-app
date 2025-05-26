export type TipoDesconto = 'valor' | 'porcentagem';

export interface ICupom {
  codigo: string;
  tipo: TipoDesconto; // 'valor' ou 'porcentagem'
  valor: number;
  usosRestantes: number; // decrementa a cada uso
}