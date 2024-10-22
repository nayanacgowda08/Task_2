import  { useState } from "react";
import AddProductForm from "./AddProductForm;";
import EditProductForm from "./EditProductForm";
import ProductList from "./ProductList"
import MerchantNavbar from "./MerchantNavbar"
import "../../assets/styles/MerchantPage.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
            // product={{ id: editProductId, name: "Sample Product", price: 1000, stock: 5, image: "" }}
            product={editProductId}
          />
        );
      case "productList":
      default:
        return <ProductList setView={setView} setEditProductId={setEditProductId} />;
    }
  };

  return (
    <div>
      <MerchantNavbar />
      {renderView()}
    </div>
  );
};

export default MerchantPage;
