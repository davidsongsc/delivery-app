export interface AuthResponse {
    access: string;
    refresh: string;
}

export interface JwtPayload {
    uid: string;
    username: string;
    email: string;
    exp: number;
    iat: number;
    // Outros campos personalizados no token, se houver
}
