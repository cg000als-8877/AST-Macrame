import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { StoreConfigProvider } from './context/StoreConfigContext';
import { CartWishlistProvider, useCartWishlist } from './context/CartWishlistContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import WishlistDrawer from './components/WishlistDrawer';
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
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ThemeSwitcher from './components/ThemeSwitcher';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
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
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        
        {/* Dedicated Sample Order Page (Supports all aliases) */}
        <Route path="/sample-order" element={<PageWrapper><SampleOrder /></PageWrapper>} />
        <Route path="/sample" element={<PageWrapper><SampleOrder /></PageWrapper>} />
        <Route path="/samples" element={<PageWrapper><SampleOrder /></PageWrapper>} />
        <Route path="/sample-production" element={<PageWrapper><SampleOrder /></PageWrapper>} />
        <Route path="/product" element={<PageWrapper><SampleOrder /></PageWrapper>} />

        {/* Dedicated Wholesale & B2B Portal */}
        <Route path="/sample-wholesale" element={<PageWrapper><SampleWholesale /></PageWrapper>} />
        <Route path="/wholesale" element={<PageWrapper><SampleWholesale /></PageWrapper>} />
        <Route path="/production" element={<PageWrapper><SampleWholesale /></PageWrapper>} />
        <Route path="/b2b" element={<PageWrapper><SampleWholesale /></PageWrapper>} />

        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/retail" element={<PageWrapper><RetailPage /></PageWrapper>} />
        <Route path="/faq" element={<PageWrapper><FAQ /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />
        <Route path="/privacy" element={<PageWrapper><Privacy /></PageWrapper>} />
        <Route path="/refund" element={<PageWrapper><Refund /></PageWrapper>} />
        
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
    </AnimatePresence>
  );
};

const AppLayout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col bg-cream text-soft-black font-sans selection:bg-terracotta selection:text-cream">
      {!isAdmin && <Navbar />}
      <main>
        <AnimatedRoutes />
      </main>
      {!isAdmin && <BottomNav />}
      {!isAdmin && <Footer />}
      {!isAdmin && <ThemeSwitcher />}
      
      {/* Sample Cart and Wishlist Drawers (Excluded on Admin) */}
      {!isAdmin && (
        <>
          <WishlistDrawer />
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

