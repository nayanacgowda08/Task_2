// Products_Display.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Product_Card from './Product_Card';
import "../assets/styles/productLists.css"

const Products_Display = () => {
  const [products, setProducts] = useState([]); // State to store products

  const fetchApi = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data); 
      console.log(data);
      
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchApi(); // Fetch products when component mounts
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => {
        const { id, category, description, image, price, title } = product;
        return (
          <Product_Card
            key={id} // Add a key prop for each card
            id={id}
            category={category}
            description={description}
            image={image}
            price={price}
            title={title}
          />
        );
      })}
    </div>
  );
};

export default Products_Display;
