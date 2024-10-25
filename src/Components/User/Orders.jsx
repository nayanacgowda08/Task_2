import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Services/helper';
import "../../assets/styles/orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem('userId'); 
  const apiUrl = `${BASE_URL}/order/user/${userId}`;

  useEffect(() => {
    
    const fetchOrders = async () => {
      try {
        const response = await axios.get(apiUrl);
        setOrders(response.data); 
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders(); 
    
  }, [apiUrl]);

  return (
    <div className="orders-page">
      <h3 style={{ textAlign: 'center', margin: '20px' }}>My Orders</h3>

      
      <div className="orders-content">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.orderId}>
              
              
              <div className="order-id" style={{ marginBottom: '10px' }}>
                <strong>Order ID:</strong> {order.orderId}
              </div>
              
              <div className="order-card">
               
                {order.products.map((product) => (
                  <div className="order-details" key={product.productId}>
                    <img
                      className="product-image"
                      src={product.file}
                      alt={product.productName}
                    />
                    <div className="product-info">
                    
                      <div className="left-info">
                        <h4>{product.productName}</h4>
                        <h5>{product.category}</h5>
                      </div>

                    
                      <div className="middle-info">
                        ₹{""}{product.price}
                      </div>

                    
                      <div
                        className="right-info"
                        style={{
                          color: order.status === 'PENDING' ? 'orange' : 'green',
                        }}
                      >
                        {order.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
