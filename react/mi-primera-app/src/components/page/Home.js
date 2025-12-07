import React, { useState, useEffect } from "react";
import { getUsers, deleteUser, getUserById } from "../../api/UserService";
import EditUserModal from "./EditUserModal";

export default function Home() {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await getUsers();
        setUsers(result.data);
    };

    const removeUser = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
        await deleteUser(id);
        loadUsers();
    };

    const openEditModal = async (id) => {
        const response = await getUserById(id);
        setSelectedUser(response.data);

        document.getElementById("editUserModal").show();
    };
    const searchUsers = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredUsers = users.filter((user) => {
            return (
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm)
            );
        });
        setUsers(filteredUsers);
        if (filteredUsers.length === 0) {
            alert("No se encontraron resultados");
        }

    };

    return (
        <div className="container py-4">
            <h2 className="text-center">Lista de Usuarios</h2>

            {selectedUser && (
                <EditUserModal
                    user={selectedUser}
                    reload={loadUsers}
                />
            )}
            <div className="search-continer">
                <input className="form-control mb-3"
                    type="text"
                    placeholder="Buscar"
                    onChange={searchUsers}
                />
            </div>
            <div className="py-4">
                <table className="table border shadow rounded">
                    <thead className="table-dark text-center">
                        <tr>
                            <th>#</th>
                            <th>User Name</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody className="table-light text-center">
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.userName}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => removeUser(user.id)}
                                    >
                                        Delete
                                    </button>

                                    <button
                                        className="btn btn-primary btn-sm mx-1"
                                        onClick={() => openEditModal(user.id)}
                                    >
                                        Edit
                                    </button>

                                    <button className="btn btn-warning btn-sm">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
