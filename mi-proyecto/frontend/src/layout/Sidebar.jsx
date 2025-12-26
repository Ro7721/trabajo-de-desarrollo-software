import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../img/roger.jpeg';
import {
    faGauge,
    faUser,
    faBox,
    faCartShopping,
    faFile,
    faChevronDown,
    faPlus,
    faList,
    faPen,
    faRightFromBracket,
    faCog
} from '@fortawesome/free-solid-svg-icons';
import '../css/dashboard/sidebar.css';

const Sidebar = () => {
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        <aside className="w-64 h-screen bg-gray-900 text-white fixed">

            {/* LOGO */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-700">
                <div className="logo-img">
                    <img src={logo} alt="Logo" />
                </div>
                <h1 className="font-bold">SAGA FALABELLA</h1>
            </div>

            {/* MENU */}
            <nav className="p-4">

                <NavLink to="/admin" className="menu-item">
                    <FontAwesomeIcon icon={faGauge} />
                    <span>Dashboard</span>
                </NavLink>

                {/* USUARIO */}
                <button className={`menu-item ${openMenu === 'usuario' ? 'active' : ''}`} onClick={() => toggleMenu('usuario')}>
                    <FontAwesomeIcon icon={faUser} />
                    <span>Usuario</span>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`ml-auto transition-transform ${openMenu === 'usuario' ? 'rotate-180' : ''}`}
                    />
                </button>
                <div className={`submenu ${openMenu === 'usuario' ? 'open' : ''}`}>
                    <NavLink to="/admin/usuario/agregar">
                        <FontAwesomeIcon icon={faPlus} /> Agregar
                    </NavLink>
                    <NavLink to="/admin/usuario/listar">
                        <FontAwesomeIcon icon={faList} /> Listar
                    </NavLink>
                    <NavLink to="/admin/usuario/editar">
                        <FontAwesomeIcon icon={faPen} /> Editar
                    </NavLink>
                </div>

                {/* PRODUCTOS */}
                <button className={`menu-item ${openMenu === 'productos' ? 'active' : ''}`} onClick={() => toggleMenu('productos')}>
                    <FontAwesomeIcon icon={faBox} />
                    <span>Productos</span>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`ml-auto transition-transform ${openMenu === 'productos' ? 'rotate-180' : ''}`}
                    />
                </button>

                <div className={`submenu ${openMenu === 'productos' ? 'open' : ''}`}>
                    <NavLink to="/admin/productos/agregar">
                        <FontAwesomeIcon icon={faPlus} /> Agregar
                    </NavLink>
                    <NavLink to="/admin/productos/listar">
                        <FontAwesomeIcon icon={faList} /> Listar
                    </NavLink>
                    <NavLink to="/admin/productos/editar">
                        <FontAwesomeIcon icon={faPen} /> Editar
                    </NavLink>
                </div>

                {/* VENTAS */}
                <button className={`menu-item ${openMenu === 'ventas' ? 'active' : ''}`} onClick={() => toggleMenu('ventas')}>
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span>Ventas</span>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`ml-auto transition-transform ${openMenu === 'ventas' ? 'rotate-180' : ''}`}
                    />
                </button>

                <div className={`submenu ${openMenu === 'ventas' ? 'open' : ''}`}>
                    <NavLink to="/admin/ventas/agregar"><FontAwesomeIcon icon={faPlus} /> Agregar</NavLink>
                    <NavLink to="/admin/ventas/listar"><FontAwesomeIcon icon={faList} /> Listar</NavLink>
                    <NavLink to="/admin/ventas/editar"><FontAwesomeIcon icon={faPen} /> Editar</NavLink>
                </div>

                {/* REPORTES */}
                <button className={`menu-item ${openMenu === 'reportes' ? 'active' : ''}`} onClick={() => toggleMenu('reportes')}>
                    <FontAwesomeIcon icon={faFile} />
                    <span>Reportes</span>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`ml-auto transition-transform ${openMenu === 'reportes' ? 'rotate-180' : ''}`}
                    />
                </button>

                <div className={`submenu ${openMenu === 'reportes' ? 'open' : ''}`}>
                    <NavLink to="/admin/reportes/agregar"><FontAwesomeIcon icon={faPlus} /> Agregar</NavLink>
                    <NavLink to="/admin/reportes/listar"><FontAwesomeIcon icon={faList} /> Listar</NavLink>
                </div>
                {/* CONFIGURACIONES */}
                <button className={`menu-item ${openMenu === 'configuraciones' ? 'active' : ''}`} onClick={() => toggleMenu('configuraciones')}>
                    <FontAwesomeIcon icon={faCog} />
                    <span>Configuraciones</span>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`ml-auto transition-transform ${openMenu === 'configuraciones' ? 'rotate-180' : ''}`}
                    />
                </button>
                {/* SALIR */}
                <button className="menu-item text-red-400 mt-6">
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <span>Salir</span>
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
