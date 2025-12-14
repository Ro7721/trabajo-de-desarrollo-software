import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping, faFile, faBox } from '@fortawesome/free-solid-svg-icons';
const DashboardCard = () => {
    const stats = [
        { icon: faUser, label: 'Usuarios Registrados', value: '120', color: '#3b82f6', bg: '#eff6ff' }, // Blue
        { icon: faBox, label: 'Total Productos', value: '450', color: '#10b981', bg: '#ecfdf5' },       // Emerald
        { icon: faCartShopping, label: 'Ventas Realizadas', value: '85', color: '#8b5cf6', bg: '#f5f3ff' }, // Violet
        { icon: faFile, label: 'Reportes Generados', value: '12', color: '#f59e0b', bg: '#fffbeb' }     // Amber
    ];

    return (
        <div className="dashboard-grid">
            {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                    <div className="stat-icon-container" style={{ color: stat.color, backgroundColor: stat.bg }}>
                        <FontAwesomeIcon icon={stat.icon} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{stat.value}</span>
                        <span className="stat-label">{stat.label}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardCard;