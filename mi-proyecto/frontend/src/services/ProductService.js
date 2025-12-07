import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';

export const getProducts = async (page = 0, size = 12, filters = {}) => {
    const params = {
        page,
        size,
        category: filters.category || null,
        sortBy: filters.sortBy || null,
        search: filters.search || null
    };

    // Spring Boot devuelve un objeto Page con 'content' (la lista) y metadatos
    const response = await axios.get(API_URL, { params });
    return response.data;
};
export const createProduct = async (productData) => {
    // Tu backend espera un POST a /api/products/insert
    const response = await axios.post(`${API_URL}/insert`, productData);
    return response.data;
};
export const getFeaturedProducts = async () => {
    const response = await axios.get(`${API_URL}/featured`);
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axios.get(`${API_URL}/search/${id}`);
    return response.data;
};

export const getCategories = async () => {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
};
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/upload-image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    // Devuelve la URL (string) que envió el backend
    return response.data;
};