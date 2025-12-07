// components/dashboard/DashboardHome.js
import React, { useState, useEffect } from 'react';
import MetricCard from '../ui/MetricCard';
import Chart from '../ui/Chart';
import './css/DashboardHome.css';

const DashboardHome = () => {
    const [metrics, setMetrics] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simular carga de datos
        setTimeout(() => {
            setMetrics({
                totalUsers: 1245,
                revenue: 45678,
                conversion: 12.5,
                bounceRate: 35.2
            });
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="dashboard-home">
            <h1>Dashboard Principal</h1>

            <div className="metrics-grid">
                <MetricCard
                    title="Usuarios Totales"
                    value={metrics.totalUsers}
                    change={8.2}
                    loading={loading}
                />
                <MetricCard
                    title="Ingresos"
                    value={`$${metrics.revenue}`}
                    change={15.7}
                    loading={loading}
                />
                <MetricCard
                    title="Tasa de Conversión"
                    value={`${metrics.conversion}%`}
                    change={-2.1}
                    loading={loading}
                />
                <MetricCard
                    title="Tasa de Rebote"
                    value={`${metrics.bounceRate}%`}
                    change={-5.3}
                    loading={loading}
                />
            </div>

            <div className="charts-section">
                <Chart
                    title="Ventas Mensuales"
                    type="line"
                    data={[
                        { mes: 'Ene', ventas: 1000 },
                        { mes: 'Feb', ventas: 1500 },
                        { mes: 'Mar', ventas: 1200 },
                    ]}
                />
            </div>
        </div>
    );
};

export default DashboardHome;