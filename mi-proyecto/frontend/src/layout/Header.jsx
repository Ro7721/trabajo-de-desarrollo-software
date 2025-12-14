import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <header className="h-16 bg-white text-gray-800 flex items-center justify-between px-6 shadow-sm sticky top-0 z-40 border-b border-gray-200">

            <h2 className="font-bold text-xl tracking-tight text-gray-700">
                Dashboard Administrador
            </h2>

            <div className="flex items-center gap-6">
                <button className="relative p-2 text-gray-500 hover:text-gray-700 transition">
                    <FontAwesomeIcon icon={faBell} size="lg" />
                    <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition">
                    <FontAwesomeIcon icon={faUserCircle} size="2x" className="text-gray-400" />
                    <div className="flex flex-col items-start leading-none">
                        <span className="font-semibold text-sm">Admin</span>
                        <span className="text-xs text-gray-500">Super User</span>
                    </div>
                </div>
            </div>

        </header>
    );
};

export default Header;
