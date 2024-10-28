import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar";
import MerchantOrders from "./MerchantOrders";
import ProductList from "./ProductList";


  const MerchantNavbar = ({setView}) => {
    return (
     <>
      
      <Navbar setView={setView} /> 
     

     </>
    );
  };

  export default MerchantNavbar;
