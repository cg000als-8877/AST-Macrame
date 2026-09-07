import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { DataTable } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Tabs } from '../../components/ui/Tabs';
import { Package, Plus, Minus, History, AlertTriangle, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export const InventoryModule = () => {
  const { products, movements, recordInventoryAdjustment, activeSubView, setActiveSubView } = useAdmin();
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [adjustQty, setAdjustQty] = useState(10);
  const [adjustReason, setAdjustReason] = useState('Production batch replenishment');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Flattened inventory variants
  const inventoryRows = [];
  products.forEach((p) => {
    p.variants.forEach((v) => {
      inventoryRows.push({
        id: v.id,
        sku: v.sku,
        color: v.color,
        hex: v.hex,
        size: v.size,
        onHand: v.stock.onHand || 0,
        reserved: v.stock.reserved || 0,
        available: v.stock.available || 0,
        lowStockThreshold: v.stock.lowStockThreshold || 15,
        status: (v.stock.available || 0) <= (v.stock.lowStockThreshold || 15) ? 'Low Stock' : 'In Stock',
      });
    });
  });

  const handleOpenAdjust = (variant) => {
    setSelectedVariant(variant);
    setAdjustQty(10);
    setAdjustReason('Production batch replenishment');
    setIsAdjustModalOpen(true);
  };

  const handleSubmitAdjustment = (e) => {
    e.preventDefault();
    if (!selectedVariant) return;
    setIsSubmitting(true);
    try {
      recordInventoryAdjustment(selectedVariant.id, Number(adjustQty), adjustReason);
      setIsAdjustModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inventoryColumns = [
    {
      header: 'SKU',
      field: 'sku',
      render: (val) => <span className="font-mono font-bold text-slate-900">{val}</span>,
    },
    {
      header: 'Colorway',
      field: 'color',
      render: (val, row) => (
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: row.hex }} />
          <span className="font-semibold text-slate-800">{val}</span>
        </div>
      ),
    },
    {
      header: 'Size',
      field: 'size',
      render: (val) => <span className="font-semibold text-slate-700">{val}</span>,
    },
    {
      header: 'On-Hand',
      field: 'onHand',
      render: (val) => <span className="font-bold text-slate-900 text-sm">{val} pcs</span>,
    },
    {
      header: 'Reserved (Orders)',
      field: 'reserved',
      render: (val) => (
        <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-xs">
          {val} pcs
        </span>
      ),
    },
    {
      header: 'Available for Sale',
      field: 'available',
      render: (val, row) => (
        <span className={`font-serif font-bold text-sm ${val <= row.lowStockThreshold ? 'text-amber-600' : 'text-emerald-700'}`}>
          {val} pcs
        </span>
      ),
    },
    {
      header: 'Health Status',
      field: 'status',
      render: (val) => <Badge>{val}</Badge>,
    },
    {
      header: 'Action',
      field: 'id',
      render: (_, row) => (
        <Button onClick={() => handleOpenAdjust(row)} size="sm" variant="secondary">
          Adjust Stock
        </Button>
      ),
    },
  ];

  const movementColumns = [
    {
      header: 'Timestamp',
      field: 'timestamp',
      render: (val) => <span className="font-mono text-[11px] text-slate-500">{val}</span>,
    },
    {
      header: 'SKU',
      field: 'sku',
      render: (val) => <span className="font-mono font-bold text-slate-900">{val}</span>,
    },
    {
      header: 'Transaction Type',
      field: 'type',
      render: (val) => <Badge>{val}</Badge>,
    },
    {
      header: 'Change Qty',
      field: 'quantity',
      render: (val) => (
        <span className={`font-bold font-mono text-xs ${val >= 0 ? 'text-emerald-700' : 'text-slate-800'}`}>
          {val > 0 ? `+${val}` : val} pcs
        </span>
      ),
    },
    {
      header: 'Reference ID',
      field: 'referenceId',
      render: (val) => <span className="font-mono text-slate-600 text-xs">{val}</span>,
    },
    {
      header: 'Reason & Context',
      field: 'reason',
      render: (val) => <span className="text-slate-700 text-xs">{val}</span>,
    },
    {
      header: 'Audit Actor',
      field: 'performedBy',
      render: (val) => <span className="text-slate-400 text-[11px]">{val}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header & Sub-view switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
            Real-Time Inventory & Stock Audit Engine
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Full transactional inventory accounting: On-hand, reserved orders, available stock, and immutable movement audit trails.
          </p>
        </div>

        <Tabs
          tabs={[
            { id: 'stock', label: `Live Stock Levels (${inventoryRows.length})` },
            { id: 'movements', label: `Movement Audit Logs (${movements.length})` },
          ]}
          activeTab={activeSubView === 'movements' ? 'movements' : 'stock'}
          onChange={(id) => setActiveSubView(id)}
        />
      </div>

      {/* Main Content View */}
      {activeSubView !== 'movements' ? (
        <DataTable
          columns={inventoryColumns}
          data={inventoryRows}
          searchPlaceholder="Search by SKU, colorway, size..."
        />
      ) : (
        <DataTable
          columns={movementColumns}
          data={movements}
          searchPlaceholder="Search movement audit trail by SKU, reference ID, reason..."
        />
      )}

      {/* Stock Adjustment Modal */}
      <Modal
        isOpen={isAdjustModalOpen}
        onClose={() => setIsAdjustModalOpen(false)}
        title={`Adjust Stock: ${selectedVariant?.color} (${selectedVariant?.size})`}
        subtitle={`SKU: ${selectedVariant?.sku} • Current On-Hand: ${selectedVariant?.onHand} pcs`}
        footer={
          <>
            <Button onClick={() => setIsAdjustModalOpen(false)} variant="ghost" size="md">
              Cancel
            </Button>
            <Button onClick={handleSubmitAdjustment} isLoading={isSubmitting} variant="terracotta" size="md">
              Commit Stock Transaction
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmitAdjustment} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Quantity Adjustment (Enter negative for reduction)
            </label>
            <input
              type="number"
              required
              value={adjustQty}
              onChange={(e) => setAdjustQty(Number(e.target.value))}
              placeholder="e.g. 25 or -5"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:border-slate-900"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Resulting On-Hand Stock: <strong>{Math.max(0, (selectedVariant?.onHand || 0) + Number(adjustQty))} pcs</strong>
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Reason / Audit Context
            </label>
            <select
              value={adjustReason}
              onChange={(e) => setAdjustReason(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800"
            >
              <option value="Production batch replenishment">Production batch replenishment</option>
              <option value="Physical warehouse stock count reconciliation">Physical warehouse stock count reconciliation</option>
              <option value="Damaged / QC reject write-off">Damaged / QC reject write-off</option>
              <option value="VIP showroom sample allocation">VIP showroom sample allocation</option>
              <option value="Supplier raw cord return">Supplier raw cord return</option>
            </select>
          </div>
        </form>
      </Modal>

    </div>
  );
};
