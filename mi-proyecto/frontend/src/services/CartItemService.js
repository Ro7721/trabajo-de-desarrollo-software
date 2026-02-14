import axios from "axios";
const API_URL = 'http://localhost:8080/api/cart';

// Configuración de axios para incluir credenciales (cookies de sesión)
const axiosConfig = {
    withCredentials: true
};

export const getCart = async () => {
    const response = await axios.get(`${API_URL}/getall`, axiosConfig);
    return response.data;
}
export const addToCart = async (productId, quantity = 1) => {
    const response = await axios.post(`${API_URL}/add`, { productId, quantity }, axiosConfig);
    return response.data;
}
export const updateQuantity = async (itemId, quantity) => {
    const response = await axios.put(`${API_URL}/update/${itemId}`, quantity, axiosConfig);
    return response.data;
}
export const removeItem = async (itemId) => {
    const response = await axios.delete(`${API_URL}/delete/${itemId}`, axiosConfig);
    return response.data;
}
export const clearItem = async () => {
    const response = await axios.delete(`${API_URL}/clear`, axiosConfig);
    return response.data;
}