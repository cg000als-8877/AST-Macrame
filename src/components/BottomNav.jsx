import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, Building2, Phone } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';

const BeltIcon = ({ className = "w-3.5 h-3.5" }) => (
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
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    const checkModal = () => {
      setIsModalOpen(document.body.classList.contains('modal-open'));
    };

    checkModal();

    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

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

  if (isModalOpen) return null;

  const isHomeActive = location.pathname === '/';
  const isProductsActive = ['/products', '/gallery', '/collection', '/all-products'].includes(location.pathname);
  const isWholesaleActive = ['/sample-wholesale', '/wholesale', '/production', '/b2b'].includes(location.pathname);
  const isContactActive = ['/contact', '/support'].includes(location.pathname);

  // Dynamic colors based on footer visibility
  const navBgFill = isOverFooter ? '#FFFFFF' : '#131E33';
  const navStroke = isOverFooter ? 'rgba(19, 30, 51, 0.22)' : 'transparent';
  const iconInactiveClass = isOverFooter ? 'text-[#131E33]/70 group-hover:text-[#131E33]' : 'text-white/80 group-hover:text-white';
  const iconActiveClass = isOverFooter ? 'text-[#131E33] font-black scale-105' : 'text-[#c3b091] font-black scale-105';
  const textInactiveClass = isOverFooter ? 'text-[#131E33]/70 group-hover:text-[#131E33]' : 'text-white/80 group-hover:text-white';
  const textActiveClass = isOverFooter ? 'text-[#131E33] font-extrabold' : 'text-[#c3b091] font-extrabold';
  const cartLabelClass = isOverFooter ? 'text-[#131E33]' : 'text-white';

  return (
    <>
      {/* Progressive Gradient Blur Under Mobile Bottom Nav */}
      <div 
        aria-hidden="true" 
        className="mobile-bottom-nav-gradient-blur"
      />

      <div 
        data-mobile-bottom-nav
        className="mobile-bottom-nav-container block sm:hidden fixed bottom-3 inset-x-0 mx-auto w-[92%] max-w-[390px] z-50 pointer-events-auto select-none transition-all duration-300"
      >
        <div className="relative w-full h-[48px] flex items-center justify-center">
          
          {/* Pill Container SVG with adaptive background fill & thin stroke only in footer menu */}
          <svg
            viewBox="0 0 400 48"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full transition-all duration-300"
          >
            <path
              d="M 24 0 L 166 0 C 176 0, 184 22, 200 22 C 216 22, 224 0, 234 0 L 376 0 A 24 24 0 0 1 400 24 A 24 24 0 0 1 376 48 L 24 48 A 24 24 0 0 1 0 24 A 24 24 0 0 1 24 0 Z"
              fill={navBgFill}
              stroke={navStroke}
              strokeWidth={isOverFooter ? 1 : 0}
              vectorEffect="non-scaling-stroke"
              className="transition-colors duration-300"
            />
          </svg>

          {/* Elevated Center Cart Button */}
          <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className={`relative w-9 h-9 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer group active:scale-95 ${
                isOverFooter 
                  ? 'bg-[#131E33] text-white border border-white/80 hover:bg-[#1a2845]' 
                  : 'bg-[#c3b091] text-[#131E33] border-0 hover:bg-[#b59e7a]'
              }`}
              aria-label="Open Cart"
            >
              <ShoppingCart className={`w-3.5 h-3.5 stroke-[2.3] group-hover:scale-105 transition-transform ${isOverFooter ? 'text-white' : 'text-[#131E33]'}`} />
              
              {/* Dynamic Cart Badge (thin stroke only when in footer menu) */}
              <span className={`absolute -top-1 -right-1 text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center ${
                isOverFooter 
                  ? 'bg-white text-[#131E33] border border-[#131E33]' 
                  : 'bg-[#131E33] text-white'
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
              <Home className={`w-3.5 h-3.5 mb-0.5 stroke-[2] transition-all duration-300 ${isHomeActive ? iconActiveClass : iconInactiveClass}`} />
              <span className={`text-[7.5px] uppercase tracking-wider leading-none transition-all duration-300 ${isHomeActive ? textActiveClass : textInactiveClass}`}>
                HOME
              </span>
            </Link>

            {/* 2. PRODUCTS */}
            <Link
              to="/products"
              className="flex flex-col items-center justify-center h-full group active:scale-95 transition-transform"
            >
              <BeltIcon className={`w-3.5 h-3.5 mb-0.5 transition-all duration-300 ${isProductsActive ? iconActiveClass : iconInactiveClass}`} />
              <span className={`text-[7.5px] uppercase tracking-wider leading-none transition-all duration-300 ${isProductsActive ? textActiveClass : textInactiveClass}`}>
                PRODUCTS
              </span>
            </Link>

            {/* 3. CART (Center Column Label) */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="flex flex-col items-center justify-end h-full pb-1 group active:scale-95 transition-transform cursor-pointer"
            >
              <span className={`text-[7.5px] uppercase font-bold tracking-wider leading-none transition-colors duration-300 ${cartLabelClass}`}>
                CART
              </span>
            </button>

            {/* 4. WHOLESALE */}
            <Link
              to="/sample-wholesale"
              className="flex flex-col items-center justify-center h-full group active:scale-95 transition-transform"
            >
              <Building2 className={`w-3.5 h-3.5 stroke-[2] transition-all duration-300 ${isWholesaleActive ? iconActiveClass : iconInactiveClass}`} />
              <span className={`text-[7.5px] uppercase tracking-wider leading-none transition-all duration-300 ${isWholesaleActive ? textActiveClass : textInactiveClass}`}>
                WHOLESALE
              </span>
            </Link>

            {/* 5. CONTACT */}
            <Link
              to="/contact"
              className="flex flex-col items-center justify-center h-full group active:scale-95 transition-transform"
            >
              <Phone className={`w-3.5 h-3.5 stroke-[2] transition-all duration-300 ${isContactActive ? iconActiveClass : iconInactiveClass}`} />
              <span className={`text-[7.5px] uppercase tracking-wider leading-none transition-all duration-300 ${isContactActive ? textActiveClass : textInactiveClass}`}>
                CONTACT
              </span>
            </Link>

          </nav>

        </div>
      </div>
    </>
  );
};

export default BottomNav;



