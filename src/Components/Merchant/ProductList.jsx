import { useEffect, useState } from "react";
import axios from "axios"; 
import "../../assets/styles/listProduct.css";
import { BASE_URL } from "../../Services/helper";

const ProductList = ({ setView, setEditProductId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const merchantId= localStorage.getItem("userId");
        const response = await axios.get(`${BASE_URL}/user/${merchantId}/products`);
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

  // const handleDelete = (productId) => {
  //   // Delete product logic
  //   setProducts(products.filter((product) => product.id !== productId));
  // };

  const handleDelete = async(productId) => {
    // Delete product logic
    setProducts(products.filter((product) => product.id !== productId));
    try {
      const response = await axios.delete(`${BASE_URL}/user/delete/${productId}`);
      console.log("Product deleted successfully:", response.data);
    } catch (error) {
    
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditProductId(product); // Now passing full product details
    setView("editProduct");
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
                   onClick={() => handleEdit(product)} 
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
