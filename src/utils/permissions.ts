type Permissao = string;

function getUserPermissions(user: any): Permissao[] {
    const perfis = user?.perfis || [];
    const fromPerfis: Permissao[] = [];

    for (const perfil of perfis) {
        const permissoes = perfil?.tipo?.nivel?.permissoes;

        if (Array.isArray(permissoes)) {
            for (const perm of permissoes) {
                if (perm.codigo && typeof perm.codigo === 'string') {
                    fromPerfis.push(perm.codigo as Permissao);
                }
            }
        }
    }

    const allPermissions = new Set<Permissao>([...fromPerfis]);
    return Array.from(allPermissions);
}

export default getUserPermissions;
