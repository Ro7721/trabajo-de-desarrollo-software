import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PATHS } from '../router/paths';

import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import Footer from '../layout/Footer';

import DashboardCard from '../components/DashboardCard';
import UserGetAll from '../components/usuarios/UserGetAll';
import CreateUser from '../components/usuarios/CreateUser';
import CreateProduct from './CreateProduct';
import ProductEdit from '../components/product/ProductEdit';
import ProductGetAll from '../components/product/ProductGetAll';

import '../css/dashboard/dashboardcard.css';

/**
 * Dashboard — Layout del panel de administración.
 * Las rutas aquí son relativas a /admin/* (sin el prefijo /admin/).
 * Los paths se derivan de las constantes en PATHS para evitar strings hardcodeados.
 */

// Helper: quita el prefijo '/admin/' para obtener la ruta relativa
const rel = (fullPath) => fullPath.replace('/admin/', '');

const Dashboard = () => {
    return (
        <div className="flex min-h-screen">

            {/* SIDEBAR */}
            <Sidebar />

            {/* CONTENIDO */}
            <div className="flex flex-col flex-1 ml-64">

                <Header />

                <main className="flex-1 p-6 bg-gray-100">
                    <Routes>
                        {/* Índice del admin → DashboardCard */}
                        <Route index element={<DashboardCard />} />

                        {/* ── Usuarios ── */}
                        <Route path={rel(PATHS.ADMIN.USERS.CREATE)} element={<CreateUser />} />
                        <Route path={rel(PATHS.ADMIN.USERS.LIST)} element={<UserGetAll />} />
                        <Route path={rel(PATHS.ADMIN.USERS.EDIT)} element={<h1>Editar Usuario</h1>} />

                        {/* ── Productos ── */}
                        <Route path={rel(PATHS.ADMIN.PRODUCTS.CREATE)} element={<CreateProduct />} />
                        <Route path={rel(PATHS.ADMIN.PRODUCTS.LIST)} element={<ProductGetAll />} />
                        <Route path={rel(PATHS.ADMIN.PRODUCTS.EDIT)} element={<ProductEdit />} />

                        {/* ── Ventas ── */}
                        <Route path={rel(PATHS.ADMIN.SALES.LIST)} element={<h1>Ventas</h1>} />
                        <Route path={rel(PATHS.ADMIN.SALES.EDIT)} element={<h1>Editar Ventas</h1>} />

                        {/* ── Reportes ── */}
                        <Route path={rel(PATHS.ADMIN.REPORTS.LIST)} element={<h1>Reportes</h1>} />
                    </Routes>
                </main>

                <Footer />

            </div>
        </div>
    );
};

export default Dashboard;
