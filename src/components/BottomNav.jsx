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
      {/* Floating Capsule Bar */}
      <nav className="relative w-full h-[64px] bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_12px_36px_-6px_rgba(0,0,0,0.18),0_4px_12px_-2px_rgba(0,0,0,0.06)] border border-stone/20 px-1 flex items-center">
        
        {/* 5 Navigation Items */}
        <div className="grid grid-cols-5 w-full h-full items-center">
          {navItems.map((item, index) => {
            const isActive = index === safeActiveIdx;
            const IconComponent = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className="relative flex flex-col items-center justify-center h-full py-1 group"
              >
                {/* Active Indicator Background Glide */}
                {isActive && (
                  <motion.div
                    layoutId="bottomNavActiveIndicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-x-1 inset-y-1 bg-terracotta/10 rounded-xl -z-10"
                  />
                )}

                {/* Icon Container */}
                <div
                  className={`relative flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'w-8.5 h-8.5 rounded-full bg-gradient-to-tr from-terracotta to-[#D67C63] text-white shadow-[0_4px_14px_rgba(196,112,89,0.38)] -translate-y-0.5'
                      : 'w-7 h-7 text-dark-charcoal/65 group-hover:text-soft-black'
                  }`}
                >
                  <IconComponent
                    className={`transition-all duration-200 ${
                      isActive
                        ? 'w-4.5 h-4.5 fill-current stroke-white stroke-[1.2]'
                        : 'w-5 h-5 stroke-[1.75]'
                    }`}
                  />
                </div>

                {/* Label Underneath */}
                <span
                  className={`text-[9px] uppercase font-bold tracking-wider leading-none mt-1 transition-all duration-200 ${
                    isActive
                      ? 'text-terracotta font-extrabold scale-105'
                      : 'text-dark-charcoal/70 group-hover:text-soft-black'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

      </nav>
    </div>
  );
};

export default BottomNav;
