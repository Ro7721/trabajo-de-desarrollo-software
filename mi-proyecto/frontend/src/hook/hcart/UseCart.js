import { useCallback, useEffect, useState } from "react";
import { getCart, addToCart as addToCartService, updateQuantity, removeItem } from "../../services/CartItemService";

export const UseCart = () => {
    const [cart, setCart] = useState(
        {
            items: [],
            noun: 0,
            igv: 0,
            total: 0,
            totalItems: 0,
            loading: false,
            error: null
        }
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Funcion para cargar el carrito
    const loadCart = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getCart();
            // Asumimos que response es directamente el objeto CartResponse o contiene data
            // Ajustar según la estructura real de respuesta de tu backend
            const cartData = response.data || response;

            setCart({
                ...cartData,
                loading: false,
                error: null
            });
        } catch (err) {
            console.error("Error loading cart:", err);
            setError('Error al cargar el carrito');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCart();
    }, [loadCart]);

    const addToCart = async (productId, quantity) => {
        setLoading(true);
        try {
            await addToCartService(productId, quantity);
            await loadCart(); // Recargar el carrito para obtener los datos actualizados
            return { success: true };
        } catch (err) {
            console.error("Error adding to cart:", err);
            setError('Error al agregar al carrito');
            return { success: false, error: err };
        } finally {
            setLoading(false);
        }
    };

    return {
        cart,
        loading,
        error,
        loadCart,
        addToCart
    };
}