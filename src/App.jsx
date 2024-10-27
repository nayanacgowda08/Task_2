import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./Components/RegisterPage";
import UserPage from "./Components/User/UserPage";
import MerchantPage from "./Components/Merchant/MerchantPage";
import Details from "./Components/details";

import ProductSuggest from "./Components/ProductSuggest";
import MerchantOrders from "./Components/Merchant/MerchantOrders";


function App() {
 


  return (
    <Router>

      <Routes>
        <Route element={<RegisterPage />}  path="/" />
        <Route  element={<UserPage />} path="/user/*" />
        <Route  element={<MerchantPage />} path="/merchant/*" />
        <Route  element={<Details/>} path="/detail/:id" />
        <Route path="/product/:id" element={<ProductSuggest />} />
        {/* <Route path="/merchant/getallorders" element={<MerchantOrders/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;