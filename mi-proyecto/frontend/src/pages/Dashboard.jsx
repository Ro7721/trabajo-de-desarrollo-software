import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import Footer from '../layout/Footer';
import DashboardCard from '../components/DashboardCard';
import UserGetAll from '../components/usuarios/UserGetAll';
import CreateUser from '../components/usuarios/CreateUser';
import '../css/dashboard/dashboardcard.css';
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
                        <Route index element={<DashboardCard />} />

                        {/* Usuarios */}
                        <Route path="usuario/agregar" element={<CreateUser />} />
                        <Route path="usuario/listar" element={<UserGetAll />} />
                        <Route path="usuario/editar" element={<h1>Editar Usuario</h1>} />

                        {/* Productos */}
                        <Route path="productos/agregar" element={<h1>Agregar Producto</h1>} />
                        <Route path="productos/listar" element={<h1>Listar Productos</h1>} />

                        {/* Ventas */}
                        <Route path="ventas/listar" element={<h1>Ventas</h1>} />

                        {/* Reportes */}
                        <Route path="reportes/listar" element={<h1>Reportes</h1>} />
                    </Routes>
                </main>

                <Footer />

            </div>
        </div>
    );
};

export default Dashboard;
