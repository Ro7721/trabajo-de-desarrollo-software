import React, { useState, useEffect } from "react";
import { getCart, updateQuantity, removeItem, clearItem } from "../../services/CartItemService";
import { ShoppingCart, X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';

const Cart = ({ isOpen, onClose, onCartUpdate }) => {
    const [cart, setCart] = useState({ items: [], noun: 0, igv: 0, total: 0, totalItems: 0 });
    const [loading, setLoading] = useState(false);

    // Cargar carrito
    const loadCart = async () => {
        setLoading(true);
        try {
            const data = await getCart();
            setCart(data);
            if (onCartUpdate) {
                onCartUpdate(data.totalItems || 0);
            }
        } catch (error) {
            console.error('Error cargando carrito:', error);
        } finally {
            setLoading(false);
        }
    };

    // Cargar carrito cuando se abre
    useEffect(() => {
        if (isOpen) {
            loadCart();
        }
    }, [isOpen]);

    // Actualizar cantidad
    const handleUpdateQuantity = async (itemId, newQuantity, currentStock) => {
        if (newQuantity < 1) return;

        // Validar que no exceda el stock disponible
        if (currentStock && newQuantity > currentStock) {
            alert('No hay stock suficiente para aumentar la cantidad');
            return;
        }

        try {
            await updateQuantity(itemId, newQuantity);
            await loadCart();
        } catch (error) {
            console.error('Error actualizando cantidad:', error);
            alert('Error al actualizar cantidad');
        }
    };

    // Eliminar item
    const handleDeleteItem = async (itemId) => {
        try {
            await removeItem(itemId);
            await loadCart();
        } catch (error) {
            console.error('Error eliminando item:', error);
            alert('Error al eliminar producto');
        }
    };

    // Vaciar carrito
    const handleClearCart = async () => {
        if (window.confirm('¿Estás seguro de vaciar todo el carrito?')) {
            try {
                await clearItem();
                await loadCart();
            } catch (error) {
                console.error('Error vaciando carrito:', error);
                alert('Error al vaciar el carrito');
            }
        }
    };
    // validar cantidad disponible de productos para poder aumentar de productos a comprar
    /*const handleIncreaseQuantity = (itemId, currentQuantity, stock) => {
        if (currentQuantity < stock) {
            handleUpdateQuantity(itemId, currentQuantity + 1);
        } else {
            alert('No hay stock suficiente para aumentar la cantidad');
        }
    };*/

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay oscuro */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Panel del carrito */}
            <div className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col">

                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <ShoppingBag size={28} className="animate-bounce" />
                        <div>
                            <h2 className="text-2xl font-bold">Mi Carrito</h2>
                            <p className="text-green-100 text-sm">
                                {cart.totalItems || 0} {cart.totalItems === 1 ? 'producto' : 'productos'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Contenido del carrito */}
                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                        </div>
                    ) : cart.items && cart.items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="bg-gray-100 rounded-full p-8 mb-6">
                                <ShoppingCart size={64} className="text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h3>
                            <p className="text-gray-500 mb-6">Agrega productos para comenzar tu compra</p>
                            <button
                                onClick={onClose}
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Ir a comprar
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.items.map(item => (
                                <div
                                    key={item.idCar}
                                    className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex gap-4">
                                        {/* Imagen */}
                                        <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                            <img
                                                src={item.imageUrl || 'https://via.placeholder.com/100'}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Detalles */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 mb-1 truncate">
                                                {item.name}
                                            </h4>
                                            <p className="text-lg font-bold text-green-700 mb-3">
                                                S/ {item.unitPrice?.toFixed(2)}
                                            </p>

                                            {/* Controles de cantidad */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.idCar, item.quantity - 1, item.stock)}
                                                        disabled={item.quantity <= 1}
                                                        className="p-2 hover:bg-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <Minus size={16} className="text-gray-600" />
                                                    </button>
                                                    <span className="w-12 text-center font-semibold text-gray-900">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.idCar, item.quantity + 1, item.stock)}
                                                        className="p-2 hover:bg-white rounded-md transition-colors"
                                                    >
                                                        <Plus size={16} className="text-gray-600" />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => handleDeleteItem(item.idCar)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Eliminar producto"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subtotal del item */}
                                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Subtotal:</span>
                                        <span className="font-bold text-gray-900">
                                            S/ {item.noun?.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            {/* Botón vaciar carrito */}
                            {cart.items.length > 0 && (
                                <button
                                    onClick={handleClearCart}
                                    className="w-full py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={18} />
                                    Vaciar carrito
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer con resumen */}
                {cart.items && cart.items.length > 0 && (
                    <div className="border-t border-gray-200 bg-gray-50 p-6 space-y-4">
                        {/* Resumen de precios */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-gray-700">
                                <span>Subtotal:</span>
                                <span className="font-semibold">S/ {cart.noun?.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>IGV (18%):</span>
                                <span className="font-semibold">S/ {cart.igv?.toFixed(2)}</span>
                            </div>
                            <div className="h-px bg-gray-300" />
                            <div className="flex justify-between text-xl font-bold text-gray-900">
                                <span>Total:</span>
                                <span className="text-green-700">S/ {cart.total?.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="space-y-2">
                            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold text-lg transition-colors shadow-lg hover:shadow-xl">
                                Proceder al Pago
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Seguir Comprando
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;