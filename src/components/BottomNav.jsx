import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, Building2, Phone } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';

const BeltIcon = ({ className = "w-4 h-4" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Buckle Frame */}
    <rect x="2.5" y="6" width="7" height="12" rx="2" />
    {/* Buckle Prong */}
    <line x1="2.5" y1="12" x2="8" y2="12" />
    {/* Keeper Loop */}
    <line x1="12.5" y1="6.5" x2="12.5" y2="17.5" />
    {/* Strap */}
    <path d="M9.5 8h11a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5h-11" />
    {/* Eyelet Hole */}
    <circle cx="17.5" cy="12" r="0.8" fill="currentColor" />
  </svg>
);

const BottomNav = () => {
  const location = useLocation();
  const { totalCartQuantity, setIsCartOpen } = useCartWishlist();
  const [isOverFooter, setIsOverFooter] = React.useState(false);

  React.useEffect(() => {
    const footerEl = document.getElementById('site-footer');
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOverFooter(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.05
      }
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, [location.pathname]);

  const isHomeActive = location.pathname === '/';
  const isProductsActive = ['/products', '/gallery', '/collection', '/all-products'].includes(location.pathname);
  const isWholesaleActive = ['/sample-wholesale', '/wholesale', '/production', '/b2b'].includes(location.pathname);
  const isContactActive = ['/contact', '/support'].includes(location.pathname);

  // Dynamic colors based on footer visibility
  const navBgFill = isOverFooter ? '#FFFFFF' : '#131E33';
  const iconInactiveClass = isOverFooter ? 'text-[#131E33]/70 group-hover:text-[#131E33]' : 'text-white/80 group-hover:text-white';
  const iconActiveClass = isOverFooter ? 'text-[#131E33] font-black scale-105' : 'text-[#c3b091] font-black scale-105';
  const textInactiveClass = isOverFooter ? 'text-[#131E33]/70 group-hover:text-[#131E33]' : 'text-white/80 group-hover:text-white';
  const textActiveClass = isOverFooter ? 'text-[#131E33] font-extrabold' : 'text-[#c3b091] font-extrabold';
  const cartLabelClass = isOverFooter ? 'text-[#131E33]' : 'text-white';

  return (
    <div className="block sm:hidden fixed bottom-3 inset-x-0 mx-auto w-[96%] max-w-[440px] z-50 pointer-events-auto select-none transition-all duration-300">
      <div className="relative w-full h-[56px] flex items-center justify-center">
        
        {/* Pill Container SVG with adaptive background fill */}
        <svg
          viewBox="0 0 500 70"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full drop-shadow-[0_10px_26px_rgba(0,0,0,0.38)] transition-all duration-300"
        >
          <path
            d="M 35 0 L 204 0 C 218 0, 224 32, 250 32 C 276 32, 282 0, 296 0 L 465 0 A 35 35 0 0 1 500 35 A 35 35 0 0 1 465 70 L 35 70 A 35 35 0 0 1 0 35 A 35 35 0 0 1 35 0 Z"
            fill={navBgFill}
            className="transition-colors duration-300"
          />
        </svg>

        {/* Elevated Center Cart Button */}
        <div className="absolute -top-[22px] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className={`relative w-10 h-10 rounded-full transition-all duration-300 shadow-md flex items-center justify-center cursor-pointer group active:scale-95 border-2 ${
              isOverFooter 
                ? 'bg-[#131E33] border-white text-white hover:bg-[#1a2845]' 
                : 'bg-[#c3b091] border-white/20 text-[#131E33] hover:bg-[#b59e7a]'
            }`}
            aria-label="Open Cart"
          >
            <ShoppingCart className={`w-4 h-4 stroke-[2.3] group-hover:scale-105 transition-transform ${isOverFooter ? 'text-white' : 'text-[#131E33]'}`} />
            
            {/* Dynamic Cart Badge */}
            <span className={`absolute -top-1 -right-1 text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs ${
              isOverFooter 
                ? 'bg-rose-500 text-white border border-white' 
                : 'bg-[#131E33] text-white border border-[#c3b091]'
            }`}>
              {totalCartQuantity || 0}
            </span>
          </button>
        </div>

        {/* 5 Navigation Columns */}
        <nav className="relative z-20 grid grid-cols-5 w-full h-full items-center px-1">
          
          {/* 1. HOME */}
          <Link
            to="/"
            className="flex flex-col items-center justify-center h-full group active:scale-95 transition-transform"
          >
            <Home className={`w-4 h-4 mb-0.5 stroke-[2] transition-all duration-300 ${isHomeActive ? iconActiveClass : iconInactiveClass}`} />
            <span className={`text-[8px] uppercase tracking-wider leading-none transition-all duration-300 ${isHomeActive ? textActiveClass : textInactiveClass}`}>
              HOME
            </span>
          </Link>

          {/* 2. PRODUCTS */}
          <Link
            to="/products"
            className="flex flex-col items-center justify-center h-full group active:scale-95 transition-transform"
          >
            <BeltIcon className={`w-4 h-4 mb-0.5 transition-all duration-300 ${isProductsActive ? iconActiveClass : iconInactiveClass}`} />
            <span className={`text-[8px] uppercase tracking-wider leading-none transition-all duration-300 ${isProductsActive ? textActiveClass : textInactiveClass}`}>
              PRODUCTS
            </span>
          </Link>

          {/* 3. CART (Center Column Label) */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex flex-col items-center justify-end h-full pb-1.5 group active:scale-95 transition-transform cursor-pointer"
          >
            <span className={`text-[8px] uppercase font-bold tracking-wider leading-none transition-colors duration-300 ${cartLabelClass}`}>
              CART
            </span>
          </button>

          {/* 4. WHOLESALE */}
          <Link
            to="/sample-wholesale"
            className="flex flex-col items-center justify-center h-full group active:scale-95 transition-transform"
          >
            <Building2 className={`w-4 h-4 mb-0.5 stroke-[2] transition-all duration-300 ${isWholesaleActive ? iconActiveClass : iconInactiveClass}`} />
            <span className={`text-[8px] uppercase tracking-wider leading-none transition-all duration-300 ${isWholesaleActive ? textActiveClass : textInactiveClass}`}>
              WHOLESALE
            </span>
          </Link>

          {/* 5. CONTACT */}
          <Link
            to="/contact"
            className="flex flex-col items-center justify-center h-full group active:scale-95 transition-transform"
          >
            <Phone className={`w-4 h-4 mb-0.5 stroke-[2] transition-all duration-300 ${isContactActive ? iconActiveClass : iconInactiveClass}`} />
            <span className={`text-[8px] uppercase tracking-wider leading-none transition-all duration-300 ${isContactActive ? textActiveClass : textInactiveClass}`}>
              CONTACT
            </span>
          </Link>

        </nav>

      </div>
    </div>
  );
};

export default BottomNav;



