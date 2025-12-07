// components/dashboard/Users.js
import React, { useState, useEffect } from 'react';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setUsers([
                { id: 1, name: 'Juan Pérez', email: 'juan@email.com', status: 'Activo' },
                { id: 2, name: 'María García', email: 'maria@email.com', status: 'Inactivo' },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="page">
            <h1>Gestión de Usuarios</h1>
            <div className="table-container">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`status ${user.status.toLowerCase()}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn-edit">Editar</button>
                                    <button className="btn-delete">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;