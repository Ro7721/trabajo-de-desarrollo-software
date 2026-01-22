import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getAllUsers, deleteUser, searchUsers } from '../../services/UserService';
import '../../css/usuario/getalluser.css';
import { faTrash, faEye, faPen, faPlus, faMagnifyingGlass, faUsers } from '@fortawesome/free-solid-svg-icons';
const UserGetAll = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage] = useState(8)

    useEffect(() => {
        getAllUsers().then(data => {
            setUsers(data)
            setLoading(false)
        }).catch(error => {
            console.error('Error al cargar usuarios:', error)
            setLoading(false)
        })
    }, [])

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            setLoading(true)
            searchUsers(searchTerm).then(data => {
                setUsers(data)
                setLoading(false)
            }).catch(error => {
                console.error('Error al buscar usuarios:', error)
                setLoading(false)
            })
        }
    }

    const handleDeleteUser = (userId) => {
        if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
            deleteUser(userId).then(() => {
                setUsers(users.filter(user => user.id !== userId))
            }).catch(error => {
                console.error('Error al eliminar usuario:', error)
                alert('Error al eliminar el usuario. Por favor intenta de nuevo.')
            })
        }
    }

    // Filter users based on search term
    const filteredUsers = users.filter(user => {
        const fullName = `${user.firstName || ''} ${user.surName || ''}`.toLowerCase();
        const email = (user.email || '').toLowerCase();
        const dni = (user.dni || '').toLowerCase();
        const term = searchTerm.toLowerCase();
        return fullName.includes(term) || email.includes(term) || dni.includes(term);
    })

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

    const handleView = (userId) => {
        // Navigate to user details
        console.log('View user:', userId)
    }

    return (
        <div className="user-getall-container">
            <div className="user-header">
                <div className="header-content">
                    <h1 className="page-title">
                        <span className="icon"><FontAwesomeIcon icon={faUsers} /></span>
                        Gestión de Usuarios
                    </h1>
                    <p className="page-subtitle">Administra y visualiza todos los usuarios del sistema</p>
                </div>
                <button className="btn-add-user text-bold shadow-lg" onClick={() => navigate('/admin/usuario/agregar')}>
                    <span className="plus-icon"><FontAwesomeIcon icon={faPlus} /></span>
                    Nuevo Usuario
                </button>
            </div>

            <div className="user-controls">
                <div className="search-container">
                    <span className="search-icon bg-gray-200">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
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
                        <span className="stat-label">Total Usuarios</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">{users.length}</span>
                        <span className="stat-label">Registrados</span>
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
                                    <th>Nombre Completo</th>
                                    <th>DNI</th>
                                    <th>Email</th>
                                    <th>Teléfono</th>
                                    <th>Fecha de Nacimiento</th>
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
                                                <div className="avatar">
                                                    {user.firstName ? user.firstName.charAt(0).toUpperCase() : '?'}
                                                </div>
                                                <span>{`${user.firstName || ''} ${user.surName || ''}`}</span>
                                            </div>
                                        </td>
                                        <td className="user-dni">{user.dni || 'N/A'}</td>
                                        <td className="user-email">{user.email || 'N/A'}</td>
                                        <td className="user-phone">{user.phone || 'N/A'}</td>
                                        <td className="user-birthdate">{user.birthDate || 'N/A'}</td>
                                        <td className={`status ${user.active ? 'active' : 'inactive'}`}>
                                            {user.active ? 'Activo' : 'Inactivo'}</td>
                                        <td className="user-actions">
                                            <button
                                                className="icon-btn"
                                                onClick={() => handleView(user.id)}
                                                title="Ver detalles"
                                            >
                                                <FontAwesomeIcon icon={faEye} style={{ color: "#ebd424ff" }} />
                                            </button>
                                            <button
                                                className="icon-btn"
                                                onClick={() => handleEdit(user.id)}
                                                title="Editar"
                                            >
                                                <FontAwesomeIcon icon={faPen} style={{ color: "#239a50" }} />
                                            </button>
                                            <button
                                                className="icon-btn"
                                                onClick={() => handleDeleteUser(user.id)}
                                                title="Eliminar"
                                            >
                                                <FontAwesomeIcon icon={faTrash} style={{ color: "#ef4444" }} />
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