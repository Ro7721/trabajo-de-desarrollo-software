import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateProduct from './pages/CreateProduct';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>

      {/* NAVBAR PÚBLICO (SOLO PARA LA TIENDA) */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex gap-4">
          <Link to="/" className="hover:text-green-400 font-bold">Tienda</Link>
          <Link to="/admin/create" className="hover:text-green-400">Registrar Producto</Link>
          <Link to="/admin" className="hover:text-green-400">Dashboard</Link>
        </div>
      </nav>

      <Routes>

        {/* WEB PÚBLICA */}
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/create" element={<CreateProduct />} />

        {/* DASHBOARD (APARTADO COMPLETO) */}
        <Route path="/admin/*" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
