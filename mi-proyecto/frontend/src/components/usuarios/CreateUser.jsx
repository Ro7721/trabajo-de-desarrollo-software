import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserPlus,
    faUser,
    faIdCard,
    faEnvelope,
    faLock
} from '@fortawesome/free-solid-svg-icons';
import '../../css/usuario/createuser.css';
import User from "../../model/User";
import { createUsers } from "../../services/UserService";
const CreateUser = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(new User(null, '', '', '', '', '', '', null, true, null, null));
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({
        firstName: '',
        surName: '',
        DNI: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUsuario((prevUsuario) => ({ ...prevUsuario, [name]: value }));
    }
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        validateConfirmPassword(event.target.value);
    }
    const validateConfirmPassword = (value) => {
        let error = value !== usuario.password ? 'las contraseñas no coinciden' : '';
        setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: error }));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (usuario.password !== confirmPassword) {
            setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Las contraseñas no coinciden' }));
            return;
        }
        try {
            await createUsers(usuario);
            setUsuario(new User(null, '', '', '', '', '', '', null, true, null, null));
            setConfirmPassword('');
            setErrors({
                firstName: '',
                surName: '',
                DNI: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        }
    }
    return (
        <div className="form-container">
            {/** Encabezado del formulario */}
            <div className="form-header">
                <div className="header-icon">
                    <FontAwesomeIcon icon={faUserPlus} size="2x" />
                </div>
                <h2 className="section-title">Crear Cuenta</h2>
            </div>

            <form className="user-form" onSubmit={handleSubmit}>
                <h3 className="section-title">Información Personal</h3>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faUser} className="input-icon" />
                            <input
                                type="text"
                                id="nombre"
                                name="firstName"
                                value={usuario.firstName}
                                onChange={handleChange}
                                placeholder="Ingresa tu nombre"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="apellido">Apellido</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faUser} className="input-icon" />
                            <input
                                type="text"
                                id="apellido"
                                name="surName"
                                value={usuario.surName}
                                onChange={handleChange}
                                placeholder="Ingrese su apellido"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="dni">DNI</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faIdCard} className="input-icon" />
                            <input
                                type="text"
                                id="dni"
                                name="dni"
                                value={usuario.dni}
                                onChange={handleChange}
                                placeholder="Ej. 12345678"
                                pattern="[0-9]*"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={usuario.email}
                                onChange={handleChange}
                                placeholder="Ingrese su email"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faLock} className="input-icon" />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={usuario.password}
                                onChange={handleChange}
                                placeholder="Ingrese su contraseña"
                                required
                            />
                        </div>
                        <span style={{ color: 'red' }}>{errors.password}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirmar contraseña</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faLock} className="input-icon" />
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="Confirma tu contraseña"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                            />
                        </div>
                        <span style={{ color: 'red' }}>{errors.confirmPassword}</span>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={() => navigate('/admin/usuario/listar')}>Cancelar</button>
                    <button type="submit" className="btn-submit">Registrar Usuario</button>
                </div>

            </form>
        </div>
    );
};

export default CreateUser;