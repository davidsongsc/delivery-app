import apiClient from './apiClient';

export interface WahaContact {
  id: string;
  name: string;
  pushname: string;
}

const getContacts = async (): Promise<WahaContact[]> => {
  const response = await apiClient.get('/msg/waha-contacts/');
  return response.data.contacts;
};

export const wahaService = {
  getContacts,
};
