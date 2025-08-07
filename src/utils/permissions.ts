type Permissao = string;

function getUserPermissions(user: any): Permissao[] {
  if (!Array.isArray(user?.permissoes)) return [];

  return user.permissoes
    .filter((p: any) => typeof p?.codigo === 'string') // garante que existe e é string
    .map((p: any) => p.codigo);
}

export default getUserPermissions;
