import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { name: 'Order Sample', path: '/product' },
    { name: 'Manufacturing', path: '/manufacturing' },
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
            
            <div className="px-3 sm:px-6 h-12 md:h-14 grid grid-cols-3 items-center w-full relative">
              
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
              
              {/* Right side: Contact & Social Icons */}
              <div className="flex justify-end items-center gap-1.5 sm:gap-2 relative z-10">
                <a 
                  href="https://wa.me/8801940689061" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-white text-soft-black border border-stone/20 hover:border-transparent rounded-full flex items-center justify-center hover:bg-[#25D366] hover:text-white active:scale-90 transition-all duration-200 shadow-sm hover:shadow-md" 
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/ast.macrame" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-white text-soft-black border border-stone/20 hover:border-transparent rounded-full flex items-center justify-center hover:bg-[#E4405F] hover:text-white active:scale-90 transition-all duration-200 shadow-sm hover:shadow-md" 
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/share/191oCoXxWV/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-white text-soft-black border border-stone/20 hover:border-transparent rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:text-white active:scale-90 transition-all duration-200 shadow-sm hover:shadow-md" 
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
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
          <div className="px-2 sm:px-6 lg:px-10 py-1 sm:py-0 sm:h-11 md:h-14 flex flex-col sm:flex-row items-center justify-center sm:justify-between w-full gap-1 sm:gap-0">
            
            {/* Mobile Top Row: Logo & Icons */}
            <div className={`flex w-full justify-between items-center sm:hidden px-2 transition-all duration-300 overflow-hidden ${isScrolled ? 'max-h-0 opacity-0 pb-0 mb-0 border-transparent' : 'max-h-12 pb-1 mb-0 border-b border-stone/20'}`}>
              <Link to="/" className="flex items-center gap-2 active:scale-95 transition-transform duration-200">
                <img 
                  src="/logo_black.png" 
                  alt="AST Handmade Macramé Belts" 
                  className="h-7 md:h-8 w-auto object-contain transition-all duration-300 drop-shadow-md mobile-navbar-logo"
                />
                <span className="font-serif font-bold text-soft-black text-[13px] tracking-wide mt-0.5">AST Macramé</span>
              </Link>

              <div className="flex gap-1.5">
                <a href="mailto:astmacrame@gmail.com" className="w-6 h-6 bg-soft-black text-white rounded-full flex items-center justify-center hover:bg-[#EA4335] active:scale-95 transition-all shadow-sm" aria-label="Mail">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </a>
                <a href="https://wa.me/8801940689061" target="_blank" rel="noreferrer" className="w-6 h-6 bg-soft-black text-white rounded-full flex items-center justify-center hover:bg-[#25D366] active:scale-95 transition-all shadow-sm" aria-label="WhatsApp">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
                <a href="https://www.facebook.com/share/191oCoXxWV/" target="_blank" rel="noreferrer" className="w-6 h-6 bg-soft-black text-white rounded-full flex items-center justify-center hover:bg-[#1877F2] active:scale-95 transition-all shadow-sm" aria-label="Facebook">
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>

            {/* Logo (Desktop Only) */}
            <div className="hidden sm:flex shrink-0 lg:flex-1 justify-start items-center">
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
                      className={`relative py-1 sm:py-0.5 text-[clamp(10px,2.2vw,13px)] font-bold md:font-semibold tracking-tight sm:tracking-widest uppercase active:scale-90 active:opacity-70 transition-all duration-150 whitespace-nowrap ${isActive ? 'text-terracotta' : 'hover:text-terracotta text-soft-black'} ${link.name === 'Contact' ? 'hidden sm:block' : ''}`}
                    >
                      {link.name}
                      {isActive && (
                        <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-terracotta to-transparent"></span>
                      )}
                    </Link>
                    {index < navLinks.length - 1 && (
                      <div className={`w-[1px] h-2.5 sm:h-3 md:h-4 bg-soft-black/20 shrink-0 ${index === navLinks.length - 2 ? 'hidden sm:block' : ''}`}></div>
                    )}
                  </React.Fragment>
                )})}
              </nav>
            </div>

            {/* Right side: Contact Icons (Desktop) */}
            <div className="hidden sm:flex shrink-0 lg:flex-1 justify-end items-center gap-1.5 sm:gap-2">
              <a href="https://wa.me/8801940689061" target="_blank" rel="noreferrer" className="w-7 h-7 md:w-9 md:h-9 bg-soft-black text-white rounded-full flex items-center justify-center hover:bg-[#25D366] active:scale-95 transition-all shadow-md" aria-label="WhatsApp">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              </a>
              <a href="https://www.facebook.com/share/191oCoXxWV/" target="_blank" rel="noreferrer" className="w-7 h-7 md:w-9 md:h-9 bg-soft-black text-white rounded-full flex items-center justify-center hover:bg-[#1877F2] active:scale-95 transition-all shadow-md" aria-label="Facebook">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
        )}
      </motion.header>
    </>
  );
};

export default Navbar;
