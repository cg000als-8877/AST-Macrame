import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  subscribeStoreConfig, 
  updateStoreConfig, 
  subscribeOrders, 
  subscribeAnalytics,
  updateOrderStatus,
  exportOrdersToCSV,
  DEFAULT_STORE_CONFIG 
} from '../services/storeService';
import { 
  DollarSign, 
  Package, 
  ShoppingBag, 
  Users, 
  LogOut, 
  Save, 
  Search, 
  Check, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  Phone,
  MapPin,
  Eye,
  Filter,
  Download,
  TrendingUp,
  Sparkles,
  Sliders,
  RefreshCw,
  Layers,
  Tag,
  FileText,
  Image as ImageIcon,
  Calendar,
  Globe,
  Mail,
  Truck,
  Inbox,
  AlertCircle
} from 'lucide-react';

import b1 from '../assets/products/Black/1.webp';
import n1 from '../assets/products/Navy/1.webp';
import br1 from '../assets/products/Brown/1.webp';
import m1 from '../assets/products/Maroon/1.webp';
import k1 from '../assets/products/Khaki/1.webp';

const defaultColorImages = {
  Black: b1,
  Navy: n1,
  Brown: br1,
  Maroon: m1,
  Khaki: k1,
};

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Active Tab: 'overview' | 'orders' | 'catalog' | 'traffic' | 'settings' | 'security'
  const [activeTab, setActiveTab] = useState('overview');
  
  // Store Config
  const [config, setConfig] = useState(DEFAULT_STORE_CONFIG);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [configSaveSuccess, setConfigSaveSuccess] = useState(false);

  // Orders
  const [orders, setOrders] = useState([]);
  const [channelFilter, setChannelFilter] = useState('all'); // 'all' | 'retail' | 'sample'
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // Analytics
  const [analyticsData, setAnalyticsData] = useState([]);

  // Subscriptions
  useEffect(() => {
    const unsubConfig = subscribeStoreConfig((data) => {
      setConfig(prev => ({ ...prev, ...data }));
    });
    return () => unsubConfig();
  }, []);

  useEffect(() => {
    const unsubOrders = subscribeOrders((orderList) => {
      setOrders(orderList);
    });
    return () => unsubOrders();
  }, []);

  useEffect(() => {
    const unsubAnalytics = subscribeAnalytics((data) => {
      setAnalyticsData(data);
    });
    return () => unsubAnalytics();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleConfigSave = async (e) => {
    if (e) e.preventDefault();
    setIsSavingConfig(true);
    try {
      await updateStoreConfig(config);
      setConfigSaveSuccess(true);
      setTimeout(() => setConfigSaveSuccess(false), 3500);
    } catch (err) {
      alert('Failed to save store settings: ' + err.message);
    } finally {
      setIsSavingConfig(false);
    }
  };

  const handleCopyCourierInfo = (order) => {
    const itemsText = order.items?.map(i => `${i.name || 'Belt'} (${i.color}, ${i.size}) x${i.quantity || 1}`).join(' + ') || order.orderType || 'Macramé Belt';
    const text = `Name: ${order.name}\nPhone: ${order.phone}\nAddress: ${order.address}\nCity: ${order.city || order.district || ''}\nAmount: ${order.totalCost} BDT (COD)\nItem: ${itemsText}\nNote: ${order.note || 'None'}\nOrder ID: ${order.orderId || order.id}`;
    navigator.clipboard.writeText(text);
    setCopiedId(order.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Order Filtering
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      (order.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.phone || '').includes(searchQuery) ||
      (order.orderId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.address || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.city || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.company || '').toLowerCase().includes(searchQuery.toLowerCase());

    const isSample = (order.channel === 'Sample Order' || order.formType === 'Sample' || (order.orderId || '').startsWith('SAM-'));
    
    let matchesChannel = true;
    if (channelFilter === 'retail') matchesChannel = !isSample;
    if (channelFilter === 'sample') matchesChannel = isSample;

    const matchesStatus = statusFilter === 'all' || (order.status || 'Pending').toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesChannel && matchesStatus;
  });

  // KPI Computations
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalCost) || 0), 0);
  const retailOrders = orders.filter(o => o.channel !== 'Sample Order' && o.formType !== 'Sample' && !(o.orderId || '').startsWith('SAM-'));
  const sampleOrders = orders.filter(o => o.channel === 'Sample Order' || o.formType === 'Sample' || (o.orderId || '').startsWith('SAM-'));
  const pendingCount = orders.filter(o => !o.status || o.status === 'Pending').length;
  const inProductionCount = orders.filter(o => o.status === 'In Production').length;
  const shippedCount = orders.filter(o => o.status === 'Shipped').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  // Today's analytics
  const todayStr = new Date().toISOString().split('T')[0];
  const todayAnalytics = analyticsData.find(a => a.date === todayStr || a.id === todayStr) || {};
  const todayViews = todayAnalytics.views || 0;
  const totalTrafficViews = analyticsData.reduce((acc, curr) => acc + (curr.views || 0), 0);

  // Color popularity calculation
  const colorCounts = { Black: 0, Navy: 0, Brown: 0, Maroon: 0, Khaki: 0 };
  orders.forEach(o => {
    if (o.items && Array.isArray(o.items)) {
      o.items.forEach(it => {
        if (colorCounts[it.color] !== undefined) {
          colorCounts[it.color] += (Number(it.quantity) || 1);
        }
      });
    }
  });
  const totalColorItemsSold = Object.values(colorCounts).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="min-h-screen bg-[#F4F1EA] font-sans text-soft-black flex flex-col selection:bg-terracotta selection:text-white">
      
      {/* ================= TOP ADMIN HEADER ================= */}
      <header className="bg-[#1C2841] text-white border-b border-[#2D3F66] sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          
          {/* Brand & Portal Info */}
          <div className="flex items-center gap-3">
            <img src="/logo_black.png" alt="AST Macramé" className="h-7 w-auto brightness-200 invert object-contain" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm sm:text-base tracking-wider text-white">AST MACRAMÉ</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest bg-terracotta/90 text-white">
                  Executive Dashboard
                </span>
              </div>
              <span className="text-[10px] text-white/60 tracking-wider">
                Authorized Artisan Management
              </span>
            </div>
          </div>

          {/* Quick Actions & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            <Link
              to="/retail"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold tracking-wider uppercase transition-colors text-white/90"
              title="Open Live Retail Store"
            >
              <span className="hidden md:inline">Retail Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/sample-order"
              target="_blank"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold tracking-wider uppercase transition-colors text-white/90"
              title="Open Live Sample Order Page"
            >
              <span>Sample Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="hidden sm:flex flex-col text-right pl-2 border-l border-white/15">
              <span className="text-xs font-medium text-white/90 max-w-[140px] truncate">{currentUser?.email || 'admin@astmacrame.com'}</span>
              <span className="text-[10px] text-emerald-400 font-semibold uppercase flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Live Connected
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>

          </div>
        </div>

        {/* Global Success Notification Pill */}
        {configSaveSuccess && (
          <div className="bg-emerald-600 text-white text-xs font-bold py-1.5 px-4 text-center tracking-wider uppercase shadow-md flex items-center justify-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>Store Configuration & Catalog Updated Live Across All Devices!</span>
          </div>
        )}
      </header>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 flex-1 w-full flex flex-col gap-5 sm:gap-6">
        
        {/* ================= NAVIGATION TABS DOCK ================= */}
        <div className="bg-white border border-[#DDD8CE] p-1.5 rounded-2xl shadow-xs flex items-center justify-between overflow-x-auto gap-1.5 scrollbar-none">
          <div className="flex items-center gap-1 min-w-max">
            
            {/* Tab 1: Overview */}
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#1C2841] text-white shadow-sm'
                  : 'text-dark-charcoal/70 hover:bg-[#FAF8F5] hover:text-soft-black'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Overview</span>
            </button>

            {/* Tab 2: Orders */}
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer relative ${
                activeTab === 'orders'
                  ? 'bg-[#1C2841] text-white shadow-sm'
                  : 'text-dark-charcoal/70 hover:bg-[#FAF8F5] hover:text-soft-black'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Orders ({orders.length})</span>
              {pendingCount > 0 && (
                <span className="bg-terracotta text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {pendingCount}
                </span>
              )}
            </button>

            {/* Tab 3: Catalog & Product */}
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-[#1C2841] text-white shadow-sm'
                  : 'text-dark-charcoal/70 hover:bg-[#FAF8F5] hover:text-soft-black'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>Catalog & Prices</span>
            </button>

            {/* Tab 4: Traffic & Visitors */}
            <button
              onClick={() => setActiveTab('traffic')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'traffic'
                  ? 'bg-[#1C2841] text-white shadow-sm'
                  : 'text-dark-charcoal/70 hover:bg-[#FAF8F5] hover:text-soft-black'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Traffic ({todayViews} today)</span>
            </button>

            {/* Tab 5: Settings & Announcements */}
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#1C2841] text-white shadow-sm'
                  : 'text-dark-charcoal/70 hover:bg-[#FAF8F5] hover:text-soft-black'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Store Settings</span>
            </button>

            {/* Tab 6: Security */}
            <button
              onClick={() => setActiveTab('security')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-[#1C2841] text-white shadow-sm'
                  : 'text-dark-charcoal/70 hover:bg-[#FAF8F5] hover:text-soft-black'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Security</span>
            </button>

          </div>

          <div className="hidden xl:flex items-center gap-2 text-xs text-dark-charcoal/60 px-3 shrink-0">
            <span>Sync Engine:</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Google Firestore Live
            </span>
          </div>
        </div>

        {/* ================= TAB 1: OVERVIEW & ANALYTICS ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Top KPI Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
              
              {/* Gross Revenue */}
              <div className="bg-white border border-[#DDD8CE] p-4 sm:p-5 rounded-2xl shadow-xs">
                <div className="flex items-center justify-between text-dark-charcoal/60 mb-2">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Gross Revenue</span>
                  <div className="p-2 rounded-xl bg-terracotta/10 text-terracotta">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-soft-black">
                  ৳ {totalRevenue.toLocaleString()}
                </div>
                <span className="text-[10px] sm:text-[11px] text-emerald-700 font-semibold mt-1 block">
                  AOV: ৳{avgOrderValue.toLocaleString()} / order
                </span>
              </div>

              {/* Total Orders */}
              <div className="bg-white border border-[#DDD8CE] p-4 sm:p-5 rounded-2xl shadow-xs">
                <div className="flex items-center justify-between text-dark-charcoal/60 mb-2">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Total Orders</span>
                  <div className="p-2 rounded-xl bg-[#1C2841]/10 text-[#1C2841]">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-soft-black">
                  {orders.length}
                </div>
                <span className="text-[10px] sm:text-[11px] text-dark-charcoal/60 mt-1 block">
                  {retailOrders.length} Retail • {sampleOrders.length} Sample
                </span>
              </div>

              {/* Pending Delivery */}
              <div className="bg-white border border-[#DDD8CE] p-4 sm:p-5 rounded-2xl shadow-xs">
                <div className="flex items-center justify-between text-dark-charcoal/60 mb-2">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Pending Action</span>
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700">
                    <Truck className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-amber-800">
                  {pendingCount}
                </div>
                <span className="text-[10px] sm:text-[11px] text-amber-700 font-semibold mt-1 block">
                  {inProductionCount} In Production • {shippedCount} Shipped
                </span>
              </div>

              {/* Today's Traffic */}
              <div className="bg-white border border-[#DDD8CE] p-4 sm:p-5 rounded-2xl shadow-xs">
                <div className="flex items-center justify-between text-dark-charcoal/60 mb-2">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Today's Traffic</span>
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-700">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-soft-black">
                  {todayViews} <span className="text-xs font-normal text-dark-charcoal/50">views</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-emerald-700 font-semibold mt-1 block">
                  {orders.length > 0 && todayViews > 0 ? `${((orders.length / todayViews) * 100).toFixed(1)}% Conversion rate` : 'Live Tracking'}
                </span>
              </div>

            </div>

            {/* Quick Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Color Popularity Breakdown */}
              <div className="bg-white border border-[#DDD8CE] p-5 sm:p-6 rounded-2xl shadow-xs space-y-4 lg:col-span-2">
                <div className="flex items-center justify-between border-b border-[#EAE5DB] pb-3">
                  <h3 className="font-bold text-base text-soft-black flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-terracotta" />
                    <span>Most Ordered Colorways</span>
                  </h3>
                  <span className="text-xs text-dark-charcoal/60 font-medium">Sales Share</span>
                </div>

                <div className="space-y-3.5">
                  {[
                    { name: 'Black', hex: '#18181B', count: colorCounts.Black },
                    { name: 'Navy', hex: '#1C2841', count: colorCounts.Navy },
                    { name: 'Brown', hex: '#5C4033', count: colorCounts.Brown },
                    { name: 'Maroon', hex: '#800000', count: colorCounts.Maroon },
                    { name: 'Khaki', hex: '#C3B091', count: colorCounts.Khaki },
                  ].map((color) => {
                    const percentage = Math.round((color.count / totalColorItemsSold) * 100) || 0;
                    return (
                      <div key={color.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <div className="flex items-center gap-2">
                            <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: color.hex }} />
                            <span>{color.name}</span>
                          </div>
                          <span className="text-dark-charcoal/70">{color.count} pcs ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-soft-black transition-all duration-500" 
                            style={{ width: `${Math.max(4, percentage)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Channel Distribution Card */}
              <div className="bg-white border border-[#DDD8CE] p-5 sm:p-6 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
                <div>
                  <div className="border-b border-[#EAE5DB] pb-3 mb-4">
                    <h3 className="font-bold text-base text-soft-black flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-700" />
                      <span>Sales Channels</span>
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDD8CE] flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xs uppercase tracking-wider text-soft-black block">Retail COD Campaign</span>
                        <span className="text-[11px] text-dark-charcoal/60">Bangladesh Ad Traffic</span>
                      </div>
                      <span className="font-serif font-bold text-base text-soft-black">{retailOrders.length}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDD8CE] flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xs uppercase tracking-wider text-soft-black block">Sample Orders</span>
                        <span className="text-[11px] text-dark-charcoal/60">B2B & Test Belts</span>
                      </div>
                      <span className="font-serif font-bold text-base text-soft-black">{sampleOrders.length}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EAE5DB]">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="w-full bg-[#1C2841] hover:bg-black text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Manage All Orders</span>
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================= TAB 2: UNIFIED ORDERS (RETAIL & SAMPLE) ================= */}
        {activeTab === 'orders' && (
          <div className="space-y-5">
            
            {/* Orders Header & Search / Filter Controls */}
            <div className="bg-white border border-[#DDD8CE] p-4 sm:p-5 rounded-2xl shadow-xs space-y-4">
              
              <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                
                {/* Search Input */}
                <div className="relative w-full md:max-w-md">
                  <input
                    type="text"
                    placeholder="Search by customer name, phone, order ID, address, city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl px-3.5 py-2.5 pl-10 text-xs sm:text-sm focus:outline-none focus:border-soft-black text-soft-black font-medium placeholder:text-dark-charcoal/40"
                  />
                  <Search className="w-4 h-4 text-dark-charcoal/40 absolute left-3.5 top-3" />
                </div>

                {/* CSV Export Button */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <button
                    onClick={() => exportOrdersToCSV(filteredOrders)}
                    className="px-4 py-2.5 bg-[#FAF8F5] border border-[#DDD8CE] hover:border-soft-black text-soft-black rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV ({filteredOrders.length})</span>
                  </button>
                </div>

              </div>

              {/* Channel & Status Filter Pills */}
              <div className="pt-3 border-t border-[#EAE5DB] flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                
                {/* Channel Filter */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/60 mr-1 shrink-0">Channel:</span>
                  {[
                    { id: 'all', label: 'All Channels' },
                    { id: 'retail', label: `Retail COD (${retailOrders.length})` },
                    { id: 'sample', label: `Sample Orders (${sampleOrders.length})` }
                  ].map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => setChannelFilter(ch.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                        channelFilter === ch.id
                          ? 'bg-[#1C2841] text-white shadow-xs'
                          : 'bg-[#FAF8F5] border border-[#DDD8CE] text-dark-charcoal/70 hover:text-soft-black'
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/60 mr-1 shrink-0">Status:</span>
                  {['all', 'Pending', 'Confirmed', 'In Production', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                        statusFilter.toLowerCase() === st.toLowerCase()
                          ? 'bg-terracotta text-white shadow-xs'
                          : 'bg-[#FAF8F5] border border-[#DDD8CE] text-dark-charcoal/70 hover:text-soft-black'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

              </div>

            </div>

            {/* Orders Cards Grid */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white border border-[#DDD8CE] p-12 text-center rounded-2xl text-dark-charcoal/60 space-y-3">
                <Inbox className="w-12 h-12 mx-auto text-dark-charcoal/30" />
                <h4 className="font-bold text-base text-soft-black">No Orders Match Your Filters</h4>
                <p className="text-xs text-dark-charcoal/60 max-w-sm mx-auto">
                  When new customers place orders or request samples, they will appear here in real-time.
                </p>
                {(searchQuery || channelFilter !== 'all' || statusFilter !== 'all') && (
                  <button
                    onClick={() => { setSearchQuery(''); setChannelFilter('all'); setStatusFilter('all'); }}
                    className="text-xs font-bold text-terracotta underline cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredOrders.map((order) => {
                  const cleanPhone = (order.phone || '').replace(/[^0-9]/g, '');
                  const waUrl = `https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(order.name || '')},%20this%20is%20AST%20Macram%C3%A9%20regarding%20your%20order%20${encodeURIComponent(order.orderId || '')}.`;
                  const isCopied = copiedId === order.id;
                  const isSample = (order.channel === 'Sample Order' || order.formType === 'Sample' || (order.orderId || '').startsWith('SAM-'));

                  return (
                    <div 
                      key={order.id} 
                      className="bg-white border border-[#DDD8CE] p-5 rounded-2xl shadow-xs flex flex-col justify-between gap-4 hover:border-soft-black/50 transition-all group"
                    >
                      {/* Top Bar: Order ID, Channel Badge, Status, Price */}
                      <div className="flex items-start justify-between border-b border-[#EAE5DB] pb-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono font-bold text-sm text-soft-black">{order.orderId || order.id}</span>
                            
                            {/* Channel Badge */}
                            <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              isSample ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-blue-100 text-blue-900 border border-blue-300'
                            }`}>
                              {isSample ? 'Sample Order' : 'Retail COD'}
                            </span>

                            {/* Status Badge */}
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'In Production' ? 'bg-purple-100 text-purple-800' :
                              order.status === 'Confirmed' ? 'bg-amber-100 text-amber-800' :
                              order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-stone/20 text-soft-black'
                            }`}>
                              {order.status || 'Pending'}
                            </span>
                          </div>

                          <span className="text-[11px] text-dark-charcoal/60 block mt-1">
                            {order.date} {order.time ? `• ${order.time}` : ''}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-lg font-serif font-bold text-terracotta">
                            ৳ {Number(order.totalCost || 0).toLocaleString()}
                          </span>
                          <span className="text-[10px] text-dark-charcoal/50 block font-medium">
                            {order.paymentMethod || (isSample ? 'Sample Quote' : 'COD')}
                          </span>
                        </div>
                      </div>

                      {/* Customer Details Box */}
                      <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EAE5DB] text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-soft-black text-sm">{order.name}</span>
                          {order.company && (
                            <span className="text-[10.5px] font-semibold text-dark-charcoal/70 bg-white px-2 py-0.5 rounded border border-[#DDD8CE]">
                              {order.company}
                            </span>
                          )}
                        </div>

                        {/* Phone & WhatsApp Chat Link */}
                        <div className="flex items-center gap-2 text-dark-charcoal flex-wrap pt-0.5">
                          <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <a href={`tel:${order.phone}`} className="font-semibold text-soft-black hover:underline">{order.phone}</a>
                          
                          <a 
                            href={waUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="ml-auto text-[10.5px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-300 hover:bg-emerald-100 flex items-center gap-1 transition-colors"
                          >
                            <span>WhatsApp</span>
                            <span>💬</span>
                          </a>
                        </div>

                        {/* Address */}
                        <div className="flex items-start gap-2 text-dark-charcoal/80 pt-1">
                          <MapPin className="w-3.5 h-3.5 text-terracotta shrink-0 mt-0.5" />
                          <span className="leading-snug">
                            {order.address} {order.city ? `• ${order.city}` : ''} {order.country && order.country !== 'Bangladesh' ? `(${order.country})` : ''}
                          </span>
                        </div>

                        {/* Note */}
                        {order.note && order.note !== 'None' && (
                          <div className="mt-2 pt-2 border-t border-[#E5E0D6] text-[11px] text-amber-900 bg-amber-50/80 p-2 rounded-lg font-medium">
                            <strong>Note:</strong> {order.note}
                          </div>
                        )}
                      </div>

                      {/* Ordered Items List */}
                      <div className="text-xs space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-dark-charcoal/60">Ordered Items:</span>
                        <div className="font-semibold text-soft-black space-y-1">
                          {order.items && Array.isArray(order.items) && order.items.length > 0 ? (
                            order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-dark-charcoal/90 text-[11.5px] bg-white p-1.5 rounded-lg border border-[#DDD8CE]/60">
                                <div className="flex items-center gap-2">
                                  <span className={`w-2.5 h-2.5 rounded-full ${
                                    item.color === 'Black' ? 'bg-black' :
                                    item.color === 'Navy' ? 'bg-[#1C2841]' :
                                    item.color === 'Brown' ? 'bg-[#5C4033]' :
                                    item.color === 'Maroon' ? 'bg-[#800000]' : 'bg-[#C3B091]'
                                  }`} />
                                  <span>{item.name || 'Macramé Belt'} — <strong className="text-soft-black">{item.color}</strong> ({item.size})</span>
                                </div>
                                <span className="text-[11px] font-bold text-soft-black">Qty: {item.quantity || 1}</span>
                              </div>
                            ))
                          ) : (
                            <span className="text-dark-charcoal/80 text-[11.5px] block">
                              {order.orderType || 'Macramé Belt Sample'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom Actions: One-Click Courier Copy & Status Changer */}
                      <div className="pt-3 border-t border-[#EAE5DB] flex flex-wrap items-center justify-between gap-2">
                        
                        <button
                          onClick={() => handleCopyCourierInfo(order)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                            isCopied 
                              ? 'bg-emerald-600 text-white' 
                              : 'bg-[#1C2841] hover:bg-black text-white'
                          }`}
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{isCopied ? 'Copied for Courier!' : 'Copy for Steadfast / Pathao'}</span>
                        </button>

                        {/* Status Select */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-dark-charcoal/60 font-semibold">Status:</span>
                          <select
                            value={order.status || 'Pending'}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="bg-[#FAF8F5] border border-[#DDD8CE] rounded-lg px-2.5 py-1.5 text-xs font-bold text-soft-black focus:outline-none cursor-pointer"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="In Production">In Production</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* ================= TAB 3: PRODUCT & CATALOG EDITOR ================= */}
        {activeTab === 'catalog' && (
          <form onSubmit={handleConfigSave} className="space-y-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* CARD 1: PRODUCT IDENTIFICATION & TITLES */}
              <div className="bg-white border border-[#DDD8CE] p-5 sm:p-6 rounded-2xl shadow-xs space-y-4">
                <div className="border-b border-[#EAE5DB] pb-3 flex items-center justify-between">
                  <h3 className="font-bold text-base text-soft-black flex items-center gap-2">
                    <Tag className="w-4 h-4 text-terracotta" />
                    <span>Product Identification & Titles</span>
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider bg-[#FAF8F5] border border-[#DDD8CE] px-2 py-0.5 rounded-full text-dark-charcoal/70 font-semibold">
                    Live Display
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 mb-1.5">
                    Main Product Title
                  </label>
                  <input
                    type="text"
                    value={config.productTitle || ''}
                    onChange={(e) => setConfig({ ...config, productTitle: e.target.value })}
                    placeholder="AST Handmade Macramé Belt"
                    className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl px-3.5 py-2.5 text-sm font-bold text-soft-black focus:outline-none focus:border-soft-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 mb-1.5">
                    Subtitle / Badge Tagline
                  </label>
                  <input
                    type="text"
                    value={config.productSubtitle || ''}
                    onChange={(e) => setConfig({ ...config, productSubtitle: e.target.value })}
                    placeholder="Unisex Design • 100% Organic Cotton"
                    className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl px-3.5 py-2.5 text-sm font-medium text-soft-black focus:outline-none focus:border-soft-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 mb-1.5">
                    Short Tagline Hook
                  </label>
                  <textarea
                    rows={2}
                    value={config.shortDescription || ''}
                    onChange={(e) => setConfig({ ...config, shortDescription: e.target.value })}
                    placeholder="Fully handmade, very strong, and comfortable to wear. A belt made to last for years!"
                    className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl p-3 text-xs sm:text-sm text-soft-black focus:outline-none focus:border-soft-black"
                  />
                </div>
              </div>

              {/* CARD 2: PRICING CONTROLS (REGULAR & SALE) */}
              <div className="bg-white border border-[#DDD8CE] p-5 sm:p-6 rounded-2xl shadow-xs space-y-4">
                <div className="border-b border-[#EAE5DB] pb-3 flex items-center justify-between">
                  <h3 className="font-bold text-base text-soft-black flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-700" />
                    <span>Pricing & Discount Setup (BDT)</span>
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                    Real-time Calculation
                  </span>
                </div>

                {/* Single Belt Pricing */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 mb-1">
                      Single Sale Price (৳)
                    </label>
                    <input
                      type="number"
                      value={config.singlePrice}
                      onChange={(e) => setConfig({ ...config, singlePrice: Number(e.target.value) })}
                      className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl px-3.5 py-2.5 text-sm font-bold text-soft-black focus:outline-none focus:border-soft-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 mb-1">
                      Single Regular Price (৳)
                    </label>
                    <input
                      type="number"
                      value={config.singleRegularPrice}
                      onChange={(e) => setConfig({ ...config, singleRegularPrice: Number(e.target.value) })}
                      className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl px-3.5 py-2.5 text-sm font-bold text-dark-charcoal/50 line-through focus:outline-none focus:border-soft-black"
                    />
                  </div>
                </div>

                {/* Combo Pack Pricing */}
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 mb-1">
                      Combo (2 Belts) Sale (৳)
                    </label>
                    <input
                      type="number"
                      value={config.comboPrice}
                      onChange={(e) => setConfig({ ...config, comboPrice: Number(e.target.value) })}
                      className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl px-3.5 py-2.5 text-sm font-bold text-terracotta focus:outline-none focus:border-soft-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 mb-1">
                      Combo Regular Price (৳)
                    </label>
                    <input
                      type="number"
                      value={config.comboRegularPrice}
                      onChange={(e) => setConfig({ ...config, comboRegularPrice: Number(e.target.value) })}
                      className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl px-3.5 py-2.5 text-sm font-bold text-dark-charcoal/50 line-through focus:outline-none focus:border-soft-black"
                    />
                  </div>
                </div>

                {/* Sample Volume Tiers */}
                <div className="pt-2 border-t border-[#EAE5DB]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 block mb-2">
                    Sample Volume Tier Rates (per piece ৳)
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <span className="text-[9px] font-bold block text-dark-charcoal/60">1 Pc</span>
                      <input
                        type="number"
                        value={config.sampleTier1Price || 850}
                        onChange={(e) => setConfig({ ...config, sampleTier1Price: Number(e.target.value) })}
                        className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-lg px-2 py-1.5 text-xs font-bold text-soft-black"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold block text-dark-charcoal/60">2 Pcs</span>
                      <input
                        type="number"
                        value={config.sampleTier2Price || 800}
                        onChange={(e) => setConfig({ ...config, sampleTier2Price: Number(e.target.value) })}
                        className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-lg px-2 py-1.5 text-xs font-bold text-soft-black"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold block text-dark-charcoal/60">3 Pcs</span>
                      <input
                        type="number"
                        value={config.sampleTier3Price || 750}
                        onChange={(e) => setConfig({ ...config, sampleTier3Price: Number(e.target.value) })}
                        className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-lg px-2 py-1.5 text-xs font-bold text-soft-black"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold block text-dark-charcoal/60">5+ Pcs</span>
                      <input
                        type="number"
                        value={config.sampleTier5Price || 690}
                        onChange={(e) => setConfig({ ...config, sampleTier5Price: Number(e.target.value) })}
                        className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-lg px-2 py-1.5 text-xs font-bold text-soft-black"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Fee */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 mb-1">
                    Nationwide Delivery Charge (৳)
                  </label>
                  <input
                    type="number"
                    value={config.deliveryCharge}
                    onChange={(e) => setConfig({ ...config, deliveryCharge: Number(e.target.value) })}
                    className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl px-3.5 py-2.5 text-sm font-bold text-soft-black focus:outline-none focus:border-soft-black"
                  />
                </div>

              </div>

              {/* CARD 3: COLOR INVENTORY & STOCK COUNT */}
              <div className="bg-white border border-[#DDD8CE] p-5 sm:p-6 rounded-2xl shadow-xs space-y-4">
                <div className="border-b border-[#EAE5DB] pb-3 flex items-center justify-between">
                  <h3 className="font-bold text-base text-soft-black flex items-center gap-2">
                    <Package className="w-4 h-4 text-emerald-700" />
                    <span>Color Inventory & Stock Control</span>
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider text-dark-charcoal/60 font-semibold">
                    5 Signature Colors
                  </span>
                </div>

                <div className="space-y-3">
                  {['Black', 'Navy', 'Brown', 'Maroon', 'Khaki'].map((colorName) => {
                    const isAvailable = config.inStockColors?.[colorName] !== false;
                    const count = config.stockCounts?.[colorName] ?? 25;
                    return (
                      <div 
                        key={colorName}
                        className="flex items-center justify-between p-3 rounded-xl border border-[#EAE5DB] bg-[#FAF8F5]"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-4 h-4 rounded-full border border-black/20 ${
                            colorName === 'Black' ? 'bg-black' :
                            colorName === 'Navy' ? 'bg-[#1C2841]' :
                            colorName === 'Brown' ? 'bg-[#5C4033]' :
                            colorName === 'Maroon' ? 'bg-[#800000]' : 'bg-[#C3B091]'
                          }`} />
                          <span className="font-bold text-sm text-soft-black">{colorName}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Stock Count Field */}
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] uppercase tracking-wider text-dark-charcoal/60">Stock:</span>
                            <input
                              type="number"
                              value={count}
                              onChange={(e) => {
                                setConfig({
                                  ...config,
                                  stockCounts: {
                                    ...config.stockCounts,
                                    [colorName]: Number(e.target.value)
                                  }
                                });
                              }}
                              className="w-16 bg-white border border-[#DDD8CE] rounded-lg px-2 py-1 text-xs font-bold text-center text-soft-black"
                            />
                          </div>

                          {/* In Stock Toggle */}
                          <button
                            type="button"
                            onClick={() => {
                              setConfig({
                                ...config,
                                inStockColors: {
                                  ...config.inStockColors,
                                  [colorName]: !isAvailable
                                }
                              });
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              isAvailable
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-red-100 text-red-700 border border-red-300'
                            }`}
                          >
                            {isAvailable ? '✓ In Stock' : '✕ Out of Stock'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Size Toggles */}
                <div className="pt-3 border-t border-[#EAE5DB]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 block mb-2">
                    Size Variants In Stock
                  </span>
                  <div className="flex items-center gap-3">
                    {['M', 'L'].map((sz) => {
                      const szAvailable = config.inStockSizes?.[sz] !== false;
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => {
                            setConfig({
                              ...config,
                              inStockSizes: {
                                ...config.inStockSizes,
                                [sz]: !szAvailable
                              }
                            });
                          }}
                          className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            szAvailable
                              ? 'bg-soft-black text-white border-soft-black shadow-xs'
                              : 'bg-stone/10 text-dark-charcoal/40 border-stone/20 line-through'
                          }`}
                        >
                          Size {sz} ({sz === 'M' ? '32–35"' : '35–38"'}) {szAvailable ? '• Active' : '• Disabled'}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* CARD 4: SPECIFICATIONS & ARTISAN STORY */}
              <div className="bg-white border border-[#DDD8CE] p-5 sm:p-6 rounded-2xl shadow-xs space-y-4">
                <div className="border-b border-[#EAE5DB] pb-3 flex items-center justify-between">
                  <h3 className="font-bold text-base text-soft-black flex items-center gap-2">
                    <FileText className="w-4 h-4 text-terracotta" />
                    <span>Materials & Artisan Story</span>
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider bg-[#FAF8F5] border border-[#DDD8CE] px-2 py-0.5 rounded-full text-dark-charcoal/70 font-semibold">
                    Specs
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 mb-1.5">
                    Cord Material Specification
                  </label>
                  <input
                    type="text"
                    value={config.material || ''}
                    onChange={(e) => setConfig({ ...config, material: e.target.value })}
                    placeholder="100% Organic Cotton Cord (4.5mm)"
                    className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-soft-black focus:outline-none focus:border-soft-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 mb-1.5">
                    Buckle & Hardware Alloy
                  </label>
                  <input
                    type="text"
                    value={config.buckleMaterial || ''}
                    onChange={(e) => setConfig({ ...config, buckleMaterial: e.target.value })}
                    placeholder="Vintage Brushed Alloy (Anti-Rust / Lead-Free)"
                    className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-soft-black focus:outline-none focus:border-soft-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 mb-1.5">
                    Dimensions & Sizing
                  </label>
                  <input
                    type="text"
                    value={config.dimensions || ''}
                    onChange={(e) => setConfig({ ...config, dimensions: e.target.value })}
                    placeholder='1.4" Width (3.5 cm) • 43" Length (109 cm) stretch-flexible'
                    className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-soft-black focus:outline-none focus:border-soft-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 mb-1.5">
                    Full Artisan Craft Description
                  </label>
                  <textarea
                    rows={4}
                    value={config.fullDescription || ''}
                    onChange={(e) => setConfig({ ...config, fullDescription: e.target.value })}
                    placeholder="Crafted from 100% premium hand-dyed organic cotton cords..."
                    className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl p-3 text-xs sm:text-sm text-soft-black focus:outline-none focus:border-soft-black leading-relaxed"
                  />
                </div>
              </div>

            </div>

            {/* CARD 5: PRODUCT GALLERY ASSET PREVIEW */}
            <div className="bg-white border border-[#DDD8CE] p-5 sm:p-6 rounded-2xl shadow-xs space-y-4">
              <div className="border-b border-[#EAE5DB] pb-3 flex items-center justify-between">
                <h3 className="font-bold text-base text-soft-black flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-700" />
                  <span>Product Gallery Visual Assets</span>
                </h3>
                <span className="text-[10px] uppercase tracking-wider text-dark-charcoal/60 font-semibold">
                  WebP Compressed Live Assets
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
                {Object.entries(defaultColorImages).map(([colorName, imgUrl]) => (
                  <div key={colorName} className="bg-[#FAF8F5] border border-[#DDD8CE] p-2.5 rounded-xl flex flex-col items-center gap-2">
                    <img src={imgUrl} alt={colorName} className="w-full aspect-square object-cover rounded-lg border border-black/10 shadow-2xs" />
                    <span className="text-xs font-bold text-soft-black">{colorName}</span>
                    <span className="text-[9px] text-dark-charcoal/50 uppercase">Primary Thumbnail</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SAVE BUTTON BAR (STICKY) */}
            <div className="sticky bottom-4 z-30 bg-[#1C2841] text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between">
              <div>
                <span className="font-bold text-sm block">Save Changes to Live Store</span>
                <span className="text-xs text-white/70">Updates title, descriptions, prices, stock, and notices instantly.</span>
              </div>
              <button
                type="submit"
                disabled={isSavingConfig}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer disabled:opacity-75 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>{isSavingConfig ? 'Publishing...' : 'Publish Live Updates'}</span>
              </button>
            </div>

          </form>
        )}

        {/* ================= TAB 4: TRAFFIC & VISITORS ================= */}
        {activeTab === 'traffic' && (
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-[#DDD8CE] p-5 rounded-2xl shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-dark-charcoal/60">Today's Pageviews</span>
                <div className="text-3xl font-serif font-bold text-soft-black mt-2">{todayViews}</div>
                <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">Active Live Audience</span>
              </div>

              <div className="bg-white border border-[#DDD8CE] p-5 rounded-2xl shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-dark-charcoal/60">Logged Historical Views</span>
                <div className="text-3xl font-serif font-bold text-soft-black mt-2">{totalTrafficViews}</div>
                <span className="text-[11px] text-dark-charcoal/60 mt-1 block">Across past {analyticsData.length || 1} recorded days</span>
              </div>

              <div className="bg-white border border-[#DDD8CE] p-5 rounded-2xl shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-dark-charcoal/60">Average Daily Visitors</span>
                <div className="text-3xl font-serif font-bold text-soft-black mt-2">
                  {analyticsData.length > 0 ? Math.round(totalTrafficViews / analyticsData.length) : todayViews}
                </div>
                <span className="text-[11px] text-dark-charcoal/60 mt-1 block">Estimated Daily Run-rate</span>
              </div>
            </div>

            {/* Daily Traffic Log Table */}
            <div className="bg-white border border-[#DDD8CE] p-5 sm:p-6 rounded-2xl shadow-xs space-y-4">
              <div className="border-b border-[#EAE5DB] pb-3 flex items-center justify-between">
                <h3 className="font-bold text-base text-soft-black flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-terracotta" />
                  <span>Daily Traffic History</span>
                </h3>
                <span className="text-xs text-dark-charcoal/60 font-medium">Synced via Firebase Analytics</span>
              </div>

              {analyticsData.length === 0 ? (
                <div className="text-center py-8 text-dark-charcoal/60 text-xs">
                  Traffic analytics logging is active. Daily visit counts will populate as traffic enters your site.
                </div>
              ) : (
                <div className="space-y-2">
                  {analyticsData.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-[#DDD8CE] text-xs">
                      <span className="font-bold text-soft-black">{item.date || item.id}</span>
                      <div className="flex items-center gap-4">
                        {item.views_retail && <span className="text-dark-charcoal/70">Retail: {item.views_retail}</span>}
                        {item.views_sample && <span className="text-dark-charcoal/70">Sample: {item.views_sample}</span>}
                        <span className="font-bold text-soft-black bg-white px-2.5 py-1 rounded-md border border-[#DDD8CE]">
                          Total: {item.views || 0} views
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================= TAB 5: STORE SETTINGS & NOTICES ================= */}
        {activeTab === 'settings' && (
          <form onSubmit={handleConfigSave} className="space-y-6 max-w-3xl">
            
            <div className="bg-white border border-[#DDD8CE] p-5 sm:p-6 rounded-2xl shadow-xs space-y-4">
              <div className="border-b border-[#EAE5DB] pb-3">
                <h3 className="font-bold text-base text-soft-black flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-terracotta" />
                  <span>Storewide Banner & Announcement Bar</span>
                </h3>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 mb-1.5">
                  Top Announcement Marquee Text
                </label>
                <input
                  type="text"
                  value={config.announcement || ''}
                  onChange={(e) => setConfig({ ...config, announcement: e.target.value })}
                  placeholder="100% Handcrafted Natural Cotton Belts • Free Nationwide Replacement Guarantee"
                  className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl px-3.5 py-2.5 text-sm font-medium text-soft-black focus:outline-none focus:border-soft-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 mb-1.5">
                    Customer Support Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={config.contactPhone || '+880 1940-689061'}
                    onChange={(e) => setConfig({ ...config, contactPhone: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-soft-black focus:outline-none focus:border-soft-black"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 mb-1.5">
                    Official Support Email
                  </label>
                  <input
                    type="email"
                    value={config.contactEmail || 'astmacrame@gmail.com'}
                    onChange={(e) => setConfig({ ...config, contactEmail: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-soft-black focus:outline-none focus:border-soft-black"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSavingConfig}
                className="bg-[#1C2841] hover:bg-black text-white px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>{isSavingConfig ? 'Saving...' : 'Save Store Settings'}</span>
              </button>
            </div>

          </form>
        )}

        {/* ================= TAB 6: SECURITY & SYSTEM ================= */}
        {activeTab === 'security' && (
          <div className="bg-white border border-[#DDD8CE] p-6 sm:p-8 rounded-2xl shadow-xs space-y-6 max-w-3xl">
            <div className="flex items-center gap-3 border-b border-[#EAE5DB] pb-4">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
              <div>
                <h3 className="font-bold text-base text-soft-black">Security Shield Active</h3>
                <span className="text-xs text-dark-charcoal/60">Secured with Google Cloud Firestore & Firebase Auth</span>
              </div>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-dark-charcoal/80">
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl">
                <strong className="text-blue-900 block font-bold mb-1">Authenticated Administrator Account:</strong>
                <span className="font-mono text-blue-950 font-semibold">{currentUser?.email || 'admin@astmacrame.com'}</span>
                <span className="block text-[11px] text-blue-800 mt-1">
                  Session tokens are encrypted and verified directly by Google Firebase Auth.
                </span>
              </div>

              <div className="p-4 bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl space-y-1.5">
                <strong className="text-soft-black block font-bold">Data Redundancy:</strong>
                <p>
                  Orders submitted through the retail ads page and sample order drawer are dual-synced:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-dark-charcoal/70">
                  <li><strong>Real-time Firestore Database:</strong> Powers this live admin control center.</li>
                  <li><strong>Google Spreadsheet Backup:</strong> Dual-written for spreadsheet bookkeeping & courier bulk upload.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default AdminDashboard;