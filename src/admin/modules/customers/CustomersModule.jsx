import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { DataTable } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Drawer } from '../../components/ui/Drawer';
import { Modal } from '../../components/ui/Modal';
import { Tabs } from '../../components/ui/Tabs';
import { Users, Briefcase, Plus, Phone, Mail, MapPin, DollarSign, ShoppingBag, FileText, Sparkles } from 'lucide-react';

export const CustomersModule = () => {
  const { 
    companies, 
    customers, 
    orders, 
    quotes, 
    samples, 
    addCompany, 
    addContactToCompany, 
    activeSubView, 
    setActiveSubView 
  } = useAdmin();

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isCompanyDrawerOpen, setIsCompanyDrawerOpen] = useState(false);
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);

  // New Company form state
  const [companyForm, setCompanyForm] = useState({
    name: '',
    country: 'United States',
    city: '',
    address: '',
    taxId: '',
    tier: 'Tier 01 (Boutique Run)',
    paymentTerms: '50% Advance, 50% Before Shipping',
  });

  // New Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    role: 'Buyer / Merchandiser',
    email: '',
    phone: '',
    whatsapp: '',
  });

  const handleOpenCompanyDrawer = (company) => {
    setSelectedCompany(company);
    setIsCompanyDrawerOpen(true);
  };

  const handleCreateCompany = (e) => {
    e.preventDefault();
    addCompany(companyForm);
    setIsAddCompanyModalOpen(false);
    setCompanyForm({
      name: '',
      country: 'United States',
      city: '',
      address: '',
      taxId: '',
      tier: 'Tier 01 (Boutique Run)',
      paymentTerms: '50% Advance, 50% Before Shipping',
    });
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    if (selectedCompany) {
      addContactToCompany(selectedCompany.id, contactForm);
      setIsAddContactModalOpen(false);
      setContactForm({
        name: '',
        role: 'Buyer / Merchandiser',
        email: '',
        phone: '',
        whatsapp: '',
      });
    }
  };

  const companyColumns = [
    {
      header: 'Company / Brand',
      field: 'name',
      render: (val, row) => (
        <div>
          <div className="font-bold text-slate-900 text-sm">{val}</div>
          <div className="text-[11px] text-slate-400">{row.country} • {row.city}</div>
        </div>
      ),
    },
    {
      header: 'Tier & Volume',
      field: 'tier',
      render: (val) => <Badge variant="terracotta">{val}</Badge>,
    },
    {
      header: 'Key Contacts',
      field: 'contacts',
      render: (val) => (
        <div className="space-y-0.5">
          {val && val.map((c, i) => (
            <div key={i} className="text-xs">
              <span className="font-semibold text-slate-800">{c.name}</span>{' '}
              <span className="text-[11px] text-slate-400">({c.role})</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      header: 'Total Spent (BDT)',
      field: 'totalSpent',
      render: (val) => <span className="font-serif font-bold text-slate-900">৳{Number(val || 0).toLocaleString()}</span>,
    },
    {
      header: 'Status',
      field: 'status',
      render: (val) => <Badge>{val}</Badge>,
    },
    {
      header: 'Action',
      field: 'id',
      render: (_, row) => (
        <Button onClick={() => handleOpenCompanyDrawer(row)} size="sm" variant="outline">
          View Profile
        </Button>
      ),
    },
  ];

  const retailColumns = [
    {
      header: 'Customer Name',
      field: 'name',
      render: (val) => <span className="font-bold text-slate-900 text-sm">{val}</span>,
    },
    {
      header: 'Phone / WhatsApp',
      field: 'phone',
      render: (val) => <span className="font-mono text-xs text-slate-800 font-semibold">{val}</span>,
    },
    {
      header: 'District / City',
      field: 'district',
      render: (val) => <span className="text-slate-700 text-xs">{val}</span>,
    },
    {
      header: 'Orders',
      field: 'ordersCount',
      render: (val) => <span className="font-bold text-slate-900">{val}</span>,
    },
    {
      header: 'LTV Spent',
      field: 'totalSpent',
      render: (val) => <span className="font-serif font-bold text-slate-900">৳{Number(val).toLocaleString()}</span>,
    },
  ];

  // Company related history
  const companyOrders = selectedCompany ? orders.filter(o => o.companyId === selectedCompany.id) : [];
  const companyQuotes = selectedCompany ? quotes.filter(q => q.companyId === selectedCompany.id) : [];
  const companySamples = selectedCompany ? samples.filter(s => s.companyId === selectedCompany.id) : [];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
            Customer Directory & Wholesale CRM Accounts
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage multi-contact B2B accounts, retail consumer profiles, quotations, and order histories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Tabs
            tabs={[
              { id: 'companies', label: `Wholesale Companies (${companies.length})` },
              { id: 'retail', label: `Retail Customers (${customers.length})` },
            ]}
            activeTab={activeSubView === 'retail' ? 'retail' : 'companies'}
            onChange={(id) => setActiveSubView(id)}
          />

          <Button
            onClick={() => setIsAddCompanyModalOpen(true)}
            variant="terracotta"
            size="md"
            icon={Plus}
          >
            New Company
          </Button>
        </div>
      </div>

      {/* Main Table */}
      {activeSubView !== 'retail' ? (
        <DataTable
          columns={companyColumns}
          data={companies}
          searchPlaceholder="Search wholesale companies by name, country, contact..."
          onRowClick={(row) => handleOpenCompanyDrawer(row)}
        />
      ) : (
        <DataTable
          columns={retailColumns}
          data={customers}
          searchPlaceholder="Search retail customers by name, phone, district..."
        />
      )}

      {/* Wholesale Company Inspection Drawer */}
      <Drawer
        isOpen={isCompanyDrawerOpen}
        onClose={() => setIsCompanyDrawerOpen(false)}
        title={selectedCompany?.name || 'Company Profile'}
        subtitle={`${selectedCompany?.city}, ${selectedCompany?.country} • ${selectedCompany?.tier}`}
        width="max-w-3xl"
        footer={
          <Button onClick={() => setIsCompanyDrawerOpen(false)} variant="secondary" size="md">
            Close Profile
          </Button>
        }
      >
        {selectedCompany && (
          <div className="space-y-6">
            
            {/* Account Metadata Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Tax / VAT ID</span>
                <span className="font-mono font-bold text-slate-800">{selectedCompany.taxId || 'N/A'}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Payment Terms</span>
                <span className="font-semibold text-slate-800">{selectedCompany.paymentTerms}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total B2B Spend</span>
                <span className="font-serif font-bold text-[#C25E3E] text-sm">৳{Number(selectedCompany.totalSpent).toLocaleString()}</span>
              </div>
            </div>

            {/* Decision Maker Contacts */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Key Account Contacts ({selectedCompany.contacts?.length || 0})
                </span>
                <Button onClick={() => setIsAddContactModalOpen(true)} size="sm" variant="secondary" icon={Plus}>
                  Add Contact
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCompany.contacts?.map((contact) => (
                  <div key={contact.id} className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{contact.name}</span>
                      {contact.isPrimary && (
                        <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border border-emerald-200">
                          Primary
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">{contact.role}</div>
                    <div className="pt-1.5 space-y-1 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                        <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                        <a href={`tel:${contact.phone}`} className="hover:underline">{contact.phone}</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quotations History */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block border-b border-slate-200 pb-2">
                Wholesale Quotations ({companyQuotes.length})
              </span>
              {companyQuotes.length === 0 ? (
                <div className="text-xs text-slate-400 italic">No formal quotations on file.</div>
              ) : (
                <div className="space-y-2">
                  {companyQuotes.map((q) => (
                    <div key={q.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-slate-900">{q.quoteNumber}</span>
                        <span className="text-slate-400 text-[11px] block">Valid until {q.validUntil}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-serif font-bold text-slate-900 block">৳{Number(q.totalBDT).toLocaleString()}</span>
                        <Badge>{q.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sample Orders & Credit Status */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block border-b border-slate-200 pb-2">
                Sample Orders & Credits ({companySamples.length})
              </span>
              {companySamples.length === 0 ? (
                <div className="text-xs text-slate-400 italic">No sample orders requested.</div>
              ) : (
                <div className="space-y-2">
                  {companySamples.map((s) => (
                    <div key={s.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-slate-900">{s.sampleNumber}</span>
                        <span className="text-slate-400 text-[11px] block">{s.courier} ({s.trackingNumber})</span>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge variant={s.creditStatus === 'Redeemed' ? 'terracotta' : 'success'}>
                          {s.creditStatus === 'Redeemed' ? 'Credit Redeemed' : `৳${s.sampleCreditAmountBDT} Credit Available`}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </Drawer>

      {/* New Company Modal */}
      <Modal
        isOpen={isAddCompanyModalOpen}
        onClose={() => setIsAddCompanyModalOpen(false)}
        title="Add Wholesale Company"
        subtitle="Create an enterprise account profile for B2B buying"
        footer={
          <>
            <Button onClick={() => setIsAddCompanyModalOpen(false)} variant="ghost" size="md">
              Cancel
            </Button>
            <Button onClick={handleCreateCompany} variant="terracotta" size="md">
              Create Company Account
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateCompany} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold uppercase text-slate-700 mb-1">Company Name *</label>
            <input
              type="text"
              required
              value={companyForm.name}
              onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
              placeholder="e.g. Atelier Noir Sourcing"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-semibold text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase text-slate-700 mb-1">Country *</label>
              <input
                type="text"
                required
                value={companyForm.country}
                onChange={(e) => setCompanyForm({ ...companyForm, country: e.target.value })}
                placeholder="e.g. France, USA, Denmark"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 mb-1">City</label>
              <input
                type="text"
                value={companyForm.city}
                onChange={(e) => setCompanyForm({ ...companyForm, city: e.target.value })}
                placeholder="e.g. Paris"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase text-slate-700 mb-1">Account Tier</label>
            <select
              value={companyForm.tier}
              onChange={(e) => setCompanyForm({ ...companyForm, tier: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-semibold text-slate-800"
            >
              <option value="Tier 01 (Boutique Run)">Tier 01 (Boutique Run: 100–299 pcs)</option>
              <option value="Tier 02 (Brand Collection)">Tier 02 (Brand Collection: 300–499 pcs)</option>
              <option value="Tier 03 (Global Retailer)">Tier 03 (Global Retailer: 500+ pcs)</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* New Contact Modal */}
      <Modal
        isOpen={isAddContactModalOpen}
        onClose={() => setIsAddContactModalOpen(false)}
        title={`Add Contact to ${selectedCompany?.name}`}
        footer={
          <>
            <Button onClick={() => setIsAddContactModalOpen(false)} variant="ghost" size="md">
              Cancel
            </Button>
            <Button onClick={handleAddContact} variant="terracotta" size="md">
              Save Contact
            </Button>
          </>
        }
      >
        <form onSubmit={handleAddContact} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold uppercase text-slate-700 mb-1">Contact Name *</label>
            <input
              type="text"
              required
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              placeholder="e.g. Sarah Jenkins"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-slate-700 mb-1">Role / Job Title</label>
            <input
              type="text"
              value={contactForm.role}
              onChange={(e) => setContactForm({ ...contactForm, role: e.target.value })}
              placeholder="e.g. VP Sourcing & Design"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase text-slate-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                placeholder="sourcing@brand.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 mb-1">Phone / WhatsApp</label>
              <input
                type="text"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                placeholder="+1 555 000-0000"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              />
            </div>
          </div>
        </form>
      </Modal>

    </div>
  );
};
