import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles/productdetail.css";
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
        stars.push(<FaStar key={i} className="star" />);
      } else if (i - rating < 1) {
        stars.push(<FaStarHalfAlt key={i} className="star" />);
      } else {
        stars.push(<FaRegStar key={i} className="empty-star" />);
      }
    }
    return stars;
  };

  return (
    <div className="product-details-container">
      <div className="selected-product">
        <img
          src={selectedProduct.file}
          alt={selectedProduct.name}
          className="selected-product-image"
        />
        <div className="selected-product-info">
          <h2>{selectedProduct.name}</h2>
          <p>{selectedProduct.description}</p>
          <p className="price">Price: ${selectedProduct.price}</p>
          <div className="rating-container">
            <div className="star-rating">
              {renderStars(selectedProduct.productRating)}
            </div>
            <span className="rating-text">
              {selectedProduct.productRating} / 5
            </span>
            <span className="review-count">
              ({selectedProduct.ratingCount} reviews)
            </span>
          </div>

          <p className="merchant">Merchant: {selectedProduct.merchantName}</p>
          {selectedProduct.stock <= 0 ? (
            <button className="out-of-stock-button" disabled>
              Out of Stock
            </button>
          ) : (
            <button
              className="add-to-cart-button"
              onClick={inCart ? handleGoToCart : handleAddToCart}
            >
              {inCart ? "Go to Cart" : "Add to Cart"}
            </button>
          )}
        </div>
      </div>

      <div className="related-products">
        <h3>More Products</h3>
        <div className="related-products-grid">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="related-product-item"
              onClick={() => handleProductClick(relatedProduct)}
            >
              <img
                src={relatedProduct.file}
                alt={relatedProduct.name}
                className="related-product-image"
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
