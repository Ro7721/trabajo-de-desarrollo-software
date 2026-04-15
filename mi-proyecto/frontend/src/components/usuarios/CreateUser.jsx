import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserPlus,
    faUser,
    faIdCard,
    faEnvelope,
    faLock,
    faPhone,
    faBirthdayCake,
    faCheckCircle,
    faTimesCircle
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
        dni: '',
        email: '',
        password: '',
        phone: '',
        birthDate: '',
        confirmPassword: '',
        general: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false
    });

    const validateDNI = (dni) => {
        if (!dni) return '';
        if (!/^\d+$/.test(dni)) return 'El DNI solo debe contener números';
        if (dni.length !== 8) return 'El DNI debe tener exactamente 8 dígitos';
        return '';
    };

    const validatePhone = (phone) => {
        if (!phone) return '';
        if (!/^\d+$/.test(phone)) return 'El teléfono solo debe contener números';
        if (phone.length !== 9) return 'El teléfono debe tener exactamente 9 dígitos';
        return '';
    };

    const validatePassword = (password) => {
        const validation = {
            minLength: password.length >= 8,
            hasUpperCase: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[@$!%*?&]/.test(password)
        };
        setPasswordValidation(validation);

        if (!password) return '';
        if (!validation.minLength) return 'Mínimo 8 caracteres';
        if (!validation.hasUpperCase) return 'Debe contener una mayúscula';
        if (!validation.hasLowerCase) return 'Debe contener una minúscula';
        if (!validation.hasNumber) return 'Debe contener un número';
        if (!validation.hasSpecialChar) return 'Debe contener un carácter especial (@$!%*?&)';
        return '';
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUsuario((prevUsuario) => ({ ...prevUsuario, [name]: value }));

        // Validación en tiempo real
        let error = '';
        if (name === 'dni') {
            error = validateDNI(value);
        } else if (name === 'phone') {
            error = validatePhone(value);
        } else if (name === 'password') {
            error = validatePassword(value);
            if (confirmPassword) {
                validateConfirmPassword(confirmPassword, value);
            }
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleConfirmPasswordChange = (event) => {
        const value = event.target.value;
        setConfirmPassword(value);
        validateConfirmPassword(value, usuario.password);
    };

    const validateConfirmPassword = (value, password = usuario.password) => {
        let error = value !== password ? 'Las contraseñas no coinciden' : '';
        setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: error }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccessMessage('');
        setErrors({
            firstName: '',
            surName: '',
            dni: '',
            email: '',
            password: '',
            phone: '',
            birthDate: '',
            confirmPassword: '',
            general: ''
        });

        // Validación final antes de enviar
        const dniError = validateDNI(usuario.dni);
        const phoneError = validatePhone(usuario.phone);
        const passwordError = validatePassword(usuario.password);

        if (usuario.password !== confirmPassword) {
            setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Las contraseñas no coinciden' }));
            return;
        }

        if (dniError || phoneError || passwordError) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                dni: dniError,
                phone: phoneError,
                password: passwordError
            }));
            return;
        }

        try {
            // Construir payload completo incluyendo confirmPassword
            const payload = { ...usuario, confirmPassword };
            await createUsers(payload);
            setSuccessMessage('¡Usuario registrado exitosamente!');

            // Limpiar formulario
            setUsuario(new User(null, '', '', '', '', '', '', null, true, null, null));
            setConfirmPassword('');
            setPasswordValidation({
                minLength: false,
                hasUpperCase: false,
                hasLowerCase: false,
                hasNumber: false,
                hasSpecialChar: false
            });

            // Redirigir después de 2 segundos
            setTimeout(() => {
                navigate('/admin/usuario/listar');
            }, 2000);
        } catch (error) {
            console.error('Error al crear el usuario:', error);

            // Manejar errores del backend
            if (error.response) {
                if (error.response.status === 400) {
                    const backendErrors = error.response.data;

                    // Si hay errores de validación específicos
                    if (backendErrors.errors) {
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            ...backendErrors.errors
                        }));
                    } else if (backendErrors.message) {
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            general: backendErrors.message
                        }));
                    }
                } else if (error.response.status === 500) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        general: 'Error interno del servidor. Por favor, intenta más tarde.'
                    }));
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        general: error.response.data.message || 'Error al registrar el usuario'
                    }));
                }
            } else if (error.request) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    general: 'No se pudo conectar con el servidor. Verifica tu conexión.'
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    general: 'Error inesperado. Por favor, intenta nuevamente.'
                }));
            }
        }
    };
    return (
        <div className="form-container">
            {/** Encabezado del formulario */}
            <div className="form-header">
                <div className="header-icon">
                    <FontAwesomeIcon icon={faUserPlus} size="2x" />
                </div>
                <h2 className="section-title">Crear Cuenta</h2>
            </div>

            {/** Mensajes de éxito y error */}
            {successMessage && (
                <div className="alert alert-success">
                    <FontAwesomeIcon icon={faCheckCircle} /> {successMessage}
                </div>
            )}
            {errors.general && (
                <div className="alert alert-error">
                    <FontAwesomeIcon icon={faTimesCircle} /> {errors.general}
                </div>
            )}

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
                        {errors.dni && <span className="error-message">{errors.dni}</span>}
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
                        <label htmlFor="phone">Telefono</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faPhone} className="input-icon" />
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={usuario.phone}
                                onChange={handleChange}
                                placeholder="Ingrese su telefono"
                                required
                            />
                        </div>
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="birth_date">Fecha de nacimiento</label>
                        <div className="input-wrapper">
                            <FontAwesomeIcon icon={faBirthdayCake} className="input-icon" />
                            <input
                                type="date"
                                id="birth_date"
                                name="birthDate"
                                value={usuario.birthDate}
                                onChange={handleChange}
                                placeholder="Ingrese su fecha de nacimiento"
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
                        {errors.password && <span className="error-message">{errors.password}</span>}

                        {/** Indicador de fortaleza de contraseña */}
                        {usuario.password && (
                            <div className="password-strength">
                                <p className="strength-title">Requisitos de contraseña:</p>
                                <ul className="strength-list">
                                    <li className={passwordValidation.minLength ? 'valid' : 'invalid'}>
                                        <FontAwesomeIcon icon={passwordValidation.minLength ? faCheckCircle : faTimesCircle} />
                                        Mínimo 8 caracteres
                                    </li>
                                    <li className={passwordValidation.hasUpperCase ? 'valid' : 'invalid'}>
                                        <FontAwesomeIcon icon={passwordValidation.hasUpperCase ? faCheckCircle : faTimesCircle} />
                                        Una letra mayúscula
                                    </li>
                                    <li className={passwordValidation.hasLowerCase ? 'valid' : 'invalid'}>
                                        <FontAwesomeIcon icon={passwordValidation.hasLowerCase ? faCheckCircle : faTimesCircle} />
                                        Una letra minúscula
                                    </li>
                                    <li className={passwordValidation.hasNumber ? 'valid' : 'invalid'}>
                                        <FontAwesomeIcon icon={passwordValidation.hasNumber ? faCheckCircle : faTimesCircle} />
                                        Un número
                                    </li>
                                    <li className={passwordValidation.hasSpecialChar ? 'valid' : 'invalid'}>
                                        <FontAwesomeIcon icon={passwordValidation.hasSpecialChar ? faCheckCircle : faTimesCircle} />
                                        Un carácter especial (@$!%*?&)
                                    </li>
                                </ul>
                            </div>
                        )}
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
                        <span className="error-message">{errors.confirmPassword}</span>
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