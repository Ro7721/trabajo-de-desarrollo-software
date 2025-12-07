// components/dashboard/Analytics.js
import React from 'react';
import Chart from '../ui/Chart';

const Analytics = () => {
    return (
        <div className="page">
            <h1>Analytics</h1>
            <div className="charts-container">
                <Chart title="Tráfico Web" type="line" />
                <Chart title="Fuentes de Tráfico" type="pie" />
            </div>
        </div>
    );
};

export default Analytics;