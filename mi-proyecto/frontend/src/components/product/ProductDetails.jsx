import React, { useState } from "react";
import { UseCart } from "../../hook/hcart/UseCart";

const ProductDetails = ({ product, isOpen, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart, loading } = UseCart();
    const [isAdding, setIsAdding] = useState(false);
    const [notification, setNotification] = useState(null);

    if (!isOpen) return null;

    const handleQuantityChange = (type) => {
        if (type === 'increment') {
            if (quantity < product.stock) {
                setQuantity(prev => prev + 1);
            }
        } else {
            if (quantity > 1) {
                setQuantity(prev => prev - 1);
            }
        }
    };

    const handleAddToCart = async () => {
        setIsAdding(true);
        const result = await addToCart(product.idProduct, quantity);
        setIsAdding(false);

        if (result && result.success) {
            setNotification({ type: 'success', message: 'Producto agregado al carrito' });
            setTimeout(() => {
                setNotification(null);
                onClose();
                setQuantity(1);
            }, 1000);
        } else {
            setNotification({ type: 'error', message: 'Error al agregar producto' });
            setTimeout(() => setNotification(null), 3000);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
            {/* Notification Toast */}
            {notification && (
                <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl z-60 text-white font-medium animate-bounce ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                    {notification.message}
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row relative animate-fadeIn max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Left Column - Image */}
                <div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100/50" />
                    <img
                        src={product.imageUrl}
                        className="w-full max-h-[500px] object-contain transform transition-transform duration-700 group-hover:scale-110 drop-shadow-xl z-0"
                        alt={product.name}
                    />
                </div>

                {/* Right Column - Details */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col h-full overflow-y-auto">
                    <div className="mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider">
                            SKU: {product.sku}
                        </span>
                        {product.stock > 0 ? (
                            <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider">
                                En Stock ({product.stock})
                            </span>
                        ) : (
                            <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider">
                                Agotado
                            </span>
                        )}
                    </div>

                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                        {product.name}
                    </h2>

                    <p className="text-4xl font-bold text-blue-600 mb-6 flex items-baseline gap-1">
                        <span className="text-lg text-gray-500 font-normal">S/</span>
                        {product.price}
                    </p>

                    <div className="prose prose-sm text-gray-600 mb-8 border-t border-b border-gray-100 py-6">
                        <p className="leading-relaxed">{product.description}</p>
                    </div>

                    <div className="mt-auto space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Quantity Selector */}
                            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden w-full sm:w-auto">
                                <button
                                    onClick={() => handleQuantityChange('decrement')}
                                    className="px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors disabled:opacity-50"
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <div className="px-4 py-3 font-bold text-gray-800 bg-white min-w-[50px] text-center border-l border-r border-gray-200">
                                    {quantity}
                                </div>
                                <button
                                    onClick={() => handleQuantityChange('increment')}
                                    className="px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors disabled:opacity-50"
                                    disabled={quantity >= product.stock}
                                >
                                    +
                                </button>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdding || product.stock <= 0}
                                className={`flex-1 py-3 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2
                                    ${product.stock > 0
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none hover:translate-y-0'
                                    }`}
                            >
                                {isAdding ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Agregando...
                                    </>
                                ) : (
                                    <>
                                        {product.stock > 0 ? 'AÑADIR A LA BOLSA' : 'AGOTADO'}
                                        {product.stock > 0 && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                        )}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductDetails;