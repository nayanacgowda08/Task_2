// UserHome.js
import React, { useEffect, useState } from 'react';
import Banner from '../Banner';
import Products_Display from '../Products_Display';
import { useNavigate } from 'react-router-dom';
import Categories from './Categories';

const UserHome = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/');
    }
  }, [navigate]);

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <>
      <Banner />
      <br />
      <Categories onSelectCategory={handleSelectCategory} />
      <br />
      <Products_Display selectedCategory={selectedCategory} /> {/* Pass selected category */}
    </>
  );
};

export default UserHome;
