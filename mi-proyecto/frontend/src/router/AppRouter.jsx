import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PATHS } from './paths';

// ── Páginas públicas ─────────────────────────────
import HomePage from '../pages/HomePage';

// ── Layout Admin ─────────────────────────────────
import Dashboard from '../pages/Dashboard';

// ── Sección Admin: Productos ──────────────────────
import CreateProduct from '../pages/CreateProduct';
import ProductGetAll from '../components/product/ProductGetAll';
import ProductEdit from '../components/product/ProductEdit';

// ── Sección Admin: Usuarios ───────────────────────
import UserGetAll from '../components/usuarios/UserGetAll';
import CreateUser from '../components/usuarios/CreateUser';

// ── Componente DashboardCard ──────────────────────
import DashboardCard from '../components/DashboardCard';

/**
 * AppRouter — Punto único de definición de rutas.
 *
 * Estructura:
 *  /                        → Tienda pública (HomePage)
 *  /admin/*                 → Panel admin (Dashboard como layout)
 *    /admin                 → DashboardCard (índice)
 *    /admin/productos/listar
 *    /admin/productos/agregar
 *    /admin/productos/editar
 *    /admin/usuario/listar
 *    /admin/usuario/agregar
 *    /admin/ventas/listar
 *    /admin/reportes/listar
 */
const AppRouter = () => {
    return (
        <BrowserRouter>
            {/* Navbar superior global (solo visible en tienda pública, oculto en admin) */}
            <PublicNav />

            <Routes>
                {/* ── Tienda pública ──────────────────── */}
                <Route path={PATHS.HOME} element={<HomePage />} />

                {/* ── Panel administrador ─────────────── */}
                <Route path="/admin/*" element={<Dashboard />} />

                {/* Ruta no encontrada → redirige a inicio */}
                <Route path={PATHS.NOT_FOUND} element={<Navigate to={PATHS.HOME} replace />} />
            </Routes>
        </BrowserRouter>
    );
};

/**
 * Barra de navegación pública (Tienda / Admin).
 * Solo se muestra en rutas fuera de /admin.
 */
const PublicNav = () => {
    // Ocultamos el nav en rutas de admin (Dashboard tiene su propio sidebar)
    const isAdmin = window.location.pathname.startsWith('/admin');
    if (isAdmin) return null;

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex gap-4">
                <a href={PATHS.HOME} className="hover:text-green-400 font-bold">
                    Tienda
                </a>
                <a href={PATHS.ADMIN.PRODUCTS.CREATE} className="hover:text-green-400">
                    Registrar Producto
                </a>
                <a href={PATHS.ADMIN.ROOT} className="hover:text-green-400">
                    Dashboard
                </a>
            </div>
        </nav>
    );
};

export default AppRouter;
