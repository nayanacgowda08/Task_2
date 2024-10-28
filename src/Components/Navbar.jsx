import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../assets/styles/userNavbar.css";
import 'remixicon/fonts/remixicon.css';

const Navbar = ({ setView }) => {
  const navigate = useNavigate();
  let loc = useLocation();
  let path = loc.pathname;
  let isMerchant = path.startsWith("/merchant");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  const handleProduct = () => {
    setView("productList");
  };

  const handleMerchantOrders = () => {
    setView("getAllOrders");
  };

  return (
    <nav className="nav-bar">
      <ul className="left">
        <li>
          <NavLink to={isMerchant ? "/merchant/" : "/user/"}>
            <motion.i
              className="ri-store-3-line"
              whileHover={{ scale: 1.3, color: "#003366" }}
              transition={{ type: "spring", stiffness: 300 }}
            ></motion.i> 
            <span>E-Shop</span>
          </NavLink>
        </li>
      </ul>

      <ul className="right">
        {isMerchant ? (
          <>
            <li>
              <NavLink to="/merchant/products" onClick={handleProduct}>
                <motion.i
                  className="ri-file-paper-line"
                  whileHover={{ scale: 1.3, color: "#003366" }}
                  transition={{ type: "spring", stiffness: 300 }}
                ></motion.i>
                <span>Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="#" onClick={handleMerchantOrders}>
                <motion.i
                  className="ri-instance-line"
                  whileHover={{ scale: 1.3, color: "#003366" }}
                  transition={{ type: "spring", stiffness: 300 }}
                ></motion.i>
                <span>Orders</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/merchant/analytics">
                <motion.i
                  className="ri-bar-chart-grouped-line"
                  whileHover={{ scale: 1.3, color: "#003366" }}
                  transition={{ type: "spring", stiffness: 300 }}
                ></motion.i>
                <span>Analytics</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/merchant/profile">
                <motion.i
                  className="ri-account-circle-line"
                  whileHover={{ scale: 1.3, color: "#003366" }}
                  transition={{ type: "spring", stiffness: 300 }}
                ></motion.i>
                <span>Profile</span>
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/user/cart">
                <motion.i
                  className="ri-shopping-cart-fill"
                  whileHover={{ scale: 1.3, color: "#003366" }}
                  transition={{ type: "spring", stiffness: 300 }}
                ></motion.i>
                <span>Cart</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/user/orders">
                <motion.i
                  className="ri-instance-line"
                  whileHover={{ scale: 1.3, color: "#003366" }}
                  transition={{ type: "spring", stiffness: 300 }}
                ></motion.i>
                <span>Orders</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/user/profile">
                <motion.i
                  className="ri-account-circle-line"
                  whileHover={{ scale: 1.3, color: "#003366" }}
                  transition={{ type: "spring", stiffness: 300 }}
                ></motion.i>
                <span>Profile</span>
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/" onClick={handleLogout}>
            <motion.i
              className="ri-logout-box-line"
              whileHover={{ scale: 1.3, color: "#871818" }}
              transition={{ type: "spring", stiffness: 300 }}
            ></motion.i>
            <span>Logout</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
