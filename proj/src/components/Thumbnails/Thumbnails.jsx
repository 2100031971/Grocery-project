import React from 'react';
import { Link } from 'react-router-dom';
import './Thum.css';
import Starrating from '../Starrating/Starrating';
import Price from '../Price/Price';

const Thumbnails = ({ foods = [] }) => { // ✅ Default value to prevent errors
  if (!Array.isArray(foods)) { // ✅ Ensure foods is an array
    return <p>No foods available</p>;
  }

  return (
    <ul className="list">
      {foods.length > 0 ? (  
        foods.map((food) => (
          <li key={food._id}> 
              <Link to={`/food/${food._id}`}> 

              <img className="image" src={food.imageUrl} alt={food.name} />


              <div className="content">
                <div className="name">{food.name}</div>
                <span className={`favorite ${food.favorite ? '' : 'not'}`}>
                  🩶
                </span>
                <div className='stars'>
                  <Starrating stars={food.stars} size={25} />
                </div>
                <div className='product_item_footer'>
                  <div className='origins'>
                    {food.origins.map((origin) => (
                      <span key={origin}>{origin}</span>
                    ))}
                  </div>
                </div>
                <div className='price'>
                  <Price price={food.price} local="en-IN" currency="INR" />
                </div>
              </div>
            </Link>
          </li>
        ))
      ) : (
        <p>No foods available</p> // ✅ Show message if no foods exist
      )}
    </ul>
  );
};

export default Thumbnails;
