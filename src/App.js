import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterAsMerchant from "./pages/RegisterAsMerchant";
import RegisterAsCustomer from "./pages/RegisterAsCustomer";
import MerchantProducts from "./pages/MerchantProducts";
import ProductMerchants from "./pages/ProductMerchants";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";
import SwitchCustomer from "./pages/SwitchCustomer";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registerasmerchant" element={<RegisterAsMerchant />} />
                <Route path="/registerascustomer" element={<RegisterAsCustomer />} />
                {/* <Route path="/products" element={<Products />} /> */}
                <Route path="/merchantproducts" element={<MerchantProducts />} />
                <Route path="/productdetails/:categoryId" element={<ProductMerchants />} />
                {/* <Route path="/contact" element={<Contact />} /> */}
                {/* <Route path="/aboutus" element={<About />} /> */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/switchtomerchant" element={<SwitchCustomer />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
