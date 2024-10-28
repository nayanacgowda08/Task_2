import { useState } from "react";
import AddProductForm from "./AddProductForm;";
import EditProductForm from "./EditProductForm";
import ProductList from "./ProductList"
import MerchantNavbar from "./MerchantNavbar"
import "../../assets/styles/MerchantPage.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MerchantOrders from "./MerchantOrders";

const MerchantPage = () => {
  const [view, setView] = useState("productList");
  const [editProductId, setEditProductId] = useState({});
  console.log(editProductId.name);


  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/')
    }
  })

  const renderView = () => {
    switch (view) {
      case "addProduct":
        return <AddProductForm setView={setView} />;
      case "editProduct":
        return (
          <EditProductForm
            setView={setView}
           
            product={editProductId}
          />
        );
      case "productList":
        return <ProductList setView={setView} setEditProductId={setEditProductId} />;
      case "getAllOrders":
        return <MerchantOrders />;
      default:
        return null;

    }
  };

  return (
    <div>
      <MerchantNavbar setView={setView} />
      {renderView()}
    </div>
  );
};

export default MerchantPage;