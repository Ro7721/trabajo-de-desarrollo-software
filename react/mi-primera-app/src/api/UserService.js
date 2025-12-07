import axios from "axios";

const API_URL = "http://localhost:8080";
export const getUsers = () => axios.get(`${API_URL}/users`);
export const addUser = (data) => axios.post(`${API_URL}/insert`, data);
export const deleteUser = (id) => axios.delete(`${API_URL}/delete/${id}`);
export const updateUser = (id, data) => axios.put(`${API_URL}/update/${id}`, data);
export const getUserById = (id) => axios.get(`${API_URL}/user/${id}`);
