import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/styles/listProduct.css";
import { BASE_URL } from "../../Services/helper";

const ProductList = ({ setView, setEditProductId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const merchantId = localStorage.getItem("userId");
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

  const handleDelete = async (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
    try {
      const response = await axios.delete(`${BASE_URL}/user/delete/${productId}`);
      console.log("Product deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditProductId(product); 
    setView("editProduct");
  };

  return (
    <div className="product-lists">
      <h2>My Products</h2>
      <button className="add-product-btn" onClick={() => setView("addProduct")}>
       + {" "} Add Product
      </button>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card-horizontal" key={product.id}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
              <h3>{product.name}</h3>
              <div className="product-info">
                <p>Price: ₹{product.price}</p>
                {product.stock > 0 ? (
                  <p className="in-stock">In Stock: {product.stock}</p>
                ) : (
                  <p className="out-of-stock">Out of Stock</p>
                )}
              </div>
              <div className="card-buttons">
                <button
                  className="edit-btnn"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="delete-btnn"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
