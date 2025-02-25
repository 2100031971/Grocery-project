import React from 'react';
import { useCart } from '../../hooks/useCart';
import { Link, useNavigate } from 'react-router-dom';
import Price from '../../components/Price/Price';
import './checkout.css';

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  if (!cart || cart.items.length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  const handleProceedToPayment = () => {
    navigate('/payment'); // Redirects to the payment page
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="cart-summary">
        {cart.items.map((item) => (
          <div key={item.food.id} className="checkout-item">
            <img src={item.food.imageUrl} alt={item.food.name} />
            <p>{item.food.name}</p>
            <p>Quantity: {item.quantity}</p>
            <Price price={item.price} />
          </div>
        ))}
      </div>

      <div className="checkout-total">
        <h3>Total Items: {cart.totalCount}</h3>
        <h3>Total Price: <Price price={cart.totalPrice} /></h3>
      </div>

      <button onClick={handleProceedToPayment} className="checkout-button">
        Proceed to Payment
      </button>

      <Link to="/cart">Back to Cart</Link>
    </div>
  );
};

export default Checkout;
