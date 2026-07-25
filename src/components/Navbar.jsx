import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const isDarkBg = location.pathname === '/' || location.pathname === '/manufacturing';

  const navLinks = [
    { name: 'Order a Sample', path: '/product' },
    { name: 'Manufacturing', path: '/manufacturing' },
    { name: 'Wholesale', path: '/sample-wholesale' }
  ];

  // Mobile: top-16 (to make room for logo above), SM/MD: normal
  const navClass = 'fixed z-50 w-[96%] sm:w-[94%] md:w-[92%] max-w-6xl top-[60px] sm:top-4 md:top-6 left-1/2 -translate-x-1/2 glass border border-white/20 rounded-full shadow-lg';

  return (
    <>
      {/* Mobile-only Logo above Navbar */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-3 left-0 w-full flex justify-center z-50 sm:hidden pointer-events-none"
      >
        <Link to="/" className="pointer-events-auto active:scale-95 transition-transform duration-200">
          <img 
            src={isDarkBg ? "/logo_white.png" : "/logo_black.png"} 
            alt="AST Handmade Macramé Belts" 
            className="h-8 w-auto object-contain drop-shadow-md"
          />
        </Link>
      </motion.div>

      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={navClass}
      >
        <div className="px-2 sm:px-6 lg:px-10 h-10 sm:h-11 md:h-14 flex items-center justify-center sm:justify-between w-full">
          
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
          <div className="flex flex-shrink-0 items-center justify-center px-1">
            <nav className="flex items-center space-x-1.5 min-[380px]:space-x-2 sm:space-x-4 md:space-x-8 text-soft-black">
              {navLinks.map((link, index) => (
                <React.Fragment key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-[clamp(9px,2vw,14px)] font-bold md:font-semibold tracking-tighter sm:tracking-widest uppercase hover:text-terracotta active:scale-90 active:opacity-70 transition-all duration-150 whitespace-nowrap p-1"
                  >
                    {link.name}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <div className="w-[1px] h-2.5 sm:h-3 md:h-4 bg-soft-black/20"></div>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>

          {/* CTA (Text Button) */}
          <div className="shrink-0 lg:flex-1 flex justify-end items-center ml-1 sm:ml-4 lg:ml-0">
            <Link 
              to="/contact"
              className="bg-soft-black text-cream px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full flex items-center justify-center hover:bg-dark-charcoal active:scale-95 active:bg-soft-black/80 transition-all duration-150 text-[10px] sm:text-[11px] md:text-xs font-bold uppercase tracking-wide md:tracking-widest whitespace-nowrap"
              aria-label="Contact Us"
            >
              Contact
            </Link>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Navbar;
