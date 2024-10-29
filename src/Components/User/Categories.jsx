import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/styles/category.css";
import { BASE_URL } from "../../Services/helper";

const Categories = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category

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
        <div className="category-name">All Categories</div>
      </div>
      {categories.map((category) => (
        <div
          className={`category-card ${selectedCategory === category.id ? "selected" : ""}`}
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
        >
          <div className="category-name">{category.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
