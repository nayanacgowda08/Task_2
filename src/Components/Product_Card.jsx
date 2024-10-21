// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/styles/productCard.css"

const Product_Card = ({ id, category, description, image, price, title, stocks, rating, merchantId, usp }) => {
  const navigate = useNavigate();
    const handleViewDetails = () => {
    navigate(`/detail/${id}`, {
      state: {
        id,
        category,
        description,
        image,
        price,
        title,
        stocks,
        rating,
        merchantId,
        usp
      }
    });
  };

  return (
    <div className="product-card">
      <div className="card-image" style={{ backgroundImage: `url(${image})` }} />
      <div className="card-content">
        <h3>{title}</h3>
        <p className="category">{category}</p>
        <p className="description">{description}</p>
        <p className="price">${price}</p>
        <button className="add-to-cart">Add to Cart</button>
        <button className="view-details" onClick={handleViewDetails}>View Details</button>
      </div>
    </div>
  );
};

export default Product_Card;
