import apiClient from './apiClient';
import { IUser } from '@/interfaces/IUser'; // Assumindo que você tem uma interface para o usuário

const baseURL = '/api/chat-users/';

export const chatUserService = {
  getAll: () => apiClient.get<IUser[]>(baseURL),
};
