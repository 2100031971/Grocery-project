import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./food.css";
import { useCart } from "../../hooks/useCart";

const Food = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Fetch food details from backend API
    useEffect(() => {
        const fetchFood = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/foods/${id}`);
                if (!response.ok) {
                    throw new Error("Food not found");
                }
                const data = await response.json();
                setFood(data);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchFood();
    }, [id]);

    const HandleAddToCart = () => {
        if (food) {
            addToCart(food);
            navigate('/cart');
        }
    };

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>Food not found</h2>;

    return (
        <div className="food-container">
            {/* Image Section */}
            <img 
                className="food-image" 
                src={food.imageUrl ? food.imageUrl : '/images/placeholder.png'} 
                alt={food.name || "Food Item"} 
            />

            {/* Food Details Section */}
            <div className="food-details">
                <h2>{food.name || "Unknown Food"}</h2>

                {/* Rating & Heart Icon */}
                <div className="rating-section">
                    <span className="rating">⭐ {food.stars ?? "N/A"}</span>
                    <span className="heart">❤️</span>
                </div>

                {/* Tags */}
                <div className="food-tags">
                    {Array.isArray(food.tags) && food.tags.length > 0 ? (
                        food.tags.map((tag, index) => (
                            <span key={index} className="food-tag">{tag}</span>
                        ))
                    ) : (
                        <span className="food-tag">No Tags</span>
                    )}
                </div>

                {/* Price & Button Row */}
                <div className="price-cart">
                    <span className="price-value">{food.price ?? "0.00"}</span>
                    <button className="cart-button" onClick={HandleAddToCart}>Add To Cart</button>
                </div>

                {/* Back Button */}
                <button onClick={() => navigate(-1)} className="back-button">Go Back</button>
            </div>
        </div>
    );
};

export default Food;
