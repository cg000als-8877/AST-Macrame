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

const getNotchPath = (x) => {
  const r = 16;
  const w = 34; // notch half-width
  const d = 30; // scoop depth
  const leftStraight = Math.max(r, x - w);
  const rightStraight = Math.min(500 - r, x + w);

  return `M ${r},0 L ${leftStraight},0 C ${x - 18},0 ${x - 16},${d} ${x},${d} C ${x + 16},${d} ${x + 18},0 ${rightStraight},0 L ${500 - r},0 Q 500,0 500,${r} L 500,${68 - r} Q 500,68 ${500 - r},68 L ${r},68 Q 0,68 0,${68 - r} L 0,${r} Q 0,0 ${r},0 Z`;
};

const BottomNav = () => {
  const location = useLocation();

  const activeIdx = navItems.findIndex((item) =>
    item.matchPaths
      ? item.matchPaths.includes(location.pathname) || location.pathname === item.path
      : location.pathname === item.path
  );

  const safeActiveIdx = activeIdx !== -1 ? activeIdx : 0;
  const activeX = 50 + safeActiveIdx * 100;
  const ActiveIcon = navItems[safeActiveIdx].icon;

  return (
    <div className="block sm:hidden fixed bottom-3 inset-x-3 max-w-[420px] mx-auto z-40 pointer-events-auto select-none">
      <div className="relative w-full h-[64px]">
        
        {/* Animated Liquid Notch Background SVG */}
        <svg
          viewBox="0 0 500 68"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full fill-white drop-shadow-[0_12px_28px_rgba(0,0,0,0.14)]"
          style={{ filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.12)) drop-shadow(0 2px 6px rgba(0,0,0,0.06))' }}
        >
          <motion.path
            animate={{ d: getNotchPath(activeX) }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="fill-white"
          />
        </svg>

        {/* Floating Active Circular Bubble */}
        <motion.div
          animate={{ left: `${safeActiveIdx * 20}%` }}
          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          className="absolute -top-5.5 w-1/5 h-[50px] flex items-center justify-center pointer-events-none z-30"
        >
          <div className="w-13 h-13 rounded-full bg-white shadow-[0_8px_20px_-3px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.08)] border-2 border-stone/15 flex items-center justify-center text-terracotta">
            <ActiveIcon className="w-6 h-6 fill-terracotta stroke-terracotta stroke-[1.2]" />
          </div>
        </motion.div>

        {/* 5 Navigation Items */}
        <nav className="relative z-20 grid grid-cols-5 w-full h-full items-center">
          {navItems.map((item, index) => {
            const isActive = index === safeActiveIdx;
            const IconComponent = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className="relative flex flex-col items-center justify-center h-full group"
              >
                {isActive ? (
                  /* Active Item: Position label at bottom of the scoop */
                  <div className="flex flex-col items-center justify-end h-full pb-2">
                    <span className="text-[10px] uppercase font-black tracking-wider leading-none text-soft-black">
                      {item.name}
                    </span>
                  </div>
                ) : (
                  /* Inactive Item: Normal centered icon and label */
                  <div className="flex flex-col items-center justify-center h-full pt-1 pb-1">
                    <IconComponent className="w-5 h-5 stroke-[1.75] text-dark-charcoal/65 group-hover:text-soft-black transition-colors mb-1" />
                    <span className="text-[9px] uppercase font-bold tracking-wider leading-none text-dark-charcoal/70 group-hover:text-soft-black">
                      {item.name}
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

      </div>
    </div>
  );
};

export default BottomNav;
