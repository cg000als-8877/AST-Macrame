import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShieldCheck, 
  Palette, 
  RefreshCw, 
  Check, 
  ChevronRight, 
  Tag, 
  Factory, 
  Sparkles, 
  MessageCircle, 
  Mail, 
  Plus, 
  Minus,
  Plane,
  Box,
  Layers,
  FileCheck,
  Sliders,
  Award
} from 'lucide-react';

import InquiryModal from '../components/InquiryModal';
import wholesaleHeroImage from '../assets/wholesale_hero.jpg';
import b2bWholesaleImg from '../assets/b2b/wholesale_production.jpg';
import b2bPrivateLabelImg from '../assets/b2b/private_label.jpg';
import b2bCustomColoursImg from '../assets/b2b/custom_colours.jpg';
import b2bRepeatOrdersImg from '../assets/b2b/repeat_orders.jpg';

const SampleWholesale = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('cord');

  const pricingTiers = [
    {
      tier: "TIER 01",
      title: "Boutique & Trial Run",
      range: "100 – 299 pcs",
      moq: "100 pieces",
      leadTime: "15–20 Days",
      features: [
        "Choice of 5 standard stock colors",
        "Standard alloy hardware",
        "Individual protective poly packaging",
        "100% sample cost credited on invoice"
      ],
      badge: "Flexible Low MOQ",
      popular: false
    },
    {
      tier: "TIER 02",
      title: "Brand Collection",
      range: "300 – 499 pcs",
      moq: "300 pieces",
      leadTime: "20–25 Days",
      features: [
        "Custom private label woven tags",
        "Custom debossed leather end-tabs",
        "Split across up to 3 colorways",
        "Dedicated artisan production queue",
        "100% sample cost credited on invoice"
      ],
      badge: "Most Popular",
      popular: true
    },
    {
      tier: "TIER 03",
      title: "Volume Retail Run",
      range: "500 – 999 pcs",
      moq: "500 pieces",
      leadTime: "25–30 Days",
      features: [
        "Bespoke Pantone yarn shade dyeing",
        "Custom branded kraft retail boxes",
        "Custom alloy buckle electroplating",
        "Priority air/sea logistics booking",
        "Master quality spec sheet archive"
      ],
      badge: "Custom Pantone Included",
      popular: false
    },
    {
      tier: "TIER 04",
      title: "Enterprise / OEM",
      range: "1,000+ pcs",
      moq: "1,000+ pieces",
      leadTime: "30–35 Days",
      features: [
        "Lowest factory unit pricing",
        "Fully custom buckle mold casting",
        "Barcode & retail hangtag application",
        "FOB / CIF export carton palletizing",
        "Permanent dedicated artisan line"
      ],
      badge: "Direct Factory Contract",
      popular: false
    }
  ];

  const specCategories = {
    cord: {
      title: "Yarn & Braiding Construction",
      desc: "High-density natural cotton fibers crafted under standardized tension to ensure uniform width and prevent stretching.",
      specs: [
        { label: "Material Composition", value: "100% Combed Natural Cotton Yarn" },
        { label: "Cord Gauge / Diameter", value: "3.0mm – 4.5mm Multi-Ply Cord" },
        { label: "Weave Structure", value: "Double-Diamond Stretch-Macramé" },
        { label: "Tensile Strength", value: "Tested for everyday high load (zero deform)" },
        { label: "Handfeel", value: "Ultra-soft cotton touch with structured firmness" }
      ]
    },
    hardware: {
      title: "Buckles & Hardware Finishes",
      desc: "Cast from corrosion-resistant zinc alloys, electroplated for durability and compatible with any pinless waist position.",
      specs: [
        { label: "Base Alloy", value: "High-Grade Cast Zinc Alloy" },
        { label: "Standard Finishes", value: "Antique Brass, Matte Black, Brushed Gunmetal" },
        { label: "Corrosion Treatment", value: "Anti-tarnish and humidity-tested coating" },
        { label: "Pinless Fastening", value: "Prong inserts smoothly through any weave hole" },
        { label: "OEM Customization", value: "Laser logo engraving or custom debossed molds" }
      ]
    },
    branding: {
      title: "Private Label & Custom Packaging",
      desc: "Retail-ready packaging solutions tailored for boutiques, departmental stores, and e-commerce fulfillment.",
      specs: [
        { label: "End-Tabs & Accents", value: "Genuine Leather or Vegan PU debossed patches" },
        { label: "Woven Labels", value: "High-definition damask woven brand labels" },
        { label: "Hangtags & Barcodes", value: "FSC kraft hangtags with UPC/EAN barcodes" },
        { label: "Inner Packaging", value: "Individual bio-poly sleeves with silica packs" },
        { label: "Gift Box Packaging", value: "Custom foil-stamped rigid drawer boxes (optional)" }
      ]
    },
    dyeing: {
      title: "Pantone Color Matching",
      desc: "We develop bespoke seasonal palettes with certified non-toxic textile dyes matching your brand's moodboard.",
      specs: [
        { label: "Color Standards", value: "Pantone Fashion, Home + Interiors (TCX / TPX)" },
        { label: "Stock Colorways", value: "Black, Midnight Navy, Brown, Maroon, Khaki" },
        { label: "Lab-Dip Approval", value: "Physical yarn swatches dispatched for sign-off" },
        { label: "Color Fastness", value: "Grade 4+ washing and rubbing resistance" },
        { label: "Dye Safety", value: "Azo-free, eco-friendly water-based dyes" }
      ]
    }
  };

  return (
    <div className="w-full bg-cream text-soft-black font-sans selection:bg-terracotta selection:text-white">
      
      {/* WHOLESALE — SECTION 1: HERO SECTION */}
      <section className="relative w-full pt-28 md:pt-36 pb-16 md:pb-24 border-b border-stone/15 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Heading, Subtitle & Fast Action */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-terracotta block mb-2 sm:mb-3">
                  DIRECT FACTORY SOURCING
                </span>
                
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold uppercase text-soft-black tracking-tight leading-tight mb-4 sm:mb-6">
                  WHOLESALE & PRIVATE LABEL MANUFACTURING
                </h1>
                
                <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light leading-relaxed mb-8 sm:mb-10 max-w-xl">
                  We are Bangladesh's dedicated macramé accessory workshop. We supply fashion labels, e-commerce retailers, and boutique brands with low MOQs, transparent tiered pricing, and fast global export.
                </p>

                {/* Primary CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-stretch sm:items-center mb-10 sm:mb-12">
                  <Link 
                    to="/sample-order" 
                    className="relative overflow-hidden group bg-soft-black text-cream px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-dark-charcoal hover:text-white hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-300 shadow-md text-center inline-flex items-center justify-center gap-2"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                    <span className="relative z-10 transition-all duration-300 group-hover:tracking-[0.24em]">ORDER SAMPLES ONLINE</span>
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
                  </Link>

                  <a 
                    href="https://wa.me/8801940689061?text=Hello%20AST%20Macrame,%20I%20would%20like%20to%20request%20a%20wholesale%20quote."
                    target="_blank"
                    rel="noreferrer"
                    className="relative overflow-hidden group bg-transparent border border-soft-black/30 text-soft-black px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded hover:border-soft-black hover:text-cream hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-300 text-center inline-flex items-center justify-center gap-2"
                  >
                    <span className="absolute inset-0 bg-soft-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
                    <span className="relative z-10 transition-all duration-300 group-hover:tracking-[0.24em]">REQUEST A CUSTOM QUOTE</span>
                  </a>
                </div>

                {/* 4 Stats Metric Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-stone/20">
                  <div>
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-soft-black block leading-none mb-1">
                      100
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-dark-charcoal/60">
                      Base MOQ (Pcs)
                    </span>
                  </div>

                  <div>
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-soft-black block leading-none mb-1">
                      5–7d
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-dark-charcoal/60">
                      Sample Time
                    </span>
                  </div>

                  <div>
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-soft-black block leading-none mb-1">
                      25–35d
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-dark-charcoal/60">
                      Bulk Lead Time
                    </span>
                  </div>

                  <div>
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-soft-black block leading-none mb-1">
                      100%
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-dark-charcoal/60">
                      Sample Credit
                    </span>
                  </div>
                </div>

              </motion.div>
            </div>

            {/* Right Column: Hero Image */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden bg-white border border-stone/20 aspect-[4/5] shadow-xl"
              >
                <img 
                  src={wholesaleHeroImage} 
                  alt="AST Macrame Wholesale Belts Sourcing Workshop"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-[#DFB76C] via-[#F6E7BE] to-[#C99A45] text-soft-black text-[10px] sm:text-[11px] font-sans font-extrabold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-[#F6E7BE]/80 shadow-sm">
                  <Factory className="w-3.5 h-3.5 text-soft-black" />
                  <span>DIRECT BANGLADESH FACTORY</span>
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* WHOLESALE — SECTION 2: TIERED VOLUME PRODUCTION MATRIX */}
      <section className="py-16 md:py-24 bg-white border-b border-stone/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-terracotta block mb-2 sm:mb-3">
              VOLUME PRODUCTION TIERS
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold uppercase text-soft-black tracking-tight leading-tight mb-2 sm:mb-4">
              TIERED MANUFACTURING MATRIX
            </h2>
            <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light max-w-xl mx-auto leading-relaxed">
              Transparent scaling structure designed to support indie designers at launch and large retail chains on recurring bulk orders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {pricingTiers.map((tier, idx) => (
              <div 
                key={idx}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                  tier.popular 
                    ? 'bg-[#FAF7F2] border-2 border-soft-black shadow-lg ring-1 ring-soft-black/20' 
                    : 'bg-[#FAF7F2] border border-[#E8E0D2] hover:border-soft-black/40 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-terracotta">
                      {tier.tier}
                    </span>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      tier.popular ? 'bg-soft-black text-cream' : 'bg-stone/20 text-dark-charcoal/80'
                    }`}>
                      {tier.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-serif font-bold uppercase text-soft-black mb-1">
                    {tier.title}
                  </h3>

                  <div className="my-4 py-3 border-y border-stone/20">
                    <span className="text-xl sm:text-2xl font-serif font-bold text-soft-black block leading-none">
                      {tier.range}
                    </span>
                    <span className="text-[10.5px] text-dark-charcoal/60 font-medium block mt-1">
                      Lead Time: {tier.leadTime}
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-[11px] sm:text-xs text-dark-charcoal/80 font-light leading-snug">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a 
                  href={`https://wa.me/8801940689061?text=Hello%20AST%20Macrame,%20I%20am%20interested%20in%20${encodeURIComponent(tier.tier + ' (' + tier.title + ' - ' + tier.range + ')')}%20wholesale%20production.`}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-3 text-center text-xs font-bold uppercase tracking-[0.15em] rounded transition-all block ${
                    tier.popular 
                      ? 'bg-soft-black text-cream hover:bg-dark-charcoal' 
                      : 'bg-white border border-stone/30 text-soft-black hover:border-soft-black hover:bg-soft-black hover:text-cream'
                  }`}
                >
                  SELECT TIER
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-dark-charcoal/60 italic">
              * FOB Export pricing (USD) and domestic BDT commercial pricing available upon quotation. Custom quotes include freight estimation.
            </p>
          </div>

        </div>
      </section>

      {/* WHOLESALE — SECTION 3: TECHNICAL OEM SPECIFICATION MATRIX */}
      <section className="py-16 md:py-24 bg-cream border-b border-stone/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-terracotta block mb-2 sm:mb-3">
              TECHNICAL SPECIFICATIONS
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold uppercase text-soft-black tracking-tight leading-tight mb-2 sm:mb-4">
              OEM & CUSTOMIZATION GUIDE
            </h2>
            <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light max-w-xl mx-auto leading-relaxed">
              Explore material standards, hardware options, branding methods, and lab-dip color development available for your brand.
            </p>
          </div>

          {/* Interactive Specification Tabs */}
          <div className="max-w-4xl mx-auto">
            
            {/* Tab Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 mb-8">
              {[
                { id: 'cord', label: 'Yarn & Weave', icon: Layers },
                { id: 'hardware', label: 'Buckles & Alloy', icon: Sliders },
                { id: 'branding', label: 'Labels & Packaging', icon: Tag },
                { id: 'dyeing', label: 'Pantone Dyeing', icon: Palette }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-soft-black text-cream shadow-md' 
                        : 'bg-white border border-stone/20 text-dark-charcoal/80 hover:border-soft-black/40'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-stone/20 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-sm"
              >
                <div className="mb-6 pb-6 border-b border-stone/15">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold uppercase text-soft-black mb-2">
                    {specCategories[activeTab].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-dark-charcoal/80 font-light leading-relaxed">
                    {specCategories[activeTab].desc}
                  </p>
                </div>

                <div className="divide-y divide-stone/15">
                  {specCategories[activeTab].specs.map((item, idx) => (
                    <div key={idx} className="py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                      <span className="text-xs sm:text-sm font-semibold text-soft-black">
                        {item.label}
                      </span>
                      <span className="text-xs sm:text-sm text-dark-charcoal/80 font-light sm:text-right">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>
      </section>

      {/* WHOLESALE — SECTION 4: 100% SAMPLE COST CREDIT POLICY */}
      <section className="py-16 md:py-24 bg-white border-b border-stone/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-terracotta block mb-2 sm:mb-3">
              ZERO-RISK SAMPLING
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold uppercase text-soft-black tracking-tight leading-tight mb-2 sm:mb-4">
              100% SAMPLE COST CREDIT
            </h2>
            <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light max-w-xl mx-auto leading-relaxed">
              We believe in our craftsmanship. Experience knot density, finish quality, and comfort firsthand in your studio before bulk commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            
            <div className="bg-[#FAF7F2] border border-[#E8E0D2] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-soft-black/40 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-full bg-soft-black text-cream flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold uppercase text-soft-black mb-2">
                  Full Invoice Deduction
                </h3>
                <p className="text-xs sm:text-sm text-dark-charcoal/75 font-light leading-relaxed">
                  The entire product cost of your sample order is deducted 100% directly from your first bulk manufacturing purchase invoice.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF7F2] border border-[#E8E0D2] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-soft-black/40 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-full bg-terracotta text-cream flex items-center justify-center mb-4">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold uppercase text-soft-black mb-2">
                  5–7 Day Fast Dispatch
                </h3>
                <p className="text-xs sm:text-sm text-dark-charcoal/75 font-light leading-relaxed">
                  Samples are hand-braided and dispatched with express tracking and physical specification sheets for your design review.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF7F2] border border-[#E8E0D2] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-soft-black/40 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#2D3A30] text-cream flex items-center justify-center mb-4">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold uppercase text-soft-black mb-2">
                  Pre-Bulk QC Sign-Off
                </h3>
                <p className="text-xs sm:text-sm text-dark-charcoal/75 font-light leading-relaxed">
                  Your physical sample acts as the certified master golden sample for our workshop to match every single bulk piece against.
                </p>
              </div>
            </div>

          </div>

          <div className="text-center mt-10 sm:mt-12">
            <Link 
              to="/sample-order" 
              className="bg-soft-black text-cream px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-dark-charcoal transition-all shadow-md inline-block"
            >
              ORDER PHYSICAL SAMPLES
            </Link>
          </div>

        </div>
      </section>

      {/* WHOLESALE — SECTION 5: EXPORT LOGISTICS & PACKAGING */}
      <section className="py-16 md:py-24 bg-cream border-b border-stone/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-terracotta block mb-2 sm:mb-3">
              GLOBAL FULFILLMENT
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold uppercase text-soft-black tracking-tight leading-tight mb-2 sm:mb-4">
              PACKAGING & EXPORT LOGISTICS
            </h2>
            <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light max-w-xl mx-auto leading-relaxed">
              Export-grade carton packaging and reliable multi-modal freight options directly from Chattogram & Dhaka, Bangladesh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            
            <div className="bg-white border border-stone/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-soft-black text-cream flex items-center justify-center">
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold uppercase text-soft-black">
                      Carton Packing Standards
                    </h3>
                    <span className="text-xs text-terracotta font-semibold">Retail-Ready & Protected</span>
                  </div>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-dark-charcoal/80 font-light leading-relaxed">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Each belt is rolled and sealed in an individual moisture-proof bio poly sleeve with silica gel pack.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Heavy-duty 5-ply export master cartons (typically 50 or 100 units per carton) with waterproof liner.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Custom outer carton barcode labels, weight markings, and destination shipping marks.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white border border-stone/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-terracotta text-cream flex items-center justify-center">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold uppercase text-soft-black">
                      Worldwide Freight Options
                    </h3>
                    <span className="text-xs text-terracotta font-semibold">Door-to-Door & Port-to-Port</span>
                  </div>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-dark-charcoal/80 font-light leading-relaxed">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Express Air Courier (DHL / FedEx):</strong> 3–6 business days door-to-door delivery with full tracking.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Commercial Air Cargo:</strong> 5–8 days airport-to-airport for mid-size bulk shipments.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Sea Freight (FOB / CIF):</strong> Cost-effective palletized container shipping via Chattogram Seaport.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* WHOLESALE — SECTION 6: DIRECT WHATSAPP & FAST CHAT */}
      <section className="py-16 md:py-24 bg-cream border-b border-stone/15">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-terracotta block mb-2 sm:mb-3">
            HAVE A REFERENCE IMAGE OR TECH PACK?
          </span>
          
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold uppercase text-soft-black tracking-tight leading-tight mb-2 sm:mb-4">
            SEND YOUR IDEA DIRECTLY TO OUR WORKSHOP
          </h2>
          
          <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Have a sketch, moodboard, or reference link? Connect with our master artisan team on WhatsApp for immediate feedback and feasibility assessment.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-center">
            <a 
              href="https://wa.me/8801940689061?text=Hello%20AST%20Macrame,%20I%20would%20like%20to%20discuss%20a%20wholesale%20/%20custom%20OEM%20production%20project."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-soft-black text-cream px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-dark-charcoal hover:text-white transition-all shadow-md hover:shadow-xl inline-flex items-center justify-center gap-2.5 group"
            >
              <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>CHAT ON WHATSAPP</span>
            </a>
            
            <a 
              href="mailto:astmacrame@gmail.com?subject=Wholesale%20OEM%20Manufacturing%20Inquiry"
              className="w-full sm:w-auto bg-transparent border border-soft-black/30 text-soft-black px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-soft-black hover:text-cream hover:border-soft-black transition-all inline-flex items-center justify-center gap-2.5 group"
            >
              <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>EMAIL TECH PACKS</span>
            </a>
          </div>
        </div>
      </section>

      {/* WHOLESALE — SECTION 7: FINAL CTA */}
      <section className="py-20 md:py-32 bg-[#131E33] text-cream px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-warm-sand mb-2 sm:mb-3 block">
            START YOUR PARTNERSHIP
          </span>
          
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold uppercase text-cream tracking-tight leading-tight mb-2 sm:mb-4">
            READY TO SCALE YOUR COLLECTION?
          </h2>
          
          <p className="text-xs sm:text-base md:text-lg text-cream/80 font-light mb-8 sm:mb-12 max-w-xl mx-auto leading-relaxed">
            Test our craftsmanship with online sample belts or submit your bulk manufacturing specifications today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/sample-order" 
              className="relative overflow-hidden group w-full sm:w-auto bg-cream text-soft-black px-10 py-4.5 text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-warm-sand hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-300 shadow-xl text-center"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              <span className="relative z-10 transition-all duration-300 group-hover:tracking-[0.24em]">ORDER SAMPLES ONLINE</span>
            </Link>
            
            <a 
              href="https://wa.me/8801940689061?text=Hello%20AST%20Macrame,%20I%20would%20like%20to%20request%20a%20wholesale%20quote."
              target="_blank"
              rel="noreferrer"
              className="relative overflow-hidden group w-full sm:w-auto bg-transparent border border-cream/40 text-cream px-10 py-4.5 text-xs font-bold uppercase tracking-[0.2em] rounded hover:border-cream hover:text-soft-black hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-300 text-center"
            >
              <span className="absolute inset-0 bg-cream translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
              <span className="relative z-10 transition-all duration-300 group-hover:tracking-[0.24em]">GET A CUSTOM QUOTE</span>
            </a>
          </div>
        </div>
      </section>

      {/* Legacy Inquiry Modal Support */}
      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        formType="wholesale" 
      />

    </div>
  );
};

export default SampleWholesale;
