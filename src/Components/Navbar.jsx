import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/userNavbar.css";
import 'remixicon/fonts/remixicon.css';

const Navbar = () => {
  const navigate = useNavigate();
  let loc = useLocation();
  let path = loc.pathname;
  let isMerchant = path.startsWith("/merchant");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  const handleMerchantOrders = () => {
    navigate("/merchant/getallorders");
  };

  return (
    <nav className="nav-bar">
      <ul className="left">
        <li>
          <NavLink to={isMerchant ? "/merchant/" : "/user/"}>
            <i className="ri-store-3-line"></i> E-Shop
          </NavLink>
        </li>
      </ul>

      <ul className="right">
        {isMerchant ? (
          <>
            <li><NavLink to="/merchant/products"><i className="ri-file-paper-line"></i> Products</NavLink></li>
            <li><NavLink to="/merchant/getallorders" ><i className="ri-instance-line"></i> Orders</NavLink></li>
            <li><NavLink to="/merchant/analytics"><i className="ri-bar-chart-grouped-line"></i> Analytics</NavLink></li>
            <li><NavLink to="/merchant/profile"><i className="ri-account-circle-line"></i> Profile</NavLink></li>
          </>
        ) : (
          <>
            <li><NavLink to="/user/cart"><i className="ri-shopping-cart-fill"></i> Cart</NavLink></li>
            <li><NavLink to="/user/orders"><i className="ri-instance-line"></i> Orders</NavLink></li>
            <li><NavLink to="/user/profile"><i className="ri-account-circle-line"></i> Profile</NavLink></li>
          </>
        )}
        <li><NavLink to="/" onClick={handleLogout}><i className="ri-logout-box-line"></i> Logout</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;