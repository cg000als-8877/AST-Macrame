import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { DataTable } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Drawer } from '../../components/ui/Drawer';
import { Tabs } from '../../components/ui/Tabs';
import { Tag, Plus, Edit2, Layers, DollarSign, Package, Sparkles, CheckCircle2 } from 'lucide-react';

export const ProductsModule = () => {
  const { products, updateProduct, activeSubView, setActiveSubView } = useAdmin();
  const [selectedProduct, setSelectedProduct] = useState(products[0] || null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [formData, setFormData] = useState(products[0] || {});

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormData({ ...product });
    setIsEditDrawerOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      updateProduct(selectedProduct.id, formData);
      setSelectedProduct(formData);
      setIsEditDrawerOpen(false);
    }
  };

  const productColumns = [
    {
      header: 'Product',
      field: 'title',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          {row.featuredImage && (
            <img src={row.featuredImage} alt={val} className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
          )}
          <div>
            <div className="font-bold text-slate-900 text-sm">{val}</div>
            <div className="text-[11px] text-slate-400">{row.category}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      field: 'status',
      render: (val) => <Badge>{val}</Badge>,
    },
    {
      header: 'Variants',
      field: 'variants',
      render: (val) => (
        <span className="font-semibold text-slate-700">{val ? val.length : 0} SKUs</span>
      ),
    },
    {
      header: 'Retail Price',
      field: 'retailPrice',
      render: (val) => <span className="font-serif font-bold text-slate-900">৳{Number(val).toLocaleString()}</span>,
    },
    {
      header: 'Wholesale MOQ',
      field: 'moq',
      render: (val) => <span className="font-semibold text-slate-700">{val} pcs</span>,
    },
    {
      header: 'Actions',
      field: 'id',
      render: (_, row) => (
        <Button onClick={() => handleEditClick(row)} size="sm" variant="outline" icon={Edit2}>
          Edit Catalog
        </Button>
      ),
    },
  ];

  // Flattened Variants List for Variants Sub-View
  const allVariants = [];
  products.forEach((p) => {
    p.variants.forEach((v) => {
      allVariants.push({
        ...v,
        productTitle: p.title,
      });
    });
  });

  const variantColumns = [
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
      header: 'Retail Price',
      field: 'retailPrice',
      render: (val) => <span className="font-serif font-semibold">৳{val}</span>,
    },
    {
      header: 'Wholesale Price',
      field: 'wholesalePrice',
      render: (val) => <span className="font-serif font-semibold text-[#C25E3E]">৳{val}</span>,
    },
    {
      header: 'On-Hand Stock',
      field: 'stock',
      render: (_, row) => <span className="font-bold text-slate-900">{row.stock?.onHand || 0}</span>,
    },
    {
      header: 'Available',
      field: 'stock',
      render: (_, row) => (
        <Badge variant={(row.stock?.available || 0) <= (row.stock?.lowStockThreshold || 15) ? 'warning' : 'success'}>
          {row.stock?.available || 0} Avail
        </Badge>
      ),
    },

  ];

  return (
    <div className="space-y-6">
      
      {/* Header & Sub-View Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
            Products & Variant Master Catalog
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage multi-colorway macramé belt hierarchies, SKU generation, and wholesale tiered pricing.
          </p>
        </div>

        <Tabs
          tabs={[
            { id: 'all', label: 'Products Master' },
            { id: 'variants', label: `All Variants (${allVariants.length})` },
          ]}
          activeTab={activeSubView === 'variants' ? 'variants' : 'all'}
          onChange={(id) => setActiveSubView(id)}
        />
      </div>

      {/* Main View: Products Table */}
      {activeSubView !== 'variants' ? (
        <DataTable
          columns={productColumns}
          data={products}
          searchPlaceholder="Search products by title, handle, category..."
          onRowClick={(row) => handleEditClick(row)}
        />
      ) : (
        <DataTable
          columns={variantColumns}
          data={allVariants}
          searchPlaceholder="Search variants by SKU, color, size..."
        />
      )}

      {/* Product Detail & Edit Drawer */}
      <Drawer
        isOpen={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        title={formData.title || 'Edit Product'}
        subtitle="Configure title, materials, retail & wholesale pricing, and variant matrix"
        width="max-w-3xl"
        footer={
          <>
            <Button onClick={() => setIsEditDrawerOpen(false)} variant="ghost" size="md">
              Cancel
            </Button>
            <Button onClick={handleSaveProduct} variant="terracotta" size="md">
              Save Product Specifications
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveProduct} className="space-y-6">
          
          {/* Section 1: General Info */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block border-b border-slate-200 pb-1">
              General Information
            </span>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Product Title
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:border-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Description & Artisan Hook
              </label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-slate-900 leading-relaxed"
              />
            </div>
          </div>

          {/* Section 2: Specifications & Materials */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block border-b border-slate-200 pb-1">
              Materials & Production Parameters
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Cord Material
                </label>
                <input
                  type="text"
                  value={formData.material || ''}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Buckle Alloy
                </label>
                <input
                  type="text"
                  value={formData.buckleMaterial || ''}
                  onChange={(e) => setFormData({ ...formData, buckleMaterial: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Wholesale Minimum Order Quantity (MOQ)
                </label>
                <input
                  type="number"
                  value={formData.moq || 100}
                  onChange={(e) => setFormData({ ...formData, moq: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Production Lead Time
                </label>
                <input
                  type="text"
                  value={formData.productionLeadTime || '15–20 Days'}
                  onChange={(e) => setFormData({ ...formData, productionLeadTime: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Pricing Strategy */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block border-b border-slate-200 pb-1">
              Pricing Strategy (BDT)
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Single Retail (৳)
                </label>
                <input
                  type="number"
                  value={formData.retailPrice || 850}
                  onChange={(e) => setFormData({ ...formData, retailPrice: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Retail Regular (৳)
                </label>
                <input
                  type="number"
                  value={formData.retailRegularPrice || 1050}
                  onChange={(e) => setFormData({ ...formData, retailRegularPrice: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-400 line-through"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Wholesale Tier 1 (৳)
                </label>
                <input
                  type="number"
                  value={formData.wholesaleTier1Price || 720}
                  onChange={(e) => setFormData({ ...formData, wholesaleTier1Price: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-[#C25E3E]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Wholesale Tier 2 (৳)
                </label>
                <input
                  type="number"
                  value={formData.wholesaleTier2Price || 650}
                  onChange={(e) => setFormData({ ...formData, wholesaleTier2Price: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-[#C25E3E]"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Color Variants Matrix */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block border-b border-slate-200 pb-1">
              Active Color Variants ({formData.variants?.length || 0} SKUs)
            </span>

            <div className="space-y-2">
              {formData.variants?.map((v, idx) => (
                <div key={v.id || idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: v.hex }} />
                    <div>
                      <span className="font-bold text-slate-900">{v.color} ({v.size})</span>
                      <span className="font-mono text-[10px] text-slate-400 block">{v.sku}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Wholesale</span>
                      <span className="font-bold text-slate-800">৳{v.wholesalePrice}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Available</span>
                      <span className="font-bold text-emerald-700">{v.stock?.available || 0} pcs</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </form>
      </Drawer>

    </div>
  );
};
