import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Services/helper';
import "../../assets/styles/merchantOrders.css"



export const fetchOrdersByMerchant = async (merchantId) => {
  const response = await axios.get(`${BASE_URL}/order/merchant/${merchantId}`);
  return response.data;
  
};

export const updateOrderStatus = async (orderId, newStatus) => {
  const statusPayload = {
    status: newStatus,
  };

  const response = await axios.put(`${BASE_URL}/order/merchant/setstatus/${orderId}`, statusPayload, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return response.data;
};

const MerchantOrders = () => {
  const [orders, setOrders] = useState([]);
  const merchantId = localStorage.getItem("userId");

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrdersByMerchant(merchantId);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    getOrders();
  }, [merchantId]);

  const handleStatusChange = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "DELIVERED");
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: "DELIVERED" } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };

  return (
    <div className="merchant-container">
      <h2 className="heading">Orders</h2>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order.orderId} className="order-card">
            <div className="order-details">
              <div className="order-info">
                <h3>Order ID: {order.orderId}</h3>
                <p>Status: <span className={order.status === "DELIVERED" ? "delivered-status" : "pending-status"}>{order.status}</span></p>
                <p>Total Amount Paid: <span className="price">${order.totalPrice.toFixed(2)}</span></p>
              </div>
              <div className="product-list">
                {order.products.map((product) => (
                  <div key={product.productId} className="product-card">
                    <img src={product.file} alt={product.productName} className="product-image" />
                    <div className="product-infoo">
                      <h4>{product.productName}</h4>
                      <p>Price: <span className="price">${product.price}</span></p>
                      <p>Quantity: {product.quantity}</p>
                      <p>Category: {product.category}</p>
                      <p className="description">Description: {product.description}</p>
                      <p>Rating: {product.rating} / {product.totalRating}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              className={order.status === "PENDING" ? "pending-buttonn" : "delivered-buttonn"}
              onClick={() => handleStatusChange(order.orderId)}
              disabled={order.status === "DELIVERED"}
            >
              {order.status === "PENDING" ? "Mark as Delivered" : "Delivered"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MerchantOrders;
