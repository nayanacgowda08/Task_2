import React, { useState, useEffect } from "react";
import "../../assets/styles/addProduct.css";
import { BASE_URL } from "../../Services/helper";

const AddProductForm = ({ setView }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [usp, setUsp] = useState("");
  const [loading, setLoading] = useState(false); 
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/categories/all`);
        const data = await response.json();
        setCategories(data); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(""); 

  
    if (price < 0) {
      setError("Price should be greater than or equal to 0");
      setLoading(false);
      return;
    }

    if (stock <= 0) {
      setError("Stock should be greater than 0");
      setLoading(false);
      return;
    }

    const merchantId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("usp", usp);
    formData.append("description", description);
    formData.append("categoryId", category);

    try {
      const response = await fetch(`http://localhost:8082/api/service/merchant/${merchantId}/upld`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload product');
      }

      setView("productList");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="add-product-container">
      <button className="back-btn" onClick={() => setView("productList")}>
        &larr; Back
      </button>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <h2>Add New Product</h2>
        {error && <p className="error-message">{error}</p>} 

        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Category: </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>USP: </label>
          <input
            type="text"
            value={usp}
            onChange={(e) => setUsp(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Product Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} required />
        </div>

        {image && (
          <div className="image-preview">
            <img src={URL.createObjectURL(image)} alt="Product Preview" />
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Uploading..." : "Add Product"}
        </button>

        {loading && (
          <div className="spinner">
            <div className="loader"></div> 
            <p>Uploading your product...</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddProductForm;
