import { IPerfil, IPermissao } from "@/interfaces/IPerfil";
import { IUser } from "@/interfaces/IUser";

function mapUserData(data: any): IUser {
  const permissoesSet = new Map<string, IPermissao>();

  const perfis: IPerfil[] = (data.perfis || []).map((perfil: any) => {
    const tipos = perfil.tipos || [];

    const tiposFormatados = tipos.map((tipo: any) => {
      const nivel = tipo.nivel || { permissoes: [] };
      const permissoes: IPermissao[] = nivel.permissoes.map((p: any) => {
        const permissao: IPermissao = {
          id: p.id,
          codigo: p.codigo,
          nome: p.nome,
        };

        // Evita duplicatas
        if (!permissoesSet.has(p.codigo)) {
          permissoesSet.set(p.codigo, permissao);
        }

        return permissao;
      });

      return {
        id: tipo.id,
        nome: tipo.nome,
        descricao: tipo.descricao,
        ativo: tipo.ativo,
        nivel: {
          id: nivel.id,
          nome: nivel.nome,
          descricao: nivel.descricao,
          permissoes,
        },
      };
    });

    return {
      id: perfil.id,
      nome: perfil.nome,
      descricao: perfil.descricao,
      tipos: tiposFormatados,
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
    permissoes: Array.from(permissoesSet.values()),
  };
}


export function formatUserFromAuthResponse(data: any): IUser {
  if (!data || !data.user_id) {
    throw new Error("Dados de usuário inválidos");
  }

  return mapUserData(data);
}
