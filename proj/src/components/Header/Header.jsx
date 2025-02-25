import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import './Head.css';

const Header = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();

    return (
        <header className='header'>
            <div className='head-container'>
                <Link to="/" className='logo'>ShopOn</Link>
                <nav>
                    <ul>
                        {user ? (
                            <li className='menu_container'>
                                <Link to="/profile">{user.name}</Link>
                                <div className='menu'>
                                    <Link to="/profile">Profile</Link>
                                    <Link to="/orders">Orders</Link>
                                    {user.isAdmin && <Link to="/admin">Admin</Link>}
                                    <a onClick={logout}>Logout</a>
                                </div>
                            </li>
                        ) : (
                            <li>
                                <Link to="/login">Login</Link> {/* ✅ Single login link */}
                            </li>
                        )}

                        <li>
                            <Link to="/cart">
                                Cart {cart.totalCount > 0 && <span className='cart_count'>{cart.totalCount}</span>}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
