import React from 'react';

const Orders = () => {
  const orders = [
    {
      orderId: 1,
      products: [
        {
          productId: 1,
          productName: "Iphone",
          price: 10.0,
          quantity: 1,
          file: "http://res.cloudinary.com/dzsm5ypo2/image/upload/v1729704269/oi5rvku2tmomvcwbx7ml.jpg",
          description: "desc",
          category: "Electronics",
          status: "Pending"
        },
        {
          productId: 2,
          productName: "samsung",
          price: 20.0,
          quantity: 1,
          file: "http://res.cloudinary.com/dzsm5ypo2/image/upload/v1729704306/azqzonwfwv4soysdlkvr.jpg",
          description: "desc",
          category: "Clothes",
          status: "Delivered"
        }
      ],
      totalPrice: 30.0,
    }
  ];

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
            {orders.map((order) => (
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
                  <td>{order.products[0].status}</td>
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
                    <td>{product.status}</td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
