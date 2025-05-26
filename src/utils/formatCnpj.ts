export function formatCNPJ(cnpj: string | number): string {
    const cleaned = cnpj.toString().replace(/\D/g, ''); // Remove tudo que não for número
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);

    if (match) {
        return `${match[1]}.${match[2]}.${match[3]}/${match[4]}-${match[5]}`;
    }

    return cnpj.toString(); // Retorna original se não bater com o padrão
}
