import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  subscribeStoreConfig, 
  updateStoreConfig, 
  subscribeOrders, 
  updateOrderStatus,
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
  MapPin
} from 'lucide-react';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('pricing');
  const [config, setConfig] = useState(DEFAULT_STORE_CONFIG);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [configSaveSuccess, setConfigSaveSuccess] = useState(false);

  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const unsub = subscribeStoreConfig((data) => {
      setConfig(data);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = subscribeOrders((orderList) => {
      setOrders(orderList);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleConfigSave = async (e) => {
    e.preventDefault();
    setIsSavingConfig(true);
    try {
      await updateStoreConfig(config);
      setConfigSaveSuccess(true);
      setTimeout(() => setConfigSaveSuccess(false), 3000);
    } catch (err) {
      alert('Failed to save store settings: ' + err.message);
    } finally {
      setIsSavingConfig(false);
    }
  };

  const handleCopyCourierInfo = (order) => {
    const itemsText = order.items?.map(i => `${i.name} (${i.color}, ${i.size})`).join(' + ') || order.orderType;
    const text = `Name: ${order.name}\nPhone: ${order.phone}\nAddress: ${order.address}\nAmount: ${order.totalCost} BDT (COD)\nItem: ${itemsText}\nNote: ${order.note || 'None'}\nOrder ID: ${order.orderId}`;
    navigator.clipboard.writeText(text);
    setCopiedId(order.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      (order.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.phone || '').includes(searchQuery) ||
      (order.orderId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.address || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || (order.status || 'Pending').toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalCost) || 0), 0);
  const pendingCount = orders.filter(o => !o.status || o.status === 'Pending').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;

  return (
    <div className="min-h-screen bg-[#F5F2EB] font-sans text-soft-black flex flex-col">
      
      {/* Top Admin Navbar */}
      <header className="bg-[#1C2841] text-white border-b border-[#2D3F66] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo_black.png" alt="AST" className="h-6 w-auto brightness-200 invert" />
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-wide">AST MACRAMÉ</span>
              <span className="text-[10px] text-white/60 uppercase tracking-widest">Admin Control Center</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/retail"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              <span>View Store</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <div className="text-right hidden md:block">
              <span className="block text-xs font-medium text-white/90">{currentUser?.email}</span>
              <span className="text-[10px] text-emerald-400 font-semibold uppercase">● Online</span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-white transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full flex flex-col gap-6">
        
        {/* Navigation Tabs Bar */}
        <div className="bg-white border border-[#DDD8CE] p-1.5 rounded-xl shadow-xs flex items-center justify-between overflow-x-auto gap-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('pricing')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'pricing'
                  ? 'bg-[#1C2841] text-white shadow-sm'
                  : 'text-dark-charcoal/70 hover:bg-[#FAF8F5] hover:text-soft-black'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Prices & Inventory</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#1C2841] text-white shadow-sm'
                  : 'text-dark-charcoal/70 hover:bg-[#FAF8F5] hover:text-soft-black'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Orders ({orders.length})</span>
              {pendingCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-[#1C2841] text-white shadow-sm'
                  : 'text-dark-charcoal/70 hover:bg-[#FAF8F5] hover:text-soft-black'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-[#1C2841] text-white shadow-sm'
                  : 'text-dark-charcoal/70 hover:bg-[#FAF8F5] hover:text-soft-black'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Security</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-dark-charcoal/60 px-3">
            <span>Database Status:</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Synced
            </span>
          </div>
        </div>

        {/* TAB 1: PRICING & INVENTORY */}
        {activeTab === 'pricing' && (
          <form onSubmit={handleConfigSave} className="space-y-6">
            
            {configSaveSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-sm">Store prices & inventory updated live across all devices!</span>
                </div>
                <span className="text-xs text-emerald-700">✓ Instant Live</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Product Pricing Card */}
              <div className="bg-white border border-[#DDD8CE] p-5 sm:p-6 rounded-2xl shadow-xs space-y-4">
                <div className="border-b border-[#EAE5DB] pb-3 flex items-center justify-between">
                  <h3 className="font-bold text-base text-soft-black flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-terracotta" />
                    <span>Product Pricing (BDT)</span>
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider bg-[#FAF8F5] border border-[#DDD8CE] px-2 py-0.5 rounded-full text-dark-charcoal/70 font-semibold">
                    Live Store Values
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 mb-1">
                      Single Belt Price (৳)
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
                      Single Regular Price
                    </label>
                    <input
                      type="number"
                      value={config.singleRegularPrice}
                      onChange={(e) => setConfig({ ...config, singleRegularPrice: Number(e.target.value) })}
                      className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl px-3.5 py-2.5 text-sm font-bold text-soft-black/60 focus:outline-none focus:border-soft-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 mb-1">
                      Combo Pack Price (৳)
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
                      Combo Regular Price
                    </label>
                    <input
                      type="number"
                      value={config.comboRegularPrice}
                      onChange={(e) => setConfig({ ...config, comboRegularPrice: Number(e.target.value) })}
                      className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl px-3.5 py-2.5 text-sm font-bold text-soft-black/60 focus:outline-none focus:border-soft-black"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 mb-1">
                    Nationwide Delivery Charge (৳)
                  </label>
                  <input
                    type="number"
                    value={config.deliveryCharge}
                    onChange={(e) => setConfig({ ...config, deliveryCharge: Number(e.target.value) })}
                    className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl px-3.5 py-2.5 text-sm font-bold text-soft-black focus:outline-none focus:border-soft-black"
                  />
                  <span className="text-[11px] text-dark-charcoal/60 mt-1 block">Applied flat to all 64 districts in Bangladesh.</span>
                </div>
              </div>

              {/* Color Inventory Card */}
              <div className="bg-white border border-[#DDD8CE] p-5 sm:p-6 rounded-2xl shadow-xs space-y-4">
                <div className="border-b border-[#EAE5DB] pb-3 flex items-center justify-between">
                  <h3 className="font-bold text-base text-soft-black flex items-center gap-2">
                    <Package className="w-4 h-4 text-emerald-700" />
                    <span>Color Inventory (In Stock / Out)</span>
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider text-dark-charcoal/60 font-semibold">
                    Live Toggles
                  </span>
                </div>

                <div className="space-y-2.5">
                  {['Black', 'Navy', 'Brown', 'Maroon', 'Khaki'].map((colorName) => {
                    const isAvailable = config.inStockColors?.[colorName] !== false;
                    return (
                      <div 
                        key={colorName}
                        className="flex items-center justify-between p-3 rounded-xl border border-[#EAE5DB] bg-[#FAF8F5]"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-3.5 h-3.5 rounded-full border border-black/20 ${
                            colorName === 'Black' ? 'bg-black' :
                            colorName === 'Navy' ? 'bg-[#1C2841]' :
                            colorName === 'Brown' ? 'bg-[#5C4033]' :
                            colorName === 'Maroon' ? 'bg-[#800000]' : 'bg-[#C3B091]'
                          }`} />
                          <span className="font-bold text-sm text-soft-black">{colorName}</span>
                        </div>

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
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Save Button Bar */}
            <div className="bg-[#1C2841] text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between">
              <div>
                <span className="font-bold text-sm block">Save Store Changes</span>
                <span className="text-xs text-white/70">Click save to push new prices & stock directly to your live store.</span>
              </div>
              <button
                type="submit"
                disabled={isSavingConfig}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer disabled:opacity-75 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>{isSavingConfig ? 'Saving...' : 'Save Live Store'}</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: LIVE ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-5">
            
            <div className="bg-white border border-[#DDD8CE] p-4 rounded-2xl shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:max-w-md">
                <input
                  type="text"
                  placeholder="Search by phone, name, order ID, address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl px-3.5 py-2.5 pl-10 text-xs sm:text-sm focus:outline-none focus:border-soft-black"
                />
                <Search className="w-4 h-4 text-dark-charcoal/40 absolute left-3.5 top-3" />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                {['all', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider capitalize whitespace-nowrap transition-all cursor-pointer ${
                      statusFilter.toLowerCase() === st.toLowerCase()
                        ? 'bg-[#1C2841] text-white'
                        : 'bg-[#FAF8F5] border border-[#DDD8CE] text-dark-charcoal/70 hover:text-soft-black'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="bg-white border border-[#DDD8CE] p-12 text-center rounded-2xl text-dark-charcoal/60">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <h4 className="font-bold text-base text-soft-black">No Orders Found</h4>
                <p className="text-xs text-dark-charcoal/60 mt-1">When customers place orders, they will appear here live.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredOrders.map((order) => {
                  const cleanPhone = (order.phone || '').replace(/[^0-9]/g, '');
                  const waUrl = `https://wa.me/${cleanPhone}`;
                  const isCopied = copiedId === order.id;

                  return (
                    <div 
                      key={order.id} 
                      className="bg-white border border-[#DDD8CE] p-5 rounded-2xl shadow-xs flex flex-col justify-between gap-4 hover:border-soft-black/40 transition-all"
                    >
                      <div className="flex items-start justify-between border-b border-[#EAE5DB] pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-soft-black">{order.orderId || order.id}</span>
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'Confirmed' ? 'bg-amber-100 text-amber-800' :
                              order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {order.status || 'Pending'}
                            </span>
                          </div>
                          <span className="text-[11px] text-dark-charcoal/60 block mt-0.5">
                            {order.date} {order.time ? `• ${order.time}` : ''}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-base font-bold text-terracotta">
                            ৳ {Number(order.totalCost || 0).toLocaleString()}
                          </span>
                          <span className="text-[10px] text-dark-charcoal/50 block font-medium">COD</span>
                        </div>
                      </div>

                      <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EAE5DB] text-xs space-y-1">
                        <div className="font-bold text-soft-black text-sm">{order.name}</div>
                        <div className="flex items-center gap-2 text-dark-charcoal">
                          <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <a href={`tel:${order.phone}`} className="font-semibold hover:underline">{order.phone}</a>
                          <a 
                            href={waUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="ml-auto text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 hover:bg-emerald-100"
                          >
                            Chat WhatsApp 💬
                          </a>
                        </div>
                        <div className="flex items-start gap-2 text-dark-charcoal/80 pt-1">
                          <MapPin className="w-3.5 h-3.5 text-terracotta shrink-0 mt-0.5" />
                          <span className="leading-snug">{order.address}</span>
                        </div>
                        {order.note && order.note !== 'None' && (
                          <div className="mt-2 pt-2 border-t border-[#E5E0D6] text-[11px] text-amber-900 bg-amber-50/80 p-2 rounded-lg font-medium">
                            <strong>Note:</strong> {order.note}
                          </div>
                        )}
                      </div>

                      <div className="text-xs space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-dark-charcoal/60">Ordered Items:</span>
                        <div className="font-semibold text-soft-black">
                          {order.orderType}
                          {order.items?.map((item, idx) => (
                            <span key={idx} className="block text-dark-charcoal/80 font-normal text-[11.5px]">
                              • {item.name} — <strong className="text-soft-black">{item.color}</strong> ({item.size})
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#EAE5DB] flex flex-wrap items-center justify-between gap-2">
                        <button
                          onClick={() => handleCopyCourierInfo(order)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                            isCopied 
                              ? 'bg-emerald-600 text-white' 
                              : 'bg-[#1C2841] hover:bg-black text-white'
                          }`}
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{isCopied ? 'Copied for Courier!' : 'Copy for Steadfast / Pathao'}</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-dark-charcoal/60">Status:</span>
                          <select
                            value={order.status || 'Pending'}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="bg-[#FAF8F5] border border-[#DDD8CE] rounded-lg px-2 py-1 text-xs font-bold text-soft-black focus:outline-none cursor-pointer"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
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

        {/* TAB 3: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white border border-[#DDD8CE] p-5 rounded-2xl shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-dark-charcoal/60">Total Recorded Revenue</span>
                <div className="text-2xl font-bold text-soft-black mt-2">৳ {totalRevenue.toLocaleString()}</div>
                <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">From {orders.length} orders</span>
              </div>
              
              <div className="bg-white border border-[#DDD8CE] p-5 rounded-2xl shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-dark-charcoal/60">Pending Delivery</span>
                <div className="text-2xl font-bold text-amber-700 mt-2">{pendingCount}</div>
                <span className="text-[10px] text-dark-charcoal/60 mt-1 block">Orders awaiting dispatch</span>
              </div>

              <div className="bg-white border border-[#DDD8CE] p-5 rounded-2xl shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-dark-charcoal/60">Delivered Successfully</span>
                <div className="text-2xl font-bold text-emerald-700 mt-2">{deliveredCount}</div>
                <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">Completed COD collected</span>
              </div>
            </div>

            <div className="bg-white border border-[#DDD8CE] p-6 rounded-2xl shadow-xs">
              <h3 className="font-bold text-base text-soft-black mb-2">Meta Ads & Multi-Channel Sync</h3>
              <p className="text-xs text-dark-charcoal/70 leading-relaxed max-w-2xl">
                Orders are synced across Firebase Firestore in real-time and backed up directly to your Google Spreadsheet. Meta Pixel and Conversions API (CAPI) track purchase events with BDT valuation.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: SECURITY */}
        {activeTab === 'security' && (
          <div className="bg-white border border-[#DDD8CE] p-6 sm:p-8 rounded-2xl shadow-xs space-y-6 max-w-3xl">
            <div className="flex items-center gap-3 border-b border-[#EAE5DB] pb-4">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
              <div>
                <h3 className="font-bold text-base text-soft-black">Security Shield Active</h3>
                <span className="text-xs text-dark-charcoal/60">Secured with Google Cloud Firestore & Firebase Auth</span>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-dark-charcoal/80">
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl">
                <strong className="text-blue-900 block font-bold mb-1">Logged In Administrator:</strong>
                <span className="font-mono text-blue-950">{currentUser?.email}</span>
                <span className="block text-[11px] text-blue-800 mt-1">
                  Session tokens are encrypted and verified directly by Google.
                </span>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default AdminDashboard;