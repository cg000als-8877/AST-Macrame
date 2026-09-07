import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Tag, 
  Package, 
  Factory, 
  Users, 
  Briefcase, 
  Truck, 
  CreditCard, 
  BarChart3, 
  Globe, 
  Settings,
  ChevronDown,
  ChevronRight,
  Sparkles,
  ExternalLink,
  LogOut,
  Layers
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: ShoppingBag,
    subViews: [
      { id: 'all', label: 'All Orders' },
      { id: 'retail', label: 'Retail Orders' },
      { id: 'wholesale', label: 'Wholesale Orders' },
      { id: 'sample', label: 'Sample Orders' },
      { id: 'custom', label: 'Custom Orders' },
      { id: 'quotations', label: 'Quotations' },
      { id: 'returns', label: 'Returns' },
    ],
  },
  {
    id: 'products',
    label: 'Products',
    icon: Tag,
    subViews: [
      { id: 'all', label: 'All Products' },
      { id: 'variants', label: 'Variants & SKUs' },
      { id: 'pricing', label: 'Pricing & Tiers' },
      { id: 'media', label: 'Media Assets' },
    ],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: Package,
    subViews: [
      { id: 'stock', label: 'Current Stock' },
      { id: 'low-stock', label: 'Low Stock Alerts' },
      { id: 'movements', label: 'Stock Movements' },
      { id: 'adjustments', label: 'Adjustments' },
    ],
  },
  {
    id: 'production',
    label: 'Production',
    icon: Factory,
    subViews: [
      { id: 'queue', label: 'Production Queue' },
      { id: 'in-progress', label: 'In Production' },
      { id: 'qc', label: 'Quality Control' },
      { id: 'completed', label: 'Completed Batches' },
    ],
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: Users,
    subViews: [
      { id: 'all', label: 'All Customers' },
      { id: 'wholesale', label: 'Wholesale Accounts' },
      { id: 'retail', label: 'Retail Clients' },
      { id: 'companies', label: 'Companies' },
      { id: 'leads', label: 'Leads' },
    ],
  },
  {
    id: 'wholesale',
    label: 'Wholesale CRM',
    icon: Briefcase,
    subViews: [
      { id: 'leads', label: 'Leads & Pipeline' },
      { id: 'samples', label: 'Sample Requests' },
      { id: 'quotations', label: 'Quotations (RFQ)' },
      { id: 'pricelists', label: 'Price Lists' },
      { id: 'moq', label: 'MOQ Rules' },
    ],
  },
  {
    id: 'shipping',
    label: 'Shipping',
    icon: Truck,
    subViews: [
      { id: 'ready', label: 'Ready to Ship' },
      { id: 'packed', label: 'Packed' },
      { id: 'shipped', label: 'Shipped (In Transit)' },
      { id: 'delivered', label: 'Delivered' },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: CreditCard,
    subViews: [
      { id: 'payments', label: 'Payments' },
      { id: 'outstanding', label: 'Outstanding' },
      { id: 'refunds', label: 'Refunds' },
      { id: 'expenses', label: 'Expenses' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    subViews: [
      { id: 'sales', label: 'Sales & Revenue' },
      { id: 'wholesale', label: 'Wholesale vs Retail' },
      { id: 'products', label: 'Product Performance' },
      { id: 'customers', label: 'Customer LTV' },
      { id: 'inventory', label: 'Inventory Turnover' },
      { id: 'profit', label: 'Profit & Margins' },
    ],
  },
  {
    id: 'website',
    label: 'Website CMS',
    icon: Globe,
    subViews: [
      { id: 'homepage', label: 'Homepage Sections' },
      { id: 'products', label: 'Product Pages' },
      { id: 'wholesale', label: 'Wholesale Page' },
      { id: 'media', label: 'Media Library' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    subViews: [
      { id: 'users', label: 'Users & Staff' },
      { id: 'roles', label: 'Roles & Permissions' },
      { id: 'payments', label: 'Payments & Banking' },
      { id: 'shipping', label: 'Shipping Rules' },
      { id: 'notifications', label: 'Notifications' },
      { id: 'logs', label: 'System Logs' },
    ],
  },
];

export const AdminSidebar = () => {
  const { activeModule, activeSubView, navigateTo, orders, samples, leads } = useAdmin();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [expandedGroups, setExpandedGroups] = useState({ [activeModule]: true });

  const toggleGroup = (moduleId) => {
    setExpandedGroups((prev) => {
      const currentVal = prev[moduleId] !== undefined ? prev[moduleId] : (activeModule === moduleId);
      return {
        ...prev,
        [moduleId]: !currentVal,
      };
    });
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const pendingOrdersCount = orders.filter(o => !o.status || o.status === 'Pending').length;
  const activeLeadsCount = leads.filter(l => l.status !== 'Won' && l.status !== 'Lost').length;
  const pendingSamplesCount = samples.filter(s => s.status === 'Requested' || s.status === 'Paid').length;

  return (
    <aside className="w-64 bg-[#0F172A] text-slate-300 flex flex-col h-screen border-r border-slate-800 select-none shrink-0">
      
      {/* Brand & Workspace Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo_black.png" alt="AST" className="h-6 w-auto brightness-200 invert object-contain" />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-sm tracking-wide text-white">AST MACRAMÉ</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">B2B + Retail Engine</span>
          </div>
        </div>
      </div>

      {/* Main Multi-Module Navigation */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-none">
        {navigationItems.map((item) => {
          const isActiveModule = activeModule === item.id;
          const isExpanded = expandedGroups[item.id] !== undefined 
            ? expandedGroups[item.id] 
            : isActiveModule;
          const Icon = item.icon;

          // Badges for specific operational areas
          let badgeValue = null;
          if (item.id === 'orders' && pendingOrdersCount > 0) badgeValue = pendingOrdersCount;
          if (item.id === 'wholesale' && activeLeadsCount > 0) badgeValue = activeLeadsCount;

          return (
            <div key={item.id} className="space-y-0.5">
              <button
                type="button"
                onClick={() => {
                  if (item.subViews) {
                    toggleGroup(item.id);
                  }
                  if (!isActiveModule) {
                    navigateTo(item.id, item.subViews ? item.subViews[0].id : 'overview');
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActiveModule
                    ? 'bg-[#1E293B] text-white shadow-2xs font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 shrink-0 ${isActiveModule ? 'text-[#C25E3E]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>


                <div className="flex items-center gap-1.5">
                  {badgeValue && (
                    <span className="bg-[#C25E3E] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                      {badgeValue}
                    </span>
                  )}
                  {item.subViews && (
                    <div className="text-slate-500">
                      {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </div>
                  )}
                </div>
              </button>

              {/* Nested Sub-Views */}
              {item.subViews && isExpanded && (
                <div className="pl-7 pr-1 py-1 space-y-0.5 border-l border-slate-800 ml-5 my-0.5">
                  {item.subViews.map((sub) => {
                    const isSubActive = isActiveModule && activeSubView === sub.id;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => navigateTo(item.id, sub.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors cursor-pointer block ${
                          isSubActive
                            ? 'text-white bg-[#C25E3E]/20 font-bold text-[#f58d70]'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                        }`}
                      >
                        {sub.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Profile & Live Links */}
      <div className="p-3 border-t border-slate-800 bg-[#0B1120] space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 px-2 py-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] text-slate-300 font-mono truncate max-w-[120px]">{currentUser?.email || 'admin@astmacrame.com'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-rose-400 p-1 rounded cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px] font-bold uppercase tracking-wider">
          <Link
            to="/retail"
            target="_blank"
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-center flex items-center justify-center gap-1 transition-colors"
          >
            <span>Retail</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </Link>
          <Link
            to="/sample-order"
            target="_blank"
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-center flex items-center justify-center gap-1 transition-colors"
          >
            <span>Samples</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </Link>
        </div>
      </div>

    </aside>
  );
};
