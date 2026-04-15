import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/ProductService';
import { Search, Filter, ShoppingCart, Menu, ChevronDown, X } from 'lucide-react';
import CreateUser from '../components/usuarios/CreateUser';
import ProductGallery from '../components/product/ProductGallery';
import Cart from '../components/carshoping/Cart';
const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [filters, setFilters] = useState({
        category: '',
        search: '',
        sortBy: ''
    });

    useEffect(() => {
        getCategories().then(setCategories).catch(console.error);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
    };

    const handleCartUpdate = (count) => {
        setCartCount(count);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Professional Header */}
            <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-8">
                    {/* Logo area */}
                    <div className="flex items-center gap-4">
                        <button className="md:hidden p-2 text-gray-600">
                            <Menu size={24} />
                        </button>
                        <h1 className="text-2xl font-black tracking-tighter text-green-700">
                            MiTienda<span className="text-gray-900">.com</span>
                        </h1>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-3xl relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar marcas, productos y más..."
                            className="w-full py-2.5 pl-11 pr-4 bg-gray-100 border-none rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:bg-white transition-all shadow-inner"
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                        <button type="submit" className="hidden"></button>
                    </form>

                    {/* User Actions */}
                    <div className="flex items-center gap-6 text-gray-700">
                        <div className="hidden md:flex flex-col text-sm cursor-pointer hover:text-green-700 transition"
                            onClick={() => setIsModalOpen(true)}>
                            <span className="text-xs text-gray-500">Bienvenido</span>
                            <div className="flex items-center gap-1 font-bold">
                                <span>Iniciar sesión</span>
                                <ChevronDown size={14} />
                            </div>
                        </div>
                        <div
                            className="flex items-center gap-2 cursor-pointer hover:text-green-700 transition relative"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingCart size={24} />
                            <span className="hidden md:inline font-bold">Carro</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-2 bg-green-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Search - Visible only on small screens */}
                <div className="md:hidden px-4 pb-3">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            placeholder="¿Qué estás buscando?"
                            className="w-full p-2 pl-4 bg-gray-100 rounded-lg text-sm focus:outline-none"
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                    </form>
                </div>
            </header>

            <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filter */}
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
                                <Filter size={18} className="text-green-600" /> Filtros
                            </h2>
                            {/* Clear filters button could go here */}
                        </div>

                        <div className="mb-8">
                            <h3 className="font-bold text-sm text-gray-900 mb-4 uppercase tracking-wider">Categorías</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li
                                    className={`cursor-pointer transition-colors px-2 py-1.5 rounded-md ${filters.category === '' ? 'bg-green-50 text-green-700 font-bold' : 'hover:bg-gray-50 hover:text-gray-900'}`}
                                    onClick={() => setFilters({ ...filters, category: '' })}
                                >
                                    Ver Todo
                                </li>
                                {categories.map(cat => (
                                    <li
                                        key={cat.id}
                                        className={`cursor-pointer transition-colors px-2 py-1.5 rounded-md ${filters.category === cat.name ? 'bg-green-50 text-green-700 font-bold' : 'hover:bg-gray-50 hover:text-gray-900'}`}
                                        onClick={() => setFilters({ ...filters, category: cat.name })}
                                    >
                                        {cat.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-2">
                            <h3 className="font-bold text-sm text-gray-900 mb-2 uppercase tracking-wider">Ordenar</h3>
                            <div className="relative">
                                <select
                                    className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-3 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-green-500 text-sm cursor-pointer"
                                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                                >
                                    <option value="">Destacados</option>
                                    <option value="price_asc">Precio: Menor a Mayor</option>
                                    <option value="price_desc">Precio: Mayor a Menor</option>
                                    <option value="newest">Lo más nuevo</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Section */}
                <main className="flex-1">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-gray-800">
                            {filters.search
                                ? `Resultados para "${filters.search}"`
                                : filters.category || 'Recomendados para ti'}
                        </h2>
                    </div>

                    <ProductGallery
                        filters={filters}
                        pageSize={12}
                        onCartUpdate={handleCartUpdate}
                    />
                </main>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex justify-center items-center p-4">

                    {/* Contenedor del Modal */}
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden animate-fade-in-down">

                        {/* Botón Cerrar (X) */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 z-10 transition"
                        >
                            <X size={24} />
                        </button>

                        {/* Renderizamos tu componente CreateUser aquí dentro */}
                        <div className="max-h-[90vh] overflow-y-auto">
                            <CreateUser />
                        </div>
                    </div>
                </div>
            )}
            {/* Cart Component */}
            <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onCartUpdate={handleCartUpdate}
            />
        </div>
    );
};

export default HomePage;