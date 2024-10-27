import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar";
import MerchantOrders from "./MerchantOrders";
import ProductList from "./ProductList";


  const MerchantNavbar = ({setView}) => {
    return (
     <>
      {/* <Navbar/> */}
      <Navbar setView={setView} /> 
      {/* <Routes>
        {/* <Route  element={<ProductList/>} path="/products" /> */}
      {/* <Route element={<MerchantOrders/>} path='/getallorders' /> */}
      {/* </Routes> */} 

     </>
    );
  };

  export default MerchantNavbar;
