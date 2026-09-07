import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { StatCard } from '../../components/ui/StatCard';
import { Button } from '../../components/ui/Button';
import { 
  Globe, 
  Save, 
  CheckCircle2, 
  ExternalLink, 
  Image as ImageIcon, 
  Tag, 
  Sliders, 
  Sparkles,
  Layers,
  FileText
} from 'lucide-react';
import { 
  subscribeStoreConfig, 
  updateStoreConfig, 
  DEFAULT_STORE_CONFIG 
} from '../../../services/storeService';

export const WebsiteModule = () => {
  const { activeSubView } = useAdmin();
  const [config, setConfig] = useState(DEFAULT_STORE_CONFIG);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const unsub = subscribeStoreConfig((data) => {
      setConfig(prev => ({ ...prev, ...data }));
    });
    return () => unsub();
  }, []);

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      await updateStoreConfig(config);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      alert('Failed to save website config: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">Website CMS & Storefront Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Configure live consumer prices, hero copy, delivery fees, and wholesale merchandising copy</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Preview Storefront
          </a>
          <Button
            variant="terracotta"
            icon={isSaving ? undefined : Save}
            isLoading={isSaving}
            onClick={handleSave}
          >
            {saveSuccess ? 'Saved Live!' : 'Publish Changes'}
          </Button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs text-emerald-800 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          Storefront settings have been synced and published live to visitors!
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Pricing & Commercial Controls */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Tag className="w-4 h-4 text-terracotta" />
            <h2 className="font-serif font-bold text-slate-900 text-base">Consumer Pricing & Shipping Rates</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Discounted / Offer Price (BDT)
              </label>
              <input
                type="number"
                value={config.price || 850}
                onChange={(e) => setConfig({ ...config, price: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta font-mono font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Regular / Strike-through Price (BDT)
              </label>
              <input
                type="number"
                value={config.regularPrice || 1200}
                onChange={(e) => setConfig({ ...config, regularPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta font-mono text-slate-500 line-through"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Inside Dhaka Shipping (BDT)
              </label>
              <input
                type="number"
                value={config.deliveryInsideDhaka !== undefined ? config.deliveryInsideDhaka : 60}
                onChange={(e) => setConfig({ ...config, deliveryInsideDhaka: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Outside Dhaka Shipping (BDT)
              </label>
              <input
                type="number"
                value={config.deliveryOutsideDhaka !== undefined ? config.deliveryOutsideDhaka : 120}
                onChange={(e) => setConfig({ ...config, deliveryOutsideDhaka: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta font-mono"
              />
            </div>
          </div>
        </div>

        {/* Hero & Marketing Copy */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Sparkles className="w-4 h-4 text-terracotta" />
            <h2 className="font-serif font-bold text-slate-900 text-base">Hero Copy & Marketing Banners</h2>
          </div>

          <div className="space-y-4 pt-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Main Hero Title
              </label>
              <input
                type="text"
                value={config.heroTitle || 'Handcrafted Macramé Belt'}
                onChange={(e) => setConfig({ ...config, heroTitle: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta font-serif text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Hero Subtitle / Description
              </label>
              <textarea
                rows={3}
                value={config.heroSubtitle || 'Woven from 100% natural organic cotton cord with artisanal solid alloy hardware.'}
                onChange={(e) => setConfig({ ...config, heroSubtitle: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Announcement Ribbon Bar
                </label>
                <input
                  type="text"
                  value={config.announcementText || '✨ Ramadan Exclusive Collection • Free Delivery on 2+ Belts'}
                  onChange={(e) => setConfig({ ...config, announcementText: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Support WhatsApp Contact Number
                </label>
                <input
                  type="text"
                  value={config.contactPhone || '+880 1805-475253'}
                  onChange={(e) => setConfig({ ...config, contactPhone: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wholesale Section Copy */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <FileText className="w-4 h-4 text-terracotta" />
            <h2 className="font-serif font-bold text-slate-900 text-base">Wholesale Page Copy & Policy</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Standard B2B Minimum Order Quantity (MOQ)
              </label>
              <input
                type="number"
                value={config.wholesaleMoq || 50}
                onChange={(e) => setConfig({ ...config, wholesaleMoq: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Sample Credit Policy Banner
              </label>
              <input
                type="text"
                value={config.sampleCreditBanner || '100% of sample development fee credited back on your first wholesale bulk order.'}
                onChange={(e) => setConfig({ ...config, sampleCreditBanner: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="terracotta"
            size="lg"
            icon={isSaving ? undefined : Save}
            isLoading={isSaving}
          >
            {saveSuccess ? 'Changes Synced' : 'Save & Publish Website Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};
