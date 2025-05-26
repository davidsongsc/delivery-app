import { IEndereco } from "./IEndereco";

export interface ICliente {
    id: number;
    nome: string;
    telefone: string;
    cpf: string;
    endereco: IEndereco;

    //uid: string;
    //created_at: string;
    //updated_at: string;
}