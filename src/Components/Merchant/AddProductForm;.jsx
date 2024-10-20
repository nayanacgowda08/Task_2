import React, { useState } from "react";
import "../../assets/styles/addProduct.css";

const AddProductForm = ({ setView }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name: productName,
      price: price,
      stock: stock,
      image: URL.createObjectURL(image),
    };
    console.log("Product Added:", newProduct);
    setView("productList");
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
