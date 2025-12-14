import React, { useEffect, useState } from 'react';
import { getProducts, getCategories } from '../services/ProductService';
import ProductCard from '../components/ProductCard';
import { Search, Filter, ShoppingCart, Menu, ChevronDown } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openAccount, setOpenAccount] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({
        category: '',
        search: '',
        sortBy: ''
    });

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [page, filters]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await getProducts(page, 12, filters);
            setProducts(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error cargando productos", error);
        }
        setLoading(false);
    };

    const loadCategories = async () => {
        const data = await getCategories();
        setCategories(data);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(0);
        fetchProducts();
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
                            FALABELLA<span className="text-gray-900">.com</span>
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
                        <div className="hidden md:flex flex-col text-sm cursor-pointer hover:text-green-700 transition">
                            <span className="text-xs text-gray-500">Bienvenido</span>
                            <div className="flex items-center gap-1 font-bold">
                                <span>Iniciar sesión</span>
                                <ChevronDown size={14} />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer hover:text-green-700 transition relative">
                            <ShoppingCart size={24} />
                            <span className="hidden md:inline font-bold">Carro</span>
                            <span className="absolute -top-1 -right-2 bg-green-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white">0</span>
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
                                        onClick={() => {
                                            setFilters({ ...filters, category: cat.name });
                                            setPage(0);
                                        }}
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
                    {/* Results Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800">
                            {filters.search ? `Resultados para "${filters.search}"` : (filters.category || 'Recomendados para ti')}
                        </h2>
                        <span className="text-sm text-gray-500">{products.length} productos</span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-32">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map(product => (
                                    <ProductCard key={product.idProduct} product={product} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-12 gap-2">
                                    <button
                                        disabled={page === 0}
                                        onClick={() => setPage(p => p - 1)}
                                        className="px-6 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 disabled:opacity-40 hover:bg-gray-50 font-medium transition"
                                    >
                                        Anterior
                                    </button>
                                    <span className="flex items-center px-4 font-medium text-gray-900">
                                        {page + 1} / {totalPages}
                                    </span>
                                    <button
                                        disabled={page === totalPages - 1}
                                        onClick={() => setPage(p => p + 1)}
                                        className="px-6 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 disabled:opacity-40 hover:bg-gray-50 font-medium transition"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default HomePage;