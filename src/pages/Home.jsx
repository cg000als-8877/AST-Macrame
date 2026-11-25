import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Boxes, 
  CheckCircle2, 
  Tag, 
  Check, 
  ChevronRight,
  Sparkles,
  Mail,
  Plus,
  Minus,
  ArrowRight
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

import mobileHeroImage from '../assets/mobile_hero.jpg';
import mobileHeroWebp from '../assets/mobile_hero.webp';
import comparisonDetailImg from '../assets/editorial/comparison_detail.jpg';
import craftsmanshipDetailImg from '../assets/editorial/craftsmanship_detail.jpg';
import craftsmanshipDetailMobileImg from '../assets/editorial/craftsmanship_detail_mobile.jpg';

import hgBlack from '../assets/homepage-gallery/Black.webp';
import hgNavy from '../assets/homepage-gallery/Navy.webp';
import hgBrown from '../assets/homepage-gallery/Brown.webp';
import hgMaroon from '../assets/homepage-gallery/Maroon.webp';
import hgKhaki from '../assets/homepage-gallery/khaki2.webp';

import b2bWholesaleImg from '../assets/b2b/wholesale_production.jpg';
import b2bPrivateLabelImg from '../assets/b2b/private_label.jpg';
import b2bCustomColoursImg from '../assets/b2b/custom_colours.jpg';
import b2bRepeatOrdersImg from '../assets/b2b/repeat_orders.jpg';

const wholesaleFeatures = [
  {
    id: 'moq',
    title: 'Low MOQ',
    metric: '100 pcs',
    metricLabel: 'Base MOQ',
    desc: 'Start your first production run with accessible, trial-friendly minimum order quantities.',
    tag: 'Flexible Minimums',
    icon: Boxes,
    bg: 'bg-[#FAF7F2]',
    borderColor: 'border-[#EDE4D8]',
    iconBg: 'bg-soft-black text-white',
    metricColor: 'text-soft-black',
    metricLabelColor: 'text-dark-charcoal/60',
  },
  {
    id: 'sample',
    title: 'Sample First',
    metric: '5 to 7 Days',
    metricLabel: 'Sample Time',
    desc: 'Approve product & weave quality before bulk production.',
    tag: 'Sample Dispatch',
    icon: CheckCircle2,
    bg: 'bg-[#FAF2EE]',
    borderColor: 'border-[#ECDCD5]',
    iconBg: 'bg-[#131E33] text-white',
    metricColor: 'text-[#131E33]',
    metricLabelColor: 'text-[#131E33]/70',
  },
  {
    id: 'custom',
    title: 'Custom Ready',
    metric: '25 to 35 Days',
    metricLabel: 'Production',
    desc: 'Bespoke colours, private label branding & custom packaging available.',
    tag: 'Private Label Ready',
    icon: Tag,
    bg: 'bg-[#F1F5F2]',
    borderColor: 'border-[#DDE6E0]',
    iconBg: 'bg-[#2D3A30] text-white',
    metricColor: 'text-[#2D3A30]',
    metricLabelColor: 'text-[#2D3A30]/70',
  }
];

const Home = () => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [activeWholesaleIdx, setActiveWholesaleIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  // Auto-slide cards every 3 seconds on mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWholesaleIdx((prev) => (prev + 1) % wholesaleFeatures.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [activeWholesaleIdx]);

  const toggleFaq = (idx) => {
    setOpenFaqIdx(prev => prev === idx ? null : idx);
  };

  const quickFaqs = [
    {
      q: "What's your minimum order quantity?",
      a: "Our standard Minimum Order Quantity (MOQ) starts at 100 pieces for bulk wholesale runs. We also support emerging brands and boutiques with flexible trial batches and single sample orders directly through our website."
    },
    {
      q: "How much does a sample cost?",
      a: "Standard sample belts start at ৳850 per piece on our online store, with tiered savings down to ৳690/pc when ordering 5-piece multi-color sample sets. For custom OEM developments with bespoke hardware or Pantone dyeing, sample costs are confirmed with your customized quote."
    },
    {
      q: "How long does production take?",
      a: "Physical sample preparation typically takes 5 to 7 business days. Bulk wholesale production generally requires 25 to 35 days depending on the batch volume, custom dyeing, and branded packaging specifications."
    },
    {
      q: "How does shipping work?",
      a: "We ship internationally via DHL/FedEx Express Air for fast door-to-door delivery or sea freight for volume cargo. Inside Bangladesh, reliable doorstep courier delivers within 24 to 48 hours across Dhaka/Chittagong and 2 to 4 days nationwide."
    },
    {
      q: "What if I'm not happy with the sample?",
      a: "Your satisfaction and quality approval are paramount. If any adjustment is needed for weave tension, belt length, cord tone, or buckle finish, our master artisans will refine the specs and craft a revised sample before bulk production begins."
    },
    {
      q: "How does payment work?",
      a: "Sample orders can be purchased instantly via card, bKash, Nagad, or Cash on Delivery (inside Bangladesh). For wholesale B2B bulk orders, we work with standard commercial terms (50% production advance upon confirmation and 50% balance before dispatch, or international LC)."
    }
  ];

  const productColors = [
    { 
      id: 1, 
      name: 'Black', 
      code: 'COLOR 01', 
      hex: '#1a1a1a', 
      img: hgBlack, 
      desc: 'Deep obsidian natural cotton with matching finish.' 
    },
    { 
      id: 2, 
      name: 'Navy', 
      code: 'COLOR 02', 
      hex: '#1c2841', 
      img: hgNavy, 
      desc: 'Subtle midnight navy, versatile for casual and formal sets.' 
    },
    { 
      id: 3, 
      name: 'Brown', 
      code: 'COLOR 03', 
      hex: '#B0868B', 
      img: hgBrown, 
      desc: 'Earthy heather tone with intricate knot definition.' 
    },
    { 
      id: 4, 
      name: 'Maroon', 
      code: 'COLOR 04', 
      hex: '#5c222e', 
      img: hgMaroon, 
      desc: 'Rich wine tone offering sophisticated seasonal contrast.' 
    },
    { 
      id: 5, 
      name: 'Khaki', 
      code: 'COLOR 05', 
      hex: '#d4c7b1', 
      img: hgKhaki, 
      desc: 'Raw natural sandy hue, ideal for resort and summer lines.' 
    },
  ];

  return (
    <div className="w-full bg-white text-soft-black font-sans selection:bg-[#131E33] selection:text-white">

      {/* HOME — SECTION 1: HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-soft-black">
        <div className="w-full aspect-[2/3] md:aspect-[21/9] md:h-auto overflow-hidden bg-stone/20">
          <picture className="w-full h-full">
            <source media="(max-width: 767px)" type="image/webp" srcSet={mobileHeroWebp} />
            <source media="(max-width: 767px)" type="image/jpeg" srcSet={mobileHeroImage} />
            <source media="(min-width: 768px)" type="image/webp" srcSet="/hero.webp" />
            <img 
              src="/hero.jpg" 
              alt="AST Handmade Macramé Belts" 
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-center scale-[1.05] translate-y-[-2%]"
            />
          </picture>
        </div>
        <div className="absolute inset-0 bg-soft-black/45 pointer-events-none" />
        
        <div className="absolute inset-0 z-10 flex flex-col justify-end items-center md:items-start text-center md:text-left px-6 md:px-12 lg:px-20 pb-12 md:pb-16 lg:pb-24 pt-32">
          <div className="max-w-4xl md:max-w-2xl w-full">
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-6xl font-serif font-semibold text-white tracking-tight leading-tight mb-3 md:mb-4"
            >
              Crafted for <br className="hidden md:block"/>
              the Extraordinary
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xs sm:text-base md:text-lg text-white/90 font-light leading-relaxed mb-8 md:mb-10 max-w-[95%] md:max-w-xl mx-auto md:mx-0"
            >
              A specialized macramé belt supplier for fashion brands, retailers and wholesale buyers.
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start items-center md:items-start w-full"
            >
              <Link 
                to="/sample-order" 
                className="relative overflow-hidden group bg-white text-soft-black px-8 py-3.5 md:px-9 md:py-4 text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-stone-100 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-300 inline-block"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                <span className="relative z-10 transition-all duration-300 group-hover:tracking-[0.24em]">REQUEST A SAMPLE</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOME — SECTION 2: MADE FOR WHOLESALE */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-0 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16 px-4">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-terracotta block mb-2 sm:mb-3">
              SUPPLY CHAIN & PRODUCTION
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-semibold text-soft-black tracking-tight leading-tight">
              Made for Wholesale
            </h2>
          </div>

          {/* DESKTOP VIEW (3-Column Grid) */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-5 md:gap-6 lg:gap-8 px-4 sm:px-0">
            {wholesaleFeatures.map((feat) => {
              const IconComponent = feat.icon;
              return (
                <div 
                  key={feat.id}
                  className={`${feat.bg} border ${feat.borderColor} rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300`}
                >
                  <div>
                    {/* Top Row: Icon on left, Highlighted BIG metric on right */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl ${feat.iconBg} flex items-center justify-center`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="text-right">
                        <span className={`text-2xl md:text-3xl font-serif font-bold ${feat.metricColor} block leading-tight`}>
                          {feat.metric}
                        </span>
                        <span className={`text-[10px] uppercase tracking-wider font-semibold ${feat.metricLabelColor} block mt-0.5`}>
                          {feat.metricLabel}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base lg:text-lg font-serif font-bold text-soft-black tracking-normal mb-1.5 leading-tight">
                      {feat.title}
                    </h3>
                    <p className="text-xs md:text-sm text-dark-charcoal/80 font-light leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>

                  {/* Bottom: Thin separator line & clean tag text (no badge, no count) */}
                  <div className="mt-5 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-semibold text-soft-black/80">
                    <span>{feat.tag}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MOBILE VIEW (Cover Flow: 1 Forward Center, 2 Backward on Left & Right Sides - Edge-to-Edge) */}
          <div className="block sm:hidden relative px-0 py-2 overflow-hidden w-full">
            {/* Stage Container - reduced height to eliminate empty gap */}
            <div className="relative w-full h-[195px] flex items-center justify-center">
              {wholesaleFeatures.map((feat, index) => {
                // Calculate position relative to active card
                // 0 = Center Forward, 1 = Right Side Backward, 2 = Left Side Backward
                const diff = (index - activeWholesaleIdx + wholesaleFeatures.length) % wholesaleFeatures.length;
                const IconComponent = feat.icon;

                // Cover Flow depth and position variants (Zero drop shadows)
                const coverFlowVariants = {
                  0: {
                    x: "0%",
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    zIndex: 30,
                    opacity: 1,
                    filter: 'brightness(1)',
                  },
                  1: {
                    x: "48%",
                    y: 4,
                    scale: 0.85,
                    rotate: 3.5,
                    zIndex: 10,
                    opacity: 0.85,
                    filter: 'brightness(0.97)',
                  },
                  2: {
                    x: "-48%",
                    y: 4,
                    scale: 0.85,
                    rotate: -3.5,
                    zIndex: 10,
                    opacity: 0.85,
                    filter: 'brightness(0.97)',
                  }
                };

                const isCenter = diff === 0;

                return (
                  <motion.div
                    key={feat.id}
                    animate={coverFlowVariants[diff]}
                    transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                    drag={isCenter ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.7}
                    onDragEnd={(e, { offset, velocity }) => {
                      if (offset.x < -35 || velocity.x < -250) {
                        // Swiped left -> next card to center
                        setActiveWholesaleIdx((prev) => (prev + 1) % wholesaleFeatures.length);
                      } else if (offset.x > 35 || velocity.x > 250) {
                        // Swiped right -> prev card to center
                        setActiveWholesaleIdx((prev) => (prev - 1 + wholesaleFeatures.length) % wholesaleFeatures.length);
                      }
                    }}
                    className={`absolute w-[80vw] max-w-[300px] h-full ${feat.bg} border ${feat.borderColor} rounded-2xl p-4.5 flex flex-col justify-between select-none cursor-grab active:cursor-grabbing text-left`}
                    style={{
                      touchAction: 'pan-y'
                    }}
                    onClick={() => {
                      if (!isCenter) {
                        setActiveWholesaleIdx(index);
                      }
                    }}
                  >
                    <div>
                      {/* Top Row: Icon on left, Highlighted BIG metric number on right */}
                      <div className="flex items-center justify-between mb-2.5">
                        <div className={`w-9 h-9 rounded-xl ${feat.iconBg} flex items-center justify-center`}>
                          <IconComponent className="w-4.5 h-4.5" />
                        </div>
                        <div className="text-right">
                          <span className={`text-xl font-serif font-bold ${feat.metricColor} block leading-tight`}>
                            {feat.metric}
                          </span>
                          <span className={`text-[9px] uppercase tracking-wider font-semibold ${feat.metricLabelColor} block mt-0.5`}>
                            {feat.metricLabel}
                          </span>
                        </div>
                      </div>

                      {/* Title & Description with tight spacing */}
                      <h3 className="text-sm font-serif font-bold text-soft-black tracking-normal mb-1 leading-tight">
                        {feat.title}
                      </h3>
                      <p className="text-[11.5px] text-dark-charcoal/80 font-light leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>

                    {/* Bottom: Thin divider line & clean tag text (No badge box, no count numbers) */}
                    <div className="mt-auto pt-2 border-t border-black/5 flex items-center justify-between text-[10px] font-semibold text-soft-black/80">
                      <span>{feat.tag}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Carousel Navigation Indicators */}
            <div className="mt-5 flex items-center justify-center gap-2">
              {wholesaleFeatures.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveWholesaleIdx(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    activeWholesaleIdx === dotIdx
                      ? 'w-6 h-1 bg-[#131E33]'
                      : 'w-2 h-1 bg-stone-300 hover:bg-stone-400'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>
      {/* HOME — SECTION 3: THE PRODUCT (REDESIGNED: SEPARATE MOBILE & PC VIEWS) */}
      <section className="bg-white overflow-hidden">
        
        {/* ========================================================
            MOBILE VIEW (Modern, Flat, No Outer Shape, No Shadow)
            ======================================================== */}
        <div className="md:hidden px-4 pt-4 pb-12 space-y-4">
          
          {/* 1. Immersive Product Visual Canvas (Exact 1:1, Zero Badges, Zero Text, No Crop, No Shadow) */}
          <div className="relative rounded-2xl overflow-hidden bg-white aspect-square">
            <AnimatePresence mode="wait">
              <motion.img
                key={productColors[selectedColorIdx].id}
                src={productColors[selectedColorIdx].img}
                alt={`AST Macramé Belt in ${productColors[selectedColorIdx].name}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                decoding="async"
                className="w-full h-full object-cover object-center"
              />
            </AnimatePresence>
          </div>

          {/* 2. Product Narrative */}
          <div className="space-y-4">
            <div>
              <div className="mb-1">
                <span className="text-[9.5px] font-semibold uppercase tracking-[0.25em] text-[#131E33] block">
                  Core Accessory
                </span>
              </div>

              <h2 className="text-2xl font-serif font-semibold text-soft-black tracking-tight leading-snug">
                AST Macramé Handmade Belt
              </h2>

              <p className="text-xs text-dark-charcoal/75 font-light leading-relaxed mt-1.5">
                Hand-knotted by master artisans in Chattogram using dense 100% natural cotton cord. Features pin-anywhere open weave with zero fixed holes for millimeter precision comfort.
              </p>
            </div>

            {/* 3. Colorway Selector (Clean, Organic, Zero Shape Holders, Zero Dots, Zero Strokes) */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-soft-black">
                  Color: <span className="font-serif italic font-bold text-terracotta text-sm ml-0.5">{productColors[selectedColorIdx].name}</span>
                </span>
                <span className="text-[10px] font-medium text-dark-charcoal/60 tracking-wider uppercase">
                  5 Shades Available
                </span>
              </div>

              {/* 5 Clean Rectangular Swatches without any background shape holder */}
              <div className="grid grid-cols-5 gap-2">
                {productColors.map((color, idx) => {
                  const isSelected = selectedColorIdx === idx;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColorIdx(idx)}
                      className="flex flex-col items-center gap-1.5 transition-all duration-200 cursor-pointer group"
                      aria-label={`Select ${color.name} color`}
                    >
                      {/* Pure rectangular color block */}
                      <div
                        className={`w-full h-11 rounded-xl transition-all duration-200 ${
                          isSelected
                            ? 'scale-104 brightness-100'
                            : 'opacity-70 group-hover:opacity-100 brightness-95'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className={`text-[10px] tracking-tight transition-colors ${
                        isSelected
                          ? 'font-bold text-soft-black'
                          : 'font-normal text-dark-charcoal/65 group-hover:text-dark-charcoal'
                      }`}>
                        {color.name}
                      </span>
                      {/* Flat active indicator bar (0 strokes, 0 dots) */}
                      <div className={`h-0.5 rounded-full transition-all duration-200 ${
                        isSelected ? 'w-4 bg-soft-black' : 'w-0 opacity-0'
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Action CTAs (Short, Single-line, No Price, No Multi-line break) */}
            <div className="space-y-2 pt-2">
              {/* Primary CTA: Direct Retail Purchase */}
              <Link
                to={`/retail?product=adult&color=${encodeURIComponent(productColors[selectedColorIdx].name.toLowerCase())}`}
                className="w-full bg-soft-black text-white py-3.5 px-5 rounded-xl text-xs font-bold uppercase tracking-[0.16em] hover:bg-[#131E33] active:scale-[0.99] transition-all flex items-center justify-between whitespace-nowrap group"
              >
                <span>Shop Retail</span>
                <ArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>

              {/* Secondary CTA: Wholesale & Bulk Sourcing */}
              <Link
                to="/wholesale"
                className="w-full bg-[#F6F6F7] text-soft-black py-3.5 px-5 rounded-xl text-xs font-bold uppercase tracking-[0.16em] hover:bg-[#EEEEF0] active:scale-[0.99] transition-all flex items-center justify-between whitespace-nowrap group text-left"
              >
                <span>Wholesale &amp; Bulk</span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>
            </div>

          </div>
        </div>

        {/* ========================================================
            PC / DESKTOP VIEW (Luxury Studio Showcase, Separate UI)
            ======================================================== */}
        <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left: Product Visual Stage (No strokes, soft depth) */}
            <div className="col-span-6">
              <div className="relative rounded-3xl overflow-hidden bg-[#F6F6F7] p-4 lg:p-6">
                <div className="relative rounded-2xl overflow-hidden bg-white aspect-square">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={productColors[selectedColorIdx].id}
                      src={productColors[selectedColorIdx].img}
                      alt={`AST Macrame Belt in ${productColors[selectedColorIdx].name}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      decoding="async"
                      className="w-full h-full object-cover object-center"
                    />
                  </AnimatePresence>

                  {/* Minimal Luxury Floating Chip */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-soft-black text-xs font-semibold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full">
                    Hand-Braided Atelier Edition
                  </div>

                  {/* Bottom Color Summary Chip */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-3.5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#131E33] block">
                        Selected Finish
                      </span>
                      <span className="text-sm font-serif font-semibold text-soft-black">
                        {productColors[selectedColorIdx].name} Cord
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-dark-charcoal/70 bg-[#EEEEF0] px-3 py-1 rounded-full">
                      100% Natural Cotton
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Editorial Narrative & Controls */}
            <div className="col-span-6 flex flex-col justify-center space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#131E33] block mb-2">
                  SIGNATURE ACCESSORY
                </span>
                
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-semibold text-soft-black tracking-tight leading-tight mb-3">
                  AST Macramé Handmade Belt
                </h2>
                
                <p className="text-sm lg:text-base text-dark-charcoal/80 font-light leading-relaxed max-w-xl">
                  A specialized macramé belt hand-knotted by Bangladeshi artisans from dense, 100% natural cotton cord and fitted with solid alloy hardware. The open-grid knot architecture allows prong insertion at any point for seamless, micro-adjustable waist comfort.
                </p>
              </div>

              {/* 3 Spec Badges (No strokes, soft capsules) */}
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#F6F6F7] text-[#131E33] text-xs font-semibold px-3.5 py-1.5 rounded-full">
                  100% Cotton Braiding
                </span>
                <span className="bg-[#F6F6F7] text-soft-black text-xs font-semibold px-3.5 py-1.5 rounded-full">
                  Infinite Pin-Anywhere Sizing
                </span>
                <span className="bg-[#F6F6F7] text-soft-black text-xs font-semibold px-3.5 py-1.5 rounded-full">
                  Solid Anti-Rust Alloy
                </span>
              </div>

              {/* Color Selector (ZERO DOTS, ZERO STROKES — Solid Swatches with Centered Name in PC View) */}
              <div className="bg-[#F6F6F7] rounded-2xl p-5 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-soft-black">
                    Available in 5 Colorways
                  </span>
                  <span className="text-sm font-serif italic text-dark-charcoal/70">
                    {productColors[selectedColorIdx].name}
                  </span>
                </div>
                
                {/* 5 Solid Color Swatch Tiles with Name in Center */}
                <div className="grid grid-cols-5 gap-2.5">
                  {productColors.map((color, idx) => {
                    const isSelected = selectedColorIdx === idx;
                    const isLight = color.name === 'Khaki';
                    return (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => setSelectedColorIdx(idx)}
                        className={`h-12 lg:h-13 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer text-center relative ${
                          isSelected
                            ? 'scale-[1.04] opacity-100 z-10'
                            : 'opacity-65 hover:opacity-90 hover:scale-[1.01]'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={`Select ${color.name} colorway`}
                      >
                        <span className={`text-[11px] lg:text-xs tracking-wider uppercase ${
                          isSelected ? 'font-bold' : 'font-medium'
                        } ${
                          isLight ? 'text-soft-black' : 'text-white'
                        }`}>
                          {color.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dual Actions: Retail & Wholesale (Short, Single-line, No Price, No Multi-line break) */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  to={`/retail?product=adult&color=${encodeURIComponent(productColors[selectedColorIdx].name.toLowerCase())}`}
                  className="flex-1 bg-soft-black text-white px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.16em] hover:bg-[#131E33] active:scale-[0.99] transition-all text-center inline-flex items-center justify-center gap-2 whitespace-nowrap group"
                >
                  <span>Shop Retail</span>
                  <ArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/wholesale"
                  className="flex-1 bg-[#F6F6F7] text-soft-black px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.16em] hover:bg-[#EEEEF0] active:scale-[0.99] transition-all text-center inline-flex items-center justify-center gap-2 whitespace-nowrap group"
                >
                  <span>Wholesale &amp; Bulk</span>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Trust Points */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-dark-charcoal/70 pt-1 font-medium">
                <span>Cash on Delivery</span>
                <span className="text-dark-charcoal/30">|</span>
                <span>Open-Box Inspection</span>
                <span className="text-dark-charcoal/30">|</span>
                <span>Nationwide 24 to 48h</span>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* HOME — SECTION 4: DETAIL IS THE PRODUCT */}
      <section className="relative py-20 md:py-32 bg-soft-black text-white overflow-hidden">
        {/* Responsive Background Image (9:16 on Mobile, 16:9 on Desktop) */}
        <picture className="absolute inset-0 w-full h-full">
          <source media="(max-width: 767px)" srcSet={craftsmanshipDetailMobileImg} />
          <img 
            src={craftsmanshipDetailImg} 
            alt="AST Macramé Belt Lifestyle Fit - Hand-Knotted Cotton Macramé Belt on Model" 
            className="w-full h-full object-cover object-center" 
            loading="lazy"
            decoding="async"
          />
        </picture>
        
        {/* 0.5 Dark Contrast Overlay */}
        <div className="absolute inset-0 bg-soft-black/55 md:bg-soft-black/50 backdrop-blur-[1px]" />
        
        {/* Content Over Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-white/70 block mb-2 sm:mb-3">
              MATERIAL & CRAFTSMANSHIP
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-semibold text-white tracking-tight leading-tight mb-2 sm:mb-4">
              Detail is the Product
            </h2>
            <p className="text-xs sm:text-base md:text-lg text-white/85 font-light max-w-xl mx-auto leading-relaxed">
              Every millimeter is knotted by skilled artisans using premium 100% natural cotton cord and solid alloy hardware.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            
            <div className="bg-soft-black/80 backdrop-blur-md p-5 sm:p-6 rounded-2xl flex items-start gap-4 hover:bg-soft-black/95 transition-colors">
              <div className="w-8 h-8 rounded-full bg-white text-soft-black flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-base lg:text-lg font-serif font-semibold text-white mb-1 leading-snug">
                  100% Cotton
                </h4>
                <p className="text-[10.5px] sm:text-xs md:text-sm text-white/75 font-light leading-snug sm:leading-relaxed">
                  Natural, high-density cotton fibers offering soft handfeel with structural durability.
                </p>
              </div>
            </div>

            <div className="bg-soft-black/80 backdrop-blur-md p-5 sm:p-6 rounded-2xl flex items-start gap-4 hover:bg-soft-black/95 transition-colors">
              <div className="w-8 h-8 rounded-full bg-white text-soft-black flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-base lg:text-lg font-serif font-semibold text-white mb-1 leading-snug">
                  Handmade macramé construction
                </h4>
                <p className="text-[10.5px] sm:text-xs md:text-sm text-white/75 font-light leading-snug sm:leading-relaxed">
                  Each individual piece is knotted by skilled artisans in our dedicated workshop in Bangladesh.
                </p>
              </div>
            </div>

            <div className="bg-soft-black/80 backdrop-blur-md p-5 sm:p-6 rounded-2xl flex items-start gap-4 hover:bg-soft-black/95 transition-colors">
              <div className="w-8 h-8 rounded-full bg-white text-soft-black flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-base lg:text-lg font-serif font-semibold text-white mb-1 leading-snug">
                  Metal buckle
                </h4>
                <p className="text-[10.5px] sm:text-xs md:text-sm text-white/75 font-light leading-snug sm:leading-relaxed">
                  Sturdy, corrosion-resistant alloy buckle for effortless and secure fastening.
                </p>
              </div>
            </div>

            <div className="bg-soft-black/80 backdrop-blur-md p-5 sm:p-6 rounded-2xl flex items-start gap-4 hover:bg-soft-black/95 transition-colors">
              <div className="w-8 h-8 rounded-full bg-white text-soft-black flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-base lg:text-lg font-serif font-semibold text-white mb-1 leading-snug">
                  Multiple colour options
                </h4>
                <p className="text-[10.5px] sm:text-xs md:text-sm text-white/75 font-light leading-snug sm:leading-relaxed">
                  5 standard stock colorways + custom Pantone dyeing for brand collections.
                </p>
              </div>
            </div>

            <div className="bg-soft-black/80 backdrop-blur-md p-5 sm:p-6 rounded-2xl flex items-start gap-4 hover:bg-soft-black/95 transition-colors md:col-span-2 lg:col-span-2">
              <div className="w-8 h-8 rounded-full bg-white text-soft-black flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-base lg:text-lg font-serif font-semibold text-white mb-1 leading-snug">
                  Designed for repeat production
                </h4>
                <p className="text-[10.5px] sm:text-xs md:text-sm text-white/75 font-light leading-snug sm:leading-relaxed">
                  Standardized weaving templates and QC ensure exact sizing across every bulk batch.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* HOME — SECTION 5: HOW IT WORKS */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 md:mb-16">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#131E33] block mb-2 sm:mb-3">
              SOURCING WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-semibold text-soft-black tracking-tight leading-tight mb-2 sm:mb-4">
              Four Steps, Start to Finish
            </h2>
            <p className="text-xs sm:text-base text-dark-charcoal/80 font-light max-w-xl mx-auto leading-relaxed">
              Every order is tailored to your brand. Production schedules and shipping timelines are confirmed upfront with your custom quote.
            </p>
          </div>

          {/* 2-column & 2-row on mobile, 4-column on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-6">
            
            {/* Step 1 */}
            <div className="bg-[#F6F6F7] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-7 flex flex-col items-center text-center hover:bg-[#EEEEF0] transition-all duration-300 group">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-soft-black text-white flex items-center justify-center font-serif font-bold text-xs sm:text-base mb-2.5 sm:mb-4 group-hover:bg-[#131E33] transition-colors duration-300 shrink-0">
                1
              </div>
              <h3 className="text-xs sm:text-base lg:text-lg font-serif font-semibold text-soft-black tracking-normal mb-1 sm:mb-2 leading-tight">
                Share Your Vision
              </h3>
              <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/75 font-light leading-snug sm:leading-relaxed">
                Tell us your idea — custom cord colours, buckle finish, private branding, and target quantity.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#F6F6F7] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-7 flex flex-col items-center text-center hover:bg-[#EEEEF0] transition-all duration-300 group">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-soft-black text-white flex items-center justify-center font-serif font-bold text-xs sm:text-base mb-2.5 sm:mb-4 group-hover:bg-[#131E33] transition-colors duration-300 shrink-0">
                2
              </div>
              <h3 className="text-xs sm:text-base lg:text-lg font-serif font-semibold text-soft-black tracking-normal mb-1 sm:mb-2 leading-tight">
                Receive a Quote
              </h3>
              <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/75 font-light leading-snug sm:leading-relaxed">
                We confirm exact unit manufacturing costs, sample development fees, and global express shipping options.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F6F6F7] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-7 flex flex-col items-center text-center hover:bg-[#EEEEF0] transition-all duration-300 group">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-soft-black text-white flex items-center justify-center font-serif font-bold text-xs sm:text-base mb-2.5 sm:mb-4 group-hover:bg-[#131E33] transition-colors duration-300 shrink-0">
                3
              </div>
              <h3 className="text-xs sm:text-base lg:text-lg font-serif font-semibold text-soft-black tracking-normal mb-1 sm:mb-2 leading-tight">
                Sample Approval
              </h3>
              <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/75 font-light leading-snug sm:leading-relaxed">
                Our artisans handcraft a master physical sample for your touch, feel, and quality sign-off before bulk run.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#F6F6F7] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-7 flex flex-col items-center text-center hover:bg-[#EEEEF0] transition-all duration-300 group">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-soft-black text-white flex items-center justify-center font-serif font-bold text-xs sm:text-base mb-2.5 sm:mb-4 group-hover:bg-[#131E33] transition-colors duration-300 shrink-0">
                4
              </div>
              <h3 className="text-xs sm:text-base lg:text-lg font-serif font-semibold text-soft-black tracking-normal mb-1 sm:mb-2 leading-tight">
                Production &amp; Dispatch
              </h3>
              <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/75 font-light leading-snug sm:leading-relaxed">
                Bulk hand-weaving commences under strict piece-by-piece QC and export packaging to your destination.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* HOME — SECTION 6: BUILT FOR BRANDS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 md:mb-16">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-terracotta block mb-2 sm:mb-3">
              B2B PARTNERSHIP
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-semibold text-soft-black tracking-tight leading-tight mb-2 sm:mb-4">
              Built for Brands
            </h2>
            <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light max-w-xl mx-auto leading-relaxed">
              Tailored manufacturing solutions designed specifically for fashion labels, boutique owners, and global distributors.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            
            {/* 1. Wholesale */}
            <div className="bg-[#F6F6F7] rounded-xl sm:rounded-2xl overflow-hidden flex flex-col hover:bg-[#EEEEF0] transition-all duration-300 group">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone/10">
                <img 
                  src={b2bWholesaleImg} 
                  alt="Wholesale macrame belts production" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-3 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xs sm:text-base lg:text-lg font-serif font-semibold text-soft-black tracking-normal mb-1 sm:mb-2 leading-tight">
                    Wholesale
                  </h3>
                  <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/75 font-light leading-snug sm:leading-relaxed">
                    Bulk production for retailers and fashion brands with tiered volume pricing.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Private Label */}
            <div className="bg-[#F6F6F7] rounded-xl sm:rounded-2xl overflow-hidden flex flex-col hover:bg-[#EEEEF0] transition-all duration-300 group">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone/10">
                <img 
                  src={b2bPrivateLabelImg} 
                  alt="Private label macrame belt custom branding" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-3 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xs sm:text-base lg:text-lg font-serif font-semibold text-soft-black tracking-normal mb-1 sm:mb-2 leading-tight">
                    Private Label
                  </h3>
                  <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/75 font-light leading-snug sm:leading-relaxed">
                    Custom woven labels, branded hangtags, and packaging on every piece.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Custom Colours */}
            <div className="bg-[#F6F6F7] rounded-xl sm:rounded-2xl overflow-hidden flex flex-col hover:bg-[#EEEEF0] transition-all duration-300 group">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone/10">
                <img 
                  src={b2bCustomColoursImg} 
                  alt="Custom colours and Pantone yarn development" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-3 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xs sm:text-base lg:text-lg font-serif font-semibold text-soft-black tracking-normal mb-1 sm:mb-2 leading-tight">
                    Custom Colours
                  </h3>
                  <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/75 font-light leading-snug sm:leading-relaxed">
                    Bespoke colourways according to buyer requirements and seasonal Pantone swatches.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Repeat Orders */}
            <div className="bg-[#F6F6F7] rounded-xl sm:rounded-2xl overflow-hidden flex flex-col hover:bg-[#EEEEF0] transition-all duration-300 group">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone/10">
                <img 
                  src={b2bRepeatOrdersImg} 
                  alt="Repeat orders and batch production quality control" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-3 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xs sm:text-base lg:text-lg font-serif font-semibold text-soft-black tracking-normal mb-1 sm:mb-2 leading-tight">
                    Repeat Orders
                  </h3>
                  <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/75 font-light leading-snug sm:leading-relaxed">
                    Archived specs and yarn records for consistent, effortless reordering.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* HOME — SECTION 7: HAVE A REFERENCE IMAGE? */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-terracotta block mb-2 sm:mb-3">
            HAVE A REFERENCE IMAGE?
          </span>
          
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-semibold text-soft-black tracking-tight leading-tight mb-2 sm:mb-4">
            Send Your Idea.<br className="hidden sm:inline" /> We'll Map Out the Next Step.
          </h2>
          
          <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            A sketch, product link, or photo is enough to start. We will review the details and outline the next step.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-center">
            <a 
              href="https://wa.me/8801940689061?text=Hi%20AST%20Macrame,%20I%20have%20a%20reference%20image%20/%20custom%20design%20idea%20to%20discuss."
              target="_blank"
              rel="noreferrer"
              className="relative overflow-hidden group w-full sm:w-auto bg-soft-black text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-[#131E33] hover:text-white hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-300 inline-flex items-center justify-center gap-2.5"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              <WhatsAppIcon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 relative z-10" />
              <span className="relative z-10 transition-all duration-300 group-hover:tracking-[0.24em]">CHAT ON WHATSAPP</span>
            </a>
            
            <a 
              href="mailto:astmacrame@gmail.com?subject=Custom%20Macrame%20Design%20/%20Reference%20Inquiry"
              className="relative overflow-hidden group w-full sm:w-auto bg-[#F6F6F7] hover:bg-[#EEEEF0] text-soft-black px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-300 inline-flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Mail className="w-4 h-4 transition-all duration-300 group-hover:scale-110 relative z-10" />
              <span className="relative z-10 transition-all duration-300 group-hover:tracking-[0.24em]">SEND VIA EMAIL</span>
            </a>
          </div>
        </div>
      </section>

      {/* HOME — SECTION 8: QUICK ANSWERS (FAQ ACCORDION) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#131E33] block mb-2 sm:mb-3">
              GOT QUESTIONS?
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-semibold text-soft-black tracking-tight leading-tight mb-2 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light max-w-xl mx-auto leading-relaxed">
              Find quick answers to common questions about sample orders, wholesale minimums, lead times, and global delivery.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-2.5">
            {quickFaqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="transition-colors">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-5 sm:py-6 flex items-center justify-between text-left group cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg md:text-xl font-serif font-medium text-soft-black group-hover:text-[#131E33] transition-colors pr-6">
                      {faq.q}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#F6F6F7] flex items-center justify-center text-soft-black group-hover:bg-[#131E33] group-hover:text-white transition-colors shrink-0">
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs sm:text-sm md:text-base text-dark-charcoal/80 font-light leading-relaxed pb-5 sm:pb-6 pr-6 sm:pr-10">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <Link 
              to="/faq" 
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#131E33] hover:text-soft-black transition-colors"
            >
              <span>View Full FAQ & Sizing Guide</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* HOME — SECTION 9: READY TO SOURCE? */}
      <section className="py-20 md:py-32 bg-[#131E33] text-white px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-white/70 mb-2 sm:mb-3 block">
            START YOUR PARTNERSHIP
          </span>
          
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-semibold text-white tracking-tight leading-tight mb-2 sm:mb-4">
            Ready to Source AST?
          </h2>
          
          <p className="text-xs sm:text-base md:text-lg text-white/80 font-light mb-8 sm:mb-12 max-w-xl mx-auto leading-relaxed">
            Request a sample or discuss your wholesale requirement with our production team.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-sm sm:max-w-none mx-auto w-full">
            <Link 
              to="/sample-order" 
              className="relative overflow-hidden group w-full sm:w-auto bg-white text-soft-black px-6 sm:px-10 py-3.5 sm:py-4.5 text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] rounded-xl hover:bg-stone-100 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-300 text-center whitespace-nowrap"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              <span className="relative z-10 transition-all duration-300 group-hover:tracking-[0.22em]">REQUEST A SAMPLE</span>
            </Link>
            
            <Link 
              to="/sample-wholesale" 
              className="relative overflow-hidden group w-full sm:w-auto bg-white/10 text-white px-6 sm:px-10 py-3.5 sm:py-4.5 text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] rounded-xl hover:bg-white hover:text-soft-black hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-300 text-center whitespace-nowrap"
            >
              <span className="relative z-10 transition-all duration-300 group-hover:tracking-[0.22em]">WHOLESALE QUOTE</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
