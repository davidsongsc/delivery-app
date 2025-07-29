export interface IPermissions {
    codigo: string;
    nome: string;
    id: string;

}
export interface IPerfil {
    id: string;
    nome: string;
    descricao: string;
    nivel: {
        id: string;
        nome: string;
        descricao: string;
        permissoes: IPermissions[];
    };
    tipo: {
        id: string;
        nome: string;
        descricao: string;
        nivel: {
            id: string;
            nome: string;
            descricao: string;
            pode_editar: boolean;
            pode_visualizar: boolean;
            pode_excluir: boolean;
            pode_gerenciar_usuarios: boolean;
        };
        ativo: boolean;
    };
}