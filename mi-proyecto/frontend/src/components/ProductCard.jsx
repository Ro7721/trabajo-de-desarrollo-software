import React, { useState } from 'react';
import { ShoppingCart, Info, X } from 'lucide-react';
import ProductDetails from './product/ProductDetails';
import { addToCart } from '../services/CartItemService';
import { useNotify } from '../notifications/useNotify';

const ProductCard = ({ product, onAddToCart, onOpenDetails }) => {
    const hasDiscount = product.discountPrice && product.discountPrice < product.price;
    const discountPercentage = hasDiscount
        ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
        : 0;
    //const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);
    const notify = useNotify();
    const handleAddToCart = async () => {
        setAdding(true);
        try {
            if (product.stock <= 0) {
                alert('stock insuficiente');
                return;
            }
            await addToCart(product.idProduct, quantity);
            onAddToCart();
            // prueba de notificación de tipo de samsung edge
            notify.success("agregado satisfactoriamente al carrito");
            alert(`${product.name} agregado al carrito`);
            setQuantity(1);
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            alert('Error al agregar al carrito');
        } finally {
            setAdding(false);
        }
    };
    return (
        <div className="group bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col overflow-hidden relative">
            {/* Badge */}
            {hasDiscount && (
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md z-10 shadow-sm">
                    -{discountPercentage}%
                </div>
            )}

            {/* Image Container */}
            <div className="h-56 p-6 flex justify-center items-center bg-white relative overflow-hidden">
                <img
                    src={product.imageUrl || 'https://via.placeholder.com/300?text=No+Image'}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
                {/* <p>{product.description}</p> */}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-medium">
                    {product.category?.name || 'General'}
                </div>

                <h3 className="font-medium text-gray-800 text-[15px] leading-snug mb-3 line-clamp-2 h-10 group-hover:text-green-700 transition-colors">
                    {product.name}
                </h3>

                <div className="mt-auto">
                    {hasDiscount ? (
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 line-through mb-0.5">S/ {product.price.toFixed(2)}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-gray-900">S/ {product.discountPrice.toFixed(2)}</span>
                                <span className="text-xs font-semibold text-red-600 flex items-center gap-1">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-10h2v6h-2V7z" /></svg>
                                    Ofertón
                                </span>

                            </div>
                        </div>
                    ) : (
                        <div className="text-xl font-bold text-gray-900">S/ {product.price?.toFixed(2)}</div>

                    )}
                    <span className="text-xs  font-bold text-blue-500"> Stock Disponible {product.stock}</span>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-50 flex flex-col gap-2">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors
                         flex items-center justify-center gap-2 shadow-sm focus:ring-2 focus:ring-green-500/20 active:scale-95"
                        onClick={handleAddToCart}
                        disabled={adding || product.stock === 0}
                    >
                        <ShoppingCart size={18} />
                        {adding ? 'agregando....' : 'Agregar'}
                    </button>
                    <button className="w-full bg-red-500 hover:bg-red-800 text-black font-semibold py-2.5 px-4 rounded-lg transition-colors
                        flex items-center justify-center gap-2 shadow-md focus:ring-2 " onClick={() => onOpenDetails(product)}>
                        <Info size={18} />
                        Detalles
                    </button>
                </div>
            </div>

        </div>

    );
};

export default ProductCard;