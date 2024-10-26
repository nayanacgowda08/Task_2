import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaShippingFast, FaUndo, FaMoneyBillAlt } from 'react-icons/fa';
import "../assets/styles/details.css";
import { CartContext } from '../context/CartContext';
import Navbar from './Navbar';

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId || !location.state) {
      navigate('/');
    }
  }, [navigate, location.state]);

  if (!location.state) {
    return <p>Loading or redirecting...</p>;
  }

  const { id, category, description, image, price, title, stock, rating } = location.state;

  const handleAddToCart = () => {
    addToCart({ id, title, price, stock, image });
    setIsInCart(true);  // Set state to show "Go to Cart"
  };

  const handleGoToCart = () => {
    navigate('/user/cart');  // Redirect to the cart page
  };

  return (
    <>
     <Navbar/>
    <div className="details-container">
      <div className="details-card">
        <div className="details-image-container">
          <img src={image} alt={title} className="details-image" />
        </div>
        <div className="details-info">
          <h2 className="details-title">{title}</h2>
          <p className="details-description">{description}</p>

          <div className="product-details">
            <p className="details-status">
              Status: <span className={stock > 0 ? "in-stock" : "out-of-stock"}>{stock > 0 ? "In Stock" : "Out of Stock"}</span>
            </p>
            <p className="details-category">Category: {category}</p>
            <p className="details-policy">Policy: 7 Days Replacement & Return</p>
            <p className="details-rating">Rating: {rating} ★</p>
          </div>

          <div className="details-price-section">
            <p className="details-price">Price: Rs {price}</p>
          </div>

          <div className="cart-section">
            {stock > 0 ? (
              isInCart ? (
                <button onClick={handleGoToCart} className="go-to-cart">Go to Cart</button>
              ) : (
                <button onClick={handleAddToCart} className="add-to-cart">Add to Cart</button>
              )
            ) : (
              <button className="out-of-stock-btn" disabled>Out of Stock</button>
            )}
          </div>

          <div className="additional-info">
            <div className="additional-option">
              <FaMoneyBillAlt className="icon" />
              <span>Cash on Delivery</span>
            </div>
            <div className="additional-option">
              <FaUndo className="icon" />
              <span>Return Available</span>
            </div>
            <div className="additional-option">
              <FaShippingFast className="icon" />
              <span>Free Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Details;
