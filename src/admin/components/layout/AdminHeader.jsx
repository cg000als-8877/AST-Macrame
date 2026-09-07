import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Search, Menu, Bell, Check, ExternalLink, X, AlertCircle, ShoppingBag, Briefcase, Factory, CreditCard, Package } from 'lucide-react';
import { Drawer } from '../ui/Drawer';
import { Badge } from '../ui/Badge';

export const AdminHeader = () => {
  const { 
    activeModule, 
    activeSubView, 
    setIsCommandOpen, 
    setIsMobileNavOpen,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    navigateTo
  } = useAdmin();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const formatTitle = (str) => {
    if (!str) return '';
    return str
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case 'low_stock':
        return <AlertCircle className="w-4 h-4 text-rose-600" />;
      case 'order_new':
        return <ShoppingBag className="w-4 h-4 text-blue-600" />;
      case 'lead_new':
      case 'sample_request':
        return <Briefcase className="w-4 h-4 text-purple-600" />;
      case 'production_completed':
      case 'qc_failed':
        return <Factory className="w-4 h-4 text-amber-600" />;
      case 'payment_received':
        return <CreditCard className="w-4 h-4 text-emerald-600" />;
      default:
        return <Package className="w-4 h-4 text-slate-600" />;
    }
  };

  const handleNotifClick = (notif) => {
    markNotificationRead(notif.id);
    if (notif.targetModule) {
      navigateTo(notif.targetModule);
      setIsNotifOpen(false);
    }
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        
        {/* Left: Mobile Toggle & Page Breadcrumb / Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-base sm:text-lg text-slate-900 capitalize">
              {formatTitle(activeModule)}
            </span>
            {activeSubView && activeSubView !== 'overview' && (
              <>
                <span className="text-slate-300">/</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {formatTitle(activeSubView)}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right: Quick Search Trigger, Alerts, and Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Global Command Palette Trigger */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/70 text-slate-600 rounded-xl text-xs transition-colors cursor-pointer border border-slate-200/60"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline text-slate-500 font-medium">Quick search...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 font-mono text-[10px] font-bold bg-white px-1.5 py-0.5 rounded border border-slate-300 shadow-2xs text-slate-500">
              ⌘K
            </kbd>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={() => setIsNotifOpen(true)}
            className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            title="System Alerts & Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-terracotta text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Sync Status Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Engine</span>
          </div>

        </div>

      </header>

      {/* Slide-out Notification Center Drawer */}
      <Drawer
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        title="Notification Center"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {unreadCount} Unread Alerts
            </span>
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-xs text-terracotta font-medium hover:underline flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" /> Mark all read
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {notifications.length === 0 ? (
              <p className="text-xs text-slate-400 py-8 text-center">No notifications at this time.</p>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotifClick(notif)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    notif.isRead
                      ? 'bg-white border-slate-200/70 hover:border-slate-300'
                      : 'bg-amber-50/40 border-amber-200 hover:border-amber-300'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-slate-100 shrink-0 mt-0.5">
                    {getNotifIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs font-semibold truncate ${notif.isRead ? 'text-slate-800' : 'text-slate-900 font-bold'}`}>
                        {notif.title}
                      </p>
                      <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                        {notif.timestamp ? notif.timestamp.split(' ')[1] : ''}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">
                      {notif.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};
