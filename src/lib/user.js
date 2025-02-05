import { apiRequest } from "./api";

export const getAllUser = () => apiRequest("user");
export const getUserById = (id) => apiRequest(`user/${id}`);
export const createUser = (data) => apiRequest("user", "POST", data);
export const updateUser = (id, data) => apiRequest(`user/${id}`, "PATCH", data);
export const deleteUser = (id) => apiRequest(`user/${id}`, "DELETE");
