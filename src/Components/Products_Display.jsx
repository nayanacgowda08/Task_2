import React, { useEffect, useState } from "react";
import Product_Card from "./Product_Card";
import "../assets/styles/productLists.css";
import { BASE_URL } from "../Services/helper";

const Products_Display = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);

  const fetchApi = async () => {
    try {
      const url = selectedCategory
        ? `${BASE_URL}/user/category/${selectedCategory}`
        : `${BASE_URL}/user/all`;

      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [selectedCategory]);

  return (
    <div className="product">
      {products.map((product) => {
        const {
          productId,
          category,
          description,
          file,
          price,
          name,
          stock,
          rating,
          merchantId,
          usp,
        } = product;
        return (
          <Product_Card
            key={productId}
            id={productId}
            category={category}
            description={description}
            image={file}
            price={price}
            title={name}
            stock={stock}
            rating={rating}
            merchantId={merchantId}
            usp={usp}
          />
        );
      })}
    </div>
  );
};

export default Products_Display;
