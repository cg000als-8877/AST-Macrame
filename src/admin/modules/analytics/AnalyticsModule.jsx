import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { StatCard } from '../../components/ui/StatCard';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package, 
  ArrowUpRight,
  Sparkles,
  PieChart,
  Eye,
  Layers,
  Factory,
  Clock,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { subscribeAnalytics } from '../../../services/storeService';
import { PaymentStatus, ProductionBatchStatus } from '../../types/schema';

export const AnalyticsModule = () => {
  const { orders, products, customers, companies, batches, movements, payments } = useAdmin();
  const [trafficData, setTrafficData] = useState([]);
  const [reportTab, setReportTab] = useState('sales'); // 'sales' | 'channels' | 'products' | 'customers' | 'production' | 'inventory'

  useEffect(() => {
    const unsub = subscribeAnalytics((data) => {
      setTrafficData(data);
    });
    return () => unsub();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.grandTotal || o.totalCost || 0), 0);
  const wholesaleOrders = orders.filter(o => o.channel === 'Wholesale');
  const retailOrders = orders.filter(o => o.channel !== 'Wholesale');

  const wholesaleRevenue = wholesaleOrders.reduce((sum, o) => sum + (o.grandTotal || o.totalCost || 0), 0);
  const retailRevenue = retailOrders.reduce((sum, o) => sum + (o.grandTotal || o.totalCost || 0), 0);

  // Color Velocity
  const colorCounts = { 'Midnight Black': 0, 'Earthy Brown': 0, 'Deep Navy': 0, 'Desert Khaki': 0, 'Rich Maroon': 0 };
  orders.forEach(o => {
    o.items?.forEach(it => {
      const c = it.color || '';
      if (c.includes('Black')) colorCounts['Midnight Black'] += (Number(it.quantity) || 1);
      else if (c.includes('Brown')) colorCounts['Earthy Brown'] += (Number(it.quantity) || 1);
      else if (c.includes('Navy')) colorCounts['Deep Navy'] += (Number(it.quantity) || 1);
      else if (c.includes('Khaki')) colorCounts['Desert Khaki'] += (Number(it.quantity) || 1);
      else if (c.includes('Maroon')) colorCounts['Rich Maroon'] += (Number(it.quantity) || 1);
    });
  });

  const totalColorUnits = Object.values(colorCounts).reduce((a, b) => a + b, 0) || 1;

  // Production Metrics
  const totalProductionUnits = batches.reduce((sum, b) => sum + (b.quantity || 0), 0);
  const completedProductionUnits = batches.filter(b => b.status === ProductionBatchStatus.APPROVED).reduce((sum, b) => sum + (b.quantity || 0), 0);

  const tabs = [
    { id: 'sales', label: 'Sales & Revenue' },
    { id: 'channels', label: 'Wholesale vs Retail' },
    { id: 'products', label: 'Color & SKU Velocity' },
    { id: 'customers', label: 'Customer Value (LTV)' },
    { id: 'production', label: 'Production Throughput' },
    { id: 'inventory', label: 'Inventory Movements' },
  ];

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">Commercial Intelligence & Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Multi-channel demand analytics, artisan manufacturing velocity, and customer lifetime value</p>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Gross Invoiced Revenue"
          value={`৳${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="emerald"
          change="+32.4% MoM"
          isPositive={true}
        />
        <StatCard
          title="Wholesale Volume Share"
          value={`${totalRevenue > 0 ? Math.round((wholesaleRevenue / totalRevenue) * 100) : 0}%`}
          icon={TrendingUp}
          color="blue"
          subtitle={`৳${wholesaleRevenue.toLocaleString()} B2B contracts`}
        />
        <StatCard
          title="Total Units Braided"
          value={`${totalProductionUnits} pcs`}
          icon={Factory}
          color="purple"
          subtitle={`${completedProductionUnits} pcs approved`}
        />
        <StatCard
          title="Blended AOV"
          value={`৳${orders.length > 0 ? Math.round(totalRevenue / orders.length).toLocaleString() : 0}`}
          icon={ShoppingBag}
          color="amber"
          subtitle="Average order value"
        />
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={reportTab} onChange={setReportTab} />

      {/* Tab 1: Sales & Revenue */}
      {reportTab === 'sales' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="font-serif font-bold text-slate-900 text-base">Monthly Revenue Trajectory</h2>
              <span className="text-xs text-slate-400 font-mono">Q3 2026</span>
            </div>

            <div className="space-y-4 pt-5">
              {[
                { month: 'June 2026', rev: 95000, target: 120000, pct: 79 },
                { month: 'July 2026', rev: 145000, target: 150000, pct: 96 },
                { month: 'August 2026', rev: 215000, target: 200000, pct: 100 },
                { month: 'September 2026 (MTD)', rev: totalRevenue, target: 300000, pct: Math.min(100, Math.round((totalRevenue / 300000) * 100)) },
              ].map((m, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-semibold text-slate-800">{m.month}</span>
                    <span className="font-mono font-bold text-slate-900">৳{m.rev.toLocaleString()} ({m.pct}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${m.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="font-serif font-bold text-slate-900 text-base">Order Volume & Velocity</h2>
              <Badge status={`${orders.length} Total Orders`} size="sm" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-5">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="text-xs text-slate-500 block mb-1">Wholesale Orders</span>
                <span className="text-2xl font-serif font-bold text-slate-900">{wholesaleOrders.length}</span>
                <p className="text-[11px] text-slate-500 mt-1">Avg ৳{(wholesaleRevenue / (wholesaleOrders.length || 1)).toLocaleString()} / PO</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="text-xs text-slate-500 block mb-1">Retail Orders</span>
                <span className="text-2xl font-serif font-bold text-slate-900">{retailOrders.length}</span>
                <p className="text-[11px] text-slate-500 mt-1">Avg ৳{(retailRevenue / (retailOrders.length || 1)).toLocaleString()} / cart</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Channels */}
      {reportTab === 'channels' && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="font-serif font-bold text-slate-900 text-base">Wholesale Export vs Retail Direct-to-Consumer</h2>
            <Badge status="Live Split" size="sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-semibold text-slate-800">Wholesale / B2B Export ({wholesaleOrders.length} POs)</span>
                  <span className="font-mono font-bold text-slate-900">৳{wholesaleRevenue.toLocaleString()}</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-900 rounded-full" style={{ width: `${totalRevenue > 0 ? (wholesaleRevenue / totalRevenue) * 100 : 0}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-semibold text-slate-800">Retail / D2C COD ({retailOrders.length} orders)</span>
                  <span className="font-mono font-bold text-slate-900">৳{retailRevenue.toLocaleString()}</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-terracotta rounded-full" style={{ width: `${totalRevenue > 0 ? (retailRevenue / totalRevenue) * 100 : 0}%` }} />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
              <p className="font-semibold text-slate-900">Commercial Summary:</p>
              <p>• Wholesale generates <strong>{totalRevenue > 0 ? Math.round((wholesaleRevenue / totalRevenue) * 100) : 0}%</strong> of total brand volume.</p>
              <p>• B2B clients generate repeat annual runs with high manufacturing batch density.</p>
              <p>• Retail ads provide steady domestic brand awareness and direct cash on delivery receipts.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Products & Colors */}
      {reportTab === 'products' && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="font-serif font-bold text-slate-900 text-base">Color Variant Velocity & Demand Share</h2>
            <Sparkles className="w-4 h-4 text-terracotta" />
          </div>

          <div className="space-y-4 pt-5 max-w-2xl">
            {Object.entries(colorCounts).map(([color, count]) => {
              const pct = Math.round((count / totalColorUnits) * 100);
              return (
                <div key={color}>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-medium text-slate-800">{color}</span>
                    <span className="font-mono font-bold text-slate-900">{count} units ({pct}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-terracotta rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Customers & LTV */}
      {reportTab === 'customers' && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="font-serif font-bold text-slate-900 text-base">Top B2B Accounts by Lifetime Value (LTV)</h2>
            <Users className="w-4 h-4 text-slate-500" />
          </div>

          <div className="divide-y divide-slate-100 pt-2">
            {companies.map((comp) => (
              <div key={comp.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900">{comp.name}</p>
                  <p className="text-[11px] text-slate-500">{comp.city}, {comp.country} • {comp.tier}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-slate-900 text-xs">৳{(comp.totalSpent || 0).toLocaleString()} BDT</span>
                  <p className="text-[10px] text-slate-400">{comp.paymentTerms}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Production */}
      {reportTab === 'production' && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="font-serif font-bold text-slate-900 text-base">Artisan Batch Throughput</h2>
            <Factory className="w-4 h-4 text-slate-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block mb-1">Total Pieces Braided</span>
              <span className="text-2xl font-serif font-bold text-slate-900">{totalProductionUnits} pcs</span>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-xs text-emerald-800 block mb-1">Passed QC & Approved</span>
              <span className="text-2xl font-serif font-bold text-emerald-900">{completedProductionUnits} pcs</span>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <span className="text-xs text-blue-800 block mb-1">Active on Looms</span>
              <span className="text-2xl font-serif font-bold text-blue-900">
                {batches.filter(b => b.status === ProductionBatchStatus.IN_PRODUCTION).reduce((sum, b) => sum + b.quantity, 0)} pcs
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Inventory */}
      {reportTab === 'inventory' && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="font-serif font-bold text-slate-900 text-base">Recent Inventory Movement Log</h2>
            <Package className="w-4 h-4 text-slate-500" />
          </div>

          <div className="divide-y divide-slate-100 pt-2">
            {movements.slice(0, 8).map((m) => (
              <div key={m.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono font-bold text-slate-900">{m.sku}</span>
                  <p className="text-[11px] text-slate-500">{m.reason} ({m.performedBy})</p>
                </div>
                <div className="text-right">
                  <span className={`font-mono font-bold ${m.quantity > 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                    {m.quantity > 0 ? `+${m.quantity}` : m.quantity} units
                  </span>
                  <p className="text-[10px] text-slate-400">{m.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
