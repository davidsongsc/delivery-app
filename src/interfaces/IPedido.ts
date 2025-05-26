
export interface IItem {
    id: number;
    nome: string;
    valor: number;
    desconto: number;
    remover: string[];
    adicionar: { item: string; valor: number }[]; 
    quantidade: number;
    categoria: string;
    descricao: string;
}

export interface IPedido {
    id: number;
    hora: string;
    data: string;
    itens: IItem[];

    //uid: string;
    //created_at: string;
    //updated_at: string;
}