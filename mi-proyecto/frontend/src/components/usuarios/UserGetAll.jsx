import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../css/usuario/getalluser.css';

const UserGetAll = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage] = useState(8)

    // Mock data - replace with actual API call
    useEffect(() => {
        // Simulating API call
        setTimeout(() => {
            const mockUsers = [
                { id: 1, name: 'Juan Pérez', email: 'juan.perez@email.com', role: 'Admin', status: 'Activo', phone: '+51 999 888 777' },
                { id: 2, name: 'María García', email: 'maria.garcia@email.com', role: 'Usuario', status: 'Activo', phone: '+51 988 777 666' },
                { id: 3, name: 'Carlos López', email: 'carlos.lopez@email.com', role: 'Usuario', status: 'Inactivo', phone: '+51 977 666 555' },
                { id: 4, name: 'Ana Martínez', email: 'ana.martinez@email.com', role: 'Moderador', status: 'Activo', phone: '+51 966 555 444' },
                { id: 5, name: 'Pedro Sánchez', email: 'pedro.sanchez@email.com', role: 'Usuario', status: 'Activo', phone: '+51 955 444 333' },
                { id: 6, name: 'Laura Torres', email: 'laura.torres@email.com', role: 'Admin', status: 'Activo', phone: '+51 944 333 222' },
                { id: 7, name: 'Diego Ramírez', email: 'diego.ramirez@email.com', role: 'Usuario', status: 'Inactivo', phone: '+51 933 222 111' },
                { id: 8, name: 'Sofía Flores', email: 'sofia.flores@email.com', role: 'Moderador', status: 'Activo', phone: '+51 922 111 000' },
                { id: 9, name: 'Miguel Ángel', email: 'miguel.angel@email.com', role: 'Usuario', status: 'Activo', phone: '+51 911 000 999' },
                { id: 10, name: 'Valentina Cruz', email: 'valentina.cruz@email.com', role: 'Usuario', status: 'Activo', phone: '+51 900 999 888' },
            ]
            setUsers(mockUsers)
            setLoading(false)
        }, 500)
    }, [])

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleEdit = (userId) => {
        // Navigate to edit page or open edit modal
        console.log('Edit user:', userId)
    }

    const handleDelete = (userId) => {
        // Show confirmation and delete user
        if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
            setUsers(users.filter(user => user.id !== userId))
        }
    }

    const handleView = (userId) => {
        // Navigate to user details
        console.log('View user:', userId)
    }

    return (
        <div className="user-getall-container">
            <div className="user-header">
                <div className="header-content">
                    <h1 className="page-title">
                        <span className="icon">👥</span>
                        Gestión de Usuarios
                    </h1>
                    <p className="page-subtitle">Administra y visualiza todos los usuarios del sistema</p>
                </div>
                <button className="btn-add-user" onClick={() => navigate('/admin/usuario/agregar')}>
                    <span className="plus-icon">+</span>
                    Nuevo Usuario
                </button>
            </div>

            <div className="user-controls">
                <div className="search-container">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Buscar por nombre, email o rol..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setCurrentPage(1)
                        }}
                    />
                </div>
                <div className="stats-container">
                    <div className="stat-card">
                        <span className="stat-value">{filteredUsers.length}</span>
                        <span className="stat-label">Usuarios</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">{filteredUsers.filter(u => u.status === 'Activo').length}</span>
                        <span className="stat-label">Activos</span>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Cargando usuarios...</p>
                </div>
            ) : currentUsers.length > 0 ? (
                <>
                    <div className="table-container">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Teléfono</th>
                                    <th>Rol</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user) => (
                                    <tr key={user.id} className="user-row">
                                        <td className="user-id">#{user.id}</td>
                                        <td className="user-name">
                                            <div className="name-with-avatar">
                                                <div className="avatar">{user.name.charAt(0)}</div>
                                                <span>{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="user-email">{user.email}</td>
                                        <td className="user-phone">{user.phone}</td>
                                        <td>
                                            <span className={`role-badge role-${user.role.toLowerCase()}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`status-badge status-${user.status.toLowerCase()}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="user-actions">
                                            <button
                                                className="action-btn view-btn"
                                                onClick={() => handleView(user.id)}
                                                title="Ver detalles"
                                            >
                                                👁️
                                            </button>
                                            <button
                                                className="action-btn edit-btn"
                                                onClick={() => handleEdit(user.id)}
                                                title="Editar"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className="action-btn delete-btn"
                                                onClick={() => handleDelete(user.id)}
                                                title="Eliminar"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="pagination-btn"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                ← Anterior
                            </button>

                            <div className="pagination-numbers">
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                className="pagination-btn"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Siguiente →
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="no-results">
                    <div className="no-results-icon">🔍</div>
                    <h3>No se encontraron usuarios</h3>
                    <p>Intenta con otros términos de búsqueda</p>
                </div>
            )}
        </div>
    )
}

export default UserGetAll