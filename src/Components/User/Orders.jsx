import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Services/helper';
import "../../assets/styles/orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [ratings, setRatings] = useState({});
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

  const handleStarClick = async (productId, ratingValue) => {
    try {
      await axios.post(`${BASE_URL}/user/setrating/${productId}`, null, {
        params: { rating: ratingValue },
      });
      setRatings({ ...ratings, [productId]: ratingValue });
    } catch (error) {
      console.error('Error rating product:', error);
    }
  };

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
                        ₹{product.price}
                      </div>
                      <div
                        className="right-info"
                        style={{
                          color: order.status === 'PENDING' ? 'orange' : 'green',
                        }}
                      >
                        
                        {order.status}
                      </div>

                     
                      {order.status === 'DELIVERED' && (
                        <div className="rating-section">
                          <p>Rate this product:</p>
                          <div className="stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                onClick={() => handleStarClick(product.productId, star)}
                                style={{
                                  cursor: 'pointer',
                                  color: star <= (ratings[product.productId] || 0) ? 'gold' : 'gray',
                                  fontSize: '24px',
                                  transition: 'color 0.3s',
                                }}
                                onMouseEnter={(e) => (e.target.style.color = 'gold')}
                                onMouseLeave={(e) => (e.target.style.color = star <= (ratings[product.productId] || 0) ? 'gold' : 'gray')}
                              >
                                ★
                              </span>
                            ))}
                            <span className="rating-value">
                              {ratings[product.productId] ? `(${ratings[product.productId]}/5)` : "(Not rated)"}
                            </span>
                          </div>
                        </div>
                      )}
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
