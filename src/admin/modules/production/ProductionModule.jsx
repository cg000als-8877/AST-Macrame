import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { StatCard } from '../../components/ui/StatCard';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Drawer } from '../../components/ui/Drawer';
import { 
  Factory, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Plus,
  Scissors,
  Layers,
  Calendar,
  UserCheck,
  RotateCcw,
  ArrowRight,
  ClipboardCheck,
  Check
} from 'lucide-react';
import { ProductionBatchStatus, QCStatus } from '../../types/schema';

export const ProductionModule = () => {
  const { 
    batches, 
    orders, 
    products, 
    activeSubView, 
    createProductionBatch, 
    updateBatchStatus, 
    recordQCInspection 
  } = useAdmin();

  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'
  const [isNewBatchModalOpen, setIsNewBatchModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isQCDrawerOpen, setIsQCDrawerOpen] = useState(false);

  // New Batch Form State
  const [newBatch, setNewBatch] = useState({
    color: 'Midnight Black',
    size: 'M (32–35")',
    quantity: 100,
    orderId: '',
    workshop: 'Artisan Workshop 1 (Savar)',
    assignedTeam: 'Master Weaver Rafiq',
    targetDate: '2026-09-25',
    notes: 'Standard tight tension artisanal braid.',
  });

  // QC Form State
  const [qcForm, setQCForm] = useState({
    quantityInspected: 100,
    quantityPassed: 100,
    quantityFailed: 0,
    inspector: 'Senior QC Lead Tareq',
    defects: [],
    notes: 'Inspected weave density, buckle anti-rust coating, and length consistency.',
  });

  const defectOptions = [
    'Uneven knot tension',
    'Frayed organic cord end',
    'Buckle finish scratch',
    'Length dimension mismatch',
    'Loose braid pattern'
  ];

  const handleOpenQC = (batch) => {
    setSelectedBatch(batch);
    setQCForm({
      quantityInspected: batch.quantity,
      quantityPassed: batch.quantity,
      quantityFailed: 0,
      inspector: 'Senior QC Lead Tareq',
      defects: [],
      notes: 'All cords inspected for knot symmetry and hardware alignment.',
    });
    setIsQCDrawerOpen(true);
  };

  const handleToggleDefect = (defect) => {
    setQCForm(prev => {
      const exists = prev.defects.includes(defect);
      const updated = exists ? prev.defects.filter(d => d !== defect) : [...prev.defects, defect];
      const failedCount = updated.length > 0 ? Math.max(1, Math.round(prev.quantityInspected * 0.05 * updated.length)) : 0;
      return {
        ...prev,
        defects: updated,
        quantityFailed: failedCount,
        quantityPassed: Math.max(0, prev.quantityInspected - failedCount),
      };
    });
  };

  const handleSubmitQC = (e) => {
    e.preventDefault();
    if (!selectedBatch) return;
    recordQCInspection(selectedBatch.id, qcForm);
    setIsQCDrawerOpen(false);
    setSelectedBatch(null);
  };

  const handleCreateBatch = (e) => {
    e.preventDefault();
    const matchedOrder = orders.find(o => o.id === newBatch.orderId);
    createProductionBatch({
      orderId: newBatch.orderId || null,
      orderNumber: matchedOrder ? matchedOrder.orderNumber : null,
      color: newBatch.color,
      size: newBatch.size,
      quantity: Number(newBatch.quantity),
      workshop: newBatch.workshop,
      assignedTeam: newBatch.assignedTeam,
      expectedCompletion: newBatch.targetDate,
      notes: newBatch.notes,
    });
    setIsNewBatchModalOpen(false);
  };

  const getFilteredBatches = () => {
    switch (activeSubView) {
      case 'queue':
        return batches.filter(b => b.status === ProductionBatchStatus.QUEUED);
      case 'in-progress':
        return batches.filter(b => b.status === ProductionBatchStatus.IN_PRODUCTION);
      case 'qc':
        return batches.filter(b => b.status === ProductionBatchStatus.QUALITY_CONTROL);
      case 'completed':
      case 'approved':
        return batches.filter(b => b.status === ProductionBatchStatus.APPROVED || b.status === ProductionBatchStatus.COMPLETED);
      default:
        return batches;
    }
  };

  const currentList = getFilteredBatches();

  // Kanban stages
  const kanbanStages = [
    { id: ProductionBatchStatus.QUEUED, label: 'Queued', color: 'border-slate-300 bg-slate-50/50' },
    { id: ProductionBatchStatus.IN_PRODUCTION, label: 'In Production (On Looms)', color: 'border-blue-300 bg-blue-50/30' },
    { id: ProductionBatchStatus.COMPLETED, label: 'Weaving Completed', color: 'border-purple-300 bg-purple-50/30' },
    { id: ProductionBatchStatus.QUALITY_CONTROL, label: 'Quality Control (QC)', color: 'border-amber-300 bg-amber-50/30' },
    { id: ProductionBatchStatus.APPROVED, label: 'Approved Finished Stock', color: 'border-emerald-300 bg-emerald-50/30' },
  ];

  const columns = [
    {
      header: 'Batch ID & Product',
      accessor: 'id',
      sortable: true,
      cell: (batch) => (
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-slate-900 text-xs">{batch.batchNumber || batch.id}</span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">
              {batch.color} ({batch.size})
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {batch.orderNumber ? `Order: ${batch.orderNumber}` : 'Stock Replenishment Build'}
          </p>
        </div>
      ),
    },
    {
      header: 'Workshop & Weaver',
      accessor: 'assignedWorkshop',
      cell: (batch) => (
        <div className="text-xs">
          <p className="font-medium text-slate-900">{batch.assignedWorkshop}</p>
          <p className="text-[11px] text-slate-500">{batch.assignedTeam}</p>
        </div>
      ),
    },
    {
      header: 'Quantity & Progress',
      accessor: 'quantity',
      cell: (batch) => {
        const pct = Math.round(((batch.completedQty || 0) / batch.quantity) * 100);
        return (
          <div className="w-36 text-xs">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-slate-800">{batch.completedQty || 0} / {batch.quantity} pcs</span>
              <span className="text-[11px] text-slate-500">{pct}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  pct === 100 ? 'bg-emerald-500' : 'bg-terracotta'
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      header: 'Production Stage',
      accessor: 'status',
      sortable: true,
      cell: (batch) => <Badge status={batch.status} />,
    },
    {
      header: 'QC Status',
      accessor: 'qcStatus',
      cell: (batch) => (
        <div className="text-xs">
          <span className={`inline-flex items-center gap-1 font-medium ${
            batch.qcStatus === QCStatus.PASSED ? 'text-emerald-700' : batch.qcStatus === QCStatus.FAILED ? 'text-rose-700' : 'text-amber-700'
          }`}>
            <UserCheck className="w-3.5 h-3.5" />
            {batch.qcStatus || 'Pending'}
          </span>
        </div>
      ),
    },
    {
      header: 'Actions',
      cell: (batch) => (
        <div className="flex items-center gap-1.5 justify-end">
          {batch.status === ProductionBatchStatus.QUALITY_CONTROL && (
            <Button
              size="sm"
              variant="terracotta"
              icon={ClipboardCheck}
              onClick={() => handleOpenQC(batch)}
            >
              Perform QC
            </Button>
          )}

          {batch.status === ProductionBatchStatus.QUEUED && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => updateBatchStatus(batch.id, ProductionBatchStatus.IN_PRODUCTION, 'Started braiding')}
            >
              Start Weaving &rarr;
            </Button>
          )}

          {batch.status === ProductionBatchStatus.IN_PRODUCTION && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => updateBatchStatus(batch.id, ProductionBatchStatus.QUALITY_CONTROL, 'Completed looms')}
            >
              Send to QC &rarr;
            </Button>
          )}

          {batch.status === ProductionBatchStatus.APPROVED && (
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Approved Stock
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
          <h1 className="text-2xl font-bold font-serif text-slate-900">Artisan Production & Quality Control</h1>
          <p className="text-sm text-slate-500 mt-1">Manage workshop loom queues, master artisan allocations, and quality control defect gates</p>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'kanban' ? 'bg-white shadow-2xs text-slate-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Kanban Board
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'table' ? 'bg-white shadow-2xs text-slate-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Table List
            </button>
          </div>
          <Button variant="terracotta" icon={Plus} onClick={() => setIsNewBatchModalOpen(true)}>
            Create Batch
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Queued Batches"
          value={batches.filter(b => b.status === ProductionBatchStatus.QUEUED).length}
          icon={Clock}
          color="slate"
          subtitle="Ready for cord dyeing"
        />
        <StatCard
          title="Active On Looms"
          value={`${batches.filter(b => b.status === ProductionBatchStatus.IN_PRODUCTION).reduce((sum, b) => sum + b.quantity, 0)} pcs`}
          icon={Factory}
          color="blue"
          subtitle="In progress weaving"
        />
        <StatCard
          title="Awaiting QC Inspection"
          value={batches.filter(b => b.status === ProductionBatchStatus.QUALITY_CONTROL).length}
          icon={Sparkles}
          color="amber"
          subtitle="Tension & buckle check"
        />
        <StatCard
          title="Approved to Stock"
          value={`${batches.filter(b => b.status === ProductionBatchStatus.APPROVED).reduce((sum, b) => sum + b.quantity, 0)} pcs`}
          icon={CheckCircle2}
          color="emerald"
          subtitle="Added to available stock"
        />
      </div>

      {/* Main View: Kanban vs Table */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {kanbanStages.map((stage) => {
            const stageBatches = batches.filter(b => b.status === stage.id);
            return (
              <div
                key={stage.id}
                className={`rounded-xl border ${stage.color} p-3.5 flex flex-col min-w-[240px] bg-slate-50/50`}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60">
                  <h3 className="font-semibold text-xs text-slate-800 uppercase tracking-wider">
                    {stage.label}
                  </h3>
                  <span className="w-5 h-5 rounded-full bg-white text-[11px] font-bold text-slate-700 flex items-center justify-center border border-slate-200 shadow-2xs">
                    {stageBatches.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  {stageBatches.length === 0 ? (
                    <p className="text-[11px] text-slate-400 text-center py-6">No batches in this stage</p>
                  ) : (
                    stageBatches.map((batch) => (
                      <div
                        key={batch.id}
                        className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-mono font-bold text-xs text-slate-900">{batch.batchNumber || batch.id}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {batch.color}
                          </span>
                        </div>

                        <div className="text-xs text-slate-600 space-y-0.5">
                          <p className="font-medium text-slate-800">{batch.quantity} pcs ({batch.size})</p>
                          <p className="text-[11px] text-slate-500">{batch.assignedWorkshop}</p>
                          <p className="text-[10px] text-slate-400">Lead: {batch.assignedTeam}</p>
                        </div>

                        {/* QC Status Badge */}
                        {batch.qcStatus && (
                          <div className="pt-1">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                              batch.qcStatus === QCStatus.PASSED
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : batch.qcStatus === QCStatus.FAILED
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              QC: {batch.qcStatus}
                            </span>
                          </div>
                        )}

                        {/* Progression Buttons */}
                        <div className="pt-2 border-t border-slate-100 flex justify-end gap-1.5">
                          {batch.status === ProductionBatchStatus.QUEUED && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateBatchStatus(batch.id, ProductionBatchStatus.IN_PRODUCTION, 'Moved to Looms')}
                            >
                              Start &rarr;
                            </Button>
                          )}
                          {batch.status === ProductionBatchStatus.IN_PRODUCTION && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateBatchStatus(batch.id, ProductionBatchStatus.QUALITY_CONTROL, 'Ready for QC')}
                            >
                              To QC &rarr;
                            </Button>
                          )}
                          {batch.status === ProductionBatchStatus.QUALITY_CONTROL && (
                            <Button
                              size="sm"
                              variant="terracotta"
                              icon={ClipboardCheck}
                              onClick={() => handleOpenQC(batch)}
                            >
                              Inspect
                            </Button>
                          )}
                          {batch.status === ProductionBatchStatus.APPROVED && (
                            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Stock Live
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
          <DataTable
            columns={columns}
            data={currentList}
            searchPlaceholder="Search batches by ID, color, workshop, artisan..."
            searchableKeys={['id', 'color', 'assignedWorkshop', 'assignedTeam', 'productTitle']}
            emptyMessage="No batches found"
          />
        </div>
      )}

      {/* QC Inspection Drawer */}
      {isQCDrawerOpen && selectedBatch && (
        <Drawer
          isOpen={isQCDrawerOpen}
          onClose={() => setIsQCDrawerOpen(false)}
          title={`QC Inspection Audit • ${selectedBatch.batchNumber || selectedBatch.id}`}
          size="md"
        >
          <form onSubmit={handleSubmitQC} className="space-y-5">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <p className="font-semibold text-slate-900">Batch Information:</p>
              <p>Product: <strong>{selectedBatch.productTitle}</strong></p>
              <p>Color / Size: <strong>{selectedBatch.color} ({selectedBatch.size})</strong></p>
              <p>Total Batch Units: <strong>{selectedBatch.quantity} pieces</strong></p>
              <p>Origin: {selectedBatch.assignedWorkshop} ({selectedBatch.assignedTeam})</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                QC Lead Inspector
              </label>
              <input
                type="text"
                value={qcForm.inspector}
                onChange={(e) => setQCForm({ ...qcForm, inspector: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Inspected Quantity
                </label>
                <input
                  type="number"
                  value={qcForm.quantityInspected}
                  onChange={(e) => setQCForm({ ...qcForm, quantityInspected: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Passed Quantity
                </label>
                <input
                  type="number"
                  value={qcForm.quantityPassed}
                  onChange={(e) => setQCForm({ ...qcForm, quantityPassed: Number(e.target.value), quantityFailed: selectedBatch.quantity - Number(e.target.value) })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta font-mono font-bold text-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Defect Checklist & Inspection Points
              </label>
              <div className="space-y-2">
                {defectOptions.map((defect) => {
                  const isChecked = qcForm.defects.includes(defect);
                  return (
                    <label
                      key={defect}
                      onClick={() => handleToggleDefect(defect)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                        isChecked ? 'bg-rose-50 border-rose-300 text-rose-900 font-semibold' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded text-terracotta focus:ring-terracotta"
                      />
                      <span>{defect}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Inspection Notes & Rework Directives
              </label>
              <textarea
                rows={3}
                value={qcForm.notes}
                onChange={(e) => setQCForm({ ...qcForm, notes: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="font-semibold text-slate-800">Inspection Outcome:</span>
              {qcForm.quantityFailed > 0 ? (
                <p className="text-rose-700 font-semibold mt-1">
                  ⚠️ {qcForm.quantityFailed} defective items detected. Submitting will send this batch back to "In Production" with rework instructions.
                </p>
              ) : (
                <p className="text-emerald-700 font-semibold mt-1">
                  ✅ 100% Passed. Submitting will approve this batch and add {qcForm.quantityPassed} finished pieces directly to live available stock.
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsQCDrawerOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant={qcForm.quantityFailed > 0 ? 'danger' : 'terracotta'}
              >
                {qcForm.quantityFailed > 0 ? 'Send Back for Rework' : 'Approve & Release to Stock'}
              </Button>
            </div>
          </form>
        </Drawer>
      )}

      {/* New Batch Creation Modal */}
      {isNewBatchModalOpen && (
        <Modal
          isOpen={isNewBatchModalOpen}
          onClose={() => setIsNewBatchModalOpen(false)}
          title="Create Artisan Production Batch"
        >
          <form onSubmit={handleCreateBatch} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Link to Wholesale Order (Optional)
              </label>
              <select
                value={newBatch.orderId}
                onChange={(e) => setNewBatch({ ...newBatch, orderId: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta"
              >
                <option value="">None (Stock Replenishment Build)</option>
                {orders.filter(o => o.channel === 'Wholesale').map(o => (
                  <option key={o.id} value={o.id}>
                    {o.orderNumber || o.id} — {o.companyName || o.contactName} ({o.grandTotal || o.totalCost} BDT)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Color Variant
                </label>
                <select
                  value={newBatch.color}
                  onChange={(e) => setNewBatch({ ...newBatch, color: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta"
                >
                  <option value="Midnight Black">Midnight Black</option>
                  <option value="Deep Navy">Deep Navy</option>
                  <option value="Earthy Brown">Earthy Brown</option>
                  <option value="Desert Khaki">Desert Khaki</option>
                  <option value="Rich Maroon">Rich Maroon</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Size
                </label>
                <select
                  value={newBatch.size}
                  onChange={(e) => setNewBatch({ ...newBatch, size: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta"
                >
                  <option value='M (32–35")'>M (32–35")</option>
                  <option value='L (35–38")'>L (35–38")</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Target Batch Quantity (Pcs)
                </label>
                <input
                  type="number"
                  min="10"
                  value={newBatch.quantity}
                  onChange={(e) => setNewBatch({ ...newBatch, quantity: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Target Completion Date
                </label>
                <input
                  type="date"
                  value={newBatch.targetDate}
                  onChange={(e) => setNewBatch({ ...newBatch, targetDate: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Assigned Workshop
              </label>
              <select
                value={newBatch.workshop}
                onChange={(e) => setNewBatch({ ...newBatch, workshop: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta"
              >
                <option value="Artisan Workshop 1 (Savar)">Artisan Workshop 1 (Savar - Master Weaver Rafiq)</option>
                <option value="Artisan Workshop 2 (Gazipur)">Artisan Workshop 2 (Gazipur - Ustad Shafi)</option>
                <option value="Artisan Workshop 3 (Narayanganj)">Artisan Workshop 3 (Narayanganj - Artisan Tariq)</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsNewBatchModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="terracotta">
                Queue Production Batch
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
