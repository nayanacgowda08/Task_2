import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Services/helper';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [ratings, setRatings] = useState({});
  const [userInfo, setUserInfo] = useState({ name: '', email: '', accountCreated: '', lastOrder: '' });
  const userId = localStorage.getItem('userId');
  const apiUrl = `${BASE_URL}/order/user/${userId}`;
  const userDetailsUrl = `${BASE_URL}/users/userdetails/${userId}`;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(apiUrl);
        setOrders(response.data);
        console.log("Orders fetched:", response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(userDetailsUrl);
        setUserInfo({
          name: response.data.name,
          email: response.data.email,
          accountCreated: response.data.accountCreated, // Assuming this field exists
          lastOrder: response.data.lastOrder, // Assuming this field exists
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchOrders();
    fetchUserInfo();
  }, [apiUrl, userDetailsUrl]);

  const handleStarClick = async (productId, ratingValue) => {
    console.log(productId);
    try {
      await axios.post(`${BASE_URL}/user/setrating/${productId}`, null, {
        params: { rating: ratingValue },
      });
      setRatings({ ...ratings, [productId]: ratingValue });
    } catch (error) {
      console.error('Error rating order:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ display: 'flex', padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      {/* Left Side: Orders List */}
      <div style={{ flex: 3, overflowY: 'auto', paddingRight: '20px' }}>
        <h1 style={{ fontSize: '28px', textAlign: 'center', marginBottom: '20px' }}>My Orders</h1>

        {orders.length > 0 ? (
           orders.slice().reverse().map((order) => (
            <div
              key={order.orderId}
              style={{
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '20px', margin: 0 }}>Order #{order.orderId}</h2>
                <span
                  style={{
                    padding: '5px 10px',
                    borderRadius: '5px',
                    backgroundColor: order.status === 'PENDING' ? '#FFCC80' : '#A5D6A7',
                    color: '#333',
                    fontSize: '0.9em',
                    fontWeight: 'bold',
                  }}
                >
                  {order.status}
                </span>
              </div>
              <p style={{ color: '#777', fontSize: '0.9em', marginBottom: '10px' }}>{formatDate(order.orderDate)}</p>

              {order.products.map((product) => (
                <div key={product.productId} style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
                  <img
                    src={product.file}
                    alt={product.productName}
                    style={{ width: '60px', height: '60px', borderRadius: '5px', marginRight: '15px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, fontSize: '18px' }}>{product.productName}</h3>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9em' }}>{product.category}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>₹{product.price}</p>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.8em' }}>{product.description}</p>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.8em' }}>Rating: {product.rating} ({product.totalRating} total ratings)</p>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85em', color: '#777' }}>Qty: {product.quantity}</p>
                </div>
              ))}

              <div style={{ marginTop: '10px', borderTop: '1px solid #E0E0E0', paddingTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em' }}>
                  <span>Subtotal</span>
                  <span>₹{order.totalPrice}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em' }}>
                  <span>Discount</span>
                  <span>-₹{order.discount || 0}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em' }}>
                  <span>Shipping</span>
                  <span>₹{order.shipping || 50}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '0.95em' }}>
                  <span>Total</span>
                  <span>₹{(order.totalPrice - (order.discount || 0) + (order.shipping || 50)).toFixed(2)}</span>
                </div>
              </div>

              {order.status === 'DELIVERED' && (
                <div style={{ marginTop: '10px' }}>
                  <p style={{ fontSize: '0.9em', marginBottom: '5px' }}>Rate this Product:</p>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    {order.products.map((product) => (
                      <div key={product.productId} style={{ textAlign: 'center' }}>
                        <p style={{ margin: '0', fontSize: '0.85em' }}>{product.productName}:</p>
                        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              onClick={() => handleStarClick(product.productId, star)}
                              style={{
                                cursor: 'pointer',
                                color: star <= (ratings[product.productId] || 0) ? 'gold' : 'gray',
                                fontSize: '20px',
                              }}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#666' }}>No orders found</p>
        )}
      </div>

      {/* Right Side: Customer Information */}
      <div
        style={{
          flex: 1,
          border: '1px solid #E0E0E0',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#F9F9F9',
          marginLeft: '20px',
          maxHeight: '50vh',
          overflowY: 'auto',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '15px', textAlign: 'center' }}>Customer Information</h2>
        <div style={{ marginBottom: '15px' }}>
          <strong>Name:</strong> {userInfo.name || 'Loading...'}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <strong>Email:</strong> {userInfo.email || 'Loading...'}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <strong>Total Orders:</strong> {orders.length}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <strong>Total Spend:</strong> ₹
          {orders.reduce((total, order) => {
            const orderTotal = order.totalPrice ? parseFloat(order.totalPrice) : 0;
            return total + orderTotal - (order.discount || 0) + (order.shipping || 50);
          }, 0).toFixed(2)}
        </div>
        <h3 style={{ fontSize: '20px', margin: '20px 0 10px', textAlign: 'center' }}>Recent Activity</h3>
        <ul style={{ listStyleType: 'none', padding: 0, fontSize: '0.9em', color: '#555' }}>
          {orders.slice(0, 3).map((order) => (
            <li key={order.orderId} style={{ marginBottom: '10px' }}>
              Order#{order.orderId} - {order.status} on {formatDate(order.orderDate)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Orders;
