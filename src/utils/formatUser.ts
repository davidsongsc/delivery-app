import { IPerfil, IPermissao } from "@/interfaces/IPerfil";
import { IUser } from "@/interfaces/IUser";

function mapUserData(data: any): IUser {
  const perfis: IPerfil[] = (data.perfis || []).map((perfil: any) => {
    const permissoes: IPermissao[] = perfil.tipo?.nivel?.permissoes || [];

    return {
      id: perfil.id,
      nome: perfil.nome,
      descricao: perfil.descricao,
      tipo: {
        id: perfil.tipo?.id,
        nome: perfil.tipo?.nome,
        descricao: perfil.tipo?.descricao,
        ativo: perfil.tipo?.ativo,
        nivel: {
          id: perfil.tipo?.nivel?.id,
          nome: perfil.tipo?.nivel?.nome,
          descricao: perfil.tipo?.nivel?.descricao,
          permissoes: permissoes.map((p: any) => ({
            id: p.id,
            codigo: p.codigo,
            nome: p.nome,
          })),
        },
      },
    };
  });

  return {
    id: data.user_id,
    username: data.username,
    email: data.email,
    is_active: data.is_active,
    is_staff: data.is_staff || false,
    is_superuser: data.is_superuser || false,
    first_name: data.first_name || '',
    last_name: data.last_name || '',
    phone: data.phone_number || '',
    cpf: data.cpf || '',
    rg: data.rg || '',
    corporation: data.corporation || '',
    tenant: data.tenant || '',
    created_at: data.created_at || '',
    updated_at: data.updated_at || '',
    created_by: data.created_by,
    updated_by: data.updated_by,
    perfis,
  };
}

export function formatUserFromAuthResponse(data: any): IUser {
  if (!data || !data.user_id) {
    throw new Error("Dados de usuário inválidos");
  }

  return mapUserData(data);
}
