import  { useState } from "react";
import AddProductForm from "./AddProductForm;";
import EditProductForm from "./EditProductForm";
import ProductList from "./ProductList"
import MerchantNavbar from "./MerchantNavbar"
import "../../assets/styles/MerchantPage.css"

const MerchantPage = () => {
  const [view, setView] = useState("productList"); 
  const [editProductId, setEditProductId] = useState(null); 
  const renderView = () => {
    switch (view) {
      case "addProduct":
        return <AddProductForm setView={setView} />;
      case "editProduct":
        return (
          <EditProductForm
            setView={setView}
            product={{ id: editProductId, name: "Sample Product", price: 1000, stock: 5, image: "" }}
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
