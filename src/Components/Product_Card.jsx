import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/styles/productCard.css";
import { CartContext } from '../context/CartContext'; 
import axios from 'axios';

const Product_Card = ({ id, category, description, image, price, title, stock, rating, merchantId, usp }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext); 
  const [inCart, setInCart] = useState(false); // State to track if product is in the cart
  const userId = localStorage.getItem("userId"); // Get the current user ID

  // Fetch the cart items for the logged-in user
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

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!userId) return; 

      try {
        const response = await axios.get(`http://localhost:8082/api/cart/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          
          const cartItems = response.data.items; // Assuming the API returns an array of cart items
          const productInCart = cartItems.some(item => item.productId === id); // Check if the product is in the cart
          setInCart(productInCart); // Set the inCart state accordingly
        }
      } catch (error) {
        console.error("Error fetching cart items:");
      }
    };

    fetchCartItems();
  }, [id, userId]); // Effect runs when `id` or `userId` changes

  // Navigate to the cart page
  const handleGoToCart = () => {
    navigate('/user/cart');
  };

  const handleAddToCart = async () => {
    if (!userId) {
      console.error("User not logged in");
      return;
    }

    const cartItemDTO = {
      productId: id,
      quantity: 1,
    };

    try {
      const response = await axios.post(`http://localhost:8082/api/cart/${userId}/add`, cartItemDTO, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        setInCart(true); // Mark the product as in the cart after adding it
      } else {
        console.error("Failed to add product to cart.");
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
          {inCart ? (
            <button className="go-to-cart" onClick={handleGoToCart}>Go to Cart</button>
          ) : (
            <button className="add-to-cartt" onClick={handleAddToCart}>Add to Cart</button>
          )}
          <button className="view-detailss" onClick={handleViewDetails}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default Product_Card;
