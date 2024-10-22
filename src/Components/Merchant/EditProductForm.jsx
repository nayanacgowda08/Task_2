import React, { useEffect, useState } from "react";
import "../../assets/styles/editProduct.css";

const EditProductForm = ({ setView, product }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(""); // New state to manage preview URL

  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setImagePreview(product.image); // Initialize with the current product image URL
    }
  }, [product]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      // Create a preview URL only if a file is selected
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      name: productName,
      price: price,
      stock: stock,
      image: image ? imagePreview : product.image, // Use uploaded image preview or the current product image URL
    };

    console.log("Product Updated:", updatedProduct);
    setView("productList");
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
