import { apiRequest } from "./api";

export const getAllBerita = () => apiRequest("berita");
export const getBeritaById = (id) => apiRequest(`berita/${id}`);
export const createBerita = (data) => apiRequest("berita", "POST", data);
// export const updateBerita = (id, data) => apiRequest(`berita/${id}`, "PATCH", data);
export const deleteBerita = (id) => apiRequest(`berita/${id}`, "DELETE");
