import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                <img src="../img/roger.jpeg" alt="Logo" />
                <h1 className="font-bold">SAGA FALABELLA</h1>
            </div>

            {/* MENU */}
            <nav className="p-4">

                <NavLink to="/" className="menu-item">
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
                    <NavLink to="/usuario/agregar">
                        <FontAwesomeIcon icon={faPlus} /> Agregar
                    </NavLink>
                    <NavLink to="/usuario/listar">
                        <FontAwesomeIcon icon={faList} /> Listar
                    </NavLink>
                    <NavLink to="/usuario/editar">
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
                    <NavLink to="/productos/agregar">
                        <FontAwesomeIcon icon={faPlus} /> Agregar
                    </NavLink>
                    <NavLink to="/productos/listar">
                        <FontAwesomeIcon icon={faList} /> Listar
                    </NavLink>
                    <NavLink to="/productos/editar">
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
                    <NavLink to="/ventas/agregar"><FontAwesomeIcon icon={faPlus} /> Agregar</NavLink>
                    <NavLink to="/ventas/listar"><FontAwesomeIcon icon={faList} /> Listar</NavLink>
                    <NavLink to="/ventas/editar"><FontAwesomeIcon icon={faPen} /> Editar</NavLink>
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
                    <NavLink to="/reportes/agregar"><FontAwesomeIcon icon={faPlus} /> Agregar</NavLink>
                    <NavLink to="/reportes/listar"><FontAwesomeIcon icon={faList} /> Listar</NavLink>
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
