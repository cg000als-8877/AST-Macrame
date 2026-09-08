import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Phone } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalWishlistCount, totalCartQuantity, setIsWishlistOpen, setIsCartOpen } = useCartWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isRetailPage = location.pathname === '/retail';

  const navLinks = [
    { name: 'Request a Sample', path: '/sample-order' },
    { name: 'Wholesale', path: '/sample-wholesale' },
    { name: 'Retail', path: '/retail' },
    { name: 'Contact', path: '/contact' }
  ];

  // Fixed position on desktop, 100% solid opaque background on mobile
  const navClass = `fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-300 top-0 sm:top-4 md:top-6 w-full sm:w-[94%] md:w-[92%] max-w-6xl bg-cream border-b sm:border border-stone/20 sm:border-white/20 rounded-none sm:rounded-full ${
    isScrolled 
      ? 'shadow-md sm:shadow-lg bg-cream sm:bg-cream/95 sm:backdrop-blur-md' 
      : 'shadow-sm sm:shadow-md bg-cream sm:bg-cream/90 sm:backdrop-blur-md'
  }`;

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={navClass}
      >
        {isRetailPage ? (
          <>
            {/* Announcement Bar (Retail Only as requested) */}
            <div className="sm:hidden w-full bg-soft-black text-white text-[10px] md:text-[11px] font-normal flex items-center justify-center gap-1.5 py-1.5 z-50 tracking-wider uppercase">
              <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1" />
              </svg>
              <span>CASH ON DELIVERY ALL OVER BANGLADESH</span>
            </div>
            
            <div className="px-4.5 sm:px-6 h-12 md:h-14 grid grid-cols-3 items-center w-full relative">
              
              <div className="flex justify-start items-center relative z-10">
                {/* Desktop Wholesale Button */}
                <Link to="/sample-wholesale" className="hidden sm:inline-flex text-[10px] sm:text-[11px] md:text-[13px] font-bold tracking-[0.1em] sm:tracking-widest uppercase text-white bg-soft-black hover:bg-white hover:text-soft-black hover:shadow-md border border-transparent hover:border-stone/20 active:scale-95 transition-all shadow-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                  Wholesale
                </Link>
                {/* Mobile Hamburger */}
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                  className="sm:hidden w-8 h-8 flex items-center justify-start active:scale-95 transition-transform"
                  aria-label="Menu"
                >
                  <svg className="w-5 h-5 text-soft-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
              
              <div className="flex justify-center items-center relative z-10">
                <Link to="/" className="flex flex-col items-center justify-center active:scale-95 transition-transform duration-200 h-full">
                  <img 
                    src="/logo_black.png" 
                    alt="AST Handmade Macramé Belts" 
                    className="h-10 sm:h-8 md:h-9 lg:h-11 w-auto object-contain drop-shadow-sm"
                  />
                </Link>
              </div>
              
              {/* Right side: Contact & Cart Buttons */}
              <div className="flex justify-end items-center gap-3 sm:gap-4 relative z-10">
                <Link 
                  to="/contact"
                  className="relative p-1 text-soft-black hover:text-terracotta active:scale-90 transition-colors cursor-pointer"
                  aria-label="Contact"
                  title="Contact Us"
                >
                  <Phone className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[1.8]" />
                </Link>

                <button 
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-1 text-soft-black hover:text-terracotta active:scale-90 transition-colors cursor-pointer"
                  aria-label="Shopping Cart"
                  title="Shopping Cart"
                >
                  <ShoppingCart className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[1.8]" />
                  {totalCartQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 bg-terracotta text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none shadow-xs">
                      {totalCartQuantity}
                    </span>
                  )}
                </button>
              </div>
            </div>
            
            {/* Mobile Menu Dropdown (Retail Only) */}
            <div className={`sm:hidden w-full bg-cream transition-all duration-300 overflow-hidden flex flex-col items-center ${isMobileMenuOpen ? 'max-h-[400px] py-4 border-b border-stone/20' : 'max-h-0 py-0 border-b-0 border-transparent'}`}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`py-3 px-4 w-full text-center text-[13px] font-bold tracking-widest uppercase active:scale-95 transition-all ${isActive ? 'text-terracotta bg-stone/5' : 'text-soft-black hover:bg-stone/5'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </>
        ) : (
          <div className="w-full">
            
            {/* Mobile Top Row: Logo & Brand on Left, Wishlist & Cart on Right (Clean single row) */}
            <div className="flex sm:hidden px-4.5 h-12 items-center justify-between w-full">
              <Link to="/" className="flex items-center gap-2 active:scale-95 transition-transform duration-200">
                <img 
                  src="/logo_black.png" 
                  alt="AST Handmade Macramé Belts" 
                  className="h-7 w-auto object-contain"
                />
                <span className="font-serif font-bold text-soft-black text-[13.5px] tracking-wide mt-0.5">AST Macramé</span>
              </Link>

              {/* Mobile Right: Wishlist & Cart Buttons */}
              <div className="flex items-center gap-2.5">
                <button 
                  type="button"
                  onClick={() => setIsWishlistOpen(true)}
                  className="relative p-1 text-soft-black hover:text-rose-600 active:scale-90 transition-all cursor-pointer" 
                  aria-label="Wishlist"
                  title="Wishlist"
                >
                  <Heart className="w-5 h-5 stroke-[1.75]" />
                  {totalWishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none shadow-xs">
                      {totalWishlistCount}
                    </span>
                  )}
                </button>
                <button 
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-1 text-soft-black hover:text-terracotta active:scale-90 transition-all cursor-pointer" 
                  aria-label="Cart"
                  title="Cart"
                >
                  <ShoppingCart className="w-5 h-5 stroke-[1.75]" />
                  {totalCartQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 bg-terracotta text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none shadow-xs">
                      {totalCartQuantity}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Desktop View: Full Classic Navbar */}
            <div className="hidden sm:flex px-6 lg:px-10 h-11 md:h-14 items-center justify-between w-full">
              {/* Logo (Desktop Only) */}
              <div className="shrink-0 lg:flex-1 justify-start items-center">
                <Link to="/" className="flex items-center active:scale-95 transition-transform duration-200">
                  <img 
                    src="/logo_black.png" 
                    alt="AST Handmade Macramé Belts" 
                    className="h-6 md:h-8 lg:h-10 w-auto object-contain"
                  />
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="flex w-full px-2 sm:px-1 sm:w-auto justify-between items-center sm:justify-center shrink-0">
                <nav className="flex items-center justify-between w-full sm:w-auto sm:space-x-4 md:space-x-6 lg:space-x-8 text-soft-black">
                  {navLinks.map((link, index) => {
                    const isActive = location.pathname === link.path;
                    return (
                    <React.Fragment key={link.name}>
                      <Link 
                        to={link.path}
                        className={`relative py-1 sm:py-0.5 text-[clamp(9.5px,2.2vw,13px)] font-bold md:font-semibold tracking-tight sm:tracking-widest uppercase active:scale-90 active:opacity-70 transition-all duration-150 whitespace-nowrap ${isActive ? 'text-terracotta' : 'hover:text-terracotta text-soft-black'}`}
                      >
                        {link.name}
                        {isActive && (
                          <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-terracotta to-transparent"></span>
                        )}
                      </Link>
                      {index < navLinks.length - 1 && (
                        <div className="w-[1px] h-2.5 sm:h-3 md:h-4 bg-soft-black/20 shrink-0"></div>
                      )}
                    </React.Fragment>
                  )})}
                </nav>
              </div>

              {/* Right side: Wishlist & Cart Buttons (Desktop - Clean icons, no shape) */}
              <div className="shrink-0 lg:flex-1 flex justify-end items-center gap-3 md:gap-4">
                <button 
                  type="button"
                  onClick={() => setIsWishlistOpen(true)}
                  className="relative p-1.5 text-soft-black hover:text-rose-600 active:scale-90 transition-all cursor-pointer group"
                  title="Wishlist"
                  aria-label="Wishlist"
                >
                  <Heart className="w-5 h-5 stroke-[1.75] transition-transform group-hover:scale-110" />
                  {totalWishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none shadow-xs">
                      {totalWishlistCount}
                    </span>
                  )}
                </button>

                <button 
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-1.5 text-soft-black hover:text-terracotta active:scale-90 transition-all cursor-pointer group"
                  title="Cart"
                  aria-label="Cart"
                >
                  <ShoppingCart className="w-5 h-5 stroke-[1.75] transition-transform group-hover:scale-110" />
                  {totalCartQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 bg-terracotta text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none shadow-xs">
                      {totalCartQuantity}
                    </span>
                  )}
                </button>
              </div>
            </div>

          </div>
        )}
      </motion.header>
    </>
  );
};

export default Navbar;
