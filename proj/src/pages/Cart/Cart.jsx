import React from 'react';
import { useCart } from '../../hooks/useCart';
import { Link } from 'react-router-dom';
import Price from '../../components/Price/Price';
import './cart.css';
import NotFound from '../../components/Notfound/NotFound';

const Cart = () => {
  const { cart, removeFromCart, changeQuantity } = useCart();

  if (!cart || cart.items.length === 0) {
    return <NotFound message="Cart is Empty" />;
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      <ul className="cart-list">
        {cart.items.map((item) => (
          <li key={item.food.id}>
            <img src={item.food.imageUrl} alt={item.food.name} />
            <Link to={`/food/${item.food.id}`}>{item.food.name}</Link>
            <select 
              value={item.quantity} 
              onChange={(e) => changeQuantity(item, Number(e.target.value))}
            >
              {[...Array(8)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            <Price price={item.price} />
            <button onClick={() => removeFromCart(item.food.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <div className="checkout">
        <h3>Total: <Price price={cart.totalPrice} /></h3>
        <Link to="/checkout">Proceed to Checkout</Link>
      </div>
    </div>
  );
};

export default Cart;
