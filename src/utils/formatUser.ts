import { IPerfil, IPermissao } from "@/interfaces/IPerfil";
import { IUser } from "@/interfaces/IUser";

function mapUserData(data: any): IUser {
  const permissoesSet = new Map<string, IPermissao>();

  (data.permissoes || []).forEach((codigo: string) => {
    if (!permissoesSet.has(codigo)) {
      permissoesSet.set(codigo, {
        codigo,
        nome: codigo.split('_').map(word =>
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),

        id: codigo
      });
    }
  });

  const perfis: IPerfil[] = (data.perfis || []).map((perfil: any) => {
    // Processa tipos de perfil (se necessário)
    const tipos = perfil.tipos || [];

    const tiposFormatados = tipos.map((tipo: any) => ({
      id: tipo.id,
      nome: tipo.nome,
      descricao: tipo.descricao || '',
      ativo: tipo.ativo,
      // Como não há 'nivel' na resposta, removemos essa estrutura
      cargo: tipo.cargo || '',
      valor_hora: tipo.valor_hora || '0',
      categoria: tipo.categoria || 'OUTROS'
    }));

    return {
      id: perfil.id,
      nome: perfil.nome,
      descricao: perfil.descricao || '',
      tipos: tiposFormatados,
      permissoes: (perfil.permissoes || []).map((codigo: string) => ({
        codigo,
        nome: codigo.split('_').map(word =>
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        id: codigo // ID temporário
      })),
      corporation: perfil.corporation || null,
      ativo: perfil.ativo
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
    corporation: data.corporation || null,
    tenant: data.tenant || null,
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