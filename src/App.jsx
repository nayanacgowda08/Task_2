// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./Components/RegisterPage";
import UserPage from "./Components/User/UserPage";
import MerchantPage from "./Components/Merchant/MerchantPage";
import Details from "./Components/details";


function App() {
 


  return (
    <Router>

      <Routes>
        <Route element={<RegisterPage />}  path="/" />
        <Route  element={<UserPage />} path="/user/*" />
        <Route  element={<MerchantPage />} path="/merchant/*" />
        <Route  element={<Details/>} path="/detail/:id" />
      </Routes>
    </Router>
  );
}

export default App;
