import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Services/helper';
import "../../assets/styles/merchantOrders.css"

const mockOrdersData = [
  {
    orderId: 1,
    products: [
      {
        productId: 2,
        productName: "samsung",
        price: 100.0,
        quantity: 1,
        file: "http://res.cloudinary.com/dzsm5ypo2/image/upload/v1729953376/lzm6hybrh3lcou1t6l9a.jpg",
        description: "descitp",
        category: "Electronics",
        rating: 4.3,
        totalRating: 6
      }
    ],
    totalPrice: 100.0,
    status: "DELIVERED"
  },
  {
    orderId: 2,
    products: [
      {
        productId: 4,
        productName: "ip",
        price: 20.0,
        quantity: 1,
        file: "http://res.cloudinary.com/dzsm5ypo2/image/upload/v1729955203/qiof25fndxdydfozzjym.jpg",
        description: "des",
        category: "Electronics",
        rating: 3.5,
        totalRating: 2
      }
    ],
    totalPrice: 20.0,
    status: "DELIVERED"
  },
  {
    orderId: 3,
    products: [
      {
        productId: 4,
        productName: "ip",
        price: 20.0,
        quantity: 1,
        file: "http://res.cloudinary.com/dzsm5ypo2/image/upload/v1729955203/qiof25fndxdydfozzjym.jpg",
        description: "des",
        category: "Electronics",
        rating: 3.5,
        totalRating: 2
      }
    ],
    totalPrice: 20.0,
    status: "DELIVERED"
  },
  {
    orderId: 4,
    products: [
      {
        productId: 5,
        productName: "pixel",
        price: 20.0,
        quantity: 1,
        file: "http://res.cloudinary.com/dzsm5ypo2/image/upload/v1729959920/a0majifnjzsipplueydj.png",
        description: "description",
        category: "Electronics",
        rating: 3.9,
        totalRating: 7
      }
    ],
    totalPrice: 20.0,
    status: "PENDING"
  },
  {
    orderId: 5,
    products: [
      {
        productId: 6,
        productName: "pi2",
        price: 20.0,
        quantity: 1,
        file: "http://res.cloudinary.com/dzsm5ypo2/image/upload/v1729959953/ocbrfx1edrbwa1chsjqe.png",
        description: "descr",
        category: "Clothes",
        rating: 4.0,
        totalRating: 1
      }
    ],
    totalPrice: 20.0,
    status: "PENDING"
  },
  {
    orderId: 6,
    products: [
      {
        productId: 5,
        productName: "pixel",
        price: 20.0,
        quantity: 1,
        file: "http://res.cloudinary.com/dzsm5ypo2/image/upload/v1729959920/a0majifnjzsipplueydj.png",
        description: "description",
        category: "Electronics",
        rating: 3.9,
        totalRating: 7
      },
      {
        productId: 6,
        productName: "pi2",
        price: 20.0,
        quantity: 2,
        file: "http://res.cloudinary.com/dzsm5ypo2/image/upload/v1729959953/ocbrfx1edrbwa1chsjqe.png",
        description: "descr",
        category: "Clothes",
        rating: 4.0,
        totalRating: 1
      }
    ],
    totalPrice: 60.0,
    status: "DELIVERED"
  },
  {
    orderId: 7,
    products: [
      {
        productId: 6,
        productName: "pi2",
        price: 20.0,
        quantity: 10,
        file: "http://res.cloudinary.com/dzsm5ypo2/image/upload/v1729959953/ocbrfx1edrbwa1chsjqe.png",
        description: "descr",
        category: "Clothes",
        rating: 4.0,
        totalRating: 1
      }
    ],
    totalPrice: 200.0,
    status: "PENDING"
  }
];

export const fetchOrdersByMerchant = async (merchantId) => {
  //const response = await axios.get(`${BASE_URL}/order/merchant/${merchantId}`);
  // return response.data;
  return mockOrdersData;
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
