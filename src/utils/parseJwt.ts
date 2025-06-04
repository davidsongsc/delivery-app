export function parseJwt(token: string): any {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedData = atob(base64);
        return JSON.parse(decodedData);
    } catch (error) {
        console.error('Erro ao decodificar token:', error);
        return null;
    }
}
