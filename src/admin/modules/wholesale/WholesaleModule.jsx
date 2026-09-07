import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { DataTable } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Drawer } from '../../components/ui/Drawer';
import { Modal } from '../../components/ui/Modal';
import { Tabs } from '../../components/ui/Tabs';
import { PipelineView } from '../../components/ui/PipelineView';
import { 
  Briefcase, 
  Plus, 
  FileText, 
  Send, 
  CheckCircle2, 
  ShoppingBag, 
  Layers, 
  ArrowRight, 
  DollarSign, 
  Truck,
  Sparkles,
  Phone,
  Mail
} from 'lucide-react';
import { LeadStatus, QuoteStatus, SampleStatus, SampleCreditStatus } from '../../types/schema';

export const WholesaleModule = () => {
  const { 
    leads, 
    samples, 
    quotes, 
    companies, 
    products, 
    updateLeadStatus, 
    createLead, 
    createSampleOrder, 
    updateSampleStatus, 
    createQuotation, 
    updateQuoteStatus, 
    convertQuoteToWholesaleOrder, 
    activeSubView, 
    setActiveSubView 
  } = useAdmin();

  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [isNewQuoteModalOpen, setIsNewQuoteModalOpen] = useState(false);
  const [isNewSampleModalOpen, setIsNewSampleModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isLeadDrawerOpen, setIsLeadDrawerOpen] = useState(false);

  // New Lead form state
  const [leadForm, setLeadForm] = useState({
    title: '',
    companyName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    country: 'United States',
    estimatedPieces: 300,
    estimatedValueBDT: 195000,
    notes: '',
  });

  // New Quotation form state
  const [quoteForm, setQuoteForm] = useState({
    companyId: companies[0]?.id || '',
    validUntil: '2026-10-31',
    moq: 300,
    selectedColor: 'Black',
    selectedSize: 'M',
    quantity: 300,
    unitPrice: 650,
    shippingBDT: 15000,
    paymentTerms: '50% Production Deposit, 50% Balance on Dispatch',
    notes: 'Includes custom branded packaging and sample credit redemption on invoice.',
  });

  // New Sample form state
  const [sampleForm, setSampleForm] = useState({
    companyId: companies[0]?.id || '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    shippingAddress: '',
    color: 'Black',
    size: 'M (32–35")',
    sampleTotalBDT: 2400,
    shippingFeeBDT: 2500,
  });

  const leadStages = [
    LeadStatus.NEW,
    LeadStatus.CONTACTED,
    LeadStatus.SAMPLE_REQUESTED,
    LeadStatus.SAMPLE_SENT,
    LeadStatus.QUALIFIED,
    LeadStatus.QUOTE_SENT,
    LeadStatus.NEGOTIATION,
    LeadStatus.WON,
  ];

  const handleCreateLead = (e) => {
    e.preventDefault();
    createLead(leadForm);
    setIsNewLeadModalOpen(false);
    setLeadForm({
      title: '',
      companyName: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      country: 'United States',
      estimatedPieces: 300,
      estimatedValueBDT: 195000,
      notes: '',
    });
  };

  const handleCreateQuote = (e) => {
    e.preventDefault();
    const comp = companies.find(c => c.id === quoteForm.companyId) || companies[0];
    const subtotal = Number(quoteForm.quantity) * Number(quoteForm.unitPrice);
    
    // Check if company has an active sample credit
    const availableSample = samples.find(s => s.companyId === comp.id && s.creditStatus === SampleCreditStatus.AVAILABLE);
    const sampleCredit = availableSample ? availableSample.sampleCreditAmountBDT : 0;

    const payload = {
      companyId: comp.id,
      companyName: comp.name,
      contactName: comp.contacts?.[0]?.name || 'Buyer',
      contactEmail: comp.contacts?.[0]?.email || 'sourcing@company.com',
      currency: 'BDT',
      validUntil: quoteForm.validUntil,
      moq: Number(quoteForm.moq),
      items: [
        {
          variantId: 'var-blk-m',
          title: `AST Belt [${quoteForm.selectedColor} - ${quoteForm.selectedSize}]`,
          color: quoteForm.selectedColor,
          size: quoteForm.selectedSize,
          quantity: Number(quoteForm.quantity),
          unitPrice: Number(quoteForm.unitPrice),
          total: subtotal,
        },
      ],
      subtotalBDT: subtotal,
      sampleCreditDeductionBDT: sampleCredit,
      shippingBDT: Number(quoteForm.shippingBDT),
      totalBDT: subtotal - sampleCredit + Number(quoteForm.shippingBDT),
      paymentTerms: quoteForm.paymentTerms,
      notes: quoteForm.notes,
    };

    createQuotation(payload);
    setIsNewQuoteModalOpen(false);
  };

  const handleCreateSampleOrder = (e) => {
    e.preventDefault();
    const comp = companies.find(c => c.id === sampleForm.companyId) || companies[0];
    const payload = {
      companyId: comp.id,
      companyName: comp.name,
      contactName: sampleForm.contactName || comp.contacts?.[0]?.name || 'Buyer',
      contactEmail: sampleForm.contactEmail || comp.contacts?.[0]?.email || 'sourcing@company.com',
      contactPhone: sampleForm.contactPhone || comp.contacts?.[0]?.phone || '+1 555 0000',
      shippingAddress: sampleForm.shippingAddress || comp.address,
      items: [
        { variantId: 'var-blk-m', color: sampleForm.color, size: sampleForm.size, quantity: 1, samplePrice: Number(sampleForm.sampleTotalBDT) }
      ],
      sampleTotalBDT: Number(sampleForm.sampleTotalBDT),
      shippingFeeBDT: Number(sampleForm.shippingFeeBDT),
      totalPaidBDT: Number(sampleForm.sampleTotalBDT) + Number(sampleForm.shippingFeeBDT),
      trackingNumber: `DHL-${Math.floor(10000000 + Math.random() * 90000000)}`,
      courier: 'DHL Express',
      notes: 'Paid sample package with full invoice credit eligibility.',
    };

    createSampleOrder(payload);
    setIsNewSampleModalOpen(false);
  };

  const leadColumns = [
    {
      header: 'Deal Title / Project',
      field: 'title',
      render: (val, row) => (
        <div>
          <div className="font-bold text-slate-900 text-sm">{val}</div>
          <div className="text-[11px] text-slate-400 font-semibold">{row.companyName} • {row.country}</div>
        </div>
      ),
    },
    {
      header: 'Pipeline Stage',
      field: 'status',
      render: (val) => <Badge>{val}</Badge>,
    },
    {
      header: 'Estimated Pieces',
      field: 'estimatedPieces',
      render: (val) => <span className="font-semibold text-slate-700">{val} pcs</span>,
    },
    {
      header: 'Est. Deal Value (BDT)',
      field: 'estimatedValueBDT',
      render: (val) => <span className="font-serif font-bold text-slate-900">৳{Number(val).toLocaleString()}</span>,
    },
    {
      header: 'Contact Person',
      field: 'contactName',
      render: (val, row) => (
        <div className="text-xs">
          <div className="font-semibold text-slate-800">{val}</div>
          <div className="text-[10px] text-slate-400">{row.contactEmail}</div>
        </div>
      ),
    },
    {
      header: 'Stage Action',
      field: 'id',
      render: (_, row) => (
        <Button
          onClick={() => {
            setSelectedLead(row);
            setIsLeadDrawerOpen(true);
          }}
          size="sm"
          variant="outline"
        >
          Manage Deal
        </Button>
      ),
    },
  ];

  const sampleColumns = [
    {
      header: 'Sample #',
      field: 'sampleNumber',
      render: (val) => <span className="font-mono font-bold text-slate-900">{val}</span>,
    },
    {
      header: 'Wholesale Company',
      field: 'companyName',
      render: (val, row) => (
        <div>
          <div className="font-bold text-slate-900">{val}</div>
          <div className="text-[11px] text-slate-400">{row.contactName}</div>
        </div>
      ),
    },
    {
      header: 'Sample Items',
      field: 'items',
      render: (val) => (
        <div className="text-xs space-y-0.5">
          {val && val.map((it, i) => (
            <span key={i} className="block text-slate-700 font-medium">
              • {it.color} ({it.size}) x{it.quantity}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: 'Paid Total',
      field: 'totalPaidBDT',
      render: (val) => <span className="font-serif font-bold text-slate-900">৳{Number(val).toLocaleString()}</span>,
    },
    {
      header: 'Sample Status',
      field: 'status',
      render: (val) => <Badge>{val}</Badge>,
    },
    {
      header: 'Sample Credit Lifecycle',
      field: 'creditStatus',
      render: (val, row) => (
        <div>
          <Badge variant={val === 'Redeemed' ? 'terracotta' : val === 'Available' ? 'success' : 'neutral'}>
            {val === 'Redeemed' ? 'Redeemed on PO' : `৳${row.sampleCreditAmountBDT} Credit ${val}`}
          </Badge>
          {row.deliveredAt && (
            <span className="text-[10px] text-slate-400 block mt-0.5">Delivered {row.deliveredAt}</span>
          )}
        </div>
      ),
    },
    {
      header: 'Courier & Tracking',
      field: 'trackingNumber',
      render: (val, row) => (
        <div className="text-xs">
          <span className="font-semibold text-slate-800">{row.courier}</span>
          <span className="font-mono text-[10px] text-slate-500 block">{val}</span>
        </div>
      ),
    },
  ];

  const quoteColumns = [
    {
      header: 'Quote #',
      field: 'quoteNumber',
      render: (val) => <span className="font-mono font-bold text-slate-900">{val}</span>,
    },
    {
      header: 'Company / Client',
      field: 'companyName',
      render: (val, row) => (
        <div>
          <div className="font-bold text-slate-900">{val}</div>
          <div className="text-[11px] text-slate-400">{row.contactName}</div>
        </div>
      ),
    },
    {
      header: 'MOQ / Qty',
      field: 'moq',
      render: (val, row) => (
        <span className="font-semibold text-slate-700">
          {row.items?.reduce((a, b) => a + (b.quantity || 0), 0) || val} pcs
        </span>
      ),
    },
    {
      header: 'Quote Total (BDT)',
      field: 'totalBDT',
      render: (val, row) => (
        <div>
          <div className="font-serif font-bold text-slate-900">৳{Number(val).toLocaleString()}</div>
          {row.sampleCreditDeductionBDT > 0 && (
            <span className="text-[10px] text-emerald-700 font-bold block">
              -৳{row.sampleCreditDeductionBDT} Sample Credit
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Quote Status',
      field: 'status',
      render: (val) => <Badge>{val}</Badge>,
    },
    {
      header: 'Convert to Wholesale Order',
      field: 'id',
      render: (_, row) => (
        row.status !== QuoteStatus.ACCEPTED ? (
          <Button
            onClick={() => convertQuoteToWholesaleOrder(row.id)}
            size="sm"
            variant="terracotta"
            icon={CheckCircle2}
          >
            Accept & Create PO
          </Button>
        ) : (
          <span className="text-emerald-700 text-xs font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Converted to Order
          </span>
        )
      ),
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header & Sub-view Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
            Wholesale B2B Sales & RFQ Quotations Engine
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Full sequence: Lead qualification → Paid sample dispatch → Sample credit conversion → Formal quotation → Wholesale PO.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Tabs
            tabs={[
              { id: 'leads', label: `Deals & Pipeline (${leads.length})` },
              { id: 'samples', label: `Paid Samples (${samples.length})` },
              { id: 'quotations', label: `Quotations (${quotes.length})` },
            ]}
            activeTab={activeSubView === 'samples' ? 'samples' : activeSubView === 'quotations' ? 'quotations' : 'leads'}
            onChange={(id) => setActiveSubView(id)}
          />

          {activeSubView === 'samples' ? (
            <Button onClick={() => setIsNewSampleModalOpen(true)} variant="terracotta" size="md" icon={Plus}>
              + Sample Order
            </Button>
          ) : activeSubView === 'quotations' ? (
            <Button onClick={() => setIsNewQuoteModalOpen(true)} variant="terracotta" size="md" icon={Plus}>
              + New Quotation
            </Button>
          ) : (
            <Button onClick={() => setIsNewLeadModalOpen(true)} variant="terracotta" size="md" icon={Plus}>
              + New Deal
            </Button>
          )}
        </div>
      </div>

      {/* Main Sub-view Table */}
      {activeSubView === 'samples' ? (
        <DataTable
          columns={sampleColumns}
          data={samples}
          searchPlaceholder="Search paid samples by sample #, company, tracking..."
        />
      ) : activeSubView === 'quotations' ? (
        <DataTable
          columns={quoteColumns}
          data={quotes}
          searchPlaceholder="Search quotations by quote #, company, terms..."
        />
      ) : (
        <div className="space-y-6">
          <DataTable
            columns={leadColumns}
            data={leads}
            searchPlaceholder="Search wholesale leads by project, company, country..."
            onRowClick={(row) => {
              setSelectedLead(row);
              setIsLeadDrawerOpen(true);
            }}
          />
        </div>
      )}

      {/* Lead Stage Management Drawer */}
      <Drawer
        isOpen={isLeadDrawerOpen}
        onClose={() => setIsLeadDrawerOpen(false)}
        title={selectedLead?.title || 'Wholesale Deal'}
        subtitle={`${selectedLead?.companyName} • ${selectedLead?.country}`}
        width="max-w-2xl"
        footer={
          <Button onClick={() => setIsLeadDrawerOpen(false)} variant="secondary" size="md">
            Done
          </Button>
        }
      >
        {selectedLead && (
          <div className="space-y-6">
            
            {/* Visual Pipeline Bar */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Advance Deal Stage
              </span>
              <PipelineView
                stages={leadStages}
                currentStage={selectedLead.status}
                onStageClick={(newStage) => updateLeadStatus(selectedLead.id, newStage)}
              />
            </div>

            {/* Deal Details Box */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Estimated Volume</span>
                <span className="font-bold text-slate-800 text-sm">{selectedLead.estimatedPieces} pcs</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Revenue</span>
                <span className="font-serif font-bold text-[#C25E3E] text-sm">৳{Number(selectedLead.estimatedValueBDT).toLocaleString()}</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Key Contact</span>
                <span className="font-bold text-slate-900">{selectedLead.contactName} ({selectedLead.contactEmail})</span>
              </div>
            </div>

            {/* Internal Notes */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Deal Notes & Sourcing Specs
              </span>
              <div className="p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed">
                {selectedLead.notes || 'No notes logged.'}
              </div>
            </div>

          </div>
        )}
      </Drawer>

      {/* New Deal Modal */}
      <Modal
        isOpen={isNewLeadModalOpen}
        onClose={() => setIsNewLeadModalOpen(false)}
        title="Create Wholesale B2B Lead"
        subtitle="Initiate pipeline deal for bulk buying"
        footer={
          <>
            <Button onClick={() => setIsNewLeadModalOpen(false)} variant="ghost" size="md">
              Cancel
            </Button>
            <Button onClick={handleCreateLead} variant="terracotta" size="md">
              Save Lead to Pipeline
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold uppercase text-slate-700 mb-1">Deal Title / Line Name *</label>
            <input
              type="text"
              required
              value={leadForm.title}
              onChange={(e) => setLeadForm({ ...leadForm, title: e.target.value })}
              placeholder="e.g. Resort Boutique Spring Collection"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-semibold text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase text-slate-700 mb-1">Company / Brand *</label>
              <input
                type="text"
                required
                value={leadForm.companyName}
                onChange={(e) => setLeadForm({ ...leadForm, companyName: e.target.value })}
                placeholder="e.g. Atelier Noir"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 mb-1">Country *</label>
              <input
                type="text"
                required
                value={leadForm.country}
                onChange={(e) => setLeadForm({ ...leadForm, country: e.target.value })}
                placeholder="e.g. France, USA"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase text-slate-700 mb-1">Contact Person</label>
              <input
                type="text"
                value={leadForm.contactName}
                onChange={(e) => setLeadForm({ ...leadForm, contactName: e.target.value })}
                placeholder="e.g. Camille Laurent"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 mb-1">Contact Email</label>
              <input
                type="email"
                value={leadForm.contactEmail}
                onChange={(e) => setLeadForm({ ...leadForm, contactEmail: e.target.value })}
                placeholder="buyer@brand.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase text-slate-700 mb-1">Estimated Quantity (Pcs)</label>
              <input
                type="number"
                value={leadForm.estimatedPieces}
                onChange={(e) => setLeadForm({ ...leadForm, estimatedPieces: Number(e.target.value), estimatedValueBDT: Number(e.target.value) * 650 })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 mb-1">Est. Deal Value (৳)</label>
              <input
                type="number"
                value={leadForm.estimatedValueBDT}
                onChange={(e) => setLeadForm({ ...leadForm, estimatedValueBDT: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-slate-900"
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* New Quotation Modal */}
      <Modal
        isOpen={isNewQuoteModalOpen}
        onClose={() => setIsNewQuoteModalOpen(false)}
        title="Generate Wholesale Quotation (RFQ)"
        subtitle="Issue tiered pricing with sample credit deduction"
        footer={
          <>
            <Button onClick={() => setIsNewQuoteModalOpen(false)} variant="ghost" size="md">
              Cancel
            </Button>
            <Button onClick={handleCreateQuote} variant="terracotta" size="md">
              Issue Quotation
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateQuote} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold uppercase text-slate-700 mb-1">Select Wholesale Company *</label>
            <select
              value={quoteForm.companyId}
              onChange={(e) => setQuoteForm({ ...quoteForm, companyId: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-slate-900"
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id}>{c.name} ({c.country})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase text-slate-700 mb-1">Target Colorway</label>
              <select
                value={quoteForm.selectedColor}
                onChange={(e) => setQuoteForm({ ...quoteForm, selectedColor: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              >
                {['Black', 'Navy', 'Brown', 'Maroon', 'Khaki'].map(col => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 mb-1">Target Size</label>
              <select
                value={quoteForm.selectedSize}
                onChange={(e) => setQuoteForm({ ...quoteForm, selectedSize: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              >
                <option value="M">M (32–35")</option>
                <option value="L">L (35–38")</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase text-slate-700 mb-1">Quantity (MOQ 100)</label>
              <input
                type="number"
                min="100"
                value={quoteForm.quantity}
                onChange={(e) => setQuoteForm({ ...quoteForm, quantity: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 mb-1">Unit Wholesale Price (৳)</label>
              <input
                type="number"
                value={quoteForm.unitPrice}
                onChange={(e) => setQuoteForm({ ...quoteForm, unitPrice: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-[#C25E3E]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase text-slate-700 mb-1">Quote Validity Date</label>
            <input
              type="date"
              value={quoteForm.validUntil}
              onChange={(e) => setQuoteForm({ ...quoteForm, validUntil: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
            />
          </div>
        </form>
      </Modal>

      {/* New Paid Sample Modal */}
      <Modal
        isOpen={isNewSampleModalOpen}
        onClose={() => setIsNewSampleModalOpen(false)}
        title="Dispatch Paid Sample Order"
        subtitle="Generates sample tracking and sample credit eligibility"
        footer={
          <>
            <Button onClick={() => setIsNewSampleModalOpen(false)} variant="ghost" size="md">
              Cancel
            </Button>
            <Button onClick={handleCreateSampleOrder} variant="terracotta" size="md">
              Create Paid Sample
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateSampleOrder} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold uppercase text-slate-700 mb-1">Wholesale Client *</label>
            <select
              value={sampleForm.companyId}
              onChange={(e) => setSampleForm({ ...sampleForm, companyId: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-slate-900"
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id}>{c.name} ({c.country})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase text-slate-700 mb-1">Sample Color</label>
              <select
                value={sampleForm.color}
                onChange={(e) => setSampleForm({ ...sampleForm, color: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              >
                {['Black', 'Navy', 'Brown', 'Maroon', 'Khaki'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 mb-1">Sample Size</label>
              <select
                value={sampleForm.size}
                onChange={(e) => setSampleForm({ ...sampleForm, size: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              >
                <option value="M (32–35&quot;)">M (32–35")</option>
                <option value="L (35–38&quot;)">L (35–38")</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase text-slate-700 mb-1">Sample Fee (৳) [Credited on PO]</label>
              <input
                type="number"
                value={sampleForm.sampleTotalBDT}
                onChange={(e) => setSampleForm({ ...sampleForm, sampleTotalBDT: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-emerald-700"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 mb-1">International Courier Fee (৳)</label>
              <input
                type="number"
                value={sampleForm.shippingFeeBDT}
                onChange={(e) => setSampleForm({ ...sampleForm, shippingFeeBDT: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              />
            </div>
          </div>
        </form>
      </Modal>

    </div>
  );
};
