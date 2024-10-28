import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import "../assets/styles/cart.css";
import { BASE_URL } from "../Services/helper";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [stockWarning, setStockWarning] = useState({});
  const userId = localStorage.getItem("userId");

  const removeFromCart = async (productId) => {
    try {
      setItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId)
      ); // Remove item optimistically
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
      if (updatedQuantity < 1) return; // Prevent quantity from going below 1

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

      // Clear the cart items after successful purchase
      setItems([]); // Empty the items array immediately
      setSuccessMessage("You have purchased successfully!");

      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
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

    console.log(items);
    

  return (
    <div className="cart-container">
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>My Cart</h2>
      {items && items.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your cart is empty
        </motion.p>
      )}
      {items && items.length > 0 && (
        <div className="cart-content">
          <div className="cart-items-section">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  className="cart-item"
                  key={item.productId}
                  initial={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 2 }}
                >
                  <img
                    src={item.productFile}
                    alt={item.productName}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h4>{item.productName}</h4>
                    <p style={{
                      color:"gray" ,
                      fontSize:"14px"
                    }}
                    >Rs.{item.productPrice
                    }</p>
                    {item.productStock > 0 ? (
                      <p className="in-stock">In Stock</p>
                    ) : (
                      <p className="out-of-stock">Out of Stock</p>
                    )}
                  </div>
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.productId, item.quantity)
                      }
                      disabled={item.quantity <= 1}
                      style={{
                        cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
                      }}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.productStock,
                          item.productId,
                          item.quantity
                        )
                      }
                      disabled={item.quantity >= item.productStock}
                      style={{
                        cursor:
                          item.quantity >= item.productStock
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-actions">
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

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
            <motion.button
              onClick={handleBuy}
              className="buy-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Place Order
            </motion.button>
          </div>
        </div>
      )}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            className="success-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;
