import React from 'react';
import './star.css';

const Starrating = ({ stars, size }) => {
  const styles = {
    width: size + 'px',
    height: size + 'px',
    marginRight: size / 8 + 'px', // Adjust spacing
  };

  function Star({ number }) {
    const halfnumber = number - 0.5;

    return stars >= number ? (
      <img src='/foods/starfull.png' style={styles} alt={number} />
    ) : stars >= halfnumber ? (
      <img src='/foods/starhalf.png' style={styles} alt={number} />
    ) : (
      <img src='/foods/staremp.png' style={styles} alt={number} />
    );
  }

  return (
    <div className='rating'>
      {[1, 2, 3, 4, 5].map(number => (
        <Star key={number} number={number} />
      ))}
    </div>
  );
};

// ✅ Fix typo: `defaultProps`
Starrating.defaultProps = {
  size: 10, // Set a smaller default size
};

export default Starrating;
