import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import "../assets/styles/cart.css";

const Cart = () => {
  const [items, setItems] = useState([]);
  const userId = localStorage.getItem("userId");

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:8082/api/cart/${userId}/remove/${productId}`);
      fetchItems();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const increaseQuantity = async (productId, currentQuantity) => {
    try {
      const updatedQuantity = currentQuantity + 1;
      const q = { quantity: updatedQuantity };
      await axios.put(`http://localhost:8082/api/cart/${userId}/update/${productId}`, q, {
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
        await axios.put(`http://localhost:8082/api/cart/${userId}/update/${productId}`, q, {
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
      const response = await axios.get(`http://localhost:8082/api/cart/${userId}`);
      setItems(response.data.items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [userId]);

  // Calculate total items and total price
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.productPrice * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2 style={{ textAlign: "center" }}>Cart Items</h2>
      {items && items.length === 0 ? (
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
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => increaseQuantity(item.productId, item.quantity)}
                      >
                        +
                      </button>
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
      {items.length > 0 && (
        <div className="buy">
          <button>Buy now</button>
          <span className="total-price">Total: Rs.{totalPrice.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};

export default Cart;
