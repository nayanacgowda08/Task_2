import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/styles/productCard.css";
import { CartContext } from '../context/CartContext'; 
import axios from 'axios';

const Product_Card = ({ id, category, description, image, price, title, stock, rating, merchantId, usp }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext); 

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

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");
  
    // Create the cart item DTO with product ID and quantity
    const cartItemDTO = {
      productId: id,  // This is the product ID
      quantity: 1,    // Default quantity set to 1
    };
  
    try {
      const response = await axios.post(`http://localhost:8082/api/cart/${userId}/add`, cartItemDTO, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        console.log("Product added to cart successfully:", response.data);
        // Optionally, handle success (e.g., show a success message)
      } else {
        console.error("Failed to add product to cart.");
        // Optionally, handle errors (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  
  
  return (
    <div className="product-card">
      <div className="row">
        <div className="card-image"  
          style={{ backgroundImage: `url(${image})`, padding: "10px" }} 
        />
        <div className="card-content">
          <h4>{title} </h4>
          <p className="category">{category}</p>
          <p className="description">{description}</p>
          <p className="price">${price}</p>
        </div>
        <div className="btn-flex">
          <button className="add-to-cartt" onClick={handleAddToCart}>Add to Cart</button>
          <button className="view-detailss" onClick={handleViewDetails}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default Product_Card;
