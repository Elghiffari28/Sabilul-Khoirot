import { apiRequest } from "./api";

export const createKomentar = (id, data) =>
  apiRequest(`komentar/${id}`, "POST", data);
export const deleteKomentar = (id) => apiRequest(`komentar/${id}`, "DELETE");
