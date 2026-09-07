import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { StatCard } from '../../components/ui/StatCard';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { 
  Truck, 
  Package, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Check, 
  MapPin,
  ExternalLink,
  Plus,
  Send,
  Calendar
} from 'lucide-react';
import { OrderStatus, ShipmentStatus } from '../../types/schema';

export const ShippingModule = () => {
  const { orders, shipments, updateOrderShipping, activeSubView, navigateTo } = useAdmin();
  const [copiedId, setCopiedId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [trackingForm, setTrackingForm] = useState({
    carrier: 'Steadfast Courier',
    trackingNumber: '',
    status: OrderStatus.SHIPPED,
    shippingCost: 100,
  });

  const readyOrders = orders.filter(o => o.status === OrderStatus.CONFIRMED || o.fulfillmentStatus === 'Ready to Ship');
  const packedOrders = orders.filter(o => o.status === OrderStatus.PACKED || o.fulfillmentStatus === 'Packed');
  const inTransitOrders = orders.filter(o => o.status === OrderStatus.SHIPPED || o.fulfillmentStatus === 'In Transit');
  const deliveredOrders = orders.filter(o => o.status === OrderStatus.DELIVERED || o.fulfillmentStatus === 'Delivered');

  const getFilteredList = () => {
    switch (activeSubView) {
      case 'ready':
        return readyOrders;
      case 'packed':
        return packedOrders;
      case 'shipped':
        return inTransitOrders;
      case 'delivered':
        return deliveredOrders;
      default:
        return orders.filter(o => [OrderStatus.CONFIRMED, OrderStatus.PACKED, OrderStatus.SHIPPED, OrderStatus.DELIVERED].includes(o.status));
    }
  };

  const currentList = getFilteredList();

  const handleCopyCourierInfo = (order) => {
    const itemsText = order.items?.map(i => `${i.name || 'Belt'} (${i.color}, ${i.size}) x${i.quantity || 1}`).join(' + ') || 'Macramé Belt';
    const text = `Name: ${order.contactName || order.name}\nPhone: ${order.phone}\nAddress: ${order.address || order.shippingAddress?.street || ''}\nCity: ${order.city || order.shippingAddress?.city || 'Dhaka'}\nAmount: ${order.grandTotal || order.totalCost} BDT (COD)\nItem: ${itemsText}\nNote: ${order.note || 'None'}\nOrder ID: ${order.orderNumber || order.id}`;
    navigator.clipboard.writeText(text);
    setCopiedId(order.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleOpenDispatch = (order) => {
    setSelectedOrder(order);
    setTrackingForm({
      carrier: order.carrier || (order.channel === 'Wholesale' ? 'DHL Express' : 'Steadfast Courier'),
      trackingNumber: order.trackingNumber || (order.channel === 'Wholesale' ? `DHL-EX-${Date.now().toString().slice(-8)}` : `ST-${Date.now().toString().slice(-8)}BD`),
      status: OrderStatus.SHIPPED,
      shippingCost: order.shippingCost || (order.channel === 'Wholesale' ? 15000 : 100),
    });
    setIsUpdateModalOpen(true);
  };

  const handleSaveDispatch = (e) => {
    e.preventDefault();
    if (!selectedOrder) return;
    updateOrderShipping(selectedOrder.id, trackingForm);
    setIsUpdateModalOpen(false);
    setSelectedOrder(null);
  };

  const handleMarkDelivered = (order) => {
    updateOrderShipping(order.id, {
      carrier: order.carrier || 'Steadfast Courier',
      trackingNumber: order.trackingNumber || 'DELIVERED',
      status: OrderStatus.DELIVERED,
    });
  };

  const columns = [
    {
      header: 'Order / Consignment',
      accessor: 'id',
      sortable: true,
      cell: (order) => (
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-slate-900 text-xs">{order.orderNumber || order.id}</span>
            <Badge status={order.channel === 'Wholesale' ? 'B2B Wholesale' : 'Retail COD'} size="sm" />
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {order.companyName ? `${order.companyName} (${order.contactName})` : (order.contactName || order.name)}
          </p>
        </div>
      ),
    },
    {
      header: 'Destination & Address',
      accessor: 'city',
      cell: (order) => (
        <div className="text-xs text-slate-700 max-w-[200px] truncate">
          <div className="flex items-center gap-1 font-medium">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span>{order.city || order.shippingAddress?.city || 'Dhaka'}</span>
            <span className="text-slate-400">({order.country || order.shippingAddress?.country || 'BD'})</span>
          </div>
          <p className="text-[11px] text-slate-500 truncate mt-0.5">{order.address || order.shippingAddress?.street || 'Address on file'}</p>
        </div>
      ),
    },
    {
      header: 'Fulfillment Stage',
      accessor: 'status',
      sortable: true,
      cell: (order) => <Badge status={order.status} />,
    },
    {
      header: 'Carrier & Tracking',
      accessor: 'trackingNumber',
      cell: (order) => (
        <div className="text-xs">
          {order.trackingNumber ? (
            <div>
              <span className="font-medium text-slate-900">{order.carrier || 'Courier'}</span>
              <div className="flex items-center gap-1 text-[11px] font-mono text-terracotta mt-0.5 font-bold">
                <span>{order.trackingNumber}</span>
              </div>
            </div>
          ) : (
            <span className="text-[11px] text-slate-400 italic">Awaiting Courier Tag</span>
          )}
        </div>
      ),
    },
    {
      header: 'Items',
      accessor: 'items',
      cell: (order) => (
        <div className="text-xs text-slate-600">
          <span className="font-semibold text-slate-900">{order.items?.reduce((acc, i) => acc + (i.quantity || 1), 0) || 0} units</span>
          <p className="text-[11px] text-slate-500 font-mono">৳{(order.grandTotal || order.totalCost)?.toLocaleString()} BDT</p>
        </div>
      ),
    },
    {
      header: 'Actions',
      cell: (order) => (
        <div className="flex items-center gap-1.5 justify-end">
          <button
            onClick={() => handleCopyCourierInfo(order)}
            className="p-1.5 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Copy Courier Dispatch Payload"
          >
            {copiedId === order.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          {order.status !== OrderStatus.DELIVERED ? (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleOpenDispatch(order)}
              >
                Dispatch / Edit
              </Button>
              {order.status === OrderStatus.SHIPPED && (
                <Button
                  size="sm"
                  variant="terracotta"
                  onClick={() => handleMarkDelivered(order)}
                >
                  Confirm Delivery
                </Button>
              )}
            </>
          ) : (
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">Shipping & Logistics Hub</h1>
          <p className="text-sm text-slate-500 mt-1">Manage courier consignments, tracking numbers, shipping costs, and proof of delivery</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigateTo('orders')}>
          View All Orders
        </Button>
      </div>

      {/* 4-Stage Logistics Pipeline KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="1. Ready to Ship"
          value={readyOrders.length}
          icon={Package}
          color="amber"
          subtitle="Orders awaiting parceling"
        />
        <StatCard
          title="2. Packed"
          value={packedOrders.length}
          icon={Clock}
          color="purple"
          subtitle="Boxed with shipping label"
        />
        <StatCard
          title="3. Shipped (In Transit)"
          value={inTransitOrders.length}
          icon={Truck}
          color="blue"
          subtitle="Dispatched with courier"
        />
        <StatCard
          title="4. Delivered"
          value={deliveredOrders.length}
          icon={CheckCircle2}
          color="emerald"
          subtitle="Completed deliveries"
        />
      </div>

      {/* Consignment Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/50">
          <div>
            <h2 className="font-serif font-bold text-slate-900 text-base">Consignment Dispatch Ledger</h2>
            <p className="text-xs text-slate-500">Live tracker for domestic courier COD and global B2B freight shipments</p>
          </div>
          <span className="text-xs text-slate-400">Filter View: <strong className="text-slate-700 uppercase">{activeSubView || 'All'}</strong></span>
        </div>

        <DataTable
          columns={columns}
          data={currentList}
          searchPlaceholder="Search by tracking #, order ID, customer name, destination..."
          searchableKeys={['id', 'orderNumber', 'contactName', 'name', 'companyName', 'city', 'trackingNumber', 'carrier']}
          emptyMessage="No shipments found for this view"
        />
      </div>

      {/* Dispatch / Edit Tracking Modal */}
      {isUpdateModalOpen && selectedOrder && (
        <Modal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          title={`Dispatch Consignment • ${selectedOrder.orderNumber || selectedOrder.id}`}
        >
          <form onSubmit={handleSaveDispatch} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Logistics Carrier
              </label>
              <select
                value={trackingForm.carrier}
                onChange={(e) => setTrackingForm({ ...trackingForm, carrier: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta"
              >
                <option value="Steadfast Courier">Steadfast Courier (Domestic COD)</option>
                <option value="Pathao Courier">Pathao Courier</option>
                <option value="RedX Logistics">RedX Logistics</option>
                <option value="DHL Express">DHL Express (Global Air Priority)</option>
                <option value="FedEx">FedEx International</option>
                <option value="Air Cargo Forwarder">Air Cargo Forwarder (Bulk B2B)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Tracking / Consignment Number
              </label>
              <input
                type="text"
                value={trackingForm.trackingNumber}
                onChange={(e) => setTrackingForm({ ...trackingForm, trackingNumber: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta font-mono font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Shipment Status
                </label>
                <select
                  value={trackingForm.status}
                  onChange={(e) => setTrackingForm({ ...trackingForm, status: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta"
                >
                  <option value={OrderStatus.CONFIRMED}>Confirmed (Ready to Pack)</option>
                  <option value={OrderStatus.PACKED}>Packed</option>
                  <option value={OrderStatus.SHIPPED}>Shipped (In Transit)</option>
                  <option value={OrderStatus.DELIVERED}>Delivered</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Shipping Cost (BDT)
                </label>
                <input
                  type="number"
                  value={trackingForm.shippingCost}
                  onChange={(e) => setTrackingForm({ ...trackingForm, shippingCost: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta font-mono"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <p>Recipient: <strong>{selectedOrder.contactName || selectedOrder.name} ({selectedOrder.phone})</strong></p>
              <p>Address: {selectedOrder.address || selectedOrder.shippingAddress?.street}, {selectedOrder.city || selectedOrder.shippingAddress?.city}</p>
              <p>Collectable Total: <strong>৳{(selectedOrder.grandTotal || selectedOrder.totalCost)?.toLocaleString()} BDT</strong></p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsUpdateModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="terracotta">
                Update & Dispatch
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
