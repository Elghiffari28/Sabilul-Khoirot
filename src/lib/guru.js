import { apiRequest } from "./api";

export const getAllGuru = () => apiRequest("guru");
export const getGuruById = (id) => apiRequest(`guru/${id}`);
export const createGuru = (data) => apiRequest("guru", "POST", data);
export const updateGuru = (id, data) => apiRequest(`guru/${id}`, "PATCH", data);
export const deleteGuru = (id) => apiRequest(`guru/${id}`, "DELETE");
