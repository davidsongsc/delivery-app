import { ICorporation } from "./ICorporation"
import { IUser } from "./IUser"

export interface IAffiliate {
  id: string
  user: string | IUser
  corporation: string | ICorporation
  codigo_afiliado: string
  comissao_percentual: number
  ativo: boolean
  afiliado_convidador?: string | IAffiliate | null
  created_at?: string
  updated_at?: string
  created_by?: string | null
  updated_by?: string | null
}

export interface IAffiliateCreate {
  user: string
  corporation: string
  codigo_afiliado: string
  comissao_percentual: number
  ativo: boolean
  afiliado_convidador?: string | IAffiliate | null
}