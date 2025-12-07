import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateProduct from './pages/CreateProduct';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleUsuarioAdded = () => {
    setRefresh(!refresh); // Forzar actualización de la lista
  };

  return (
    /*<div className="App">
      <h1>Sistema de Gestión de Usuarios</h1>
      <UsuarioForm onUsuarioAdded={handleUsuarioAdded} />
      <UsuarioList key={refresh} />
    </div>*/
    <BrowserRouter>
      {/* Barra de navegación simple temporal */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex gap-4">
          <Link to="/" className="hover:text-green-400 font-bold">Tienda</Link>
          <Link to="/admin/create" className="hover:text-green-400">Registrar Producto</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/create" element={<CreateProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;