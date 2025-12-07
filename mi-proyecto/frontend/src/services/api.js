import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const usuarioService = {
    // GET all usuarios
    getUsuarios: () => api.get('/usuarios'),

    // GET usuario by id
    getUsuario: (id) => api.get(`/usuarios/${id}`),

    // POST crear usuario
    createUsuario: (usuario) => api.post('/usuarios', usuario),

    // PUT actualizar usuario
    updateUsuario: (id, usuario) => api.put(`/usuarios/${id}`, usuario),

    // DELETE eliminar usuario
    deleteUsuario: (id) => api.delete(`/usuarios/${id}`),
};
export const productoService = {
    getProducts: () => api.get('/productos'),
    getProduct: (id) => api.get(`/search/${id}`),
    getFeaturedProducts: () => api.get('/productos/featured'),
    getCategories: () => api.get('/productos/categories'),
    getProductsCount: () => api.get('/productos/count'),
    createProduct: (producto) => api.post('/productos/insert', producto),
    updateProduct: (id, producto) => api.put(`/productos/update/${id}`, producto),
    deleteProduct: (id) => api.delete(`/productos/delete/${id}`),
}

export default api;