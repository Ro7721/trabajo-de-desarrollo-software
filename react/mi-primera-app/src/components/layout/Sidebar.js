// components/layout/Sidebar.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { path: '/', icon: '📊', label: 'Dashboard' },
        { path: '/analytics', icon: '📈', label: 'Analytics' },
        { path: '/users', icon: '👥', label: 'Usuarios' },
        { path: '/products', icon: '📦', label: 'Productos' },
        { path: '/settings', icon: '⚙️', label: 'Configuración' },
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Menú</h2>
                    <button className="sidebar-close" onClick={onClose}>×</button>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                            onClick={() => {
                                navigate(item.path);
                                onClose();
                            }}
                        >
                            <span className="sidebar-icon">{item.icon}</span>
                            <span className="sidebar-label">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <img src="/avatar.png" alt="Usuario" className="user-avatar" />
                        <div>
                            <div className="user-name">John Doe</div>
                            <div className="user-role">Administrador</div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;