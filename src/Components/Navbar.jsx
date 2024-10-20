// eslint-disable-next-line no-unused-vars
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../assets/styles/merchantNavbar.css"; 
import "../assets/styles/userNavbar.css";
const Navbar = () => {
  let loc = useLocation();
  let path = loc.pathname;

  
  let isMerchant = path.startsWith("/merchant");

  const handleLogout=()=>{
    localStorage.removeItem("userId");
    navigate("/");
  }

  return (
    <nav>
      <ul>
        {isMerchant ? (
          <>
            <li><NavLink className="no-active" to="/merchant/">Dashboard</NavLink></li>
            <li><NavLink to="/merchant/products">Products</NavLink></li>
            <li><NavLink to="/merchant/orders">Orders</NavLink></li>
            <li><NavLink to="/merchant/analytics">Analytics</NavLink></li>
            <li><NavLink to="/merchant/profile">Profile</NavLink></li>
            <li><NavLink to="/" onClick={handleLogout}>Logout</NavLink></li>
          </>
        ) : (
          <>
            <li><NavLink className="no-active" to="/user/">Home</NavLink></li>
            <li><NavLink to="/user/categories">Categories</NavLink></li>
            <li><NavLink to="/user/cart">Cart</NavLink></li>
            <li><NavLink to="/user/orders">Orders</NavLink></li>
            <li><NavLink to="/user/favorites">Favorites</NavLink></li>
            <li><NavLink to="/user/profile">Profile</NavLink></li>
            <li><NavLink to="/" onClick={handleLogout}>Logout</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
