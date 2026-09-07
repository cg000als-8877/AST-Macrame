import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { DataTable } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Drawer } from '../../components/ui/Drawer';
import { Tabs } from '../../components/ui/Tabs';
import { PipelineView } from '../../components/ui/PipelineView';
import { Timeline } from '../../components/ui/Timeline';
import { 
  ShoppingBag, 
  Copy, 
  Check, 
  Phone, 
  MapPin, 
  Truck, 
  DollarSign, 
  Layers, 
  ArrowRight, 
  Clock, 
  FileText,
  Sparkles,
  Download,
  AlertCircle
} from 'lucide-react';
import { OrderStatus, SalesChannel } from '../../types/schema';
import { exportOrdersToCSV } from '../../../services/storeService';

export const OrdersModule = () => {
  const { orders, updateOrderStatus, activeSubView, setActiveSubView } = useAdmin();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [statusNote, setStatusNote] = useState('');

  const orderStages = [
    OrderStatus.NEW,
    OrderStatus.CONFIRMED,
    OrderStatus.PAYMENT_PENDING,
    OrderStatus.PRODUCTION,
    OrderStatus.QUALITY_CONTROL,
    OrderStatus.PACKED,
    OrderStatus.SHIPPED,
    OrderStatus.DELIVERED,
  ];

  const handleOpenDetail = (order) => {
    setSelectedOrder(order);
    setStatusNote('');
    setIsDetailDrawerOpen(true);
  };

  const handleCopyCourierInfo = (order) => {
    const itemsText = order.items?.map(i => `${i.name || 'Belt'} (${i.color}, ${i.size}) x${i.quantity || 1}`).join(' + ') || order.orderType || 'Macramé Belt';
    const text = `Name: ${order.name || order.contactName}\nPhone: ${order.phone}\nAddress: ${order.address}\nCity: ${order.city || order.district || ''}\nAmount: ${order.totalCost} BDT (COD)\nItem: ${itemsText}\nNote: ${order.note || 'None'}\nOrder ID: ${order.orderNumber || order.id}`;
    navigator.clipboard.writeText(text);
    setCopiedId(order.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleAdvanceStatus = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus, statusNote);
    // update current selectedOrder reference
    const updated = orders.find(o => o.id === orderId);
    if (updated) {
      setSelectedOrder({ ...updated, status: newStatus });
    }
    setStatusNote('');
  };

  // Filter orders by sub-view
  const filteredOrders = orders.filter((o) => {
    if (activeSubView === 'retail') return o.channel === SalesChannel.RETAIL || !o.channel;
    if (activeSubView === 'wholesale') return o.channel === SalesChannel.WHOLESALE;
    if (activeSubView === 'sample') return o.channel === SalesChannel.SAMPLE || o.formType === 'Sample' || (o.orderNumber || '').startsWith('SAM-');
    return true;
  });

  const orderColumns = [
    {
      header: 'Order #',
      field: 'orderNumber',
      render: (val, row) => (
        <div className="font-mono font-bold text-slate-900">{val || row.id}</div>
      ),
    },
    {
      header: 'Sales Channel',
      field: 'channel',
      render: (val, row) => (
        <Badge variant={val === SalesChannel.WHOLESALE ? 'terracotta' : 'primary'}>
          {val || 'Retail COD'}
        </Badge>
      ),
    },
    {
      header: 'Customer / Company',
      field: 'name',
      render: (val, row) => (
        <div>
          <div className="font-bold text-slate-900">{row.companyName || val || row.contactName}</div>
          <div className="text-[11px] text-slate-400">{row.phone}</div>
        </div>
      ),
    },
    {
      header: 'Total (BDT)',
      field: 'grandTotal',
      render: (val, row) => {
        const total = row.grandTotal !== undefined ? row.grandTotal : (row.totalCost || 0);
        return (
          <div>
            <div className="font-serif font-bold text-slate-900 text-sm">৳{Number(total).toLocaleString()}</div>
            {row.sampleCreditApplied > 0 && (
              <span className="text-[10px] text-emerald-700 font-bold block">
                -৳{row.sampleCreditApplied} Credit
              </span>
            )}
          </div>
        );
      },
    },

    {
      header: 'Pipeline Status',
      field: 'status',
      render: (val) => <Badge>{val || OrderStatus.NEW}</Badge>,
    },
    {
      header: 'Inventory State',
      field: 'inventoryReserved',
      render: (val, row) => (
        <span className={`text-[11px] font-semibold ${val ? 'text-amber-700' : row.status === 'Shipped' || row.status === 'Delivered' ? 'text-slate-500' : 'text-slate-400'}`}>
          {val ? '● Stock Reserved' : row.status === 'Shipped' || row.status === 'Delivered' ? '✓ Stock Deducted' : '○ Not Reserved'}
        </span>
      ),
    },
    {
      header: 'Quick Action',
      field: 'id',
      render: (_, row) => (
        <Button onClick={() => handleOpenDetail(row)} size="sm" variant="outline">
          Inspect Order
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header & Sub-view Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
            Unified Order Fulfillment & Pipeline Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Unified multi-channel architecture supporting Retail COD ad sales, Wholesale Bulk POs, and Sample Orders with inventory triggers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Tabs
            tabs={[
              { id: 'all', label: `All Orders (${orders.length})` },
              { id: 'retail', label: `Retail COD` },
              { id: 'wholesale', label: `Wholesale Bulk` },
            ]}
            activeTab={activeSubView === 'retail' ? 'retail' : activeSubView === 'wholesale' ? 'wholesale' : 'all'}
            onChange={(id) => setActiveSubView(id)}
          />

          <Button
            onClick={() => exportOrdersToCSV(filteredOrders)}
            variant="secondary"
            size="md"
            icon={Download}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Orders DataTable */}
      <DataTable
        columns={orderColumns}
        data={filteredOrders}
        searchPlaceholder="Search orders by order #, customer, phone, company, address..."
        onRowClick={(row) => handleOpenDetail(row)}
      />

      {/* High-Quality Order Detail Drawer */}
      <Drawer
        isOpen={isDetailDrawerOpen}
        onClose={() => setIsDetailDrawerOpen(false)}
        title={selectedOrder?.orderNumber || selectedOrder?.id || 'Order Detail'}
        subtitle={`${selectedOrder?.channel || 'Retail COD'} • Created on ${selectedOrder?.createdAt}`}
        width="max-w-3xl"
        footer={
          <div className="flex items-center justify-between w-full">
            <Button
              onClick={() => handleCopyCourierInfo(selectedOrder)}
              variant="primary"
              size="md"
              icon={copiedId === selectedOrder?.id ? Check : Copy}
            >
              {copiedId === selectedOrder?.id ? 'Copied for Courier!' : 'Copy Courier Payload'}
            </Button>
            <Button onClick={() => setIsDetailDrawerOpen(false)} variant="secondary" size="md">
              Close Drawer
            </Button>
          </div>
        }
      >
        {selectedOrder && (
          <div className="space-y-6">
            
            {/* Visual Pipeline Status Stepper */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Advance Order Pipeline Status
                </span>
                <Badge>{selectedOrder.status || 'New'}</Badge>
              </div>

              <PipelineView
                stages={orderStages}
                currentStage={selectedOrder.status || 'New'}
                onStageClick={(newStage) => handleAdvanceStatus(selectedOrder.id, newStage)}
              />

              {/* Status Note Input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="Add optional note for status change audit log..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                />
              </div>
            </div>

            {/* Customer & Shipping Summary Grid */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              {/* Customer Box */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Customer Information</span>
                <div className="font-bold text-slate-900 text-sm">{selectedOrder.name || selectedOrder.contactName}</div>
                {selectedOrder.companyName && (
                  <div className="text-[11px] font-semibold text-[#C25E3E]">{selectedOrder.companyName}</div>
                )}
                <div className="flex items-center gap-2 text-slate-700 pt-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <a href={`tel:${selectedOrder.phone}`} className="font-mono font-semibold hover:underline">{selectedOrder.phone}</a>
                </div>
              </div>

              {/* Shipping Destination */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Shipping Destination</span>
                <div className="flex items-start gap-2 text-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    {selectedOrder.address}, {selectedOrder.city} {selectedOrder.country ? `(${selectedOrder.country})` : ''}
                  </span>
                </div>
                {selectedOrder.courier && (
                  <div className="text-[11px] text-slate-600 font-medium pt-1">
                    Courier: <strong>{selectedOrder.courier}</strong> ({selectedOrder.trackingNumber || 'Pending Tracking'})
                  </div>
                )}
              </div>

            </div>

            {/* Line Items Table */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Ordered Products & Variant Quantities
              </span>

              <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="p-3 bg-white flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className={`w-3.5 h-3.5 rounded-full border border-black/20 ${
                        item.color === 'Black' ? 'bg-black' :
                        item.color === 'Navy' ? 'bg-[#1C2841]' :
                        item.color === 'Brown' ? 'bg-[#5C4033]' :
                        item.color === 'Maroon' ? 'bg-[#800000]' : 'bg-[#C3B091]'
                      }`} />
                      <div>
                        <div className="font-bold text-slate-900">{item.name || 'AST Macramé Belt'}</div>
                        <div className="text-[11px] text-slate-500">Color: {item.color} • Size: {item.size}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold text-slate-800">
                        {item.quantity || 1} x ৳{Number(item.unitPrice || 850).toLocaleString()}
                      </div>
                      <div className="font-serif font-bold text-slate-900">
                        ৳{Number((item.quantity || 1) * (item.unitPrice || 850)).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Breakdown Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal Items</span>
                <span>৳{Number(selectedOrder.subtotal || selectedOrder.totalCost).toLocaleString()}</span>
              </div>

              {selectedOrder.sampleCreditApplied > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold bg-emerald-50 p-1.5 rounded-lg border border-emerald-200">
                  <span>Sample Fee Credit Redeemed</span>
                  <span>-৳{Number(selectedOrder.sampleCreditApplied).toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Delivery & Freight Charge</span>
                <span>৳{Number(selectedOrder.shippingCost || 100).toLocaleString()}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between font-serif font-bold text-base text-slate-900">
                <span className="text-[#C25E3E]">৳{Number(selectedOrder.grandTotal || selectedOrder.totalCost || 0).toLocaleString()}</span>
              </div>
            </div>


            {/* Audit & Timeline Activity Log */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block border-b border-slate-200 pb-1">
                Order Activity & Status Audit Timeline
              </span>
              <Timeline items={selectedOrder.timeline || []} />
            </div>

          </div>
        )}
      </Drawer>

    </div>
  );
};
