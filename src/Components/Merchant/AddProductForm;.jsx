import React, { useState } from "react";
import "../../assets/styles/addProduct.css";

const AddProductForm = ({ setView }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [usp, setUsp] = useState("");

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const merchantId = localStorage.getItem("userId");
    const formData = new FormData();

  
    formData.append("image", image); 
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("usp", usp);
    formData.append("description", description);
    formData.append("category", category);

    try {
      const response = await fetch(`http://localhost:8082/api/service/merchant/${merchantId}/upld`, {
        method: 'POST',
        body: formData, 
        headers: {
          
        },
      });

      if (!response.ok) {
        throw new Error('Failed to upload product');
      }
      setView("productList");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="add-product-container">
      <button className="back-btn" onClick={() => setView("productList")}>
        &larr; Back
      </button>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <h2>Add New Product</h2>
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
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
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

        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
