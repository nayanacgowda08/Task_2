import { NavLink } from "react-router-dom";
import "../../assets/styles/userNavbar.css"

const UserNavbar = () => {
  return (
    <nav>
      <ul>
        <li><NavLink className="no-active" to="/user/">Home</NavLink></li>
        <li><NavLink to="/user/categories">Categories</NavLink></li>
        <li><NavLink to="/user/cart">Cart</NavLink></li>
        <li><NavLink to="/user/orders">Orders</NavLink></li>
        <li><NavLink to="/user/favorites">Favorites</NavLink></li>
        <li><NavLink to="/user/profile">Profile</NavLink></li>
        <li><NavLink to="/logout">Logout</NavLink></li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
