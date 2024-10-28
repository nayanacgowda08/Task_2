import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaShippingFast, FaUndo, FaMoneyBillAlt } from 'react-icons/fa';
import "../assets/styles/details.css"; 
import axios from 'axios';
import { BASE_URL } from "../Services/helper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); 
  const [inCart, setInCart] = useState(false);

  
  useEffect(() => {
    if (!userId || !location.state) {
      navigate('/'); 
    }
  }, [navigate, location.state]);

  if (!location.state) {
    return <p>Loading or redirecting...</p>; 
  }

  const { id, category, description, image, price, title, rating, usp, stock } = location.state;
  
  
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/cart/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const cartItems = response.data.items;
          const productInCart = cartItems.some((item) => item.productId === id);
          setInCart(productInCart);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [id, userId]);

  
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

   
  const handleGoToCart = () => {
    navigate("/user/cart");
  };

  
  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="details-container">
      
      <button className="back-button" onClick={handleGoBack}>
      <FontAwesomeIcon icon={faArrowLeft}  /> 
      </button>

      <div className="details-card">
        
        <div className="details-image-container">
          <img src={image} alt={title} className="details-image" 
          style={{
            // width:"500px", height:"300px" , objectFit:"cover"
          }}
          />
        </div>

        
        <div className="details-info">
          <h2 className="details-title">{title}</h2>
          <p className="details-usp">{usp}</p>
          <p className="details-description">{description}</p>
          
          
          <div className="product-details">
            <p className="details-category">Category: {category}</p>
            <p className="details-rating">Rating: {rating} ★</p>
          </div>

          
          <div className="details-price-section">
            <p className="details-price">Price: Rs {price}</p>
            <p className="details-status">
              Status: <span className={stock > 0 ? "in-stock" : "out-of-stock"}>{stock > 0 ? "In Stock" : "Out of Stock"}</span>
            </p>
          </div>

     
          
<div className="cart-section">
  {inCart ? (
    <button className="add-to-cart in-cart" onClick={handleGoToCart}>
      Go to Cart
    </button>
  ) : (
    <button
      className="add-to-cart"
      onClick={handleAddToCart}
      disabled={stock === 0} 
    >
      {stock === 0 ? "Out of Stock" : "Add to Cart"}
    </button>
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
  );
};

export default Details;
