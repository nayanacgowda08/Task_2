import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Services/helper';

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

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const ordersStyle = {
    flex: 2,
    marginRight: '20px',
    maxHeight: 'calc(100vh - 60px)', 
    overflowY: 'auto', 
  };

  const summaryStyle = {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    height: 'fit-content', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', 
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  };

  const orderListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const orderCardStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  };

  const orderDetailsStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const orderInfoStyle = {
    marginBottom: '10px',
  };

  const productListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '10px',
  };

  const productCardStyle = {
    display: 'flex',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  };

  const productImageStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '5px',
    marginRight: '10px',
  };

  const productInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const buttonStyle = (status) => ({
    padding: '10px 15px',
    backgroundColor: status === "PENDING" ? '#007bff' : '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s',
    opacity: status === "DELIVERED" ? 0.6 : 1,
    pointerEvents: status === "DELIVERED" ? 'none' : 'auto',
  });

  const incomeSummaryStyle = {
    padding: '15px',
    backgroundColor: '#f1f1f1',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '10px', 
  };

  return (
    <div style={containerStyle}>
      <div style={ordersStyle}>
        <h2 style={headingStyle}>Orders</h2>
        <div style={orderListStyle}>
          {orders.map((order) => (
            <div key={order.orderId} style={orderCardStyle}>
              <div style={orderDetailsStyle}>
                <div style={orderInfoStyle}>
                  <h3>Order ID: {order.orderId}</h3>
                  <p>Status: <span style={{ color: order.status === "DELIVERED" ? "green" : "orange" }}>{order.status}</span></p>
                  <p>Total Amount Paid: <span style={{ fontWeight: 'bold' }}>₹{order.totalPrice.toFixed(2)}</span></p>
                </div>
                <div style={productListStyle}>
                  {order.products.map((product) => (
                    <div key={product.productId} style={productCardStyle}>
                      <img src={product.file} alt={product.productName} style={productImageStyle} />
                      <div style={productInfoStyle}>
                        <h4>{product.productName}</h4>
                        <p>Price: <span style={{ fontWeight: 'bold' }}>₹{product.price}</span></p>
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
                style={buttonStyle(order.status)}
                onClick={() => handleStatusChange(order.orderId)}
              >
                {order.status === "PENDING" ? "Mark as Delivered" : "Delivered"}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div style={summaryStyle}>
        <h2 style={headingStyle}>Income Summary</h2>
        <div style={incomeSummaryStyle}>
          {/* Example Income Summary */}
          <p>Total Income: <strong>₹{orders.reduce((total, order) => total + order.totalPrice, 0).toFixed(2)}</strong></p>
          <p>Total Orders: <strong>{orders.length}</strong></p>
          <p>Pending Orders: <strong>{orders.filter(order => order.status === "PENDING").length}</strong></p>
          <p>Delivered Orders: <strong>{orders.filter(order => order.status === "DELIVERED").length}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default MerchantOrders;
