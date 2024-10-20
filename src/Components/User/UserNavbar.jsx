import { Route, Routes } from "react-router-dom";
import "../../assets/styles/userNavbar.css"
import Navbar from "../Navbar";
import UserHome from "./UserHome";
import Categories from "./Categories";

const UserNavbar = () => {
  return (
    <>
    <Navbar/>
    <Routes>

<Route element={<UserHome/>} path='/' />
<Route element={<Categories/>} path='/categories' />
{/*<Route element={<Users/>} path='/users' />
<Route element={<Cart/>} path='/cart' />
<Route element={<Contact/>} path='/contact' />
<Route element={<ReadBook/>} path='/readbook/:id' /> */}
</Routes>
    </>
  );
};

export default UserNavbar;
