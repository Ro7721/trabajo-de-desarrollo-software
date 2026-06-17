/**
 * PATHS — Constantes centralizadas de rutas
 *
 * Uso:
 *   import { PATHS } from '../router/paths';
 *   <Link to={PATHS.HOME}>Inicio</Link>
 *   navigate(PATHS.ADMIN.PRODUCTS.LIST)
 */
export const PATHS = {
    // ── Tienda pública ──────────────────────────────
    HOME: '/',
    PRODUCT_DETAIL: '/product/:id',   // usar generatePath(PATHS.PRODUCT_DETAIL, { id })

    // ── Autenticación ───────────────────────────────
    LOGIN: '/login',
    REGISTER: '/register',

    // ── Admin ───────────────────────────────────────
    ADMIN: {
        ROOT: '/admin',

        // Usuarios
        USERS: {
            LIST: '/admin/usuario/listar',
            CREATE: '/admin/usuario/agregar',
            EDIT: '/admin/usuario/editar/:id',
        },

        // Productos
        PRODUCTS: {
            LIST: '/admin/productos/listar',
            CREATE: '/admin/productos/agregar',
            EDIT: '/admin/productos/editar',
        },

        // Ventas
        SALES: {
            LIST: '/admin/ventas/listar',
            EDIT: '/admin/venta/editar',
        },

        // Reportes
        REPORTS: {
            LIST: '/admin/reportes/listar',
        },
    },

    NOT_FOUND: '*',
};