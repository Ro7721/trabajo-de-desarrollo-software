import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserPlus,
    faUser,
    faIdCard,
    faEnvelope,
    faLock
} from '@fortawesome/free-solid-svg-icons';
import '../../css/usuario/createuser.css';
import Usuary from "../../model/Usuary";
const CreateUser = () => {
    const [usuario, setUsuario] = useState(new Usuary(null, '', '', '', '', ''));
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
        validateFields(value);
    }
    const validateFields = (value) => {
        let err = '';
        if (value.firstName == null) {
            err = 'El nombre es requerido';
            return;
        }
        return err;
    }
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        validaetConfirmPassword(event.target.value);
    }
    const validaetConfirmPassword = (value) => {
        let error = value !== usuario.password ? 'las contreseñas no coinciden' : '';
        setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: error }));
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

            <form className="user-form">
                <h3 className="section-title">Información Personal</h3>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faUser} className="input-icon" />
                            <input
                                type="text"
                                id="nombre"
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
                                value={usuario.DNI}
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
                                value={usuario.email}
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
                                value={usuario.password}
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
                    <button type="submit" className="btn-submit">Registrar Usuario</button>
                </div>
            </form>
        </div>
    );
};

export default CreateUser;