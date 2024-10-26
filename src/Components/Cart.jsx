import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "../assets/styles/cart.css";
import Navbar from './Navbar';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [stockWarning, setStockWarning] = useState({});

  const removeFromCart = (productId) => {
    const updatedItems = items.filter(item => item.id !== productId);
    setItems(updatedItems); // Update state immediately
    localStorage.setItem("cartItems", JSON.stringify(updatedItems)); // Save to local storage
  };

  const increaseQuantity = (itemStock, productId, currentQuantity) => {
    const updatedQuantity = currentQuantity + 1;
    if (itemStock < updatedQuantity) {
      setStockWarning((prevWarnings) => ({
        ...prevWarnings,
        [productId]: "Out of stock",
      }));
      return;
    }
    const updatedItems = items.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    });
    setItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems)); // Save to local storage
  };

  const decreaseQuantity = (productId, currentQuantity) => {
    const updatedQuantity = currentQuantity - 1;
    const updatedItems = items.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0); // Remove item if quantity is zero

    setItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems)); // Save to local storage
  };

  const fetchItems = () => {
    const storedItems = localStorage.getItem("cartItems");
    setItems(storedItems ? JSON.parse(storedItems) : []); // Load from local storage
  };

  const handleBuy = () => {
    console.log("Purchase initiated");
    setSuccessMessage("You have purchased successfully!");
    setItems([]); // Clear the cart items after successful purchase
    localStorage.removeItem("cartItems"); // Clear local storage
  };

  useEffect(() => {
    fetchItems();
  }, []); // Fetch items on initial mount only

  // Calculate total items and total price dynamically
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <>
    
    <div className="cart-container">
      <h2 style={{ textAlign: "center" }}>Cart Items</h2>
      {items.length === 0 ? (
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
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      style={{ height: "80px", width: "100px" }}
                      src={item.image}
                      alt={item.title}
                      className="cart-item-image"
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => decreaseQuantity(item.id, item.quantity)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => increaseQuantity(item.stock, item.id, item.quantity)}
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>
                      {stockWarning[item.id] && (
                        <span className="stock-warning">{stockWarning[item.id]}</span>
                      )}
                    </div>
                  </td>
                  <td>Rs. {item.price.toFixed(2)} {/* Display item price */}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => removeFromCart(item.id)}
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
      {items.length > 0 && (
        <div className="buy">
          <motion.button
            onClick={handleBuy}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
            className='buy-button'
          >
            Buy now
          </motion.button>
          <span className="total-price">Total: Rs. {totalPrice.toFixed(2)}</span>
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
    </>
  );
};

export default Cart;
