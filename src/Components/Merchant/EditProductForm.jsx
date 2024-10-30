import React, { useEffect, useState } from "react";
import "../../assets/styles/editProduct.css";
import { BASE_URL } from "../../Services/helper";

const EditProductForm = ({ setView, product }) => {
  const [productName, setProductName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(product.image);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category); 
  const [categories, setCategories] = useState([]);

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
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("description", description); 
    formData.append("categoryId", category); 

    if (image) {
      formData.append("image", image);
    }

    const productId = product.id;

    try {
      const response = await fetch(`${BASE_URL}/user/update/product/${productId}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      setView("productList");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="edit-product-container">
      <button className="back-btn" onClick={() => setView("productList")}>
        &larr; {"  "} Back
      </button>

      <form className="edit-product-form" onSubmit={handleSubmit}>
        <h2>Edit Product</h2>
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
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
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
          <label>Product Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Product Preview" />
          </div>
        )}

        <button type="submit" className="submit-btn">Update Product</button>
      </form>
    </div>
  );
};

export default EditProductForm;
