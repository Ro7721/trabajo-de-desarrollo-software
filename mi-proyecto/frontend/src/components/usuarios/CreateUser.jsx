import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserPlus,
    faUser,
    faIdCard,
    faEnvelope,
    faLock
} from '@fortawesome/free-solid-svg-icons';
import '../../css/usuario/createuser.css';
const CreateUser = () => {

    return (
        <div className="form-container">
            {/** Encabezado del formulario */}
            <div className="form-header">
                <div className="header-icon">
                    <FontAwesomeIcon icon={faUserPlus} size="2x" />
                </div>
                <h2>Crear Cuenta</h2>
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
                                placeholder="Ej. 12345678"
                                pattern="[0-9]*"
                                required
                            />
                        </div>
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