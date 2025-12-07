import React, { useEffect, useState } from 'react';
import { getProducts, getCategories } from '../services/ProductService';
import ProductCard from '../components/ProductCard';
import { Search, Filter } from 'lucide-react'; // Iconos

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estado para filtros que coinciden con tu Backend
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

    // Recarga productos cuando cambian los filtros o la página
    useEffect(() => {
        fetchProducts();
    }, [page, filters]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Llamada al servicio
            const data = await getProducts(page, 12, filters);
            setProducts(data.content); // Spring Data pone la lista en 'content'
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
        setPage(0); // Resetear a página 0 al buscar
        fetchProducts();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header tipo Falabella */}
            <header className="bg-green-600 text-white p-4 shadow-md sticky top-0 z-50">
                <div className="container mx-auto flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-black tracking-tighter">SAGA FALABELLA</h1>

                    <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            className="w-full p-2 pl-4 rounded-full text-gray-800 focus:outline-none"
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                            <Search size={20} />
                        </button>
                    </form>

                    <div className="font-bold">Mi Cuenta</div>
                </div>
            </header>

            <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6">

                {/* Sidebar de Filtros */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h2 className="font-bold mb-4 flex items-center gap-2"><Filter size={18} /> Filtros</h2>

                        <div className="mb-4">
                            <h3 className="font-semibold text-sm mb-2">Categorías</h3>
                            <ul className="space-y-2 text-sm">
                                <li
                                    className={`cursor-pointer hover:text-green-600 ${filters.category === '' ? 'font-bold text-green-600' : ''}`}
                                    onClick={() => setFilters({ ...filters, category: '' })}
                                >
                                    Todas
                                </li>
                                {categories.map(cat => (
                                    <li
                                        key={cat.id}
                                        className={`cursor-pointer hover:text-green-600 ${filters.category === cat.name ? 'font-bold text-green-600' : ''}`}
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

                        <div className="mb-4">
                            <h3 className="font-semibold text-sm mb-2">Ordenar por</h3>
                            <select
                                className="w-full border p-2 rounded"
                                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                            >
                                <option value="">Relevancia</option>
                                <option value="price_asc">Precio: Menor a Mayor</option>
                                <option value="price_desc">Precio: Mayor a Menor</option>
                                <option value="newest">Lo más nuevo</option>
                            </select>
                        </div>
                    </div>
                </aside>

                {/* Grilla de Productos */}
                <main className="flex-1">
                    {loading ? (
                        <div className="text-center py-20">Cargando productos...</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {products.map(product => (
                                    <ProductCard key={product.idProduct} product={product} />
                                ))}
                            </div>

                            {/* Paginación */}
                            <div className="flex justify-center mt-8 gap-2">
                                <button
                                    disabled={page === 0}
                                    onClick={() => setPage(p => p - 1)}
                                    className="px-4 py-2 border rounded bg-white disabled:opacity-50"
                                >
                                    Anterior
                                </button>
                                <span className="px-4 py-2">Página {page + 1} de {totalPages}</span>
                                <button
                                    disabled={page === totalPages - 1}
                                    onClick={() => setPage(p => p + 1)}
                                    className="px-4 py-2 border rounded bg-white disabled:opacity-50"
                                >
                                    Siguiente
                                </button>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default HomePage;