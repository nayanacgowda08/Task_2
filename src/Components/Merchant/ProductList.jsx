import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Services/helper";

const ProductList = ({ setView, setEditProductId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const merchantId = localStorage.getItem("userId");
        const response = await axios.get(`${BASE_URL}/user/${merchantId}/products`);
        const apiProducts = response.data;
        console.log(apiProducts);

        const mappedProducts = apiProducts.map((product) => ({
          id: product.id,
          name: product.name,
          stock: product.stock,
          price: product.price,
          image: product.file || 'default-image-url.jpg',
          description: product.description,
          category:product.category
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
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '20px auto', backgroundColor: 'white' }}>
      <h2 style={{ color: '#2c3e50', textAlign: 'center', marginBottom: '30px', fontSize: '1.8rem' }}>
        My Products
      </h2>
      <button
        style={{
          backgroundColor: '#3498db', color: 'white', padding: '12px 20px', border: 'none',
          borderRadius: '5px', cursor: 'pointer', display: 'block', margin: '0 auto 30px',
          fontSize: '1rem', fontWeight: 'bold', transition: 'background-color 0.3s, transform 0.2s'
        }}
        onClick={() => setView("addProduct")}
      >
        + Add Product
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{
            border: '1px solid #ddd', borderRadius: '10px', padding: '15px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s', backgroundColor: '#fff'
          }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ textAlign: 'center' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'contain', 
                  borderRadius: '5px'
                }}
              />
              <h3 style={{ margin: '10px 0', fontSize: '1.3rem', color: '#333' }}>{product.name}</h3>
              <p style={{ fontSize: '1rem' }}>Price: ₹{product.price}</p>
              {product.stock > 0 ? (
                <p style={{ color: '#27ae60', fontWeight: 'bold' }}>In Stock: {product.stock}</p>
              ) : (
                <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>Out of Stock</p>
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <button
                style={{
                  backgroundColor: '#f39c12', color: 'white', padding: '8px 10px',
                  border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s'
                }}
                onClick={() => handleEdit(product)}
              >
                Edit
              </button>
              <button
                style={{
                  backgroundColor: '#e74c3c', color: 'white', padding: '8px 10px',
                  border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s'
                }}
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
