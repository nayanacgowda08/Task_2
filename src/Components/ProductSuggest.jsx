import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Services/helper";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, allProducts } = location.state;
  const userId = localStorage.getItem("userId");

  const [selectedProduct, setSelectedProduct] = useState(product);
  const [relatedProducts, setRelatedProducts] = useState(
    allProducts.filter((p) => p.id !== product.id)
  );
  const [inCart, setInCart] = useState(false);

  const handleProductClick = (newProduct) => {
    setSelectedProduct(newProduct);
    setRelatedProducts([
      selectedProduct,
      ...relatedProducts.filter((p) => p.id !== newProduct.id),
    ]);
  };

  useEffect(() => {
    const checkProductInCart = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`${BASE_URL}/cart/${userId}`, {
          headers: { "Content-Type": "application/json" },
        });
        if (response.status === 200) {
          const cartItems = response.data.items;
          const productInCart = cartItems.some(
            (item) => item.productId === selectedProduct.id
          );
          setInCart(productInCart);
        }
      } catch (error) {
        console.error("Error checking cart:", error);
      }
    };
    checkProductInCart();
  }, [selectedProduct, userId]);

  const handleAddToCart = async () => {
    if (!userId) {
      console.error("User not logged in");
      return;
    }

    const cartItemDTO = {
      productId: selectedProduct.id,
      quantity: 1,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/cart/${userId}/add`,
        cartItemDTO,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200 || response.status === 201) {
        setInCart(true);
      } else {
        console.error("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleGoToCart = () => {
    navigate("/user/cart");
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} style={{ color: "gold" }} className="star" />);
      } else if (i - rating < 1) {
        stars.push(<FaStarHalfAlt key={i} style={{ color: "gold" }} className="star" />);
      } else {
        stars.push(<FaRegStar key={i} style={{ color: "gold" }} className="empty-star" />);
      }
    }
    return stars;
  };

  const containerStyle = {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  };

  const selectedProductCardStyle = {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "20px",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "40px"
  };

  const productImageStyle = {
    width: "300px",
    height: "300px",
    borderRadius: "8px",
    marginBottom: "20px"
  };

  const addToCartButtonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: inCart ? "#4CAF50" : "#007BFF",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "10px"
  };

  const relatedProductsSectionStyle = {
    marginTop: "20px"
  };

  const relatedProductCardStyle = {
    border: "1px solid #e0e0e0",
    borderRadius: "5px",
    padding: "10px",
    margin: "5px",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s"
  };

  const relatedProductImageStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "4px",
    marginBottom: "10px"
  };

  return (
    <div style={containerStyle}>
      {/* Selected Product Section */}
      <div style={selectedProductCardStyle}>
        <img src={selectedProduct.file} alt={selectedProduct.name} style={productImageStyle} />
        <h2 className="product-name" style={{ fontSize: "24px", marginBottom: "10px" }}>{selectedProduct.name}</h2>
        <p className="product-description" style={{ marginBottom: "10px" }}>{selectedProduct.description}</p>
        <p className="product-price" style={{ fontWeight: "bold", marginBottom: "10px" }}>Price: ₹{selectedProduct.price}</p>
        <div className="product-rating" style={{ marginBottom: "10px" }}>
          {renderStars(selectedProduct.productRating)}
          <span style={{ marginLeft: "5px" }}>({selectedProduct.ratingCount} reviews)</span>
        </div>
        <p className="product-merchant" style={{ marginBottom: "20px" }}>Merchant: {selectedProduct.merchantName}</p>
        <button
          style={addToCartButtonStyle}
          onClick={inCart ? handleGoToCart : handleAddToCart}
        >
          {inCart ? "Go to Cart" : "Add to Cart"}
        </button>
      </div>

      {/* Related Products Section */}
      <div style={relatedProductsSectionStyle}>
        <h3>More Products Like This</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              style={relatedProductCardStyle}
              onClick={() => handleProductClick(relatedProduct)}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={relatedProduct.file}
                alt={relatedProduct.name}
                style={relatedProductImageStyle}
              />
              <p className="related-product-name">{relatedProduct.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
