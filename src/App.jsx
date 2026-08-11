import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Product from './pages/Product';
import Manufacturing from './pages/Manufacturing';
import About from './pages/About';
import SampleWholesale from './pages/SampleWholesale';
import Contact from './pages/Contact';
import RetailPage from './pages/RetailPage';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';
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

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/product" element={<PageWrapper><Product /></PageWrapper>} />
        <Route path="/manufacturing" element={<PageWrapper><Manufacturing /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/sample-wholesale" element={<PageWrapper><SampleWholesale /></PageWrapper>} />
        <Route path="/retail" element={<PageWrapper><RetailPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />
        <Route path="/privacy" element={<PageWrapper><Privacy /></PageWrapper>} />
        <Route path="/refund" element={<PageWrapper><Refund /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col bg-cream text-soft-black font-sans selection:bg-terracotta selection:text-cream">
        <Navbar />
        
        <main>
          <AnimatedRoutes />
        </main>
        
        <Footer />
        <ThemeSwitcher />
      </div>
    </Router>
  );
}

export default App;
