import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { CartProvider } from "./CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Admin from "./pages/Admin";
import AIRecommend from "./pages/AIRecommend";
import ProductDetail from "./pages/ProductDetail";
import "./App.css";

function VelaButton() {
  const navigate = useNavigate();
  return (
    <>
      <img
       src="https://images.unsplash.com/photo-1740103358984-fb329680f996?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="vela-float"
        onClick={() => navigate("/ai")}
        alt="VELA AI"
        title="Chat with VELA"
      />
      <div className="vela-label">Hi I'M VELA ✨</div>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/ai" element={<AIRecommend />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
        <VelaButton />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;