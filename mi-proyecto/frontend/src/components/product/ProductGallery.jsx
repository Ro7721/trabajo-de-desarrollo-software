import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, PackageSearch } from 'lucide-react';
import { getProducts } from '../../services/ProductService';
import ProductCard from '../ProductCard';
import ProductDetails from './ProductDetails';

/**
 * ProductGallery
 * 
 * Galería de productos reutilizable con paginación del backend.
 * 
 * Props:
 *  - filters   : { category, search, sortBy }  — Filtros aplicados desde el padre
 *  - pageSize  : número de productos por página (default: 12)
 *  - onCartUpdate : callback cuando se agrega un artículo al carrito
 */
const ProductGallery = ({ filters = {}, pageSize = 12, onCartUpdate }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    // Modal de detalles
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    // Re-fetch cuando cambian filtros o página
    useEffect(() => {
        setPage(0); // Reset a la primera página cuando cambian los filtros
    }, [filters.category, filters.search, filters.sortBy]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await getProducts(page, pageSize, filters);
                setProducts(data.content ?? []);
                setTotalPages(data.totalPages ?? 0);
                setTotalElements(data.totalElements ?? 0);
            } catch (error) {
                console.error('Error cargando productos:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, pageSize, filters]);

    const handleOpenDetails = (product) => {
        setSelectedProduct(product);
        setIsDetailOpen(true);
    };

    const handleAddToCart = () => {
        if (onCartUpdate) onCartUpdate();
    };

    // --- Skeleton Grid ---
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
                {[...Array(pageSize)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <div className="h-56 bg-gray-100" />
                        <div className="p-4 space-y-3">
                            <div className="h-3 bg-gray-200 rounded w-1/3" />
                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                            <div className="h-4 bg-gray-200 rounded w-1/2" />
                            <div className="h-10 bg-gray-100 rounded mt-4" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // --- Empty State ---
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-28 text-gray-400">
                <PackageSearch size={52} className="mb-4 text-gray-200" />
                <p className="text-lg font-bold text-gray-500">No se encontraron productos</p>
                <p className="text-sm mt-1">
                    {filters.search
                        ? `No hay resultados para "${filters.search}"`
                        : 'Intenta con otra categoría o filtro'}
                </p>
            </div>
        );
    }

    return (
        <>
            {/* Contador de resultados */}
            <p className="text-sm text-gray-500 mb-4">
                {totalElements} producto{totalElements !== 1 ? 's' : ''} encontrado{totalElements !== 1 ? 's' : ''}
            </p>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.idProduct}
                        product={product}
                        onOpenDetails={handleOpenDetails}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 gap-2">
                    <button
                        disabled={page === 0}
                        onClick={() => setPage((p) => p - 1)}
                        className="p-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    {[...Array(totalPages)].map((_, i) => {
                        // Mostrar solo páginas cercanas a la actual
                        if (Math.abs(i - page) > 2) return null;
                        return (
                            <button
                                key={i}
                                onClick={() => setPage(i)}
                                className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${i === page
                                        ? 'bg-green-600 text-white shadow-sm'
                                        : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        );
                    })}

                    <button
                        disabled={page === totalPages - 1}
                        onClick={() => setPage((p) => p + 1)}
                        className="p-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}

            {/* Modal de Detalles del Producto */}
            <ProductDetails
                product={selectedProduct}
                isOpen={isDetailOpen}
                onClose={() => {
                    setIsDetailOpen(false);
                    setSelectedProduct(null);
                }}
            />
        </>
    );
};

export default ProductGallery;
