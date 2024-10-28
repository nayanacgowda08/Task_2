import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/styles/category.css";
import { BASE_URL } from "../../Services/helper";

const Categories = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

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

  return (
    <div className="categories-container">
      <div className="category-card" onClick={() => onSelectCategory(null)}>
        <div className="category-name">All Categories</div>
      </div>
      {categories.map((category) => (
        <div
          className="category-card"
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
        >
          <div className="category-name">{category.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
