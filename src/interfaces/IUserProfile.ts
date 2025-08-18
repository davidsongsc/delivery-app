export interface IUserProfile {
    id: string;

    usuario: string;
    perfil: string;

    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
}

export interface IUserProfileCreate {
    usuario: string;
    perfil: string;
}