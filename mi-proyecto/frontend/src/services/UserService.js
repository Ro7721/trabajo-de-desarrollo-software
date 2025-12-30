import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

export const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/getAll`);
    return response.data;
}

export const createUsers = async (userData) => {
    const response = await axios.post(`${API_URL}/createUser`, userData);
    return response.data;
}

export const deleteUser = async (idPerson) => {
    const response = await axios.delete(`${API_URL}/deleteUser/${idPerson}`);
    return response.data;
}

export const updateUser = async (idPerson, userData) => {
    const response = await axios.put(`${API_URL}/updateUser/${idPerson}`, userData);
    return response.data;
}

export const searchUsers = async (searchTerm) => {
    const response = await axios.get(`${API_URL}/search`, {
        params: { name: searchTerm, dni: searchTerm }
    });
    return response.data;
}

export const getUserById = async (idPerson) => {
    const response = await axios.get(`${API_URL}/${idPerson}`);
    return response.data;
}
