import apiClient from "./apiClient";

const remove = async (id: string) => apiClient.delete(`/api/actionlogs/${id}/`);

const getAll = async (query: string = "") =>
  apiClient.get(`/api/actionlogs` + query);


export const actionLogsService = {
  remove,
  getAll,
};
