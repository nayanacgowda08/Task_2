import { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import MerchantNavbar from "./MerchantNavbar";
// import ProductList from "./ProductList";
import AddProductForm from "./AddProductForm;";
import EditProductForm from "./EditProductForm";
// import MerchantOrders from "./MerchantOrders";
import "../../assets/styles/MerchantPage.css";
import ProductList from "./ProductList";
import MerchantOrders from "./MerchantOrders";

const MerchantPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <MerchantNavbar />
      <div className="merchant-content">
        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/edit-product" element={<EditProductForm />} />
          <Route path="/getallorders" element={<MerchantOrders />} />
          {/* Add other merchant routes here */}
        </Routes>
      </div>
    </div>
  );
};

export default MerchantPage;
