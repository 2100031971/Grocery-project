import { useState, createContext, useContext } from "react";
import * as userService from "../Services/userService";
import { toast } from "react-toastify";
import { useCart } from "./useCart"; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser());
  const { clearCart, setCart, getCart } = useCart();

  const login = async (email, password) => {
    try {
      const user = await userService.login(email, password);
      const savedCart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
      setCart(savedCart);
      setUser(user);
      toast.success("Login Successful");
    } catch (err) {
      toast.error(err.response?.data || "Invalid email or password");
    }
  };

  const register = async (data) => {
    try {
      const user = await userService.register(data);
      setUser(user);
      clearCart(); 
      toast.success("Registration Successful");
    } catch (err) {
      toast.error(err.response?.data || "Registration failed");
    }
  };

  const logout = () => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(getCart())); 
    }
    userService.logout();
    setUser(null);
    clearCart(); 
    toast.success("Logout Successful");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
