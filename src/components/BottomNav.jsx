import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Sparkles, Building2, ShoppingBag, MessageSquare } from 'lucide-react';

const navItems = [
  {
    name: 'Home',
    path: '/',
    icon: Home,
  },
  {
    name: 'Sample',
    fullLabel: 'Request a Sample',
    path: '/sample-order',
    matchPaths: ['/sample-order', '/sample', '/samples', '/sample-production', '/product'],
    icon: Sparkles,
  },
  {
    name: 'Wholesale',
    path: '/sample-wholesale',
    matchPaths: ['/sample-wholesale', '/wholesale', '/production', '/b2b'],
    icon: Building2,
  },
  {
    name: 'Retail',
    path: '/retail',
    icon: ShoppingBag,
  },
  {
    name: 'Contact',
    path: '/contact',
    icon: MessageSquare,
  },
];

const BottomNav = () => {
  const location = useLocation();

  const activeIdx = navItems.findIndex((item) =>
    item.matchPaths
      ? item.matchPaths.includes(location.pathname) || location.pathname === item.path
      : location.pathname === item.path
  );

  const safeActiveIdx = activeIdx !== -1 ? activeIdx : 0;

  return (
    <div className="block sm:hidden fixed bottom-3 inset-x-3 max-w-[420px] mx-auto z-40 pointer-events-auto select-none">
      {/* Floating White Bar Body */}
      <div className="relative w-full h-[62px] bg-white rounded-2xl shadow-[0_12px_36px_-6px_rgba(0,0,0,0.18),0_4px_12px_-2px_rgba(0,0,0,0.06)] border border-stone/15 flex items-center">
        
        {/* Animated Liquid Wave Scoop Notch on top edge */}
        <motion.div
          animate={{ x: `${safeActiveIdx * 100}%` }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="absolute -top-[16px] left-0 w-1/5 h-[18px] flex items-center justify-center pointer-events-none -z-10"
        >
          {/* Smooth Concave Liquid Scoop Wave SVG matching bar color */}
          <svg
            viewBox="0 0 100 24"
            preserveAspectRatio="none"
            className="w-[84px] h-[22px] fill-white drop-shadow-[0_-3px_5px_rgba(0,0,0,0.03)]"
          >
            <path d="M 0,0 C 24,0 28,24 50,24 C 72,24 76,0 100,0 L 100,24 L 0,24 Z" />
          </svg>
        </motion.div>

        {/* 5 Navigation Items */}
        <div className="relative z-10 grid grid-cols-5 w-full h-full items-center">
          {navItems.map((item, index) => {
            const isActive = index === safeActiveIdx;
            const IconComponent = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className="relative flex flex-col items-center justify-center h-full group"
              >
                {/* Active Popped Circular Bubble */}
                {isActive ? (
                  <motion.div
                    layoutId="activePoppedBubble"
                    transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                    className="absolute -top-5.5 w-12 h-12 rounded-full bg-gradient-to-tr from-terracotta to-[#D67C63] text-white flex items-center justify-center shadow-[0_8px_20px_-2px_rgba(196,112,89,0.55)] border-[3.5px] border-white z-20"
                  >
                    <IconComponent className="w-5 h-5 fill-current stroke-white stroke-[1.25]" />
                  </motion.div>
                ) : (
                  /* Inactive Stroke Icon */
                  <div className="flex items-center justify-center mb-0.5 text-dark-charcoal/65 group-hover:text-soft-black transition-colors duration-200">
                    <IconComponent className="w-5 h-5 stroke-[1.8]" />
                  </div>
                )}

                {/* Label Underneath */}
                <span
                  className={`text-[9px] uppercase font-bold tracking-wider leading-none transition-all duration-200 ${
                    isActive
                      ? 'text-terracotta font-extrabold translate-y-3.5 scale-105'
                      : 'text-dark-charcoal/70 group-hover:text-soft-black'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default BottomNav;
