import { useCallback, useEffect, useState } from "react";
import { getCart, addToCart, updateQuantity, removeItem } from "../../services/CartItemService";

export const UseCart = () => {
    const [cart, setCart] = useState(
        {
            items: [],
            noun: 0,
            tax: 0,
            total: 0,
            totalItems: 0,
            loading: false,
            error: null
        }
    );
    const [notification, setNotefication] = useState([]);
    useEffect(() => {
        loading();
    }, []);

    // Funcion para agregar al carrito
    const loadCart = useCallback(async () => {
        setCart(prev => ({ ...prev, loading: true, error: null }));

        try {
            const response = await getCart();
            if (response.succes) {
                setCart({
                    ...response.data,
                    loading: false,
                    error: null
                })
            }
        } catch (error) {
            setCart(prev => ({
                ...prev,
                loading: false,
                error: 'error de cargar carrito'
            }));
        }
    });
}