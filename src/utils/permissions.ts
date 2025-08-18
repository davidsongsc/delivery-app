import { IUserProfile } from "@/interfaces/IUserProfile";

type Permissao = string;

function getUserPermissions(usuarioPerfilArray: IUserProfile[] = []): Permissao[] {
  if (!Array.isArray(usuarioPerfilArray)) return [];

  const permissoesSet = new Set<string>();

  usuarioPerfilArray.forEach((up) => {
    const perfil = up.perfil;
    if (perfil && Array.isArray(perfil.permissoes)) {
      perfil.permissoes.forEach((p: any) => {
        if (typeof p?.codigo === 'string') {
          permissoesSet.add(p.codigo);
        }
      });
    }
  });

  return Array.from(permissoesSet);
}

export default getUserPermissions;
export { getUserPermissions };
