import React, { useState } from "react";
import "./Payment.css"; // Import styles

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  // Card number validation (16 digits)
  const isValidCardNumber = (number) => /^\d{16}$/.test(number);

  // Expiry date validation (MM/YY format)
  const isValidExpiry = (date) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(date);

  // CVV validation (3 digits)
  const isValidCvv = (cvv) => /^\d{3}$/.test(cvv);

  // UPI validation (basic format check)
  const isValidUpi = (id) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+$/.test(id);

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);
    setPaymentStatus("");

    // Simulate validation and processing
    setTimeout(() => {
      setLoading(false);

      if (paymentMethod === "card") {
        if (!isValidCardNumber(cardNumber)) {
          alert("Invalid card number. It must be 16 digits.");
          return;
        }

        if (!isValidExpiry(expiry)) {
          alert("Invalid expiry date. Use MM/YY format.");
          return;
        }

        if (!isValidCvv(cvv)) {
          alert("Invalid CVV. It must be 3 digits.");
          return;
        }
      }

      if (paymentMethod === "upi" && !isValidUpi(upiId)) {
        alert("Invalid UPI ID. Please enter a valid format.");
        return;
      }

      setPaymentStatus("✅ Payment successful! Thank you for your order.");
    }, 2000);
  };

  return (
    <div className="payment-container">
      <h2>Payment Options</h2>

      {paymentStatus ? (
        <p className="success-message">{paymentStatus}</p>
      ) : (
        <form onSubmit={handlePayment} className="payment-form">
          <label>Select Payment Method:</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="card">Credit/Debit Card</option>
            <option value="paypal">PayPal</option>
            <option value="upi">UPI</option>
          </select>

          {paymentMethod === "card" && (
            <>
              <label>Cardholder Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label>Card Number:</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                placeholder="1234 5678 9012 3456"
                maxLength="16"
                required
              />

              <label>Expiry Date (MM/YY):</label>
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                maxLength="5"
                required
              />

              <label>CVV:</label>
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                placeholder="123"
                maxLength="3"
                required
              />
            </>
          )}

          {paymentMethod === "upi" && (
            <>
              <label>Enter UPI ID:</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="example@upi"
                required
              />
            </>
          )}

          {paymentMethod === "paypal" && (
            <p>✅ You will be redirected to PayPal for payment.</p>
          )}

          <button type="submit" className={`pay-button ${loading ? "loading" : ""}`} disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Payment;
