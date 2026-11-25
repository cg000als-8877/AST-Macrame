import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight,
  ArrowUpRight,
  Mail
} from 'lucide-react';

const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

import InquiryModal from '../components/InquiryModal';
import wholesaleHeroImage from '../assets/wholesale_hero.jpg';
import b2bWholesaleImg from '../assets/b2b/wholesale_production.jpg';
import b2bPrivateLabelImg from '../assets/b2b/private_label.jpg';
import b2bCustomColoursImg from '../assets/b2b/custom_colours.jpg';
import b2bRepeatOrdersImg from '../assets/b2b/repeat_orders.jpg';

const pricingTiers = [
  {
    id: "tier-1",
    tier: "TIER 01",
    title: "Boutique & Launch Run",
    range: "100 to 299 pcs",
    moq: "100 pcs",
    leadTime: "15 to 20 Days",
    label: "Flexible Low MOQ",
    description: "Designed for emerging labels, independent boutiques, and pilot collections testing macramé accessory demand.",
    highlights: [
      { key: "Colorways", val: "Up to 5 standard stock shades" },
      { key: "Hardware", val: "Corrosion-resistant zinc alloy pin buckle" },
      { key: "Packaging", val: "Individual protective bio-sleeve with silica pack" },
      { key: "Sample Rebate", val: "100% sample cost credited against invoice" }
    ],
    popular: false
  },
  {
    id: "tier-2",
    tier: "TIER 02",
    title: "Brand Collection",
    range: "300 to 499 pcs",
    moq: "300 pcs",
    leadTime: "20 to 25 Days",
    label: "Most Popular",
    description: "Our signature tier for fashion labels scaling with custom private label woven tags and tailored color mixes.",
    highlights: [
      { key: "Branding", val: "Custom woven damask brand labels sewn into belt" },
      { key: "Color Split", val: "Split production across up to 3 distinct colorways" },
      { key: "Hardware", val: "Matte Black, Antique Brass, or Gunmetal finish" },
      { key: "End-Tabs", val: "Custom debossed genuine leather or vegan PU" },
      { key: "Sample Rebate", val: "100% sample cost credited against invoice" }
    ],
    popular: true
  },
  {
    id: "tier-3",
    tier: "TIER 03",
    title: "Volume Retail Run",
    range: "500 to 999 pcs",
    moq: "500 pcs",
    leadTime: "25 to 30 Days",
    label: "Custom Pantone Included",
    description: "Built for departmental stores and multi-door retailers requiring bespoke Pantone yarn dyeing and retail-ready packaging.",
    highlights: [
      { key: "Pantone Dyeing", val: "Custom lab-dip yarn dyeing to your TCX / TPX codes" },
      { key: "Packaging", val: "Custom branded kraft retail boxes with UPC hangtags" },
      { key: "Hardware", val: "Laser-engraved logo on buckle hardware" },
      { key: "Logistics", val: "Priority express air cargo booking & direct customs clearance" },
      { key: "Sample Rebate", val: "100% sample cost credited against invoice" }
    ],
    popular: false
  },
  {
    id: "tier-4",
    tier: "TIER 04",
    title: "Enterprise / OEM",
    range: "1,000+ pcs",
    moq: "1,000+ pcs",
    leadTime: "30 to 35 Days",
    label: "Factory Contract",
    description: "High-volume contract manufacturing with permanent dedicated artisan lines, custom buckle molds, and FOB sea palletizing.",
    highlights: [
      { key: "Unit Cost", val: "Lowest direct factory pricing" },
      { key: "Custom Mold", val: "Bespoke buckle mold casting & custom dimensions" },
      { key: "Fulfillment", val: "FOB Chattogram Seaport or CIF destination palletizing" },
      { key: "Production Line", val: "Dedicated artisan knotting station for consistent output" },
      { key: "Sample Rebate", val: "100% sample cost credited against invoice" }
    ],
    popular: false
  }
];

const specCategories = {
  cord: {
    title: "100% Combed Cotton Yarn & Braiding",
    subtitle: "High-density natural fibers knotted under consistent artisanal tension.",
    specs: [
      { label: "Material Composition", value: "100% Natural Combed Long-Staple Cotton" },
      { label: "Cord Gauge / Diameter", value: "3.2mm to 4.5mm Multi-Ply Braided Cord" },
      { label: "Knot Density", value: "1,400+ Hand-Tied Knots per finished belt" },
      { label: "Weave Architecture", value: "Double-Diamond Stretch-Macramé" },
      { label: "Tensile Strength", value: "Tested load capacity > 50 kg (zero deformation)" },
      { label: "Handfeel & Texture", value: "Soft organic touch with structured, shape-retaining firmness" }
    ]
  },
  hardware: {
    title: "Buckles, Alloys & Electroplating",
    subtitle: "Solid corrosion-resistant hardware engineered for smooth pinless fastening.",
    specs: [
      { label: "Base Alloy", value: "High-Grade Cast Zinc Alloy (Nickel-Safe)" },
      { label: "Standard Finishes", value: "Matte Black, Antique Brass, Brushed Gunmetal, Polished Nickel" },
      { label: "Surface Treatment", value: "Anti-tarnish electroplating and humidity-tested seal" },
      { label: "Pinless Fastening", value: "Prong inserts smoothly through any point in the woven cord" },
      { label: "Bespoke Branding", value: "Laser logo engraving or custom debossed buckle molds (MOQ 500)" }
    ]
  },
  branding: {
    title: "Private Label & Retail Packaging",
    subtitle: "Complete retail-ready packaging and garment labeling tailored to your store.",
    specs: [
      { label: "Woven Brand Labels", value: "High-definition damask woven brand tags sewn into belt" },
      { label: "Leather End-Tabs", value: "Genuine leather or vegan PU patches with blind deboss logo" },
      { label: "Barcode Hangtags", value: "FSC certified kraft hangtags with UPC/EAN barcodes & pricing" },
      { label: "Inner Protective Sleeves", value: "Individual bio-poly sleeves with silica moisture packs" },
      { label: "Gift Box Packaging", value: "Custom foil-stamped rigid drawer boxes (optional add-on)" }
    ]
  },
  dyeing: {
    title: "Pantone TCX / TPX Color Development",
    subtitle: "Custom seasonal shade matching with certified eco-friendly water-based dyes.",
    specs: [
      { label: "Color Standards", value: "Pantone Fashion, Home + Interiors (TCX / TPX)" },
      { label: "Stock Colors", value: "Black, Midnight Navy, Espresso Brown, Maroon Wine, Desert Khaki" },
      { label: "Lab-Dip Approval", value: "Physical yarn swatches dispatched via courier for client sign-off" },
      { label: "Color Fastness", value: "Grade 4+ washing, light, and rubbing resistance" },
      { label: "Dye Chemistry", value: "Azo-free, skin-safe, OEKO-TEX compliant water-based dyes" }
    ]
  }
};

const SampleWholesale = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('cord');
  const [selectedMobileTier, setSelectedMobileTier] = useState(1); // 0, 1, 2, 3 (defaults to Tier 2: Brand Collection)

  return (
    <div className="wholesale-page w-full bg-white text-soft-black font-sans selection:bg-[#131E33] selection:text-white">
      
      {/* =========================================================================
          SECTION 1: HERO SECTION
          Engineered for screen size:
          - Mobile (< 768px): Compact vertical flow, hero above fold, quick CTAs
          - Tablet (768px - 1023px): Asymmetric 12-col grid, balanced copy & visual
          - Laptop / Desktop (1024px+): Viewport-conscious editorial layout
          ========================================================================= */}
      <section className="relative w-full pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          
          {/* TABLET & DESKTOP VIEW (Visible on md: 768px and above) */}
          <div className="hidden md:grid grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left 7 Columns: Editorial Headline, Factory Story & Immediate Actions */}
            <div className="col-span-7 flex flex-col justify-center text-left">
              <div className="inline-flex items-center px-3 py-1 bg-[#F6F6F7] rounded-full text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#131E33] w-fit mb-4 lg:mb-5">
                Direct Bangladesh Workshop
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-soft-black tracking-tight leading-[1.08] mb-4 lg:mb-6">
                Artisan Macramé Belts at Scale.
              </h1>
              
              <p className="text-sm md:text-base xl:text-lg text-dark-charcoal/80 font-light leading-relaxed mb-6 lg:mb-8 max-w-xl">
                We are Bangladesh’s dedicated macramé accessory workshop. We supply fashion houses, boutique retailers, and international private labels with transparent tier pricing, low 100-piece MOQs, and reliable worldwide freight.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 lg:gap-4 mb-8 lg:mb-12">
                <Link 
                  to="/sample-order" 
                  className="bg-soft-black text-white px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-[#131E33] transition-colors flex items-center gap-2 group cursor-pointer"
                >
                  <span>Order Samples Online</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <a 
                  href="https://wa.me/8801940689061?text=Hello%20AST%20Macrame,%20I%20would%20like%20to%20request%20a%20wholesale%20production%20quote."
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#F6F6F7] text-soft-black px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-[#EAEAEA] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#131E33]" />
                  <span>WhatsApp Quote</span>
                </a>
              </div>

              {/* 4 Key Manufacturing Metrics (Flat pill layout, zero dots, zero strokes) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 bg-[#F6F6F7] rounded-2xl p-4 lg:p-6 text-center">
                <div className="text-center">
                  <span className="text-2xl lg:text-3xl font-serif font-bold text-soft-black block leading-none mb-1 lg:mb-1.5">
                    100 pcs
                  </span>
                  <span className="text-[10.5px] lg:text-xs font-bold uppercase tracking-wider text-dark-charcoal/70 block">
                    Base MOQ
                  </span>
                  <span className="text-[11px] lg:text-xs text-dark-charcoal/70 block mt-0.5">
                    Flexible trial runs
                  </span>
                </div>

                <div className="text-center">
                  <span className="text-2xl lg:text-3xl font-serif font-bold text-soft-black block leading-none mb-1 lg:mb-1.5">
                    5 to 7 Days
                  </span>
                  <span className="text-[10.5px] lg:text-xs font-bold uppercase tracking-wider text-dark-charcoal/70 block">
                    Sample Dispatch
                  </span>
                  <span className="text-[11px] lg:text-xs text-dark-charcoal/70 block mt-0.5">
                    Express air courier
                  </span>
                </div>

                <div className="text-center">
                  <span className="text-2xl lg:text-3xl font-serif font-bold text-soft-black block leading-none mb-1 lg:mb-1.5">
                    20 to 30 Days
                  </span>
                  <span className="text-[10.5px] lg:text-xs font-bold uppercase tracking-wider text-dark-charcoal/70 block">
                    Bulk Lead Time
                  </span>
                  <span className="text-[11px] lg:text-xs text-dark-charcoal/70 block mt-0.5">
                    Air &amp; sea freight
                  </span>
                </div>

                <div className="text-center">
                  <span className="text-2xl lg:text-3xl font-serif font-bold text-[#131E33] block leading-none mb-1 lg:mb-1.5">
                    100%
                  </span>
                  <span className="text-[10.5px] lg:text-xs font-bold uppercase tracking-wider text-dark-charcoal/70 block">
                    Sample Rebate
                  </span>
                  <span className="text-[11px] lg:text-xs text-dark-charcoal/70 block mt-0.5">
                    Credited on bulk PO
                  </span>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Architectural Workshop Visual */}
            <div className="col-span-5">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-white">
                <img 
                  src={wholesaleHeroImage} 
                  alt="AST Macrame Workshop Belt Production"
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Floating Artisan Tag */}
                <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 bg-white/95 backdrop-blur-md p-3.5 lg:p-4 rounded-2xl">
                  <span className="text-[10.5px] lg:text-[11px] font-bold uppercase tracking-[0.2em] text-[#131E33] block mb-1">
                    Export Workshop, Dhaka, BD
                  </span>
                  <p className="text-xs lg:text-[13px] text-soft-black font-medium leading-snug">
                    Over 50 skilled female artisans weaving 100% combed cotton accessories for European &amp; American fashion partners.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* MOBILE VIEW (Visible on screens < md: phones) */}
          <div className="block md:hidden text-left">
            <div className="inline-flex items-center px-3 py-1 bg-[#F6F6F7] rounded-full text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#131E33] mb-2.5">
              Direct Workshop
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-soft-black tracking-tight leading-[1.12] mb-2.5">
              Artisan Macramé Belts at Scale.
            </h1>

            <p className="text-xs sm:text-sm text-dark-charcoal/80 font-light leading-relaxed mb-4">
              Bangladesh’s dedicated cotton accessory workshop. 100-piece low MOQs, transparent tier pricing, custom private labeling, and express worldwide export.
            </p>

            {/* Hero Image Mobile */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-white mb-4">
              <img 
                src={wholesaleHeroImage} 
                alt="AST Macrame Workshop Belt Production"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider text-soft-black">
                100% Hand-Braided in BD
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex flex-col gap-2 mb-4">
              <Link 
                to="/sample-order" 
                className="w-full bg-soft-black text-white py-3.5 text-center text-xs font-bold uppercase tracking-[0.18em] rounded-xl flex items-center justify-center gap-2"
              >
                <span>Order Samples Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a 
                href="https://wa.me/8801940689061?text=Hello%20AST%20Macrame,%20I%20would%20like%20to%20request%20a%20wholesale%20production%20quote."
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#F6F6F7] text-soft-black py-3.5 text-center text-xs font-bold uppercase tracking-[0.18em] rounded-xl flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#131E33]" />
                <span>WhatsApp Quote</span>
              </a>
            </div>

            {/* Mobile 4-Metric Grid */}
            <div className="grid grid-cols-2 gap-2 bg-[#F6F6F7] rounded-2xl p-3 text-center">
              <div className="p-1.5 text-center">
                <span className="text-xl font-serif font-bold text-soft-black block leading-none mb-1">
                  100 pcs
                </span>
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-dark-charcoal/60 block">
                  Base MOQ
                </span>
                <span className="text-[9.5px] text-dark-charcoal/70 block">
                  Trial friendly
                </span>
              </div>

              <div className="p-1.5 text-center">
                <span className="text-xl font-serif font-bold text-soft-black block leading-none mb-1">
                  5 to 7 Days
                </span>
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-dark-charcoal/60 block">
                  Sample Time
                </span>
                <span className="text-[9.5px] text-dark-charcoal/70 block">
                  Air courier
                </span>
              </div>

              <div className="p-1.5 text-center">
                <span className="text-xl font-serif font-bold text-soft-black block leading-none mb-1">
                  20 to 30 Days
                </span>
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-dark-charcoal/60 block">
                  Bulk Lead Time
                </span>
                <span className="text-[9.5px] text-dark-charcoal/70 block">
                  Air &amp; sea export
                </span>
              </div>

              <div className="p-1.5 text-center">
                <span className="text-xl font-serif font-bold text-[#131E33] block leading-none mb-1">
                  100%
                </span>
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-dark-charcoal/60 block">
                  Sample Credit
                </span>
                <span className="text-[9.5px] text-dark-charcoal/70 block">
                  Credited on PO
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 2: VOLUME PRODUCTION TIERS
          Screen-Size Architecture:
          - Desktop (lg: 1024px+): 4-column flat bento matrix
          - Tablet (md: 768px - 1023px): 2x2 grid showing all 4 tiers simultaneously
          - Mobile (phones < 768px): One-thumb segmented pill switcher (T01-T04)
          Zero dots, zero strokes, zero shadows.
          ========================================================================= */}
      <section className="py-14 sm:py-18 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          
          <div className="max-w-3xl mb-10 sm:mb-12 lg:mb-16 text-left">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#131E33] block mb-2 sm:mb-2.5">
              Production Scaling Matrix
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-soft-black tracking-tight leading-tight mb-2 sm:mb-3">
              Tiered Manufacturing Architecture
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-dark-charcoal/75 font-light leading-relaxed max-w-xl">
              Transparent scaling from boutique trial runs to full-scale departmental retail batches. Every tier includes a 100% sample rebate on confirmation.
            </p>
          </div>

          {/* DESKTOP VIEW: 4-COLUMN FLAT BENTO GRID (Visible on lg: 1024px and above) */}
          <div className="hidden lg:grid grid-cols-4 gap-4 xl:gap-5">
            {pricingTiers.map((tier) => (
              <div 
                key={tier.id}
                className={`rounded-3xl p-6 xl:p-7 flex flex-col justify-between transition-colors ${
                  tier.popular 
                    ? 'bg-[#1C2841] text-white' 
                    : 'bg-[#F6F6F7] text-soft-black hover:bg-[#EEEEF0]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5 xl:mb-4">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${
                      tier.popular ? 'text-white/80' : 'text-[#131E33]'
                    }`}>
                      {tier.tier}
                    </span>
                    <span className={`text-[9px] xl:text-[9.5px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      tier.popular ? 'bg-white/15 text-white' : 'bg-white text-soft-black'
                    }`}>
                      {tier.label}
                    </span>
                  </div>

                  <h3 className={`text-lg xl:text-xl font-serif font-bold mb-1.5 ${
                    tier.popular ? 'text-white' : 'text-soft-black'
                  }`}>
                    {tier.title}
                  </h3>

                  <div className={`my-3.5 p-3.5 xl:p-4 rounded-2xl ${
                    tier.popular ? 'bg-white/10' : 'bg-white'
                  }`}>
                    <div className="text-xl xl:text-2xl font-serif font-bold leading-none mb-1">
                      {tier.range}
                    </div>
                    <span className={`text-[10.5px] xl:text-[11px] block ${
                      tier.popular ? 'text-white/70' : 'text-dark-charcoal/65'
                    }`}>
                      Lead Time: {tier.leadTime}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed font-light mb-5 xl:mb-6 ${
                    tier.popular ? 'text-white/80' : 'text-dark-charcoal/75'
                  }`}>
                    {tier.description}
                  </p>

                  <div className="space-y-2.5 xl:space-y-3 mb-6 xl:mb-8">
                    {tier.highlights.map((item, idx) => (
                      <div key={idx} className="text-xs">
                        <span className={`block text-[9.5px] xl:text-[10px] font-bold uppercase tracking-wider ${
                          tier.popular ? 'text-white/70' : 'text-dark-charcoal/60'
                        }`}>
                          {item.key}
                        </span>
                        <span className={`font-medium leading-snug ${
                          tier.popular ? 'text-white/95' : 'text-soft-black'
                        }`}>
                          {item.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <a 
                  href={`https://wa.me/8801940689061?text=Hello%20AST%20Macrame,%20I%20am%20inquiring%20about%20${encodeURIComponent(tier.tier + ' (' + tier.title + ' - ' + tier.range + ')')}%20wholesale%20manufacturing.`}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-3.5 text-center text-xs font-bold uppercase tracking-[0.16em] rounded-xl transition-colors block cursor-pointer ${
                    tier.popular 
                      ? 'bg-white text-[#1C2841] hover:bg-stone-100' 
                      : 'bg-soft-black text-white hover:bg-[#131E33]'
                  }`}
                >
                  Select Tier
                </a>
              </div>
            ))}
          </div>

          {/* TABLET VIEW: 2X2 GRID (Visible on md: 768px to 1023px) */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
            {pricingTiers.map((tier) => (
              <div 
                key={tier.id}
                className={`rounded-3xl p-6 flex flex-col justify-between transition-colors ${
                  tier.popular 
                    ? 'bg-[#1C2841] text-white' 
                    : 'bg-[#F6F6F7] text-soft-black'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${
                      tier.popular ? 'text-white/80' : 'text-[#131E33]'
                    }`}>
                      {tier.tier}
                    </span>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      tier.popular ? 'bg-white/15 text-white' : 'bg-white text-soft-black'
                    }`}>
                      {tier.label}
                    </span>
                  </div>

                  <h3 className={`text-xl font-serif font-bold mb-1 ${
                    tier.popular ? 'text-white' : 'text-soft-black'
                  }`}>
                    {tier.title}
                  </h3>

                  <div className={`my-3.5 p-3.5 rounded-2xl ${
                    tier.popular ? 'bg-white/10' : 'bg-white'
                  }`}>
                    <div className="text-2xl font-serif font-bold leading-none mb-1">
                      {tier.range}
                    </div>
                    <span className={`text-[11px] block ${
                      tier.popular ? 'text-white/70' : 'text-dark-charcoal/65'
                    }`}>
                      Lead Time: {tier.leadTime}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed font-light mb-5 ${
                    tier.popular ? 'text-white/80' : 'text-dark-charcoal/75'
                  }`}>
                    {tier.description}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    {tier.highlights.map((item, idx) => (
                      <div key={idx} className="text-xs">
                        <span className={`block text-[9.5px] font-bold uppercase tracking-wider ${
                          tier.popular ? 'text-white/80' : 'text-dark-charcoal/60'
                        }`}>
                          {item.key}
                        </span>
                        <span className={`font-medium leading-snug ${
                          tier.popular ? 'text-white/95' : 'text-soft-black'
                        }`}>
                          {item.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <a 
                  href={`https://wa.me/8801940689061?text=Hello%20AST%20Macrame,%20I%20am%20inquiring%20about%20${encodeURIComponent(tier.tier + ' (' + tier.title + ' - ' + tier.range + ')')}%20wholesale%20manufacturing.`}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-3.5 text-center text-xs font-bold uppercase tracking-[0.16em] rounded-xl transition-colors block cursor-pointer ${
                    tier.popular 
                      ? 'bg-white text-[#1C2841]' 
                      : 'bg-soft-black text-white'
                  }`}
                >
                  Select Tier
                </a>
              </div>
            ))}
          </div>

          {/* MOBILE VIEW: SEGMENTED TIER SELECTOR (Visible on screens < md: phones) */}
          <div className="block md:hidden">
            {/* Segmented Tier Pills */}
            <div className="grid grid-cols-4 gap-1.5 p-1.5 bg-[#F6F6F7] rounded-2xl mb-4">
              {pricingTiers.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedMobileTier(idx)}
                  className={`py-2.5 rounded-xl text-[10.5px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    selectedMobileTier === idx 
                      ? 'bg-soft-black text-white' 
                      : 'text-dark-charcoal/70 hover:text-soft-black'
                  }`}
                >
                  T0{idx + 1}
                </button>
              ))}
            </div>

            {/* Active Tier Mobile Card */}
            {(() => {
              const activeTier = pricingTiers[selectedMobileTier];
              return (
                <div className={`rounded-3xl p-5 sm:p-6 text-left transition-colors ${
                  activeTier.popular ? 'bg-[#1C2841] text-white' : 'bg-[#F6F6F7] text-soft-black'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${
                      activeTier.popular ? 'text-white/80' : 'text-[#131E33]'
                    }`}>
                      {activeTier.tier}
                    </span>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      activeTier.popular ? 'bg-white/15 text-white' : 'bg-white text-soft-black'
                    }`}>
                      {activeTier.label}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold mb-1">
                    {activeTier.title}
                  </h3>

                  <div className={`my-3 p-3.5 rounded-2xl ${
                    activeTier.popular ? 'bg-white/10' : 'bg-white'
                  }`}>
                    <div className="text-2xl font-serif font-bold leading-none mb-1">
                      {activeTier.range}
                    </div>
                    <span className={`text-[11px] block ${
                      activeTier.popular ? 'text-white/70' : 'text-dark-charcoal/65'
                    }`}>
                      Lead Time: {activeTier.leadTime}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed font-light mb-4 ${
                    activeTier.popular ? 'text-white/80' : 'text-dark-charcoal/75'
                  }`}>
                    {activeTier.description}
                  </p>

                  <div className="space-y-2.5 mb-5">
                    {activeTier.highlights.map((item, idx) => (
                      <div key={idx} className="text-xs">
                        <span className={`block text-[9.5px] font-bold uppercase tracking-wider ${
                          activeTier.popular ? 'text-white/80' : 'text-dark-charcoal/60'
                        }`}>
                          {item.key}
                        </span>
                        <span className={`font-medium leading-snug ${
                          activeTier.popular ? 'text-white/95' : 'text-soft-black'
                        }`}>
                          {item.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a 
                    href={`https://wa.me/8801940689061?text=Hello%20AST%20Macrame,%20I%20am%20inquiring%20about%20${encodeURIComponent(activeTier.tier + ' (' + activeTier.title + ' - ' + activeTier.range + ')')}%20wholesale%20manufacturing.`}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-3.5 text-center text-xs font-bold uppercase tracking-[0.16em] rounded-xl transition-colors block cursor-pointer ${
                      activeTier.popular 
                        ? 'bg-white text-[#1C2841]' 
                        : 'bg-soft-black text-white'
                    }`}
                  >
                    Select {activeTier.tier}
                  </a>
                </div>
              );
            })()}
          </div>

          <p className="text-xs text-dark-charcoal/60 italic text-center mt-10">
            FOB export shipping quotes (USD) and domestic commercial BDT pricing delivered within 2 hours.
          </p>

        </div>
      </section>


      {/* =========================================================================
          SECTION 3: PHOTO-LED B2B MANUFACTURING CAPABILITIES
          Using real workshop assets:
          - b2bWholesaleImg (wholesale_production.jpg)
          - b2bPrivateLabelImg (private_label.jpg)
          - b2bCustomColoursImg (custom_colours.jpg)
          - b2bRepeatOrdersImg (repeat_orders.jpg)
          ========================================================================= */}
      <section className="py-14 sm:py-18 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          
          <div className="max-w-3xl mb-10 sm:mb-12 lg:mb-16 text-left">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#131E33] block mb-2 sm:mb-2.5">
              Production Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-soft-black tracking-tight leading-tight mb-2 sm:mb-3">
              Crafted in Our Dedicated Workshop
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-dark-charcoal/75 font-light leading-relaxed max-w-xl">
              From raw 100% natural cotton cord to bespoke Pantone dyeing and private label branding, all steps are controlled under our strict quality assurance protocol.
            </p>
          </div>

          {/* Asymmetric 4-Card Photo Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            
            {/* Capability 1: Artisan Knotting at Scale */}
            <div className="bg-[#F6F6F7] rounded-3xl overflow-hidden flex flex-col justify-between">
              <div className="aspect-[16/10] overflow-hidden bg-stone/10">
                <img 
                  src={b2bWholesaleImg} 
                  alt="Artisan Knotting at Scale"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 sm:p-7 lg:p-8 text-left">
                <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#131E33] block mb-1.5">
                  01 / Hand-Knotted Construction
                </span>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-soft-black mb-1.5 sm:mb-2">
                  Artisan Knotting at Scale
                </h3>
                <p className="text-xs sm:text-sm text-dark-charcoal/80 font-light leading-relaxed">
                  Every belt is hand-braided by experienced Bangladeshi artisans using rigid standardized weaving templates. Consistent diamond-knot tension prevents sagging and guarantees exact millimeter sizing across thousands of pieces.
                </p>
              </div>
            </div>

            {/* Capability 2: Bespoke Private Labeling & Hardware */}
            <div className="bg-[#F6F6F7] rounded-3xl overflow-hidden flex flex-col justify-between">
              <div className="aspect-[16/10] overflow-hidden bg-stone/10">
                <img 
                  src={b2bPrivateLabelImg} 
                  alt="Private Labeling and Custom Hardware"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 sm:p-7 lg:p-8 text-left">
                <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#131E33] block mb-1.5">
                  02 / Custom Branding
                </span>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-soft-black mb-1.5 sm:mb-2">
                  Private Label &amp; Buckle Engraving
                </h3>
                <p className="text-xs sm:text-sm text-dark-charcoal/80 font-light leading-relaxed">
                  We integrate your brand identity seamlessly: high-definition woven damask tags, custom debossed genuine leather end-patches, laser-engraved buckle hardware, and custom-cast buckle molds for signature hardware collections.
                </p>
              </div>
            </div>

            {/* Capability 3: Pantone TCX / TPX Yarn Dyeing */}
            <div className="bg-[#F6F6F7] rounded-3xl overflow-hidden flex flex-col justify-between">
              <div className="aspect-[16/10] overflow-hidden bg-stone/10">
                <img 
                  src={b2bCustomColoursImg} 
                  alt="Pantone Color Matching and Lab Dip Dyeing"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 sm:p-7 lg:p-8 text-left">
                <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#131E33] block mb-1.5">
                  03 / Bespoke Color Matching
                </span>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-soft-black mb-1.5 sm:mb-2">
                  Pantone Lab-Dip Development
                </h3>
                <p className="text-xs sm:text-sm text-dark-charcoal/80 font-light leading-relaxed">
                  Provide your seasonal Pantone TCX or TPX palette and our dye house formulates exact colorway lab-dips. Physical dyed cotton yarn swatches are express-shipped to your design studio for approval before bulk braiding begins.
                </p>
              </div>
            </div>

            {/* Capability 4: Export Packaging & Repeat Orders */}
            <div className="bg-[#F6F6F7] rounded-3xl overflow-hidden flex flex-col justify-between">
              <div className="aspect-[16/10] overflow-hidden bg-stone/10">
                <img 
                  src={b2bRepeatOrdersImg} 
                  alt="Packaging and Export Logistics"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 sm:p-7 lg:p-8 text-left">
                <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#131E33] block mb-1.5">
                  04 / Retail-Ready Delivery
                </span>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-soft-black mb-1.5 sm:mb-2">
                  Export Cartons &amp; Global Logistics
                </h3>
                <p className="text-xs sm:text-sm text-dark-charcoal/80 font-light leading-relaxed">
                  Each piece is rolled with a moisture-barrier bio sleeve and silica pack, boxed in heavy-duty 5-ply export master cartons with your custom destination marks. Shipped door-to-door via DHL/FedEx or palletized via Chattogram port.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: TECHNICAL SPECIFICATIONS GUIDE
          Interactive category tab switcher with clean flat spec sheet
          Zero borders, zero dots, zero shadows.
          ========================================================================= */}
      <section className="py-14 sm:py-18 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          
          <div className="max-w-3xl mb-10 sm:mb-12 lg:mb-16 text-left">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#131E33] block mb-2 sm:mb-2.5">
              Technical Documentation
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-soft-black tracking-tight leading-tight mb-2 sm:mb-3">
              Materials &amp; Construction Specs
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-dark-charcoal/75 font-light leading-relaxed max-w-xl">
              Inspect technical standards across yarn fibers, alloy buckle plating, private label accessories, and dye chemistry.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Category Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5 sm:mb-6">
              {[
                { id: 'cord', label: 'Yarn & Weave' },
                { id: 'hardware', label: 'Buckles & Alloys' },
                { id: 'branding', label: 'Private Label' },
                { id: 'dyeing', label: 'Pantone Dyeing' }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 sm:py-3.5 px-3 sm:px-4 rounded-2xl text-[11px] sm:text-xs font-bold uppercase tracking-wider text-center transition-colors cursor-pointer ${
                      isActive 
                        ? 'bg-soft-black text-white' 
                        : 'bg-[#F6F6F7] text-dark-charcoal/75 hover:bg-[#EEEEF0]'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Spec Panel */}
            <div className="bg-[#F6F6F7] rounded-3xl p-5 sm:p-8 lg:p-10 text-left">
              <div className="mb-5 sm:mb-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-soft-black mb-1">
                  {specCategories[activeTab].title}
                </h3>
                <p className="text-xs sm:text-sm text-dark-charcoal/70 font-light">
                  {specCategories[activeTab].subtitle}
                </p>
              </div>

              <div className="space-y-2">
                {specCategories[activeTab].specs.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white text-xs sm:text-[13px] gap-1 sm:gap-4"
                  >
                    <span className="font-bold text-soft-black shrink-0">
                      {item.label}
                    </span>
                    <span className="text-dark-charcoal/80 font-normal sm:text-right">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 5: 100% SAMPLE COST CREDIT PROTOCOL
          Clear 3-step visual timeline for risk-free brand sampling
          ========================================================================= */}
      <section className="py-14 sm:py-18 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          
          <div className="max-w-3xl mb-10 sm:mb-12 lg:mb-16 text-left">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#131E33] block mb-2 sm:mb-2.5">
              Risk-Free Evaluation
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-soft-black tracking-tight leading-tight mb-2 sm:mb-3">
              100% Sample Rebate Protocol
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-dark-charcoal/75 font-light leading-relaxed max-w-xl">
              We stand by our craftsmanship. Experience handfeel, knot density, and hardware finishing in your studio before committing to bulk volume.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-10 lg:mb-12">
            
            {/* Step 1 */}
            <div className="bg-[#F6F6F7] rounded-3xl p-6 sm:p-7 lg:p-8 text-left flex flex-col justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-soft-black block mb-2.5 sm:mb-3">
                  01
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-soft-black mb-1.5 sm:mb-2">
                  Order Evaluation Sample
                </h3>
                <p className="text-xs sm:text-sm text-dark-charcoal/75 font-light leading-relaxed">
                  Select your exact belt color and size directly through our online sample dispatch portal. Hand-knotted and dispatched within 5 to 7 days via express courier.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#F6F6F7] rounded-3xl p-6 sm:p-7 lg:p-8 text-left flex flex-col justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#131E33] block mb-2.5 sm:mb-3">
                  02
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-soft-black mb-1.5 sm:mb-2">
                  Studio Review &amp; Sign-Off
                </h3>
                <p className="text-xs sm:text-sm text-dark-charcoal/75 font-light leading-relaxed">
                  Inspect weave density, drape, and buckle feel in your studio. This piece acts as the approved Golden Sample that our workshop matches on your bulk run.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F6F6F7] rounded-3xl p-6 sm:p-7 lg:p-8 text-left flex flex-col justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#131E33] block mb-2.5 sm:mb-3">
                  03
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-soft-black mb-1.5 sm:mb-2">
                  100% Invoice Credit
                </h3>
                <p className="text-xs sm:text-sm text-dark-charcoal/75 font-light leading-relaxed">
                  Upon placing your first bulk order of 100+ units, the full product cost of your evaluation sample is automatically deducted from your bulk invoice.
                </p>
              </div>
            </div>

          </div>

          <div className="text-center">
            <Link 
              to="/sample-order" 
              className="inline-flex items-center gap-2 bg-soft-black text-white px-8 sm:px-9 py-3.5 sm:py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-[#131E33] transition-colors"
            >
              <span>Order Evaluation Samples</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 6: EXPORT PACKAGING & MULTI-MODAL LOGISTICS
          ========================================================= */}
      <section className="py-14 sm:py-18 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          
          <div className="max-w-3xl mb-10 sm:mb-12 lg:mb-16 text-left">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#131E33] block mb-2 sm:mb-2.5">
              Fulfillment Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-soft-black tracking-tight leading-tight mb-2 sm:mb-3">
              Packaging &amp; Worldwide Logistics
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-dark-charcoal/75 font-light leading-relaxed max-w-xl">
              Export-grade carton packaging and multi-modal transit directly from Chattogram Seaport and Dhaka International Airport.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            
            {/* Packaging Card */}
            <div className="bg-[#F6F6F7] rounded-3xl p-6 sm:p-8 lg:p-9 text-left">
              <h3 className="text-lg sm:text-xl font-serif font-bold text-soft-black mb-3">
                Master Carton Specifications
              </h3>
              <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-[13px] text-dark-charcoal/80 leading-relaxed font-light">
                <div className="p-3 bg-white rounded-xl">
                  <strong className="font-bold text-soft-black block mb-0.5">Inner Protective Bio-Sleeve:</strong>
                  Each belt is individually rolled with moisture-barrier film and an active silica gel pack.
                </div>
                <div className="p-3 bg-white rounded-xl">
                  <strong className="font-bold text-soft-black block mb-0.5">5-Ply Export Master Cartons:</strong>
                  Heavy-duty corrugated master cartons (50 or 100 units per box) lined with waterproof poly sheets.
                </div>
                <div className="p-3 bg-white rounded-xl">
                  <strong className="font-bold text-soft-black block mb-0.5">Custom Shipping Marks:</strong>
                  Destination labels, EAN/UPC barcodes, net/gross weight, and client PO numbers applied.
                </div>
              </div>
            </div>

            {/* Transit Modes Card */}
            <div className="bg-[#F6F6F7] rounded-3xl p-6 sm:p-8 lg:p-9 text-left">
              <h3 className="text-lg sm:text-xl font-serif font-bold text-soft-black mb-3">
                Transit Options &amp; Export Ports
              </h3>
              <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-[13px] text-dark-charcoal/80 leading-relaxed font-light">
                <div className="p-3 bg-white rounded-xl">
                  <strong className="font-bold text-soft-black block mb-0.5">Express Air Courier (DHL / FedEx):</strong>
                  3 to 5 business days door-to-door delivery with real-time customs tracking. Ideal for boutique orders.
                </div>
                <div className="p-3 bg-white rounded-xl">
                  <strong className="font-bold text-soft-black block mb-0.5">Air Cargo (Airport-to-Airport):</strong>
                  5 to 7 days transit via Dhaka International Airport (DAC) for medium-to-large bulk shipments.
                </div>
                <div className="p-3 bg-white rounded-xl">
                  <strong className="font-bold text-soft-black block mb-0.5">Ocean Freight (FOB / CIF):</strong>
                  Palletized full container (FCL) or less-than-container (LCL) freight via Chattogram Seaport.
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 7: DIRECT WORKSHOP CONTACT & TECH PACK INTAKE
          Ultra-clean, deep navy flat banner with white typography
          ========================================================================= */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 pb-24 md:pb-24 lg:pb-28 bg-[#131E33] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/70 block mb-2 sm:mb-3">
            Direct Workshop Collaboration
          </span>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-3 sm:mb-4">
            Have a Tech Pack or Reference Design?
          </h2>
          
          <p className="text-xs sm:text-sm md:text-base text-white/75 font-light max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Send your sketches, moodboards, or custom dimensional specs directly to our production lead. We review feasibility and deliver quotes within 2 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <a 
              href="https://wa.me/8801940689061?text=Hello%20AST%20Macrame,%20I%20have%20a%20tech%20pack%20/%20reference%20design%20to%20discuss%20for%20wholesale%20production."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-white text-soft-black px-8 sm:px-9 py-3.5 sm:py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-stone-100 transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-soft-black" />
              <span>WhatsApp Workshop</span>
            </a>
            
            <a 
              href="mailto:astmacrame@gmail.com?subject=Wholesale%20OEM%20Manufacturing%20Tech%20Pack"
              className="w-full sm:w-auto bg-white/10 text-white px-8 sm:px-9 py-3.5 sm:py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-white" />
              <span>Email Tech Pack</span>
            </a>

            <Link 
              to="/sample-order" 
              className="w-full sm:w-auto bg-white text-soft-black px-8 sm:px-9 py-3.5 sm:py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-stone-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Order Samples</span>
              <ArrowUpRight className="w-4 h-4 text-soft-black" />
            </Link>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        formType="wholesale" 
      />

    </div>
  );
};

export default SampleWholesale;
