import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Search, ChevronRight, Phone } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalCartQuantity, setIsCartOpen } = useCartWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isRetailPage = location.pathname === '/retail';

  const desktopNavLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Sample Order', path: '/sample-order' },
    { name: 'Wholesale', path: '/sample-wholesale' },
    { name: 'Retail', path: '/retail' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const allDrawerLinks = [
    { name: 'Home', path: '/', badge: null },
    { name: 'Products Gallery', path: '/products', badge: 'All 5 Colors' },
    { name: 'Sample Order', path: '/sample-order', badge: 'Global Delivery' },
    { name: 'Retail (Bangladesh)', path: '/retail', badge: 'Cash on Delivery' },
    { name: 'Wholesale & OEM', path: '/sample-wholesale', badge: 'B2B Manufacturing' },
    { name: 'Our Story', path: '/about', badge: null },
    { name: 'FAQs', path: '/faq', badge: null },
    { name: 'Contact Us', path: '/contact', badge: null },
    { name: 'Terms & Conditions', path: '/terms', badge: null },
    { name: 'Privacy Policy', path: '/privacy', badge: null },
    { name: 'Refund Policy', path: '/refund', badge: null }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const navClass = `fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-300 top-0 sm:top-3 md:top-4 w-full sm:w-[95%] md:w-[92%] max-w-6xl bg-white sm:bg-cream border-b sm:border border-stone/20 sm:border-white/20 rounded-none sm:rounded-full ${
    isScrolled 
      ? 'shadow-md sm:shadow-lg bg-white sm:bg-cream/95 sm:backdrop-blur-md' 
      : 'shadow-xs sm:shadow-md bg-white sm:bg-cream/90 sm:backdrop-blur-md'
  }`;

  return (
    <>
      <header className={navClass}>
        
        {/* Retail Announcement Bar (Top on Retail page only, #131E33 Footer Blue background) */}
        {isRetailPage && (
          <div className="w-full bg-[#131E33] text-white text-[10px] sm:text-[11px] font-medium flex items-center justify-center gap-1.5 py-1.5 px-3 z-50 tracking-wider uppercase sm:rounded-t-full">
            <svg className="w-3.5 h-3.5 text-[#C3B091] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1" />
            </svg>
            <span>CASH ON DELIVERY ALL OVER BANGLADESH</span>
          </div>
        )}

        {/* 1. UNIVERSAL MOBILE TOP BAR (Burger + Logo + Search + Cart) */}
        <div className="flex sm:hidden px-2.5 sm:px-4 h-[52px] items-center justify-between gap-1.5 w-full">
          
          {/* Left: Burger Menu Button + Logo & Brand */}
          <div className="flex items-center gap-1 shrink-0">
            <button 
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 text-soft-black hover:text-terracotta active:scale-90 transition-all cursor-pointer"
              aria-label="Open Navigation Menu"
              title="Menu"
            >
              <Menu className="w-5 h-5 stroke-[2.2]" />
            </button>

            <Link to="/" className="flex items-center gap-1.5 active:scale-95 transition-transform shrink-0">
              <img 
                src="/logo_black.png" 
                alt="AST Logo" 
                className="h-6 w-auto object-contain"
              />
              <span className="font-serif font-bold text-soft-black text-[12.5px] tracking-tight whitespace-nowrap">
                AST Macramé
              </span>
            </Link>
          </div>

          {/* Center: Search Bar with Icon and Demo Placeholder */}
          <form onSubmit={handleSearchSubmit} className="flex-1 min-w-0 mx-1">
            <div className="relative w-full flex items-center bg-stone/15 hover:bg-stone/20 border border-stone/20 rounded-full px-2.5 py-1.5 text-xs transition-colors">
              <Search className="w-3.5 h-3.5 text-dark-charcoal/50 shrink-0 mr-1.5" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search belts..." 
                className="w-full bg-transparent text-[11px] text-soft-black placeholder:text-dark-charcoal/50 focus:outline-none truncate" 
                aria-label="Search belts"
              />
            </div>
          </form>

          {/* Right: Cart Button with Badge */}
          <div className="flex items-center shrink-0">
            <button 
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 text-soft-black hover:text-terracotta active:scale-90 transition-all cursor-pointer" 
              aria-label="Shopping Cart"
              title="Cart"
            >
              <ShoppingCart className="w-5 h-5 stroke-[2]" />
              {totalCartQuantity > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-terracotta text-white text-[8.5px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none shadow-xs">
                  {totalCartQuantity}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* 2. DESKTOP NAVBAR (Hidden on mobile) */}
        <div className="hidden sm:flex px-6 lg:px-8 h-12 md:h-14 items-center justify-between w-full">
          {/* Logo (Desktop) */}
          <div className="shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 active:scale-95 transition-transform duration-200">
              <img 
                src="/logo_black.png" 
                alt="AST Handmade Macramé Belts" 
                className="h-7 md:h-8 lg:h-9 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center justify-center">
            <nav className="flex items-center space-x-3 md:space-x-5 lg:space-x-7 text-soft-black">
              {desktopNavLinks.map((link, index) => {
                const isActive = location.pathname === link.path;
                return (
                  <React.Fragment key={link.name}>
                    <Link 
                      to={link.path}
                      className={`relative py-1 text-[11px] md:text-xs lg:text-[13px] font-bold tracking-wider uppercase active:scale-90 transition-colors whitespace-nowrap ${
                        isActive ? 'text-terracotta' : 'hover:text-terracotta text-soft-black/90'
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-terracotta rounded-full"></span>
                      )}
                    </Link>
                    {index < desktopNavLinks.length - 1 && (
                      <div className="w-[1px] h-3 bg-soft-black/15 shrink-0"></div>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          </div>

          {/* Right side: Contact Link + Cart Button */}
          <div className="shrink-0 flex items-center gap-3 md:gap-4">
            <Link 
              to="/contact"
              className="p-1.5 text-soft-black/80 hover:text-terracotta active:scale-90 transition-colors cursor-pointer"
              title="Contact Us"
              aria-label="Contact Us"
            >
              <Phone className="w-4.5 h-4.5 stroke-[1.8]" />
            </Link>

            <button 
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 text-soft-black hover:text-terracotta active:scale-90 transition-all cursor-pointer group"
              title="Cart"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5 stroke-[1.8] transition-transform group-hover:scale-105" />
              {totalCartQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-terracotta text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none shadow-xs">
                  {totalCartQuantity}
                </span>
              )}
            </button>
          </div>
        </div>

      </header>

      {/* 3. MOBILE SLIDE-OUT DRAWER (Contains all pages & links) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="sm:hidden fixed inset-0 z-[100] flex">
            {/* Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-soft-black/60 backdrop-blur-xs"
            />

            {/* Slide-out Menu Panel */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 240 }}
              className="relative w-[85%] max-w-sm bg-cream h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* Drawer Header */}
                <div className="p-4 border-b border-stone/20 flex items-center justify-between bg-white/50">
                  <div className="flex items-center gap-2">
                    <img 
                      src="/logo_black.png" 
                      alt="AST Logo" 
                      className="h-7 w-auto object-contain"
                    />
                    <span className="font-serif font-bold text-soft-black text-sm tracking-wide">
                      AST Macramé
                    </span>
                  </div>

                  <button 
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 text-soft-black/60 hover:text-soft-black rounded-lg hover:bg-stone/10 transition-colors cursor-pointer"
                    aria-label="Close Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links List */}
                <div className="py-2 px-3 space-y-1">
                  {allDrawerLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                          isActive 
                            ? 'bg-[#131E33] text-white shadow-xs' 
                            : 'text-soft-black/85 hover:bg-stone/10 hover:text-soft-black'
                        }`}
                      >
                        <span>{link.name}</span>
                        <div className="flex items-center gap-2">
                          {link.badge && (
                            <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                              isActive ? 'bg-white/20 text-white' : 'bg-stone/15 text-dark-charcoal/70'
                            }`}>
                              {link.badge}
                            </span>
                          )}
                          <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Footer info */}
              <div className="p-4 border-t border-stone/20 bg-white/40">
                <p className="text-[11px] text-dark-charcoal/60 text-center font-medium">
                  Premium Handmade Macramé Belts
                </p>
                <p className="text-[10px] text-dark-charcoal/40 text-center mt-1">
                  Chattogram, Bangladesh
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
