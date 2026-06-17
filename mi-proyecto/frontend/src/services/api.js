import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Request Interceptor: Attach accessToken to every outgoing request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Unauthorized globally to refresh token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Evitar recurrencia infinita y chequear que el error provenga exactamente del Backend por credenciales
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                // Call the backend directly via Axios so we don't pass through our own interceptor
                const response = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
                const { accessToken } = response.data;

                // Save new token
                localStorage.setItem('accessToken', accessToken);

                // Update original request
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                // Re-attempt original request
                return api(originalRequest);

            } catch (refreshError) {
                // If refresh fails, purge tokens so AuthContext redirects to login
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                // You can emit an event or force reload if needed
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);




export default api;