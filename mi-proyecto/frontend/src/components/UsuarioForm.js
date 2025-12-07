import React, { useState } from 'react';
import { usuarioService } from '../services/api';
import '../css/UsuarioForm.css';

const UsuarioForm = ({ onUsuarioAdded }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        edad: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await usuarioService.createUsuario(formData);
            setFormData({ nombre: '', apellido: '', email: '', edad: '' });
            if (onUsuarioAdded) {
                onUsuarioAdded();
            }
            alert('Usuario creado exitosamente!');
        } catch (error) {
            alert('Error al crear usuario');
        }
    };

    return (
        <div>
            <h2>Agregar Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Edad:</label>
                    <input
                        type="number"
                        name="edad"
                        value={formData.edad}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Crear Usuario</button>
            </form>
        </div>
    );
};

export default UsuarioForm;