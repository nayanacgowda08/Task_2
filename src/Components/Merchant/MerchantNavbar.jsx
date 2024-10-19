import { NavLink } from "react-router-dom";
import "../../assets/styles/merchantNavbar.css"


const MerchantNavbar = () => {
  return (
    <nav>
      <ul>
        <li><NavLink className="no-active" to="/merchant/">Dashboard</NavLink></li>
        <li><NavLink to="/merchant/products">Products</NavLink></li>
        <li><NavLink to="/merchant/orders">Orders</NavLink></li>
        <li><NavLink to="/merchant/analytics">Analytics</NavLink></li>
        <li><NavLink to="/merchant/profile">Profile</NavLink></li>
        <li><NavLink to="/logout">Logout</NavLink></li>
      </ul>
    </nav>
  );
};

export default MerchantNavbar;
