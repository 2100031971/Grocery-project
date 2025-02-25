import React from 'react';

const Price = ({ price, local = 'en-IN', currency = 'INR' }) => {
  // Check if price is valid before formatting
  if (price === undefined || price === null) {
    return <span>Price not available</span>;
  }

  const formatPrice = () => 
    new Intl.NumberFormat(local, {
      style: 'currency',
      currency,
    }).format(price);

  return <span>{formatPrice()}</span>;
};

export default Price;
