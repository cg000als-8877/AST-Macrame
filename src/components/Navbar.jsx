import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Search, 
  ChevronRight, 
  Phone, 
  ArrowLeft
} from 'lucide-react';
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
      subtitle: 'Cash on delivery nationwide',
      badge: 'COD'
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
      subtitle: '100 pcs base MOQ, private label'
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

  const navClass = `fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-300 top-0 sm:top-2 md:top-2.5 w-full sm:w-[95%] md:w-[92%] max-w-6xl bg-white sm:bg-white/95 sm:backdrop-blur-md rounded-none sm:rounded-[4px] overflow-hidden ${
    isScrolled 
      ? 'shadow-md sm:shadow-lg' 
      : 'shadow-xs sm:shadow-md'
  }`;

  return (
    <>
      <header className={navClass}>
        
        {/* Retail Announcement Bar (Top on Retail page only, #131E33 Footer Blue background) */}
        {isRetailPage && (
          <div className="w-full bg-[#131E33] text-white text-[10.5px] sm:text-xs font-medium flex items-center justify-center gap-1.5 py-1 px-3 z-50 tracking-wider uppercase sm:rounded-t-[4px]">
            <svg className="w-3 h-3 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1" />
            </svg>
            <span>CASH ON DELIVERY ALL OVER BANGLADESH</span>
          </div>
        )}

        {/* 1. UNIVERSAL MOBILE TOP BAR (Burger on Left | Center Logo | Search + Cart on Right) */}
        <div className="flex sm:hidden px-2.5 sm:px-4 h-[48px] items-center justify-between gap-1.5 w-full relative overflow-hidden">
          {/* Base Mobile Bar */}
          <div className="flex items-center justify-between w-full h-full">
            {/* Left: Burger Menu Button */}
            <div className="flex items-center shrink-0 z-10">
              <button 
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-1.5 text-soft-black hover:text-terracotta active:scale-90 transition-all cursor-pointer"
                aria-label="Open Navigation Menu"
                title="Menu"
              >
                <Menu className="w-5 h-5 stroke-[2.2]" />
              </button>
            </div>

            {/* Center: AST Logo centered by overall viewport space from both sides */}
            <Link 
              to="/" 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center active:scale-95 transition-transform z-10"
              aria-label="AST Macramé Home"
            >
              <img 
                src="/logo_black.png" 
                alt="AST Logo" 
                className="h-[30px] sm:h-8 w-auto object-contain"
              />
            </Link>

            {/* Right: Search Icon + Cart Icon (Same style, thickness, and height) */}
            <div className="flex items-center gap-1 shrink-0 z-10">
              {/* Search Icon Trigger */}
              <button
                type="button"
                onClick={() => setIsMobileSearchExpanded(true)}
                className="relative p-1.5 text-soft-black hover:text-terracotta active:scale-90 transition-all cursor-pointer"
                aria-label="Search belts"
                title="Search"
              >
                <Search className="w-5 h-5 stroke-[2]" />
              </button>

              {/* Cart Button with Badge */}
              <button 
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-1.5 text-soft-black hover:text-terracotta active:scale-90 transition-all cursor-pointer" 
                aria-label="Shopping Cart"
                title="Cart"
              >
                <ShoppingCart className="w-5 h-5 stroke-[2]" />
                {totalCartQuantity > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-terracotta text-white text-[9.5px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {totalCartQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Smooth Pop-up Search Bar Overlay (Only active in mobile view) */}
          <form
            onSubmit={handleSearchSubmit}
            className={`absolute inset-0 bg-white z-30 px-2.5 flex items-center gap-2 w-full h-full transition-all duration-300 ease-out ${
              isMobileSearchExpanded
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-full pointer-events-none'
            }`}
          >
            <div className="relative flex-1 flex items-center bg-[#F6F6F7] focus-within:bg-[#EAEAEA] rounded-xl px-3 py-1.5 text-xs transition-colors">
              <Search className="w-4 h-4 text-terracotta stroke-[2] shrink-0 mr-2" />
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
                  <X className="w-3.5 h-3.5 stroke-[2]" />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsMobileSearchExpanded(false)}
              className="text-[11px] font-bold text-terracotta uppercase tracking-wider px-2 py-1 active:scale-95 transition-all shrink-0 cursor-pointer"
            >
              Cancel
            </button>
          </form>
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
                      className={`relative px-2.5 py-1.5 md:px-3 text-xs md:text-[12.5px] font-bold tracking-wider uppercase whitespace-nowrap rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'text-soft-black bg-[#F6F6F7] scale-[1.02]' 
                          : ' text-soft-black/80 hover:text-soft-black hover:bg-black/[0.04] active:scale-95'
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
                      className={`relative px-2.5 py-1.5 md:px-3 text-xs md:text-[12.5px] font-bold tracking-wider uppercase whitespace-nowrap rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'text-soft-black bg-[#F6F6F7] scale-[1.02]' 
                          : ' text-soft-black/80 hover:text-soft-black hover:bg-black/[0.04] active:scale-95'
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
                <span className="absolute -top-0.5 -right-0.5 bg-terracotta text-white text-[9.5px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
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
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-soft-black/60 backdrop-blur-xs"
            />

            {/* Slide-out Menu Panel (Ultra-smooth, slow-motion glide) */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ 
                type: 'tween',
                duration: 1.2, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="relative w-[85%] max-w-[340px] bg-white h-full z-10 flex flex-col justify-between overflow-hidden"
            >
              {/* Drawer Top Branding Header */}
              <div className="px-4 py-3.5 flex items-center justify-between bg-white shrink-0">
                <Link 
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 group"
                >
                  <img 
                    src="/logo_black.png" 
                    alt="AST Logo" 
                    className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
                  />
                  <div className="flex flex-col">
                    <span className="font-serif font-bold text-soft-black text-sm tracking-wide leading-none">
                      AST Macramé
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-terracotta font-semibold mt-1">
                      Artisan Woven Studio
                    </span>
                  </div>
                </Link>

                <button 
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-soft-black flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Close Menu"
                >
                  <X className="w-4 h-4 stroke-[1.8]" />
                </button>
              </div>

              {/* Scrollable Navigation Body */}
              <div className="px-3.5 py-4 space-y-5 overflow-y-auto flex-1 overscroll-contain">
                {/* Primary Commerce Links */}
                <div>
                  <div className="flex items-center justify-between px-1 mb-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-terracotta">
                      Collections & Ordering
                    </span>
                    <span className="text-[9px] font-semibold text-dark-charcoal/40 uppercase tracking-wider">
                      Explore
                    </span>
                  </div>

                  <div className="space-y-2">
                    {shopLinks.map((link) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <Link
                          key={link.name}
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`group relative flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 ${
                            isActive 
                              ? 'bg-white' 
                              : 'bg-white/80 hover:bg-white'
                          }`}
                        >
                          {/* Content */}
                          <div className="flex-1 min-w-0 pr-2">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[13px] font-semibold tracking-normal truncate ${
                                isActive ? 'text-terracotta' : 'text-soft-black'
                              }`}>
                                {link.name}
                              </span>
                              {link.badge && (
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1C2841] text-white leading-none">
                                  {link.badge}
                                </span>
                              )}
                            </div>
                            {link.subtitle && (
                              <p className="text-[11px] font-normal leading-tight mt-0.5 truncate text-dark-charcoal/65">
                                {link.subtitle}
                              </p>
                            )}
                          </div>
                          
                          <ChevronRight className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                            isActive ? 'text-terracotta' : 'text-stone-400 group-hover:text-soft-black'
                          }`} />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Secondary Brand & Help Links */}
                <div className="pt-2">
                  <div className="px-1 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-dark-charcoal/50">
                      The Atelier
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    {brandLinks.map((link) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <Link
                          key={link.name}
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] tracking-normal transition-all ${
                            isActive
                              ? 'text-terracotta font-bold'
                              : 'text-dark-charcoal/75 font-medium hover:text-soft-black hover:bg-stone/5'
                          }`}
                        >
                          <span>{link.name}</span>
                          <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                            isActive ? 'text-terracotta' : 'text-stone-400 group-hover:text-soft-black'
                          }`} />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Drawer Footer with Direct WhatsApp & Compact Policies */}
              <div className="p-4 bg-white shrink-0 space-y-3">
                <a
                  href="https://wa.me/8801940689061?text=Hello%20AST%20Macrame,%20I%20have%20an%20inquiry."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-soft-black hover:bg-stone-800 text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-[0.14em] transition-all group"
                >
                  <span className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                  </span>
                  <span>Chat on WhatsApp</span>
                </a>

                <div className="flex items-center justify-center gap-3 text-[11px] text-dark-charcoal/60 font-medium pt-1">
                  {legalLinks.map((link, idx) => (
                    <React.Fragment key={link.path}>
                      {idx > 0 && <span className="text-stone-300">|</span>}
                      <Link 
                        to={link.path} 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        className="hover:text-soft-black transition-colors"
                      >
                        {link.name}
                      </Link>
                    </React.Fragment>
                  ))}
                </div>

                <div className="pt-0.5 flex items-center justify-between text-[10px] text-dark-charcoal/50">
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
