import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ThankYouCard from "../Components/User/ThankYouCard"; // Import ThankYouCard component
import "../assets/styles/cart.css";
import { BASE_URL } from "../Services/helper";
import useSound from 'use-sound';
import thankYouSound from '../assets/success-48018.mp3';


const Cart = () => {
  const [items, setItems] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isCartEmpty, setIsCartEmpty] = useState(true); // Track if the cart is empty
  const [stockWarning, setStockWarning] = useState({});
  const userId = localStorage.getItem("userId");
  const [play] = useSound(thankYouSound);

  const removeFromCart = async (productId) => {
    try {
      setItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId)
      );
      await axios.delete(`${BASE_URL}/cart/${userId}/remove/${productId}`);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const increaseQuantity = async (itemStock, productId, currentQuantity) => {
    try {
      const updatedQuantity = currentQuantity + 1;
      if (itemStock < updatedQuantity) {
        setStockWarning((prevWarnings) => ({
          ...prevWarnings,
          [productId]: "Out of stock",
        }));
        return;
      }
      setStockWarning((prevWarnings) => ({
        ...prevWarnings,
        [productId]: "",
      }));

      const q = { quantity: updatedQuantity };
      await axios.put(`${BASE_URL}/cart/${userId}/update/${productId}`, q, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchItems();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const decreaseQuantity = async (productId, currentQuantity) => {
    try {
      const updatedQuantity = currentQuantity - 1;
      if (updatedQuantity < 1) return;

      const q = { quantity: updatedQuantity };
      await axios.put(`${BASE_URL}/cart/${userId}/update/${productId}`, q, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchItems();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cart/${userId}`);
      setItems(response.data.items);
      setIsCartEmpty(response.data.items.length === 0); // Update isCartEmpty based on items
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleBuy = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/order/buy/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Order created:", response.data);

      setItems([]);
      setIsCartEmpty(true); 
      setShowThankYou(true); 
      play();
      setTimeout(() => {
        setShowThankYou(false);
      }, 5000);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [userId]);

  const totalItems =
    items && items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice =
    items &&
    items.reduce((total, item) => total + item.productPrice * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>My Cart</h2>
      <AnimatePresence>
        {isCartEmpty && !showThankYou && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="empty-cart-message"
          >
            <h3>😢 Wow, such an empty cart!</h3>
            <p>Looks like you haven't added anything yet. 🛒</p>
            <p>Start shopping and fill it up! 🌟</p>
          </motion.div>
        )}
      </AnimatePresence>
      {items && items.length > 0 && (
       <div className="cart-content">
       {/* Cart items section */}
       <div className="cart-items-section">
         <AnimatePresence>
           {items.map((item) => {
             const originalPrice = item.productPrice > 15000 ? item.productPrice + 15000 : item.productPrice;
             const discountedPrice = item.productPrice;
             const discount = originalPrice > 0 ? ((originalPrice - discountedPrice) / originalPrice) * 100 : 0; // Calculate discount percentage
     
             return (
               <motion.div
                 className="cart-item"
                 key={item.productId}
                 initial={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -100 }}
                 transition={{ duration: 0.3 }} // Adjusted duration for smoother animation
               >
                 <img
                   src={item.productFile}
                   alt={item.productName}
                   className="cart-item-image"
                 />
                 <div className="cart-item-details">
                   <h4>{item.productName}</h4>
                   <div style={{ display: "flex", alignItems: "center" }}>
                     {originalPrice > 15000 && (
                       <p style={{ color: "gray", fontSize: "14px", textDecoration: "line-through", marginRight: "10px" }}>
                         ₹{originalPrice}
                       </p>
                     )}
                     <p style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}>
                       ₹{discountedPrice}
                     </p>
                   </div>
                   {item.productStock > 0 ? (
                     <p className="in-stock">In Stock</p>
                   ) : (
                     <p className="out-of-stock">Out of Stock</p>
                   )}
                   {discount > 0 && originalPrice > 15000 && (
                     <p style={{ color: "green", fontSize: "14px", marginTop: "5px" }}>
                       Offer: {Math.round(discount)}% Off
                     </p>
                   )}
                 </div>
                 <div className="quantity-controls">
                   <button onClick={() => decreaseQuantity(item.productId, item.quantity)} disabled={item.quantity <= 1}>
                     -
                   </button>
                   <span>{item.quantity}</span>
                   <button onClick={() => increaseQuantity(item.productStock, item.productId, item.quantity)} disabled={item.quantity >= item.productStock}>
                     +
                   </button>
                 </div>
                 <div className="cart-actions">
                   <button className="remove-btn" onClick={() => removeFromCart(item.productId)}>
                     Remove
                   </button>
                 </div>
               </motion.div>
             );
           })}
         </AnimatePresence>
       </div>
     

          {/* Price details section */}
          <div className="price-details-section">
            <h3>PRICE DETAILS</h3>
            <div className="price-detail">
              <span>Price ({totalItems} items)</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="price-detail">
              <span>Coupons for you</span>
              <span>– ₹50.00</span>
            </div>
            <div className="price-detail">
              <span>Delivery Charges</span>
              <span className="free">Free</span>
            </div>
            <hr />
            <div className="total-amount">
              <span>Total Amount</span>
              <span>₹{(totalPrice - 50).toFixed(2)}</span>
            </div>
            <p className="savings">You will save ₹50.00 on this order</p>
            <motion.button onClick={handleBuy} className="buy-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Place Order
            </motion.button>
          </div>
        </div>
      )}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            className="thank-you-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ThankYouCard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;
