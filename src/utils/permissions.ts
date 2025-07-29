type Permissao = string;

function getUserPermissions(user: any): Permissao[] {
    const direct: Permissao[] = user?.access_level?.permissions || [];

    const perfis = user?.perfis || [];
    const fromPerfis: Permissao[] = [];

    for (const perfil of perfis) {
        const nivel = perfil.nivel; // mudar para pegar as permissões daqui
        if (nivel && Array.isArray(nivel.permissoes)) {
            for (const perm of nivel.permissoes) {
                if (perm.codigo && typeof perm.codigo === 'string') {
                    fromPerfis.push(perm.codigo as Permissao);
                }
            }
        }
    }

    // Unir e remover duplicatas
    const allPermissions = new Set<Permissao>([...direct, ...fromPerfis]);
    return Array.from(allPermissions);
}


export default getUserPermissions;
