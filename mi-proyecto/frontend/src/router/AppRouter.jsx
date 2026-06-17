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

// ── Autenticación ──────────────────────────────────
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

/**
 * AppRouter — Punto único de definición de rutas.
 */
const AppRouter = () => {
    return (
        <BrowserRouter>
            {/* Navbar superior global (solo visible en tienda pública, oculto en admin) */}
            {/* <PublicNav /> */}

            <Routes>
                {/* ── Rutas Públicas ──────────────────── */}
                <Route path={PATHS.HOME} element={<HomePage />} />
                <Route path={PATHS.LOGIN} element={<LoginPage />} />
                <Route path={PATHS.REGISTER} element={<RegisterPage />} />

                {/* ── Rutas Protegidas (Panel Admin) ──── */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/admin/*" element={<Dashboard />} />
                </Route>

                {/* Ruta no encontrada → redirige a inicio */}
                <Route path={PATHS.NOT_FOUND} element={<Navigate to={PATHS.HOME} replace />} />
            </Routes>
        </BrowserRouter>
    );
};



export default AppRouter;
