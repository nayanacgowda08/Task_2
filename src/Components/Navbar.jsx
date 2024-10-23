// eslint-disable-next-line no-unused-vars
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../assets/styles/merchantNavbar.css"; 
import "../assets/styles/userNavbar.css";
import 'remixicon/fonts/remixicon.css';
const Navbar = () => {
  let loc = useLocation();
  let path = loc.pathname;

  
  let isMerchant = path.startsWith("/merchant");

  const handleLogout=()=>{
    localStorage.removeItem("userId");
    navigate("/");
  }

  return (
    <nav className="nav-bar">
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
          <div className="left">
          <li></li>
          <li><NavLink className="no-active" to="/user/">E-Shop</NavLink></li>
          </div>
            {/* <li><NavLink to="/user/categories">Categories</NavLink></li> */}
         <div className="right">
         <li><NavLink to="/user/cart">  <i className="ri-shopping-cart-fill" style={{ fontSize: '24px', color: '#3498db' }}></i>{" "}Cart</NavLink></li>
            <li><NavLink to="/user/orders">   <i className="ri-package-2-fill" style={{ fontSize: '24px', color: '#3498db', marginRight: '10px' }}></i>Orders</NavLink></li>
            {/* <li><NavLink to="/user/favorites">Favorites</NavLink></li> */}
            <li><NavLink to="/user/profile">Profile</NavLink></li>
            <li><NavLink to="/" onClick={handleLogout}>Logout</NavLink></li>
         </div>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
