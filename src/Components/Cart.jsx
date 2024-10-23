import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import "../assets/styles/cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h2 style={{ textAlign: "center" }}>Cart Items</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
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
            {cartItems.map((item, index) => (
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
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>${item.price}</td>
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
       
      )}
       <div className="buy">
          <button>Buy now</button>
          </div>
    </div>
  );
};

export default Cart;
