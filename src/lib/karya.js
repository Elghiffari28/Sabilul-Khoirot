import { apiRequest } from "./api";

export const getAllKarya = () => apiRequest("karya");
export const getKaryaById = (id) => apiRequest(`karya/${id}`);
export const createKarya = (data) => apiRequest("karya", "POST", data);
export const updateKarya = (id, data) =>
  apiRequest(`karya/${id}`, "PATCH", data);
export const deleteKarya = (id) => apiRequest(`karya/${id}`, "DELETE");
