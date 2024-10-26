
import React from 'react';
import "../../assets/styles/category.css"


const Categories = () => {
  const categories = [
    { name: "Mobiles & Tablets", image: "https://cdn.pixabay.com/photo/2016/11/29/12/30/phone-1869510_1280.jpg" },
    { name: "TVs & Appliances", image: "https://cdn.pixabay.com/photo/2017/08/01/13/13/tv-2565306_1280.jpg" },
    { name: "Electronics", image: "https://www.codrey.com/wp-content/uploads/2017/12/Consumer-Electronics-1.png" },
    { name: "Fashion", image: "https://orane.com/wp-content/uploads/2024/03/sewing-fashion-designer-constructor-work-creation-clothes-specialist-designs-closet-items-creates-drawings-patterns-technical-implementation-fashion-ideas-1568x879.jpg" },
    { name: "Beauty, Food..", image: "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/800e00a6322c6985.jpg?q=100" },
    { name: "Home & Kitchen", image: "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/8538d487cd2bc8b7.jpg?q=100" },
    { name: "Furniture", image: "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/e7947cc0cc4a6b7c.jpg?q=100" },
    // { name: "Travel", image: "path/to/travel.png" },
    { name: "Grocery", image: "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/1400d6186b839cde.jpg?q=100" }
  ];

  return (
    <div className="categories-container">
      {categories.map((category, index) => (
        <div className="category-card" key={index}>
          <img src={category.image} alt={category.name} className="category-image" />
          <div className="category-name">{category.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
