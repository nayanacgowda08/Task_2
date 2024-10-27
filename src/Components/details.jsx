import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaShippingFast, FaUndo, FaMoneyBillAlt } from 'react-icons/fa';
import "../assets/styles/details.css"; // Ensure to style accordingly
import axios from 'axios';
import { BASE_URL } from "../Services/helper";
import { CartContext } from "../context/CartContext"; // Assuming you have a CartContext

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = localStorage; // Ensure userId is retrieved correctly
  // const { addToCart } = useContext(CartContext);
  const [inCart, setInCart] = useState(false);
  

  // Redirect to homepage if location.state is null
  useEffect(() => {
    if (!userId || !location.state) {
      navigate('/'); // Redirect if user is not logged in or state is missing
    }
  }, [navigate, location.state]);

  if (!location.state) {
    return <p>Loading or redirecting...</p>; // Optional: Display a loading message or redirect
  }

  const { id, category, description, image, price, title, rating, usp,stock } = location.state;
  
  // Check if the product is in the cart
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

  // Function to handle adding to the cart
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

  // Function to navigate to the cart
  const handleGoToCart = () => {
    navigate("/user/cart");
  };

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
          <p className="details-description">{usp}</p>
          <p className="details-description">{description}</p>
          

          {/* Product Details */}
          <div className="product-details">
            <p className="details-category">Category: {category}</p>
            <p className="details-rating">Rating: {rating} ★</p>
          </div>

          {/* Price and Stock */}
          <div className="details-price-section">
            <p className="details-price">Price: Rs {price}</p>
            <p className="details-status">
              Status: <span className={stock > 0 ? "in-stock" : "out-of-stock"}>{stock > 0 ? "In Stock" : "Out of Stock"}</span>
            </p>
          </div>

          {/* Cart Button Section */}
          <div className="cart-section">
            {inCart ? (
              <button className="add-to-cart" onClick={handleGoToCart}>
                Go to Cart
              </button>
            ) : (
              <button
                className="add-to-cart"
                onClick={handleAddToCart}
                disabled={stock === 0} // Disable if stock is 0
              >
                Add to Cart
              </button>
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
