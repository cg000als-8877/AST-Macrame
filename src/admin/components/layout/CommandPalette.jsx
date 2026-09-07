import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../../context/AdminContext';
import { Search, ShoppingBag, Tag, Package, Users, Briefcase, Truck, ArrowRight, X } from 'lucide-react';
import { navigationItems } from './AdminSidebar';

export const CommandPalette = () => {
  const { isCommandOpen, setIsCommandOpen, navigateTo, orders, products, companies, leads } = useAdmin();
  const [query, setQuery] = useState('');

  if (!isCommandOpen) return null;

  // Flattened nav commands
  const allNavs = [];
  navigationItems.forEach((nav) => {
    allNavs.push({ label: nav.label, module: nav.id, sub: 'overview', icon: nav.icon });
    if (nav.subViews) {
      nav.subViews.forEach((sub) => {
        allNavs.push({ label: `${nav.label} → ${sub.label}`, module: nav.id, sub: sub.id, icon: nav.icon });
      });
    }
  });

  const matchingNavs = allNavs.filter((n) =>
    n.label.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const matchingOrders = orders.filter((o) =>
    (o.orderNumber || '').toLowerCase().includes(query.toLowerCase()) ||
    (o.name || '').toLowerCase().includes(query.toLowerCase()) ||
    (o.companyName || '').toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const matchingCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const handleSelect = (module, sub) => {
    navigateTo(module, sub);
    setIsCommandOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCommandOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10"
        >
          {/* Search Input */}
          <div className="p-4 border-b border-slate-200 flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Jump to module, order, wholesale company, or customer..."
              className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
            />
            <button
              onClick={() => setIsCommandOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-3">
            
            {/* Navigation Modules */}
            {matchingNavs.length > 0 && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-1">
                  Navigation
                </span>
                <div className="space-y-0.5">
                  {matchingNavs.map((nav, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(nav.module, nav.sub)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <nav.icon className="w-4 h-4 text-slate-400 group-hover:text-[#C25E3E]" />
                        <span>{nav.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Orders */}
            {matchingOrders.length > 0 && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-1">
                  Orders
                </span>
                <div className="space-y-0.5">
                  {matchingOrders.map((ord) => (
                    <button
                      key={ord.id}
                      onClick={() => handleSelect('orders', 'all')}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-slate-400" />
                        <span className="font-mono">{ord.orderNumber}</span>
                        <span className="text-slate-400 font-normal">• {ord.name || ord.companyName}</span>
                      </div>
                      <span className="text-slate-500 font-bold">৳{Number(ord.totalCost).toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Companies */}
            {matchingCompanies.length > 0 && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-1">
                  Wholesale Companies
                </span>
                <div className="space-y-0.5">
                  {matchingCompanies.map((comp) => (
                    <button
                      key={comp.id}
                      onClick={() => handleSelect('customers', 'companies')}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        <span>{comp.name}</span>
                        <span className="text-slate-400 font-normal">({comp.country})</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#C25E3E] bg-orange-50 px-2 py-0.5 rounded">
                        {comp.tier}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          <div className="p-2.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] text-slate-400">
            <span>Use ↑↓ to navigate</span>
            <span>ESC to close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
