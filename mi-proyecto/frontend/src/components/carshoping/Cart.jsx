import React, { useState } from "react";
import { getCart, updateQuantity, deleteItem, clearItem } from "../../services/CartItemService";
const Cart = ({ cart, setCart }) => {
    const [isOpen, setIsOpen] = useState(false);
    // cargar carrito
    const loadCart = async () => {
        const data = await getCart();
        setCart(data);
    }
    // Abrir/cerrar carrto 
    const toggleCart = async () => {
        if (!isOpen) {
            await loadCart();
        }
        setIsOpen(!isOpen);
    }
    // Actualizar cantidad
    const updateQuantitys = async (itemId, quantity) => {
        await updateQuantity(itemId, quantity);
        await loadCart();
    }
    // Eiminar item
    const deleteItems = async (itemId) => {
        await deleteItem(itemId);
        await loadCart();
    }
    // Vaciar carrrito
    const clearCarts = async () => {
        if (window.confirm('¿ Vaciar todo el carrito ?')) {
            await clearItem();
            await loadCart();
        }
    }
    return (
        <>
            {/*Boton flotante del carrito*/}
            <button className="cart-button" onClick={toggleCart}>
                ({cart.totalItem || 0})
            </button>
            {/* panel del carrito */}
            {isOpen && (
                <div className="cart-overlay">
                    <div className="cart-panel">
                        <div className="cart-header">
                            <h2>Tu carrito</h2>
                            <button onClick={toggleCart} className="close-btn">
                                X
                            </button>
                        </div>
                        {cart.items.length === 0 ? (
                            <div className="empty-cart">
                                <p> El carrito esta vacio</p>
                            </div>
                        ) : (
                            <>
                                <div className="cart-items">
                                    {cart.items.map(item => (
                                        <div key={item.id} className="cart-item">
                                            <div className="item-image">
                                                <img src={item.image || 'placeholder.jpg'} alt={item.name} />
                                            </div>
                                            <div className="item-details">
                                                <h4>{item.name}</h4>
                                                <small>{item.category}</small>
                                                <p>${item.unitPrice.toFixed(2)} c/u</p>
                                            </div>
                                            <div className="item-controls">
                                                <div className="quantity-control">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )

            }
        </>
    );
}
export default Cart;