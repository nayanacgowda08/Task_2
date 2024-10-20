import { useEffect, useState } from "react";
import "../../assets/styles/listProduct.css"

 const ProductList = ({ setView, setEditProductId }) => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      // Fetch merchant's products 
      setProducts([
        {
          id: 1,
          name: 'IPhone 6s',
          stock: 5,
          price: 35000,
          image: 'iphone6s.jpg', 
        },
        {
          id: 2,
          name: 'Samsung Galaxy S21',
          stock: 8,
          price: 60000,
          image: 'galaxyS21.jpg',
        },
      ]);
    }, []);
  
    const handleDelete = (productId) => {
      // Delete product logic
      setProducts(products.filter((product) => product.id !== productId));
    };
  
    return (
      <div className="product-list">
        <h2>My Products</h2>
        <button className="add-product-btn" onClick={() => setView("addProduct")}>
          Add Product
        </button>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img src={product.image} alt={product.name} width="50" />
                </td>
                <td>{product.name}</td>
                <td>{product.stock}</td>
                <td>{product.price}</td>
                <td>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                  <button
                    onClick={() => {
                      setEditProductId(product.id);
                      setView("editProduct");
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  

  export default ProductList