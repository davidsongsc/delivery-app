export function formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, ''); // Remove tudo que não for número

    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return phone; // Retorna original se não bater com o padrão esperado
}


export function formatPhoneNumberWeb(phone: string | number): string {
    const cleaned = phone.toString().replace(/\D/g, ''); // Remove tudo que não for número
    const match = cleaned.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);

    if (match) {
        return `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
    }

    return phone.toString(); // Retorna original se não bater com o formato esperado
}