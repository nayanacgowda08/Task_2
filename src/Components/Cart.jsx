import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import "../assets/styles/cart.css";
import { BASE_URL } from '../Services/helper';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [stockWarning, setStockWarning] = useState({});
  const userId = localStorage.getItem("userId");

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`${BASE_URL}/cart/${userId}/remove/${productId}`);
      fetchItems();
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
  }, [userId,handleBuy]); // fetch items on initial mount only

  const totalItems = items && items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items && items.reduce((total, item) => total + item.productPrice * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2 style={{ textAlign: "center" }}>Cart Items</h2>
      {items == null || (items && items.length === 0) ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <p>Total items: {totalItems}</p>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items && items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      style={{ height: "80px", width: "100px" }}
                      src={item.productFile}
                      alt={item.productName}
                      className="cart-item-image"
                    />
                  </td>
                  <td>{item.productName}</td>
                  <td>
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => decreaseQuantity(item.productId, item.quantity)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => increaseQuantity(item.productStock, item.productId, item.quantity)}
                        disabled={item.quantity >= item.productStock}
                      >
                        +
                      </button>
                      {stockWarning[item.productId] && (
                        <span className="stock-warning">{stockWarning[item.productId]}</span>
                      )}
                    </div>
                  </td>
                  <td>Rs.{item.productPrice}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      Remove from Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {items && items.length > 0 && (
        <div className="buy">
          <motion.button
            onClick={handleBuy}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Buy now
          </motion.button>
          <span className="total-price">Total: Rs.{totalPrice.toFixed(2)}</span>
        </div>
      )}

<AnimatePresence>
        {successMessage && (
          <motion.div
            className="success-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;
