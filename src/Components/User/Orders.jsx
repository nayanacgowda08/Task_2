import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId"); // Retrieve user ID from localStorage
  const apiUrl = `http://localhost:8082/api/order/user/${userId}`;

  useEffect(() => {
    // Fetch orders using Axios
    const fetchOrders = async () => {
      try {
        const response = await axios.get(apiUrl);
        setOrders(response.data); // Assuming the API returns the order data in response.data
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders(); // Call the function when the component mounts
  }, [userId]);

  return (
    <div className="orders-page">
      <h3 style={{ textAlign: "center", margin: "10px 10px" }}>My Orders</h3>

      {/* Main Content */}
      <div className="orders-content">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <>
                  {/* Display Order details (one row for the order) */}
                  <tr key={order.orderId}>
                    <td rowSpan={order.products.length}>{order.orderId}</td>
                    <td>
                      <img
                        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
                        src={order.products[0].file}
                        alt={order.products[0].productName}
                      />{' '}
                      {order.products[0].productName}
                    </td>
                    <td>{order.products[0].category}</td>
                    <td>${order.products[0].price}</td>
                    <td>{order.products[0].quantity}</td>
                    <td>{order.status}</td>
                    <td rowSpan={order.products.length}>${order.totalPrice}</td>
                  </tr>

                  {/* Display remaining products (if any) */}
                  {order.products.slice(1).map((product) => (
                    <tr key={product.productId}>
                      <td>
                        <img
                          style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
                          src={product.file}
                          alt={product.productName}
                        />{' '}
                        {product.productName}
                      </td>
                      <td>{product.category}</td>
                      <td>${product.price}</td>
                      <td>{product.quantity}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
