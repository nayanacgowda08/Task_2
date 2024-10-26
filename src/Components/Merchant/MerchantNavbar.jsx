// import "../../assets/styles/merchantNavbar.css"
import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar";
import MerchantOrders from "./MerchantOrders";


  const MerchantNavbar = () => {
    return (
     <>
      <Navbar/>
      <Routes>
      <Route element={<MerchantOrders/>} path='/getallorders' />
      </Routes>

     </>
    );
  };

  export default MerchantNavbar;