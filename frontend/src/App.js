import React, { useState, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import WaitlistBanner from "./components/WaitlistBanner";
import ProductCategories from "./components/ProductCategories";
import Features from "./components/Features";
import Reviews from "./components/Reviews";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import EmailPopup from "./components/EmailPopup";
import GiveawayPopup from "./components/GiveawayPopup";
import AnnouncementBar from "./components/AnnouncementBar";
import ScrollToTop from "./components/ScrollToTop";
import { PaymentMethods } from "./components/TrustBadges";
import { Toaster } from "./components/ui/sonner";

// Lazy load pages
const Products = lazy(() => import("./pages/Products"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

// Loading fallback
const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-spinner"></div>
  </div>
);

// Home component with unified popup system
const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleEarlyAccessClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="landing-page">
      <Header />
      <main className="landing-content">
        <Hero onEarlyAccessClick={handleEarlyAccessClick} />
        <WaitlistBanner onClick={handleEarlyAccessClick} />
        <ProductCategories />
        <TrustBar />
        <AnnouncementBar />
        <Features />
        <Reviews />
        <PaymentMethods />
        <Newsletter onJoinClick={handleEarlyAccessClick} />
      </main>
      <Footer />
      <GiveawayPopup />
      {showPopup && (
        <EmailPopup isOpen={showPopup} onClose={handlePopupClose} />
      )}
    </div>
  );
};

// Router wrapper
const AppRouter = () => {
  const location = useLocation();
  
  if (location.hash?.includes('session_id=')) {
    return <div>Processing authentication...</div>;
  }
  
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<><Header /><Products /><Footer /></>} />
          <Route path="/cart" element={<><Header /><Cart /><Footer /></>} />
          <Route path="/login" element={<><Header /><Login /><Footer /></>} />
          <Route path="/register" element={<><Header /><Register /><Footer /></>} />
          <Route path="/wishlist" element={<><Header /><div className="info-page"><div className="info-container"><h1 className="info-title">Wishlist</h1><p className="info-subtitle">Your saved items will appear here.</p></div></div><Footer /></>} />
          <Route path="/size-guide" element={<><Header /><div className="info-page"><div className="info-container"><h1 className="info-title">Size Guide</h1><p className="info-subtitle">Find your perfect fit.</p></div></div><Footer /></>} />
          <Route path="/faq" element={<><Header /><div className="info-page"><div className="info-container"><h1 className="info-title">FAQ</h1><p className="info-subtitle">Frequently asked questions.</p></div></div><Footer /></>} />
          <Route path="/about" element={<><Header /><div className="info-page"><div className="info-container"><h1 className="info-title">About RAZE</h1><p className="info-subtitle">Built by discipline.</p></div></div><Footer /></>} />
          <Route path="/returns" element={<><Header /><div className="info-page"><div className="info-container"><h1 className="info-title">Shipping & Returns</h1><p className="info-subtitle">Our policies.</p></div></div><Footer /></>} />
          <Route path="/track" element={<><Header /><div className="info-page"><div className="info-container"><h1 className="info-title">Track Order</h1><p className="info-subtitle">Enter your order number.</p></div></div><Footer /></>} />
        </Routes>
      </Suspense>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="App">
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
            <Toaster />
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
