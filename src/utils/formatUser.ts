import { AuthResponse } from '@/types/auth';
import { User } from '@/types/User';

export function formatUserFromAuthResponse(data: AuthResponse): User {
  const perfil = data.perfis[0];
  const nivel = perfil?.tipo?.nivel;

  const permissions = Object.entries(nivel || {})
    .filter(([_, value]) => value === true)
    .map(([key]) => key);

  return {
    uid: data.user_id,
    username: data.username,
    email: data.email,
    is_superuser: false, // ou receber da API
    is_staff: false,     // ou receber da API
    first_name: null,
    last_name: null,
    is_active: data.is_active,
    phone_number: null,
    access_level: {
      level: nivel?.nome || '',
      permissions,
      pages: [], // pode ser montado com lógica adicional
    },
    invited_by: null,
    cpf: null,
    rg: null,
    other_doc: null,
    corporation_member: {
      id: perfil.id,
      nome: perfil.nome,
      descricao: perfil.descricao,
      tipo: perfil.tipo.nome,
    },
  };
}
