import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const clearCart = () => {
        setCart([]);  // ✅ Clears cart
    };

    return (
        <CartContext.Provider value={{ cart, setCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
