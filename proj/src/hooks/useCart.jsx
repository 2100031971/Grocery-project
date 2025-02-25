import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const CART_KEY = 'cart';
const EMPTY_CART = {
    items: [],
    totalPrice: 0,
    totalCount: 0,
};

function getCartFromLocalStorage() {
    try {
        const storedCart = localStorage.getItem(CART_KEY);
        return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
    } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        return EMPTY_CART;
    }
}

export const CartProvider = ({ children }) => {
    const initCart = getCartFromLocalStorage();

    const [cartItems, setCartItems] = useState(initCart.items);
    const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
    const [totalCount, setTotalCount] = useState(initCart.totalCount);

    useEffect(() => {
        const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
        const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

        setTotalPrice(totalPrice);
        setTotalCount(totalCount);

        localStorage.setItem(
            CART_KEY,
            JSON.stringify({ items: cartItems, totalPrice, totalCount })
        );
    }, [cartItems]);

    const removeFromCart = (foodId) => {
        const filteredCartItems = cartItems.filter(item => item.food.id !== foodId);
        setCartItems(filteredCartItems);
    };

    const changeQuantity = (cartItem, newQuantity) => {
        if (!cartItem || !cartItem.food) {
            console.error("cartItem is undefined or missing 'food' property:", cartItem);
            return;
        }

        const { food } = cartItem;

        const updatedCartItems = cartItems.map(item =>
            item.food.id === food.id
                ? { ...item, quantity: newQuantity, price: food.price * newQuantity }
                : item
        );

        setCartItems(updatedCartItems);
    };

    const addToCart = (food) => {
        const existingCartItem = cartItems.find(item => item.food.id === food.id);
        if (existingCartItem) {
            changeQuantity(existingCartItem, existingCartItem.quantity + 1);
        } else {
            setCartItems([...cartItems, { food, quantity: 1, price: food.price }]);
        }
    };

    // ✅ Clear cart function
    const clearCart = () => {
        setCartItems([]);
        setTotalPrice(0);
        setTotalCount(0);
        localStorage.removeItem(CART_KEY);
    };

    return (
        <CartContext.Provider
            value={{
                cart: { items: cartItems, totalPrice, totalCount },
                removeFromCart,
                changeQuantity,
                addToCart,
                clearCart,
                setCart: setCartItems,
                getCart: () => cartItems
            }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
