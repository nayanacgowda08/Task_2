import { Route, Routes } from "react-router-dom";
import "../../assets/styles/userNavbar.css"
import Navbar from "../Navbar";
import UserHome from "./UserHome";
import Cart from "../Cart";
import Orders from "./Orders";

const UserNavbar = () => {
  return (
    <>
    <Navbar/>
    <Routes>

<Route element={<UserHome/>} path='/' />
<Route element={<Cart/>} path='/cart' />
<Route element={<Orders/>} path='/orders' />
{/*<Route element={<Users/>} path='/users' />
<Route element={<Contact/>} path='/contact' />
<Route element={<ReadBook/>} path='/readbook/:id' /> */}
</Routes>
    </>
  );
};

export default UserNavbar;