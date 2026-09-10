import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { StoreConfigProvider } from './context/StoreConfigContext';
import { CartWishlistProvider, useCartWishlist } from './context/CartWishlistContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Product from './pages/Product';
import SampleOrder from './pages/SampleOrder';
import About from './pages/About';
import SampleWholesale from './pages/SampleWholesale';
import Contact from './pages/Contact';
import RetailPage from './pages/RetailPage';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';
import FAQ from './pages/FAQ';
import ProductGallery from './pages/ProductGallery';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ThemeSwitcher from './components/ThemeSwitcher';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.remove('modal-open');
  }, [pathname]);
  return null;
};

const GlobalToast = () => {
  const { toastMessage } = useCartWishlist();
  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-[250] bg-soft-black/92 text-cream px-3.5 py-2 rounded-full shadow-xl flex items-center gap-2 text-xs font-medium border border-white/15 backdrop-blur-md max-w-[90vw]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AnimatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* Dedicated Sample Order Page (Supports all aliases) */}
      <Route path="/sample-order" element={<SampleOrder />} />
      <Route path="/sample" element={<SampleOrder />} />
      <Route path="/samples" element={<SampleOrder />} />
      <Route path="/sample-production" element={<SampleOrder />} />
      <Route path="/product" element={<SampleOrder />} />

      {/* Dedicated Wholesale & B2B Portal */}
      <Route path="/sample-wholesale" element={<SampleWholesale />} />
      <Route path="/wholesale" element={<SampleWholesale />} />
      <Route path="/production" element={<SampleWholesale />} />
      <Route path="/b2b" element={<SampleWholesale />} />

      <Route path="/about" element={<About />} />
      <Route path="/retail" element={<RetailPage />} />
      
      {/* Universal Product Gallery Page */}
      <Route path="/products" element={<ProductGallery />} />
      <Route path="/gallery" element={<ProductGallery />} />
      <Route path="/collection" element={<ProductGallery />} />
      <Route path="/all-products" element={<ProductGallery />} />

      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/refund" element={<Refund />} />
      
      {/* Wildcard 404 Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
      
      {/* Secure Admin Portal Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

const AppLayout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col bg-cream text-soft-black font-sans selection:bg-terracotta selection:text-cream min-h-screen">
      {!isAdmin && <Navbar />}
      <main className="flex-1">
        <AnimatedRoutes />
      </main>
      {!isAdmin && <BottomNav />}
      {!isAdmin && <Footer />}
      {!isAdmin && <ThemeSwitcher />}
      
      {/* Cart Drawer & Global Toast */}
      {!isAdmin && (
        <>
          <CartDrawer />
          <GlobalToast />
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <StoreConfigProvider>
        <CartWishlistProvider>
          <Router>
            <ScrollToTop />
            <AppLayout />
          </Router>
        </CartWishlistProvider>
      </StoreConfigProvider>
    </AuthProvider>
  );
}

export default App;

