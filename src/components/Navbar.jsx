import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Threshold to switch logo color (e.g. 50px of scroll)
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check immediately on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const isDarkPage = location.pathname === '/' || location.pathname === '/manufacturing';
  const useWhiteLogo = isDarkPage && !isScrolled;

  const navLinks = [
    { name: 'Order a Sample', path: '/product' },
    { name: 'Manufacturing', path: '/manufacturing' },
    { name: 'Wholesale', path: '/sample-wholesale' },
    { name: 'Contact', path: '/contact' }
  ];

  // Mobile: top-3, 2-row layout needs slightly less rounding. SM/MD: normal
  const navClass = 'fixed z-50 w-[96%] sm:w-[94%] md:w-[92%] max-w-6xl top-3 sm:top-4 md:top-6 left-1/2 -translate-x-1/2 glass border border-white/20 rounded-[1.25rem] sm:rounded-full shadow-lg';

  return (
    <>

      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={navClass}
      >
        <div className="px-2 sm:px-6 lg:px-10 py-2 sm:py-0 sm:h-11 md:h-14 flex flex-col sm:flex-row items-center justify-center sm:justify-between w-full gap-2 sm:gap-0">
          
          {/* Mobile Top Row: Logo Centered */}
          <div className="flex w-full justify-center items-center sm:hidden px-1">
            <Link to="/" className="flex items-center active:scale-95 transition-transform duration-200">
              <img 
                src="/logo_black.png" 
                alt="AST Handmade Macramé Belts" 
                className="h-6 w-auto object-contain transition-all duration-300 drop-shadow-md mobile-navbar-logo"
              />
            </Link>
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
          <div className="flex flex-shrink-0 items-center justify-center px-1 w-full sm:w-auto">
            <nav className="flex items-center justify-center sm:justify-center w-full sm:w-auto space-x-1.5 sm:space-x-4 md:space-x-8 text-soft-black">
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.path;
                return (
                <React.Fragment key={link.name}>
                  <Link 
                    to={link.path}
                    className={`relative text-[clamp(9px,2vw,14px)] font-bold md:font-semibold tracking-tighter sm:tracking-widest uppercase active:scale-90 active:opacity-70 transition-all duration-150 whitespace-nowrap py-0.5 ${isActive ? 'text-terracotta' : 'hover:text-terracotta text-soft-black'}`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-terracotta to-transparent"></span>
                    )}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <div className="w-[1px] h-2.5 sm:h-3 md:h-4 bg-soft-black/20"></div>
                  )}
                </React.Fragment>
              )})}
            </nav>
          </div>

          {/* Desktop spacer to keep links perfectly centered */}
          <div className="hidden sm:flex shrink-0 lg:flex-1 justify-end items-center">
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Navbar;
