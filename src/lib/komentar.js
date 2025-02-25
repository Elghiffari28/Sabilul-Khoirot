import { apiRequest } from "./api";

export const createKomentar = (id, data) =>
  apiRequest(`komentar/${id}`, "POST", data);
