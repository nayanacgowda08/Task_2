// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./Components/RegisterPage";
import UserPage from "./Components/User/UserPage";
import MerchantPage from "./Components/Merchant/MerchantPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/merchant" element={<MerchantPage />} />
      </Routes>
    </Router>
  );
}

export default App;
