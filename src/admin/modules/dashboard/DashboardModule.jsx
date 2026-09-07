import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { StatCard } from '../../components/ui/StatCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  Truck, 
  Users, 
  Briefcase, 
  AlertTriangle, 
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Factory,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  FileText,
  Activity,
  Plus
} from 'lucide-react';
import { OrderStatus, LeadStatus, SampleStatus, PaymentStatus, ProductionBatchStatus, QCStatus } from '../../types/schema';

export const DashboardModule = () => {
  const { 
    orders, 
    products, 
    leads, 
    samples, 
    batches,
    payments,
    activityLogs,
    navigateTo,
    recordInventoryAdjustment 
  } = useAdmin();

  const [selectedLowStockVar, setSelectedLowStockVar] = useState(null);
  const [adjustmentQty, setAdjustmentQty] = useState(25);
  const [adjustmentReason, setAdjustmentReason] = useState('Emergency restocking');

  // ================= 10 ACTIONABLE METRICS =================
  const todayStr = new Date().toISOString().split('T')[0];
  const todayOrders = orders.filter(o => (o.createdAt || '').startsWith(todayStr));
  const todaySales = todayOrders.reduce((sum, o) => sum + (o.grandTotal || o.totalCost || 0), 0);
  
  const totalOrdersCount = orders.length;
  const wholesaleOrders = orders.filter(o => o.channel === 'Wholesale');
  const retailOrders = orders.filter(o => o.channel !== 'Wholesale');

  const pendingPaymentsOrders = orders.filter(o => o.paymentStatus !== PaymentStatus.PAID);
  const totalPendingPaymentBDT = pendingPaymentsOrders.reduce((sum, o) => sum + (o.balanceDue !== undefined ? o.balanceDue : (o.grandTotal || o.totalCost || 0)), 0);

  const ordersInProduction = orders.filter(o => o.status === OrderStatus.PRODUCTION);
  const batchesAwaitingQC = batches.filter(b => b.status === ProductionBatchStatus.QUALITY_CONTROL || b.qcStatus === QCStatus.PENDING);
  const ordersReadyToShip = orders.filter(o => o.status === OrderStatus.CONFIRMED || o.fulfillmentStatus === 'Ready to Ship');

  // Low stock calculation across all variants
  const lowStockVariants = [];
  products.forEach(p => {
    p.variants?.forEach(v => {
      const avail = v.stock?.available || 0;
      const threshold = v.stock?.lowStockThreshold || 15;
      if (avail <= threshold) {
        lowStockVariants.push({
          ...v,
          productTitle: p.title,
          productId: p.id,
        });
      }
    });
  });

  const newLeads = leads.filter(l => l.status === LeadStatus.NEW || l.status === LeadStatus.SAMPLE_REQUESTED);
  const pendingSamples = samples.filter(s => s.status === SampleStatus.REQUESTED || s.status === SampleStatus.PAID);

  // Total Gross Revenue
  const totalGrossRevenue = orders.reduce((sum, o) => sum + (o.grandTotal || o.totalCost || 0), 0);

  // Quick Stock Adjustment Handler
  const handleQuickRestock = (e) => {
    e.preventDefault();
    if (!selectedLowStockVar) return;
    recordInventoryAdjustment(
      selectedLowStockVar.id,
      Number(adjustmentQty),
      adjustmentReason || 'Dashboard quick replenishment'
    );
    setSelectedLowStockVar(null);
  };

  return (
    <div className="space-y-6">
      
      {/* ================= 1. ACTION REQUIRED CALLOUT BANNER ================= */}
      {(lowStockVariants.length > 0 || batchesAwaitingQC.length > 0 || newLeads.length > 0) && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5">
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-900 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-serif font-bold text-slate-900 text-sm sm:text-base">
                Operational Attention Queue
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Items requiring your direct operational decision right now:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3">
                {batchesAwaitingQC.length > 0 && (
                  <button
                    onClick={() => navigateTo('production', 'qc')}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-amber-200/80 hover:border-amber-400 text-left transition-all text-xs"
                  >
                    <span className="font-medium text-slate-800">
                      🔍 <strong>{batchesAwaitingQC.length}</strong> Batch{batchesAwaitingQC.length > 1 ? 'es' : ''} Awaiting QC
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
                  </button>
                )}

                {lowStockVariants.length > 0 && (
                  <button
                    onClick={() => navigateTo('inventory', 'low-stock')}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-amber-200/80 hover:border-amber-400 text-left transition-all text-xs"
                  >
                    <span className="font-medium text-slate-800">
                      ⚠️ <strong>{lowStockVariants.length}</strong> SKU{lowStockVariants.length > 1 ? 's' : ''} Below Safety Stock
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
                  </button>
                )}

                {newLeads.length > 0 && (
                  <button
                    onClick={() => navigateTo('wholesale', 'leads')}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-amber-200/80 hover:border-amber-400 text-left transition-all text-xs"
                  >
                    <span className="font-medium text-slate-800">
                      💼 <strong>{newLeads.length}</strong> New Wholesale Inquiry
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. THE 10 ACTIONABLE METRIC CARDS ================= */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Executive Metrics & Live Telemetry
          </h2>
          <span className="text-[11px] text-slate-400">Synced in real-time</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          <StatCard
            title="Today's Sales"
            value={`৳${todaySales.toLocaleString()}`}
            icon={DollarSign}
            color="emerald"
            subtitle={`${todayOrders.length} orders today`}
          />
          <StatCard
            title="Total Pipeline Orders"
            value={totalOrdersCount}
            icon={ShoppingBag}
            color="blue"
            subtitle={`${wholesaleOrders.length} B2B • ${retailOrders.length} Retail`}
            onClick={() => navigateTo('orders')}
          />
          <StatCard
            title="Pending Payments"
            value={`৳${totalPendingPaymentBDT.toLocaleString()}`}
            icon={Clock}
            color="amber"
            subtitle={`${pendingPaymentsOrders.length} orders awaiting settlement`}
            onClick={() => navigateTo('finance', 'outstanding')}
          />
          <StatCard
            title="In Production"
            value={`${ordersInProduction.length} Orders`}
            icon={Factory}
            color="purple"
            subtitle={`${batches.filter(b => b.status === ProductionBatchStatus.IN_PRODUCTION).length} active workshop batches`}
            onClick={() => navigateTo('production', 'in-progress')}
          />
          <StatCard
            title="Awaiting QC"
            value={`${batchesAwaitingQC.length} Batches`}
            icon={Sparkles}
            color="amber"
            subtitle="Ready for inspection"
            onClick={() => navigateTo('production', 'qc')}
          />
          <StatCard
            title="Ready to Ship"
            value={`${ordersReadyToShip.length} Parcels`}
            icon={Truck}
            color="blue"
            subtitle="Ready for courier pickup"
            onClick={() => navigateTo('shipping', 'ready')}
          />
          <StatCard
            title="Low Stock Alerts"
            value={`${lowStockVariants.length} SKUs`}
            icon={AlertTriangle}
            color="rose"
            subtitle="Needs replenishment"
            onClick={() => navigateTo('inventory', 'low-stock')}
          />
          <StatCard
            title="New B2B Leads"
            value={newLeads.length}
            icon={Briefcase}
            color="purple"
            subtitle="Wholesale inquiries"
            onClick={() => navigateTo('wholesale', 'leads')}
          />
          <StatCard
            title="Sample Requests"
            value={pendingSamples.length}
            icon={Package}
            color="terracotta"
            subtitle="Paid sample orders"
            onClick={() => navigateTo('wholesale', 'samples')}
          />
          <StatCard
            title="Gross Revenue"
            value={`৳${totalGrossRevenue.toLocaleString()}`}
            icon={TrendingUp}
            color="emerald"
            subtitle="Total invoiced value"
            onClick={() => navigateTo('finance')}
          />
        </div>
      </div>

      {/* ================= 3. DUAL PIPELINES: ORDERS & PRODUCTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Order Pipeline Overview */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="font-serif font-bold text-slate-900 text-base">Order Fulfillment Pipeline</h2>
              <p className="text-xs text-slate-500">Live order volume by progression stage</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => navigateTo('orders')}>
              View All &rarr;
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            {[
              { label: 'New / Unconfirmed', count: orders.filter(o => o.status === OrderStatus.NEW).length, color: 'bg-slate-100 text-slate-800' },
              { label: 'Confirmed (Reserved)', count: orders.filter(o => o.status === OrderStatus.CONFIRMED).length, color: 'bg-blue-50 text-blue-800 border-blue-200' },
              { label: 'In Production', count: orders.filter(o => o.status === OrderStatus.PRODUCTION).length, color: 'bg-purple-50 text-purple-800 border-purple-200' },
              { label: 'Shipped / In Transit', count: orders.filter(o => o.status === OrderStatus.SHIPPED).length, color: 'bg-amber-50 text-amber-800 border-amber-200' },
            ].map((st, idx) => (
              <div key={idx} className={`p-3 rounded-xl border ${st.color} text-center`}>
                <span className="text-2xl font-bold font-serif block">{st.count}</span>
                <span className="text-[11px] font-medium block mt-0.5">{st.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Artisan Production Pipeline Overview */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="font-serif font-bold text-slate-900 text-base">Artisan Batch Status</h2>
              <p className="text-xs text-slate-500">Weaving workshop allocations & QC status</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => navigateTo('production')}>
              Kanban Board &rarr;
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            {[
              { label: 'Queued', count: batches.filter(b => b.status === ProductionBatchStatus.QUEUED).length, color: 'bg-slate-50 text-slate-700' },
              { label: 'On Looms', count: batches.filter(b => b.status === ProductionBatchStatus.IN_PRODUCTION).length, color: 'bg-blue-50 text-blue-800' },
              { label: 'QC Inspection', count: batches.filter(b => b.status === ProductionBatchStatus.QUALITY_CONTROL).length, color: 'bg-amber-50 text-amber-800' },
              { label: 'Approved Stock', count: batches.filter(b => b.status === ProductionBatchStatus.APPROVED).length, color: 'bg-emerald-50 text-emerald-800' },
            ].map((bt, idx) => (
              <div key={idx} className={`p-3 rounded-xl border ${bt.color} text-center`}>
                <span className="text-2xl font-bold font-serif block">{bt.count}</span>
                <span className="text-[11px] font-medium block mt-0.5">{bt.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ================= 4. LOW STOCK TABLE & RECENT ACTIVITY FEED ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Low Stock SKU Table (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-terracotta" />
              <h2 className="font-serif font-bold text-slate-900 text-base">Inventory Health & Low-Stock Alerts</h2>
            </div>
            <Badge status={`${lowStockVariants.length} SKUs Low`} size="sm" />
          </div>

          {lowStockVariants.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              All SKU variants are comfortably above minimum safety thresholds!
            </div>
          ) : (
            <div className="divide-y divide-slate-100 pt-2">
              {lowStockVariants.map((v) => (
                <div key={v.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-slate-900">{v.sku}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">
                        {v.color} ({v.size})
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Available: <strong className="text-rose-600 font-mono">{v.stock.available} pcs</strong> (On-Hand: {v.stock.onHand}, Reserved: {v.stock.reserved})
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      icon={Plus}
                      onClick={() => setSelectedLowStockVar(v)}
                    >
                      Quick Restock
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Real-time Activity Feed (1 col) */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-terracotta" />
              <h2 className="font-serif font-bold text-slate-900 text-base">Recent Audit Trail</h2>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Live</span>
          </div>

          <div className="space-y-3.5 pt-3 max-h-[340px] overflow-y-auto">
            {activityLogs.slice(0, 7).map((log) => (
              <div key={log.id} className="text-xs border-l-2 border-terracotta pl-3 py-0.5">
                <div className="flex items-center justify-between gap-1 text-[10px] text-slate-400">
                  <span className="font-semibold text-slate-700">{log.actor}</span>
                  <span className="font-mono">{log.timestamp ? log.timestamp.split(' ')[1] : ''}</span>
                </div>
                <p className="font-medium text-slate-900 text-[11px] mt-0.5">
                  {log.action} • <span className="font-mono">{log.entityId}</span>
                </p>
                <p className="text-slate-500 text-[11px] truncate mt-0.5">
                  {log.details}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick Restock Modal */}
      {selectedLowStockVar && (
        <Modal
          isOpen={!!selectedLowStockVar}
          onClose={() => setSelectedLowStockVar(null)}
          title={`Quick Restock • ${selectedLowStockVar.sku}`}
        >
          <form onSubmit={handleQuickRestock} className="space-y-4">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
              <p>SKU: <strong>{selectedLowStockVar.sku}</strong> ({selectedLowStockVar.color}, {selectedLowStockVar.size})</p>
              <p>Current Available: <strong>{selectedLowStockVar.stock.available} pcs</strong></p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Units to Add (Inbound Finished Stock)
              </label>
              <input
                type="number"
                min="1"
                value={adjustmentQty}
                onChange={(e) => setAdjustmentQty(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Adjustment Reason / Source
              </label>
              <input
                type="text"
                value={adjustmentReason}
                onChange={(e) => setAdjustmentReason(e.target.value)}
                placeholder="e.g. Workshop artisan batch delivery"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setSelectedLowStockVar(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="terracotta">
                Confirm Inbound Stock
              </Button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};
