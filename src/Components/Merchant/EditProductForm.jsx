import React, { useState } from "react";
import "../../assets/styles/editProduct.css";

const EditProductForm = ({ setView, product }) => {
  const [productName, setProductName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      name: productName,
      price: price,
      stock: stock,
      image: image ? URL.createObjectURL(image) : product.image,
    };
    console.log("Product Updated:", updatedProduct);
    setView("productList");
  };

  return (
    <div className="edit-product-container">
      {/* Back Button */}
      <button className="back-btn" onClick={() => setView("productList")}>
        &larr; Back
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

        {image ? (
          <div className="image-preview">
            <img src={URL.createObjectURL(image)} alt="Product Preview" />
          </div>
        ) : (
          <div className="image-preview">
            <img src={product.image} alt="Current Product" />
          </div>
        )}

        <button type="submit" className="submit-btn">Update Product</button>
      </form>
    </div>
  );
};

export default EditProductForm;
