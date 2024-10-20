// Products_Display.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Product_Card from './Product_Card';
import "../assets/styles/productLists.css"

const Products_Display = () => {
  const [products, setProducts] = useState([]); // State to store products

  const fetchApi = async () => {
    try {
      // const response = await fetch('https://fakestoreapi.com/products');
      const response =await fetch('http://localhost:8082/api/user/all')
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
        //const { id, category, description, image, price, title } = product;
        const {id,category,description,file,price,name}=product;
        return (
          <Product_Card
            key={id}
            id={id}
            category={category}
            description={description}
            image={file}
            price={price}
            title={name}
          />
        );
      })}
    </div>
  );
};

export default Products_Display;
