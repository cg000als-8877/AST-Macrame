import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const isRetailPage = location.pathname === '/retail';

  const navLinks = [
    { name: 'Order Sample', path: '/product' },
    { name: 'Manufacturing', path: '/manufacturing' },
    { name: 'Wholesale', path: '/sample-wholesale' },
    { name: 'Retail', path: '/retail' },
    { name: 'Contact', path: '/contact' }
  ];

  const navClass = 'fixed z-50 w-full sm:w-[94%] md:w-[92%] max-w-6xl top-0 sm:top-4 md:top-6 left-1/2 -translate-x-1/2 bg-cream sm:bg-cream/80 sm:backdrop-blur-md border-b sm:border border-stone/20 sm:border-white/20 rounded-none sm:rounded-full shadow-md sm:shadow-lg';

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={navClass}
      >
        {isRetailPage ? (
          <div className="px-3 sm:px-6 h-12 md:h-14 grid grid-cols-3 items-center w-full">
            
            {/* Left side: WHOLESALE link */}
            <div className="flex justify-start">
              <Link to="/sample-wholesale" className="text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.1em] sm:tracking-widest uppercase text-white bg-soft-black hover:bg-white hover:text-soft-black hover:shadow-md border border-transparent hover:border-stone/20 active:scale-95 transition-all shadow-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                Wholesale
              </Link>
            </div>
            
            {/* Center: Logo */}
            <div className="flex justify-center">
              <Link to="/" className="flex items-center active:scale-95 transition-transform duration-200">
                <img 
                  src="/logo_black.png" 
                  alt="AST Handmade Macramé Belts" 
                  className="h-6 md:h-8 lg:h-10 w-auto object-contain drop-shadow-sm"
                />
              </Link>
            </div>
            
            {/* Right side: Contact Icons */}
            <div className="flex justify-end gap-1.5 sm:gap-2">
              <a href="mailto:astmacrame@gmail.com" className="group w-7 h-7 md:w-9 md:h-9 bg-soft-black text-white rounded-full flex items-center justify-center hover:bg-[#EA4335] active:scale-95 transition-all shadow-md" aria-label="Mail">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 block group-hover:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 hidden group-hover:block" fill="currentColor" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
              </a>
              <a href="https://wa.me/8801940689061" target="_blank" rel="noreferrer" className="w-7 h-7 md:w-9 md:h-9 bg-soft-black text-white rounded-full flex items-center justify-center hover:bg-[#25D366] active:scale-95 transition-all shadow-md" aria-label="WhatsApp">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
              <a href="https://www.facebook.com/share/191oCoXxWV/" target="_blank" rel="noreferrer" className="w-7 h-7 md:w-9 md:h-9 bg-soft-black text-white rounded-full flex items-center justify-center hover:bg-[#1877F2] active:scale-95 transition-all shadow-md" aria-label="Facebook">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
            
          </div>
        ) : (
          <div className="px-2 sm:px-6 lg:px-10 py-2 sm:py-0 sm:h-11 md:h-14 flex flex-col sm:flex-row items-center justify-center sm:justify-between w-full gap-2 sm:gap-0">
            
            {/* Mobile Top Row: Logo & Icons */}
            <div className="flex w-full justify-between items-center sm:hidden px-4 pb-2 mb-1 border-b border-stone/20">
              <Link to="/" className="flex items-center gap-2 active:scale-95 transition-transform duration-200">
                <img 
                  src="/logo_black.png" 
                  alt="AST Handmade Macramé Belts" 
                  className="h-7 w-auto object-contain transition-all duration-300 drop-shadow-md mobile-navbar-logo"
                />
                <span className="font-serif font-bold text-soft-black text-[11px] tracking-wide mt-0.5">AST Macramé</span>
              </Link>

              <div className="flex gap-1.5">
                <a href="mailto:astmacrame@gmail.com" className="w-6 h-6 bg-soft-black text-white rounded-full flex items-center justify-center hover:bg-[#EA4335] active:scale-95 transition-all shadow-sm" aria-label="Mail">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </a>
                <a href="https://wa.me/8801940689061" target="_blank" rel="noreferrer" className="w-6 h-6 bg-soft-black text-white rounded-full flex items-center justify-center hover:bg-[#25D366] active:scale-95 transition-all shadow-sm" aria-label="WhatsApp">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
                <a href="https://www.facebook.com/share/191oCoXxWV/" target="_blank" rel="noreferrer" className="w-6 h-6 bg-soft-black text-white rounded-full flex items-center justify-center hover:bg-[#1877F2] active:scale-95 transition-all shadow-sm" aria-label="Facebook">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
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
            <div className="flex flex-shrink-0 items-center justify-center px-4 sm:px-1 w-full sm:w-auto">
              <nav className="flex items-center justify-between sm:justify-center w-full sm:w-auto sm:space-x-4 md:space-x-6 lg:space-x-8 text-soft-black">
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

            {/* Right side: Contact Icons (Desktop) */}
            <div className="hidden sm:flex shrink-0 lg:flex-1 justify-end items-center gap-1.5 sm:gap-2">
              <a href="https://wa.me/8801940689061" target="_blank" rel="noreferrer" className="w-7 h-7 md:w-9 md:h-9 bg-soft-black text-white rounded-full flex items-center justify-center hover:bg-[#25D366] active:scale-95 transition-all shadow-md" aria-label="WhatsApp">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
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
