import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Services/helper';

// Fetch orders by merchant ID
export const fetchOrdersByMerchant = async (merchantId) => {
  const response = await axios.get(`${BASE_URL}/order/merchant/${merchantId}`);
  return response.data;
};

// Update order status to delivered
export const updateOrderStatus = async (orderId, newStatus) => {
    const statusPayload = {
      status: newStatus // Adjust this according to your OrderStatus definition
    };
  
    const response = await axios.put(`${BASE_URL}/order/merchant/setstatus/${orderId}`, statusPayload, {
      headers: {
        'Content-Type': 'application/json', // Ensure the correct content type is set
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
    <div style={styles.container}>
      <h2 style={styles.heading}>Orders</h2>
      <div style={styles.orderList}>
        {orders.map((order) => (
          <div key={order.orderId} style={styles.orderCard}>
            <div style={styles.orderDetails}>
              <div style={styles.orderInfo}>
                <h3>Order ID: {order.orderId}</h3>
                <p>Status: <span style={order.status === "DELIVERED" ? styles.deliveredStatus : styles.pendingStatus}>{order.status}</span></p>
                <p>Total Amount Paid: <span style={styles.price}>${order.totalPrice.toFixed(2)}</span></p>
              </div>
              <div style={styles.productList}>
                {order.products.map((product) => (
                  <div key={product.productId} style={styles.productCard}>
                    <img src={product.file} alt={product.productName} style={styles.productImage} />
                    <div style={styles.productInfo}>
                      <h4>{product.productName}</h4>
                      <p>Price: <span style={styles.price}>${product.price}</span></p>
                      <p>Quantity: {product.quantity}</p>
                      <p>Category: {product.category}</p>
                      <p style={styles.description}>Description: {product.description}</p>
                      <p>Rating: {product.rating} / {product.totalRating}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              style={order.status === "PENDING" ? styles.pendingButton : styles.deliveredButton}
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

// Improved inline CSS styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: 'auto',
    backgroundColor: '#f1f1f1',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  orderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  orderCard: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px', // Reduced padding
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  orderDetails: {
    display: 'flex',
    width: '100%',
  },
  orderInfo: {
    flex: '1',
    marginRight: '15px', // Reduced margin
  },
  productList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  productCard: {
    display: 'flex',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    transition: 'transform 0.2s',
    padding: '10px', // Added padding for product card
    minHeight: '120px', // Increased height for product description
  },
  productImage: {
    width: '80px', // Adjusted image size
    height: '80px', // Adjusted image size
    objectFit: 'cover',
  },
  productInfo: {
    padding: '10px',
    flex: '1',
  },
  deliveredStatus: {
    color: '#28a745',
  },
  pendingStatus: {
    color: '#ffc107',
  },
  price: {
    fontWeight: 'bold',
  },
  description: {
    maxHeight: '50px', // Limit description height
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  pendingButton: {
    height:'20%',
    padding: '6px 12px', // Reduced button padding
    marginTop: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#ffc107',
    color: '#fff',
    transition: 'background-color 0.3s',
  },
  deliveredButton: {
    height:'20%',
    padding: '6px 12px', // Reduced button padding
    marginTop: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#28a745',
    color: '#fff',
    transition: 'background-color 0.3s',
  },
};

export default MerchantOrders;
