// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaShippingFast, FaUndo, FaMoneyBillAlt } from 'react-icons/fa'; // Importing icons
import "../assets/styles/details.css"; // Ensure to style accordingly
import { useEffect } from 'react';

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to homepage if location.state is null
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId || !location.state) {
      navigate('/'); // Redirect if user is not logged in or state is missing
    }
  }, [navigate, location.state]);

  // Handle when location.state is null (for direct route access)
  if (!location.state) {
    return <p>Loading or redirecting...</p>; // Optional: Display a loading message or redirect
  }

  const { id, category, description, image, price, title, stock, rating, merchantId, usp } = location.state;


  return (
    <div className="details-container">
      <div className="details-card">
        {/* Product Image Section */}
        <div className="details-image-container">
          <img src={image} alt={title} className="details-image" />
        </div>

        {/* Product Info Section */}
        <div className="details-info">
          <h2 className="details-title">{title}</h2>
          <p className="details-description">{description}</p>

          {/* Product Details */}
          <div className="product-details">
            <p className="details-status">
              Status: <span className={stock > 0 ? "in-stock" : "out-of-stock"}>{stock > 0 ? "In Stock" : "Out of Stock"}</span>
            </p>
            <p className="details-category">Category: {category}</p>
            <p className="details-policy">Policy: 7 Days Replacement & Return</p>
            <p className="details-rating">Rating: {rating} ★</p>
          </div>

          {/* Price and Discount */}
          <div className="details-price-section">
            <p className="details-price">Price: Rs {price}</p>
          </div>

          {/* Cart Button Section */}
          <div className="cart-section">
            {stock > 0 ? (
              <button className="add-to-cart">Add to Cart</button>
            ) : (
              <button className="out-of-stock-btn" disabled>Out of Stock</button>
            )}
          </div>

          {/* Additional Info Section */}
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
  );
};

export default Details;
