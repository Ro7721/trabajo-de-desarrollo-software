import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PATHS } from '../../router/paths';

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirigir al login y guardar la ruta que intentaba visitar para redirigir luego del login
        return <Navigate to={PATHS.LOGIN} state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
