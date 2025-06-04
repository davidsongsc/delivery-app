export interface CorporationForm {
    cnpj: string
    razao_social: string
    nome_fantasia: string
    inscricao_estadual?: string
    inscricao_municipal?: string
    telefone?: string
    celular?: string
    email?: string
    site?: string
    representante_nome: string
    representante_cpf: string
    representante_cargo: string
    aceite_termo_privacidade: boolean
    consentimento_marketing: boolean
}
