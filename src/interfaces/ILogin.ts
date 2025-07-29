export interface IUser {
  id: string;
  username: string;
  email: string;
  is_active: boolean;
  perfis?: any[]; // ou defina um tipo específico para perfil
}
