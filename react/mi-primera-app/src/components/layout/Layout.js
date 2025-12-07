// components/layout/Layout.js
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './css/Layout.css';

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="layout">
            <Navbar onToggleSidebar={toggleSidebar} />
            <div className="layout-body">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <main className={`layout-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;