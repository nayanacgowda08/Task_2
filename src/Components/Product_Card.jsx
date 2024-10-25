import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/styles/productCard.css";
import { CartContext } from '../context/CartContext'; 
import axios from 'axios';
import { BASE_URL } from '../Services/helper';

const Product_Card = ({ id, category, description, image, price, title, stock, rating, merchantId, usp }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext); 
  const [inCart, setInCart] = useState(false);
  const userId = localStorage.getItem("userId");

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
        const response = await axios.get(`${BASE_URL}/cart/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const cartItems = response.data.items;
          const productInCart = cartItems.some(item => item.productId === id);
          setInCart(productInCart);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [id, userId]);

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
      const response = await axios.post(`${BASE_URL}/cart/${userId}/add`, cartItemDTO, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        setInCart(true);
      } else {
        console.error("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="product-card">
      <div className="card-image" style={{ backgroundImage: `url(${image})` }} />
      <div className="card-content">
        <h4>{title}</h4>
        <div className="rating">
  {Array(Math.floor(rating)).fill().map((_, i) => (
    <span key={i}>⭐</span>
  ))}
  {rating % 1 !== 0 && <span>⭐️</span>}
  {Array(5 - Math.ceil(rating)).fill().map((_, i) => (
    <span key={i + Math.floor(rating) + 1}>☆</span>
  ))}
</div>
        <p className="category">{category}</p>
        <p className="description">{description}</p>
        <p className="price">${price}</p>
        {stock > 0 ? (
          <span className="in-stock">In Stock</span>
        ) : (
          <span className="out-of-stock">Out of Stock</span>
        )}
        <div className="btn-flex">
          {inCart ? (
            <button className="go-to-cart" onClick={handleGoToCart}>Go to Cart</button>
          ) : (
            <button
              className="add-to-cartt"
              onClick={handleAddToCart}
              disabled={stock === 0} // Disable if stock is 0
            >
              Add to Cart
            </button>
          )}
          <button className="view-detailss" onClick={handleViewDetails}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default Product_Card;
