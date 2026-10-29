import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Search, ChevronRight, Phone, ArrowLeft, MessageCircle } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const { totalCartQuantity, setIsCartOpen } = useCartWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close mobile menu & expanded search on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchExpanded(false);
  }, [location.pathname]);

  // Auto-focus input when mobile search expands
  useEffect(() => {
    if (isMobileSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isMobileSearchExpanded]);

  const isRetailPage = location.pathname === '/retail';

  const desktopLeftLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Wholesale', path: '/sample-wholesale' }
  ];

  const desktopRightLinks = [
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' }
  ];

  const shopLinks = [
    { 
      name: 'Retail Store', 
      path: '/retail', 
      subtitle: 'Cash on delivery nationwide'
    },
    { 
      name: 'Products Gallery', 
      path: '/products', 
      subtitle: 'Adult, Women & Kids collections'
    },
    { 
      name: 'Sample Orders', 
      path: '/sample-order', 
      subtitle: 'Worldwide air express for brands'
    },
    { 
      name: 'Wholesale & OEM', 
      path: '/sample-wholesale', 
      subtitle: '100 pcs base MOQ · Private label'
    },
  ];

  const brandLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Story', path: '/about' },
    { name: 'FAQs', path: '/faq' },
    { name: 'Contact Support', path: '/contact' }
  ];

  const legalLinks = [
    { name: 'Terms', path: '/terms' },
    { name: 'Privacy', path: '/privacy' },
    { name: 'Refund Policy', path: '/refund' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsMobileSearchExpanded(false);
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const navClass = `fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-300 top-0 sm:top-2 md:top-2.5 w-full sm:w-[95%] md:w-[92%] max-w-6xl bg-white sm:bg-white/95 sm:backdrop-blur-md border-b sm:border border-stone/20 rounded-none sm:rounded-[4px] overflow-hidden ${
    isScrolled 
      ? 'shadow-md sm:shadow-lg' 
      : 'shadow-xs sm:shadow-md'
  }`;

  return (
    <>
      <header className={navClass}>
        
        {/* Retail Announcement Bar (Top on Retail page only, #131E33 Footer Blue background) */}
        {isRetailPage && (
          <div className="w-full bg-[#131E33] text-white text-[9.5px] sm:text-[10.5px] font-medium flex items-center justify-center gap-1.5 py-1 px-3 z-50 tracking-wider uppercase sm:rounded-t-[4px]">
            <svg className="w-3 h-3 text-[#C3B091] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1" />
            </svg>
            <span>CASH ON DELIVERY ALL OVER BANGLADESH</span>
          </div>
        )}

        {/* 1. UNIVERSAL MOBILE TOP BAR (Burger + Logo + Search + Cart / Expanded Full-Width Search) */}
        <div className="flex sm:hidden px-2.5 sm:px-4 h-[48px] items-center justify-between gap-1.5 w-full relative">
          <AnimatePresence mode="wait">
            {isMobileSearchExpanded ? (
              <motion.form
                key="expanded-search"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 w-full h-full"
              >
                <div className="relative flex-1 flex items-center bg-stone/15 border border-stone/25 focus-within:border-terracotta rounded-full px-3 py-1.5 text-xs transition-colors shadow-inner">
                  <Search className="w-4 h-4 text-terracotta shrink-0 mr-2" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search macramé belts, colors..."
                    className="w-full bg-transparent text-xs text-soft-black placeholder:text-dark-charcoal/50 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-1 text-dark-charcoal/50 hover:text-soft-black cursor-pointer shrink-0"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileSearchExpanded(false)}
                  className="text-[11px] font-bold text-terracotta uppercase tracking-wider px-1.5 py-1 active:scale-95 transition-all shrink-0 cursor-pointer"
                >
                  Cancel
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="normal-bar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-between gap-1.5 w-full h-full"
              >
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
                      className="h-5.5 w-auto object-contain"
                    />
                    <span className="font-serif font-bold text-soft-black text-[12px] tracking-tight whitespace-nowrap">
                      AST Macramé
                    </span>
                  </Link>
                </div>

                {/* Center: Search Bar with Icon and Demo Placeholder (Click to expand) */}
                <div 
                  onClick={() => setIsMobileSearchExpanded(true)}
                  className="flex-1 min-w-0 mx-1 cursor-pointer"
                >
                  <div className="relative w-full flex items-center bg-stone/15 hover:bg-stone/20 border border-stone/20 rounded-full px-2.5 py-1 text-xs transition-colors">
                    <Search className="w-3.5 h-3.5 text-dark-charcoal/50 shrink-0 mr-1.5" />
                    <input 
                      type="text"
                      value={searchQuery}
                      readOnly
                      placeholder="Search belts..." 
                      className="w-full bg-transparent text-[11px] text-soft-black placeholder:text-dark-charcoal/50 focus:outline-none truncate pointer-events-none" 
                      aria-label="Search belts"
                    />
                  </div>
                </div>

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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. DESKTOP NAVBAR (Hidden on mobile) */}
        <div className="hidden sm:flex px-4 md:px-6 lg:px-7 h-14 md:h-15 items-center justify-between w-full">
          
          {/* Left Navigation Links: Home, Products, Wholesale */}
          <div className="flex-1 flex items-center justify-start">
            <nav className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 text-soft-black">
              {desktopLeftLinks.map((link, idx) => {
                const isActive = location.pathname === link.path || 
                  (link.path === '/products' && location.pathname === '/product') ||
                  (link.path === '/sample-wholesale' && location.pathname === '/wholesale');
                return (
                  <React.Fragment key={link.name}>
                    {idx > 0 && (
                      <span 
                        className="relative z-10 w-[1px] h-4 sm:h-4.5 bg-gradient-to-b from-transparent via-stone-400/80 to-transparent shrink-0 mx-0.5 sm:mx-1 select-none" 
                        aria-hidden="true" 
                      />
                    )}
                    <Link 
                      to={link.path}
                      className={`relative px-2.5 py-1.5 md:px-3 text-xs md:text-[12.5px] font-bold tracking-wider uppercase whitespace-nowrap rounded border transition-all duration-200 ${
                        isActive 
                          ? 'text-soft-black bg-[#FAF7F2] border-white/70 shadow-[2px_3px_7px_rgba(0,0,0,0.07),-2px_-2px_6px_rgba(255,255,255,0.95)] scale-[1.02]' 
                          : 'border-transparent text-soft-black/80 hover:text-soft-black hover:bg-black/[0.04] active:scale-95'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </React.Fragment>
                );
              })}
            </nav>
          </div>

          {/* Center Logo (Proportional & Centered) */}
          <div className="shrink-0 flex items-center justify-center px-2 md:px-4">
            <Link to="/" className="flex items-center gap-2 active:scale-95 transition-transform duration-200 py-0.5">
              <img 
                src="/logo_black.png" 
                alt="AST Handmade Macramé Belts" 
                className="h-8 sm:h-8.5 md:h-9 lg:h-9.5 w-auto object-contain transition-all"
              />
            </Link>
          </div>

          {/* Right Navigation Links: About, FAQ, Contact + Cart */}
          <div className="flex-1 flex items-center justify-end gap-0.5 sm:gap-1 md:gap-1.5">
            <nav className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 text-soft-black">
              {desktopRightLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <React.Fragment key={link.name}>
                    {idx > 0 && (
                      <span 
                        className="relative z-10 w-[1px] h-4 sm:h-4.5 bg-gradient-to-b from-transparent via-stone-400/80 to-transparent shrink-0 mx-0.5 sm:mx-1 select-none" 
                        aria-hidden="true" 
                      />
                    )}
                    <Link 
                      to={link.path}
                      className={`relative px-2.5 py-1.5 md:px-3 text-xs md:text-[12.5px] font-bold tracking-wider uppercase whitespace-nowrap rounded border transition-all duration-200 ${
                        isActive 
                          ? 'text-soft-black bg-[#FAF7F2] border-white/70 shadow-[2px_3px_7px_rgba(0,0,0,0.07),-2px_-2px_6px_rgba(255,255,255,0.95)] scale-[1.02]' 
                          : 'border-transparent text-soft-black/80 hover:text-soft-black hover:bg-black/[0.04] active:scale-95'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </React.Fragment>
                );
              })}
            </nav>

            {/* Divider between Contact and Cart */}
            <span 
              className="relative z-10 w-[1px] h-4 sm:h-4.5 bg-gradient-to-b from-transparent via-stone-400/80 to-transparent shrink-0 mx-0.5 sm:mx-1 select-none" 
              aria-hidden="true" 
            />

            {/* Cart Button */}
            <button 
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 text-soft-black hover:text-terracotta active:scale-90 transition-all cursor-pointer group"
              title="Cart"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5 stroke-[1.8] transition-transform group-hover:scale-105" />
              {totalCartQuantity > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-terracotta text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none shadow-xs">
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
              className="relative w-[86%] max-w-[340px] bg-cream h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden"
            >
              {/* Drawer Top Branding Header */}
              <div className="p-4 border-b border-stone/20 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-2.5">
                  <img 
                    src="/logo_black.png" 
                    alt="AST Logo" 
                    className="h-7 w-auto object-contain"
                  />
                  <div className="flex flex-col">
                    <span className="font-serif font-bold text-soft-black text-sm tracking-wide leading-none">
                      AST Macramé
                    </span>
                    <span className="text-[9.5px] uppercase tracking-[0.16em] text-terracotta font-semibold mt-0.5">
                      Artisan Woven Studio
                    </span>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone/10 hover:bg-stone/20 text-soft-black flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close Menu"
                >
                  <X className="w-4 h-4 stroke-[2]" />
                </button>
              </div>

              {/* Scrollable Navigation Body */}
              <div className="px-3 py-4 space-y-4 overflow-y-auto flex-1">
                {/* Primary Commerce Links */}
                <div>
                  <div className="px-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-dark-charcoal/50">
                      Collections & Ordering
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {shopLinks.map((link) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <Link
                          key={link.name}
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`group flex items-center justify-between p-2.5 rounded border transition-all ${
                            isActive 
                              ? 'bg-[#131E33] border-[#131E33] text-white shadow-xs' 
                              : 'bg-white border-stone/20 text-soft-black hover:border-stone/40 hover:shadow-xs'
                          }`}
                        >
                          <div className="flex flex-col pr-1.5 min-w-0">
                            <span className="text-xs font-bold uppercase tracking-wider truncate">
                              {link.name}
                            </span>
                            {link.subtitle && (
                              <span className={`text-[10.5px] font-normal leading-tight mt-0.5 truncate ${
                                isActive ? 'text-white/70' : 'text-dark-charcoal/60'
                              }`}>
                                {link.subtitle}
                              </span>
                            )}
                          </div>
                          
                          <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-0.5 ${
                            isActive ? 'bg-white/15 text-white' : 'bg-stone/10 text-dark-charcoal/60'
                          }`}>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Secondary Brand & Help Links */}
                <div>
                  <div className="px-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-dark-charcoal/50">
                      The Atelier
                    </span>
                  </div>

                  <div className="bg-white rounded border border-stone/20 divide-y divide-stone/15 overflow-hidden">
                    {brandLinks.map((link) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <Link
                          key={link.name}
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                            isActive
                              ? 'bg-stone/15 text-soft-black font-bold'
                              : 'text-soft-black/85 hover:bg-stone/10 hover:text-soft-black'
                          }`}
                        >
                          <span>{link.name}</span>
                          <ChevronRight className="w-3 h-3 text-stone-400" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Drawer Footer with Direct WhatsApp & Compact Policies */}
              <div className="p-3.5 border-t border-stone/20 bg-white shrink-0 space-y-2.5">
                <a
                  href="https://wa.me/8801940689061?text=Hello%20AST%20Macrame,%20I%20have%20an%20inquiry."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 px-3 rounded text-xs font-bold uppercase tracking-wider hover:brightness-105 active:scale-[0.99] transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>

                <div className="flex items-center justify-center gap-3 text-[10.5px] text-dark-charcoal/60 font-medium pt-1">
                  {legalLinks.map((link, idx) => (
                    <React.Fragment key={link.path}>
                      <Link 
                        to={link.path} 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        className="hover:text-soft-black transition-colors"
                      >
                        {link.name}
                      </Link>
                      {idx < legalLinks.length - 1 && <span className="text-stone-300">·</span>}
                    </React.Fragment>
                  ))}
                </div>

                <div className="pt-2 border-t border-stone/15 flex items-center justify-between text-[10px] text-dark-charcoal/50">
                  <span>100% Handcrafted Cotton</span>
                  <span>Chattogram, BD</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
