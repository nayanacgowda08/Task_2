// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/styles/productCard.css"

const Product_Card = ({ id, category, description, image, price, title, stock, rating, merchantId, usp }) => {
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
        stock,
        rating,
        merchantId,
        usp
      }
    });
  };

  return (
    <div className="product-card">
     <div className="row">
     <div className="card-image"  
      // style={{ backgroundImage: url('https://nobero.com/cdn/shop/files/black_8f2f0bb4-9293-4d6f-a179-c918d7602384.jpg?v=1712232992') }} 
       style={{ backgroundImage: `url(${image})`,
      padding:"10px"
      }} 
       />
      <div className="card-content">
        <h4>{title} </h4>
        <p className="category">{category}</p>
        <p className="description">{description}</p>
        <p className="price">${price}</p>
         </div>
      <div className="btn-flex">
         <button className="add-to-cartt">Add to Cart</button>
        <button className="view-detailss" onClick={handleViewDetails}>View Details</button>
   </div>
     
     </div>
    </div>
  );
};

export default Product_Card;
