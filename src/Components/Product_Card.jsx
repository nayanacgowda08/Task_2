// Product_Card.js
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import "../assets/styles/productCard.css";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { BASE_URL } from "../Services/helper";

const Product_Card = ({
  id,
  category,
  description,
  image,
  price,
  title,
  stock,
  rating,
  merchantId,
  usp,
}) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [inCart, setInCart] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const userId = localStorage.getItem("userId");

  const handleViewDetails = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
          const productInCart = cartItems.some((item) => item.productId === id);
          setInCart(productInCart);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [id, userId]);

  const handleGoToCart = () => {
    navigate("/user/cart");
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
      const response = await axios.post(
        `${BASE_URL}/cart/${userId}/add`,
        cartItemDTO,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setInCart(true);
      } else {
        console.error("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const originalPrice = price > 15000 ? price + 15000 : price; // Original price logic
  const discount = originalPrice > 0 ? ((originalPrice - price) / originalPrice) * 100 : 0; // Calculate discount percentage

  return (
    <>
      <div className="product-card">
        <div className="card-image" style={{ backgroundImage: `url(${image})` }} />
        <div className="card-content">
          <h4>{title}</h4>
          <div className="rating">
            {Array(Math.floor(rating))
              .fill()
              .map((_, i) => (
                <span key={i} className="filled">
                  ⭐
                </span>
              ))}
            {rating % 1 !== 0 && <span className="filled">⭐️</span>}
            {Array(5 - Math.ceil(rating))
              .fill()
              .map((_, i) => (
                <span key={i + Math.floor(rating) + 1} className="empty">
                  ☆
                </span>
              ))}
          </div>
          <p className="category">{category}</p>
          <p className="description">{usp}</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            {originalPrice > 15000 && (
              <p style={{ color: "gray", fontSize: "14px", textDecoration: "line-through", marginRight: "10px" }}>
                ₹{originalPrice}
              </p>
            )}
            <p style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}>
              ₹{price}
            </p>
          </div>
          {discount > 0 && originalPrice > 15000 && (
            <p style={{ color: "green", fontSize: "14px", marginTop: "5px" }}>
              Offer: {Math.round(discount)}% Off
            </p>
          )}
          {stock > 0 ? (
            stock < 10 ? (
              <span className="hurry-up" style={{ color: "orange" }}>
                Hurry Up! Only {stock} left
              </span>
            ) : (
              <span className="in-stock">In Stock</span>
            )
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
          <div className="btn-flex">
            {inCart ? (
              <button className="go-to-cart" onClick={handleGoToCart}>
                Go to Cart
              </button>
            ) : (
              <button
                className="add-to-cartt"
                onClick={handleAddToCart}
                disabled={stock === 0}
              >
                Add to Cart
              </button>
            )}
            <button className="view-detailss" onClick={handleViewDetails}>
              View Details
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <ModalBackdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeModal}>&times;</CloseButton>
              <StyledImage src={image} alt={title} />
              <ModalDetails>
                <h2>{title}</h2>
                <p><strong>Category:</strong> {category}</p>
                <p>{description}</p>
                <p>{usp}</p>
                <h3>Price: <span style={{ color: "#28a745" }}>₹{price}</span></h3>
                {originalPrice > 15000 && (
                  <p style={{ textDecoration: "line-through", color: "gray", margin: "5px 0" }}>
                    Original Price: ₹{originalPrice}
                  </p>
                )}
                {discount > 0 && originalPrice > 15000 && (
                  <p style={{ color: "green", fontSize: "14px", marginTop: "5px" }}>
                    Offer: {Math.round(discount)}% Off
                  </p>
                )}
                <p>Stock: {stock > 0 ? "In Stock" : "Out of Stock"}</p>
                <div className="modal-buttons">
                  <button className="add-to-cart-modal" onClick={handleAddToCart} disabled={stock === 0}>
                    Add to Cart
                  </button>
                  <button className="close-modal" onClick={closeModal}>Close</button>
                </div>
              </ModalDetails>
            </ModalContent>
          </ModalBackdrop>
        )}
      </AnimatePresence>
    </>
  );
};

// Styled Components for Modal and Responsive Image
const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;
  text-align: center;
  position: relative;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ModalDetails = styled.div`
  padding: 1rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #333;
`;

export default Product_Card;
