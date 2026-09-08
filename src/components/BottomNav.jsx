import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Sparkles, ShoppingCart, Building2, Store } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';

const BottomNav = () => {
  const location = useLocation();
  const { totalCartQuantity, setIsCartOpen } = useCartWishlist();

  const isHomeActive = location.pathname === '/';
  const isSampleActive = ['/sample-order', '/sample', '/samples', '/product'].includes(location.pathname);
  const isWholesaleActive = ['/sample-wholesale', '/wholesale', '/production', '/b2b'].includes(location.pathname);
  const isRetailActive = ['/retail'].includes(location.pathname);

  return (
    <div className="block sm:hidden fixed bottom-3 inset-x-0 mx-auto w-[96%] max-w-[440px] z-50 pointer-events-auto select-none">
      <div className="relative w-full h-[56px] flex items-center justify-center">
        
        {/* Deep Charcoal / Matte Black Pill Container with Smooth Curved Center Scoop SVG */}
        <svg
          viewBox="0 0 500 70"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full drop-shadow-[0_10px_24px_rgba(0,0,0,0.32)]"
        >
          <path
            d="M 35 0 L 204 0 C 218 0, 224 32, 250 32 C 276 32, 282 0, 296 0 L 465 0 A 35 35 0 0 1 500 35 A 35 35 0 0 1 465 70 L 35 70 A 35 35 0 0 1 0 35 A 35 35 0 0 1 35 0 Z"
            fill="#1a1a1a"
          />
        </svg>

        {/* Elevated Khaki Cart Button (Floating higher with gap above scoop) */}
        <div className="absolute -top-[22px] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative w-10 h-10 rounded-full bg-[#c3b091] hover:bg-[#b59e7a] active:scale-95 transition-all shadow-[0_6px_16px_rgba(195,176,145,0.4)] flex items-center justify-center cursor-pointer group border-2 border-white/20"
            aria-label="Open Sample Cart"
          >
            <ShoppingCart className="w-4 h-4 text-soft-black stroke-[2.3] group-hover:scale-105 transition-transform" />
            
            {/* Dynamic Cart Badge */}
            <span className="absolute -top-1 -right-1 bg-soft-black text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-[#c3b091] shadow-sm">
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
            <Home className={`w-4 h-4 mb-0.5 stroke-[2] transition-colors ${isHomeActive ? 'text-[#c3b091]' : 'text-white/75 group-hover:text-white'}`} />
            <span className={`text-[8px] uppercase font-bold tracking-wider leading-none transition-colors ${isHomeActive ? 'text-[#c3b091]' : 'text-white/75 group-hover:text-white'}`}>
              HOME
            </span>
          </Link>

          {/* 2. SAMPLE */}
          <Link
            to="/sample-order"
            className="flex flex-col items-center justify-center h-full group active:scale-95 transition-transform"
          >
            <Sparkles className={`w-4 h-4 mb-0.5 stroke-[2] transition-colors ${isSampleActive ? 'text-[#c3b091]' : 'text-white/75 group-hover:text-white'}`} />
            <span className={`text-[8px] uppercase font-bold tracking-wider leading-none transition-colors ${isSampleActive ? 'text-[#c3b091]' : 'text-white/75 group-hover:text-white'}`}>
              SAMPLE
            </span>
          </Link>

          {/* 3. CART (Center Column Label below cutout) */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex flex-col items-center justify-end h-full pb-1.5 group active:scale-95 transition-transform cursor-pointer"
          >
            <span className="text-[8px] uppercase font-bold tracking-wider leading-none text-white">
              CART
            </span>
          </button>

          {/* 4. WHOLESALE */}
          <Link
            to="/sample-wholesale"
            className="flex flex-col items-center justify-center h-full group active:scale-95 transition-transform"
          >
            <Building2 className={`w-4 h-4 mb-0.5 stroke-[2] transition-colors ${isWholesaleActive ? 'text-[#c3b091]' : 'text-white/75 group-hover:text-white'}`} />
            <span className={`text-[8px] uppercase font-bold tracking-wider leading-none transition-colors ${isWholesaleActive ? 'text-[#c3b091]' : 'text-white/75 group-hover:text-white'}`}>
              WHOLESALE
            </span>
          </Link>

          {/* 5. RETAIL */}
          <Link
            to="/retail"
            className="flex flex-col items-center justify-center h-full group active:scale-95 transition-transform"
          >
            <Store className={`w-4 h-4 mb-0.5 stroke-[2] transition-colors ${isRetailActive ? 'text-[#c3b091]' : 'text-white/75 group-hover:text-white'}`} />
            <span className={`text-[8px] uppercase font-bold tracking-wider leading-none transition-colors ${isRetailActive ? 'text-[#c3b091]' : 'text-white/75 group-hover:text-white'}`}>
              RETAIL
            </span>
          </Link>

        </nav>

      </div>
    </div>
  );
};

export default BottomNav;



