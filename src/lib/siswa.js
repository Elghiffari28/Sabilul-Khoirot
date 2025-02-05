import { apiRequest } from "./api";

export const getAllSiswa = () => apiRequest("siswa");
export const getSiswaById = (id) => apiRequest(`siswa/${id}`);
export const createSiswa = (data) => apiRequest("siswa", "POST", data);
export const updateSiswa = (id, data) =>
  apiRequest(`siswa/${id}`, "PATCH", data);
export const deleteSiswa = (id) => apiRequest(`siswa/${id}`, "DELETE");
