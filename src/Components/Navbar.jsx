import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../assets/styles/userNavbar.css";
import 'remixicon/fonts/remixicon.css';

const Navbar = () => {
  let loc = useLocation();
  let path = loc.pathname;
  
  let isMerchant = path.startsWith("/merchant");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <nav className="nav-bar">
      <ul className="left">
        <li><NavLink to={isMerchant ? "/merchant/" : "/user/"}>
        <i class="ri-store-3-line"></i>{" "}
        E-Shop</NavLink></li>
      </ul>

      <ul className="right">
        {isMerchant ? (
          <>
            <li><NavLink to="/merchant/products">Products</NavLink></li>
            <li><NavLink to="/merchant/orders">Orders</NavLink></li>
            <li><NavLink to="/merchant/analytics">Analytics</NavLink></li>
            <li><NavLink to="/merchant/profile">Profile</NavLink></li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/user/cart">
                <i className="ri-shopping-cart-fill" 
                // style={{ fontSize: '24px', color: '#3498db' }}
                >
                  </i> Cart
              </NavLink>
            </li>
            <li>
              <NavLink to="/user/orders">
                {/* <i className="ri-package-2-fill" style={{ fontSize: '24px', color: '#3498db', marginRight: '10px' }}></i>  */}
                <i class="ri-instance-line"></i>{" "}
                Orders
              </NavLink>
            </li>
            <li><NavLink to="/user/profile">
            <i class="ri-account-circle-line"></i>{" "}
            Profile</NavLink></li>
          </>
        )}
        <li><NavLink to="/" onClick={handleLogout}>
        <i class="ri-logout-box-line"></i>{" "}
        Logout</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
