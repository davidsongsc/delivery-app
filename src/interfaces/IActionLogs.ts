import { ICorporation } from "./ICorporation";
import { IUser } from "./IUser";

interface IContentType {
    id: string;
    model: string;
}
export interface IActionLog {
    id: string; // UUID
    usuario: IUser | null;
    corporation: ICorporation | null;

    acao: string; // Ex: 'CREATE', 'UPDATE', etc
    mensagem: string;

    content_type: IContentType | null;
    object_id: string | null;

    dados_anteriores: any | null;
    dados_novos: any | null;

    ip: string | null;

    criado_em: string; 
}