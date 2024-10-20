import { useEffect, useState } from "react";
import axios from "axios"; 
import "../../assets/styles/listProduct.css";

const ProductList = ({ setView, setEditProductId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const merchantId= localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:8082/api/user/${merchantId}/products`);
        const apiProducts = response.data;

        const mappedProducts = apiProducts.map((product) => ({
          id: product.id,
          name: product.name,
          stock: product.stock,
          price: product.price,
          image: product.file || 'default-image-url.jpg',
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (productId) => {
    // Delete product logic
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="product-lists">
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

export default ProductList;
