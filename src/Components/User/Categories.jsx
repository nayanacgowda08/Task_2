import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/styles/category.css";
import { BASE_URL } from "../../Services/helper";


const categoryImages = {
  "All Categories":"https://rukminim2.flixcart.com/fk-p-flap/128/128/image/6a99be02898b225d.jpg?q=100",
  "Mobiles & Tablets": "https://cdn.pixabay.com/photo/2016/11/29/12/30/phone-1869510_1280.jpg",
  "TVs & Appliances": "https://cdn.pixabay.com/photo/2017/08/01/13/13/tv-2565306_1280.jpg",
  "Electronics": "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/2e30d5fac47eff64.jpg?q=100",
  "Fashion": "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/46de73feaefc28cd.jpg?q=100",
  "Beauty, Food..": "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/800e00a6322c6985.jpg?q=100",
  "Home & Kitchen": "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/8538d487cd2bc8b7.jpg?q=100",
  "Furnitures": "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/e7947cc0cc4a6b7c.jpg?q=100",
  "Grocery": "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/1400d6186b839cde.jpg?q=100",
};

const Categories = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories/all`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId);
  };

  return (
    <div className="categories-container">
      <div
        className={`category-card ${selectedCategory === null ? "selected" : ""}`}
        onClick={() => handleCategoryClick(null)}
      >
        <div className="category-name">
        {/* <img src={categoryImages[category.name]} alt={category.name} className="category-image" /> */}
        <img 
          src={categoryImages["All Categories"]} 
          alt="All Categories" 
          className="category-image" 
        />
          All Categories</div>
      </div>
      {categories.map((category) => (
        <div
          className={`category-card ${selectedCategory === category.id ? "selected" : ""}`}
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
        >
          {/* Check if the category name exists in the mapping and display the image */}
          {categoryImages[category.name] && (
            <img src={categoryImages[category.name]} alt={category.name} className="category-image" />
          )}
          <div className="category-name">{category.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
