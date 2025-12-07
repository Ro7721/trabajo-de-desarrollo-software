import React, { useState, useEffect } from 'react';
import { usuarioService } from '../services/api';

const UsuarioList = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadUsuarios();
    }, []);

    const loadUsuarios = async () => {
        try {
            const response = await usuarioService.getUsuarios();
            setUsuarios(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar usuarios');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await usuarioService.deleteUsuario(id);
            loadUsuarios(); // Recargar la lista
        } catch (err) {
            setError('Error al eliminar usuario');
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Edad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellido}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.edad}</td>
                            <td>
                                <button onClick={() => handleDelete(usuario.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsuarioList;