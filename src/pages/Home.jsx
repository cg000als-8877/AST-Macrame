import React, { useState, useEffect } from 'react';
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
  Minus
} from 'lucide-react';

import mobileHeroImage from '../assets/mobile_hero.jpg';
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
    title: 'LOW MOQ',
    metric: '100',
    metricLabel: 'Base MOQ',
    desc: 'Start your first production run with accessible minimums.',
    tag: 'Flexible MOQ',
    icon: Package,
    bg: 'bg-[#FAF7F2]',
    border: 'border-[#E8E0D2]',
    iconBg: 'bg-soft-black text-cream',
    metricColor: 'text-soft-black',
    metricLabelColor: 'text-dark-charcoal/50',
    tagDot: 'bg-emerald-600',
  },
  {
    id: 'sample',
    title: 'SAMPLE FIRST',
    metric: '5–7d',
    metricLabel: 'Sample Time',
    desc: 'Approve product & weave quality before bulk production.',
    tag: 'Sample Dispatch',
    icon: ShieldCheck,
    bg: 'bg-[#FAF2EE]',
    border: 'border-[#ECDAD0]',
    iconBg: 'bg-terracotta text-cream',
    metricColor: 'text-terracotta',
    metricLabelColor: 'text-terracotta/70',
    tagDot: 'bg-emerald-600',
  },
  {
    id: 'custom',
    title: 'CUSTOM READY',
    metric: '25–35d',
    metricLabel: 'Production',
    desc: 'Bespoke colours, branding & packaging available.',
    tag: 'Private Label',
    icon: Palette,
    bg: 'bg-[#F1F5F2]',
    border: 'border-[#D7E2D8]',
    iconBg: 'bg-[#2D3A30] text-cream',
    metricColor: 'text-[#2D3A30]',
    metricLabelColor: 'text-[#2D3A30]/70',
    tagDot: 'bg-emerald-600',
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
      a: "Physical sample preparation typically takes 5–7 business days. Bulk wholesale production generally requires 25–35 days depending on the batch volume, custom dyeing, and branded packaging specifications."
    },
    {
      q: "How does shipping work?",
      a: "We ship internationally via DHL/FedEx Express Air for fast door-to-door delivery or sea freight for volume cargo. Inside Bangladesh, reliable doorstep courier delivers within 24–48 hours across Dhaka/Chittagong and 2–4 days nationwide."
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
    <div className="w-full bg-cream text-soft-black font-sans selection:bg-terracotta selection:text-white">

      {/* HOME — SECTION 1: HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-soft-black">
        <div className="w-full aspect-[2/3] md:aspect-[21/9] md:h-auto overflow-hidden bg-stone/20">
          <img 
            src="/hero.jpg" 
            alt="AST Handmade Macramé Belts" 
            className="hidden md:block w-full h-full object-cover object-center scale-[1.05] translate-y-[-2%]"
          />
          <img 
            src={mobileHeroImage} 
            alt="AST Handmade Macramé Belts Mobile" 
            className="block md:hidden w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-soft-black/45 pointer-events-none" />
        
        <div className="absolute inset-0 z-10 flex flex-col justify-end items-center md:items-start text-center md:text-left px-6 md:px-12 lg:px-20 pb-12 md:pb-16 lg:pb-24 pt-32">
          <div className="max-w-4xl md:max-w-2xl w-full">
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold uppercase text-cream tracking-tight leading-tight mb-3 md:mb-4"
            >
              CRAFTED FOR <br className="hidden md:block"/>
              THE EXTRAORDINARY
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xs sm:text-base md:text-lg text-cream/90 font-light leading-relaxed mb-8 md:mb-10 max-w-[95%] md:max-w-xl mx-auto md:mx-0"
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
                className="bg-cream text-soft-black px-8 py-3.5 md:px-9 md:py-4 text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-warm-sand transition-all shadow-md hover:shadow-xl inline-block"
              >
                REQUEST A SAMPLE
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOME — SECTION 2: MADE FOR WHOLESALE */}
      <section className="py-16 md:py-24 bg-white border-b border-stone/15 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-terracotta block mb-2 sm:mb-3">
              SUPPLY CHAIN & PRODUCTION
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold uppercase text-soft-black tracking-tight leading-tight">
              MADE FOR WHOLESALE
            </h2>
          </div>

          {/* DESKTOP VIEW (3-Column Grid) */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {wholesaleFeatures.map((feat) => {
              const IconComponent = feat.icon;
              return (
                <div 
                  key={feat.id}
                  className={`${feat.bg} ${feat.border} border rounded-2xl p-6 md:p-8 lg:p-10 flex flex-col justify-between hover:border-soft-black/40 hover:shadow-lg transition-all duration-300`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${feat.iconBg} flex items-center justify-center shadow-sm`}>
                        <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div className="text-right">
                        <span className={`text-lg md:text-2xl font-serif font-bold ${feat.metricColor} block leading-none`}>
                          {feat.metric}
                        </span>
                        <span className={`text-[10px] uppercase tracking-wider font-semibold ${feat.metricLabelColor} block mt-0.5`}>
                          {feat.metricLabel}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-base lg:text-lg font-serif font-bold text-soft-black uppercase tracking-wide mb-2 leading-tight">
                      {feat.title}
                    </h3>
                    <p className="text-xs md:text-sm text-dark-charcoal/80 font-light leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-stone/15 flex items-center gap-2 text-xs font-semibold text-soft-black">
                    <span className={`w-1.5 h-1.5 rounded-full ${feat.tagDot} flex-shrink-0`}></span>
                    <span className="truncate">{feat.tag}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MOBILE VIEW (Cover Flow: 1 Forward Center, 2 Backward on Left & Right Sides) */}
          <div className="block sm:hidden relative px-1 py-4 overflow-hidden">
            {/* Stage Container */}
            <div className="relative w-full h-[225px] flex items-center justify-center">
              {wholesaleFeatures.map((feat, index) => {
                // Calculate position relative to active card
                // 0 = Center Forward, 1 = Right Side Backward, 2 = Left Side Backward
                const diff = (index - activeWholesaleIdx + wholesaleFeatures.length) % wholesaleFeatures.length;
                const IconComponent = feat.icon;

                // Cover Flow depth and position variants
                const coverFlowVariants = {
                  0: {
                    x: "0%",
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    zIndex: 30,
                    opacity: 1,
                    filter: 'brightness(1)',
                    boxShadow: '0 20px 35px -10px rgba(0,0,0,0.13), 0 8px 16px -4px rgba(0,0,0,0.06)'
                  },
                  1: {
                    x: "46%",
                    y: 4,
                    scale: 0.82,
                    rotate: 3.5,
                    zIndex: 10,
                    opacity: 0.6,
                    filter: 'brightness(0.95)',
                    boxShadow: '0 8px 18px -6px rgba(0,0,0,0.08)'
                  },
                  2: {
                    x: "-46%",
                    y: 4,
                    scale: 0.82,
                    rotate: -3.5,
                    zIndex: 10,
                    opacity: 0.6,
                    filter: 'brightness(0.95)',
                    boxShadow: '0 8px 18px -6px rgba(0,0,0,0.08)'
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
                    className={`absolute w-[76vw] max-w-[280px] h-full ${feat.bg} ${feat.border} border rounded-2xl p-5 flex flex-col justify-between select-none cursor-grab active:cursor-grabbing`}
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
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-9 h-9 rounded-xl ${feat.iconBg} flex items-center justify-center shadow-sm`}>
                          <IconComponent className="w-4.5 h-4.5" />
                        </div>
                        <div className="text-right">
                          <span className={`text-xl font-serif font-bold ${feat.metricColor} block leading-none`}>
                            {feat.metric}
                          </span>
                          <span className={`text-[9px] uppercase tracking-wider font-semibold ${feat.metricLabelColor} block mt-0.5`}>
                            {feat.metricLabel}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-sm font-serif font-bold text-soft-black uppercase tracking-wide mb-1 leading-tight">
                        {feat.title}
                      </h3>
                      <p className="text-[11.5px] text-dark-charcoal/80 font-light leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-stone/15 flex items-center justify-between text-[10px] font-semibold text-soft-black">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${feat.tagDot} flex-shrink-0`}></span>
                        <span className="truncate">{feat.tag}</span>
                      </div>
                      <span className="text-[9px] font-sans font-medium text-dark-charcoal/40 uppercase tracking-wider">
                        {index + 1} / {wholesaleFeatures.length}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Carousel Navigation Dots */}
            <div className="mt-5 flex items-center justify-center gap-2">
              {wholesaleFeatures.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveWholesaleIdx(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    activeWholesaleIdx === dotIdx
                      ? 'w-6 h-1.5 bg-terracotta'
                      : 'w-1.5 h-1.5 bg-stone/40 hover:bg-stone/60'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>
      {/* HOME — SECTION 3: THE PRODUCT */}
      <section className="py-16 md:py-24 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden bg-white border border-stone/20 aspect-square">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={productColors[selectedColorIdx].id}
                    src={productColors[selectedColorIdx].img}
                    alt={`AST Macrame Belt in ${productColors[selectedColorIdx].name}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full object-cover object-center"
                  />
                </AnimatePresence>
                
                <div className="absolute top-4 left-4 bg-gradient-to-r from-[#DFB76C] via-[#F6E7BE] to-[#C99A45] text-soft-black text-[10px] sm:text-[11px] font-sans font-extrabold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-[#F6E7BE]/80">
                  <Sparkles className="w-3.5 h-3.5 text-soft-black" />
                  <span>PREMIUM</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-terracotta block mb-2 sm:mb-3">
                CORE ACCESSORY
              </span>
              
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold uppercase text-soft-black tracking-tight leading-tight mb-2 sm:mb-3">
                AST MACRAMÉ HANDMADE BELT
              </h2>
              
              <div className="inline-flex items-center gap-2 bg-soft-black text-cream px-3 py-1 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                100% Cotton
              </div>

              <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light leading-relaxed mb-6 sm:mb-8">
                A handcrafted macramé belt developed for fashion brands, boutiques and wholesale buyers.
              </p>

              <div className="mb-8 pt-4 border-t border-stone/25">
                <span className="block text-xs font-bold uppercase tracking-wider text-soft-black mb-4">
                  Available in 5 colours: <span className="font-serif italic text-dark-charcoal/70 normal-case">{productColors[selectedColorIdx].name}</span>
                </span>
                
                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                  {productColors.map((color, idx) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`flex flex-col items-center p-2 rounded-xl border transition-all duration-200 cursor-pointer ${
                        selectedColorIdx === idx 
                          ? 'border-soft-black bg-white shadow-xs' 
                          : 'border-stone/25 bg-white/40 hover:bg-white hover:border-stone/40'
                      }`}
                    >
                      <div 
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mb-1.5 border border-stone/20" 
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase text-dark-charcoal font-semibold truncate w-full text-center">
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Link 
                to="/sample-order" 
                className="bg-soft-black text-cream px-8 py-4 sm:py-4.5 text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-dark-charcoal transition-all text-center inline-flex items-center justify-center gap-2 group"
              >
                <span>VIEW PRODUCT DETAILS</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* HOME — SECTION 4: DETAIL IS THE PRODUCT */}
      <section className="relative py-20 md:py-32 bg-soft-black text-cream overflow-hidden">
        {/* Responsive Background Image (9:16 on Mobile, 16:9 on Desktop) */}
        <picture className="absolute inset-0 w-full h-full">
          <source media="(max-width: 767px)" srcSet={craftsmanshipDetailMobileImg} />
          <img 
            src={craftsmanshipDetailImg} 
            alt="Detail is the Product - Macrame Close-up Knot and Brass Hardware" 
            className="w-full h-full object-cover object-center" 
          />
        </picture>
        
        {/* 0.5 Dark Contrast Overlay */}
        <div className="absolute inset-0 bg-soft-black/55 md:bg-soft-black/50 backdrop-blur-[1px]" />
        
        {/* Content Over Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-warm-sand block mb-2 sm:mb-3">
              MATERIAL & CRAFTSMANSHIP
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold uppercase text-white tracking-tight leading-tight mb-2 sm:mb-4">
              DETAIL IS THE PRODUCT
            </h2>
            <p className="text-xs sm:text-base md:text-lg text-cream/85 font-light max-w-xl mx-auto leading-relaxed">
              Every millimeter is knotted by skilled artisans using premium 100% natural cotton cord and solid alloy hardware.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            
            <div className="bg-soft-black/70 backdrop-blur-md border border-white/20 p-5 sm:p-6 rounded-2xl flex items-start gap-4 hover:border-warm-sand/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-warm-sand text-soft-black flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-base lg:text-lg font-serif font-bold uppercase text-white mb-1 leading-snug">
                  100% Cotton
                </h4>
                <p className="text-[10.5px] sm:text-xs md:text-sm text-cream/75 font-light leading-snug sm:leading-relaxed">
                  Natural, high-density cotton fibers offering soft handfeel with structural durability.
                </p>
              </div>
            </div>

            <div className="bg-soft-black/70 backdrop-blur-md border border-white/20 p-5 sm:p-6 rounded-2xl flex items-start gap-4 hover:border-warm-sand/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-warm-sand text-soft-black flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-base lg:text-lg font-serif font-bold uppercase text-white mb-1 leading-snug">
                  Handmade macramé construction
                </h4>
                <p className="text-[10.5px] sm:text-xs md:text-sm text-cream/75 font-light leading-snug sm:leading-relaxed">
                  Each individual piece is knotted by skilled artisans in our dedicated workshop in Bangladesh.
                </p>
              </div>
            </div>

            <div className="bg-soft-black/70 backdrop-blur-md border border-white/20 p-5 sm:p-6 rounded-2xl flex items-start gap-4 hover:border-warm-sand/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-warm-sand text-soft-black flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-base lg:text-lg font-serif font-bold uppercase text-white mb-1 leading-snug">
                  Metal buckle
                </h4>
                <p className="text-[10.5px] sm:text-xs md:text-sm text-cream/75 font-light leading-snug sm:leading-relaxed">
                  Sturdy, corrosion-resistant alloy buckle for effortless and secure fastening.
                </p>
              </div>
            </div>

            <div className="bg-soft-black/70 backdrop-blur-md border border-white/20 p-5 sm:p-6 rounded-2xl flex items-start gap-4 hover:border-warm-sand/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-warm-sand text-soft-black flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-base lg:text-lg font-serif font-bold uppercase text-white mb-1 leading-snug">
                  Multiple colour options
                </h4>
                <p className="text-[10.5px] sm:text-xs md:text-sm text-cream/75 font-light leading-snug sm:leading-relaxed">
                  5 standard stock colorways + custom Pantone dyeing for brand collections.
                </p>
              </div>
            </div>

            <div className="bg-soft-black/70 backdrop-blur-md border border-white/20 p-5 sm:p-6 rounded-2xl flex items-start gap-4 hover:border-warm-sand/50 transition-colors md:col-span-2 lg:col-span-2">
              <div className="w-8 h-8 rounded-full bg-warm-sand text-soft-black flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-base lg:text-lg font-serif font-bold uppercase text-white mb-1 leading-snug">
                  Designed for repeat production
                </h4>
                <p className="text-[10.5px] sm:text-xs md:text-sm text-cream/75 font-light leading-snug sm:leading-relaxed">
                  Standardized weaving templates and QC ensure exact sizing across every bulk batch.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* HOME — SECTION 5: HOW IT WORKS */}
      <section className="py-12 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 md:mb-16">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-terracotta block mb-2 sm:mb-3">
              SOURCING WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold uppercase text-soft-black tracking-tight leading-tight mb-2 sm:mb-4">
              4 STEPS, START TO FINISH
            </h2>
            <p className="text-xs sm:text-base text-dark-charcoal/80 font-light max-w-xl mx-auto leading-relaxed">
              Every order is tailored to your brand. Production schedules and shipping timelines are confirmed upfront with your custom quote.
            </p>
          </div>

          {/* 2-column & 2-row on mobile, 4-column on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-6">
            
            {/* Step 1 */}
            <div className="bg-[#FAF7F2] border border-[#E8E0D2] rounded-xl sm:rounded-2xl p-3.5 sm:p-6 lg:p-7 flex flex-col items-center text-center hover:border-soft-black/40 hover:shadow-md transition-all duration-300 group">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-soft-black text-cream flex items-center justify-center font-serif font-bold text-xs sm:text-base mb-2.5 sm:mb-4 shadow-sm group-hover:bg-terracotta transition-colors duration-300 shrink-0">
                1
              </div>
              <h3 className="text-xs sm:text-base lg:text-lg font-serif font-bold text-soft-black uppercase tracking-wide mb-1 sm:mb-2 leading-tight">
                SHARE YOUR VISION
              </h3>
              <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/75 font-light leading-snug sm:leading-relaxed">
                Tell us your idea — custom cord colours, buckle finish, private branding, and target quantity.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FAF7F2] border border-[#E8E0D2] rounded-xl sm:rounded-2xl p-3.5 sm:p-6 lg:p-7 flex flex-col items-center text-center hover:border-soft-black/40 hover:shadow-md transition-all duration-300 group">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-soft-black text-cream flex items-center justify-center font-serif font-bold text-xs sm:text-base mb-2.5 sm:mb-4 shadow-sm group-hover:bg-terracotta transition-colors duration-300 shrink-0">
                2
              </div>
              <h3 className="text-xs sm:text-base lg:text-lg font-serif font-bold text-soft-black uppercase tracking-wide mb-1 sm:mb-2 leading-tight">
                RECEIVE A QUOTE
              </h3>
              <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/75 font-light leading-snug sm:leading-relaxed">
                We confirm exact unit manufacturing costs, sample development fees, and global express shipping options.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FAF7F2] border border-[#E8E0D2] rounded-xl sm:rounded-2xl p-3.5 sm:p-6 lg:p-7 flex flex-col items-center text-center hover:border-soft-black/40 hover:shadow-md transition-all duration-300 group">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-soft-black text-cream flex items-center justify-center font-serif font-bold text-xs sm:text-base mb-2.5 sm:mb-4 shadow-sm group-hover:bg-terracotta transition-colors duration-300 shrink-0">
                3
              </div>
              <h3 className="text-xs sm:text-base lg:text-lg font-serif font-bold text-soft-black uppercase tracking-wide mb-1 sm:mb-2 leading-tight">
                SAMPLE APPROVAL
              </h3>
              <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/75 font-light leading-snug sm:leading-relaxed">
                Our artisans handcraft a master physical sample for your touch, feel, and quality sign-off before bulk run.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#FAF7F2] border border-[#E8E0D2] rounded-xl sm:rounded-2xl p-3.5 sm:p-6 lg:p-7 flex flex-col items-center text-center hover:border-soft-black/40 hover:shadow-md transition-all duration-300 group">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-soft-black text-cream flex items-center justify-center font-serif font-bold text-xs sm:text-base mb-2.5 sm:mb-4 shadow-sm group-hover:bg-terracotta transition-colors duration-300 shrink-0">
                4
              </div>
              <h3 className="text-xs sm:text-base lg:text-lg font-serif font-bold text-soft-black uppercase tracking-wide mb-1 sm:mb-2 leading-tight">
                PRODUCTION & DISPATCH
              </h3>
              <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/75 font-light leading-snug sm:leading-relaxed">
                Bulk hand-weaving commences under strict piece-by-piece QC and export packaging to your destination.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* HOME — SECTION 6: BUILT FOR BRANDS */}
      <section className="py-16 md:py-24 bg-white border-y border-stone/15">
        <div className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 md:mb-16">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-terracotta block mb-2 sm:mb-3">
              B2B PARTNERSHIP
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold uppercase text-soft-black tracking-tight leading-tight mb-2 sm:mb-4">
              BUILT FOR BRANDS
            </h2>
            <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light max-w-xl mx-auto leading-relaxed">
              Tailored manufacturing solutions designed specifically for fashion labels, boutique owners, and global distributors.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            
            {/* 1. Wholesale */}
            <div className="bg-cream/30 border border-stone/20 rounded-xl sm:rounded-2xl overflow-hidden flex flex-col hover:border-soft-black/40 hover:bg-cream/60 transition-colors duration-300 group">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone/10">
                <img 
                  src={b2bWholesaleImg} 
                  alt="Wholesale macrame belts production" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-soft-black/80 backdrop-blur-sm text-cream flex items-center justify-center">
                  <Factory className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
              <div className="p-3 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xs sm:text-base lg:text-lg font-serif font-bold text-soft-black uppercase tracking-wide mb-1 sm:mb-2 leading-tight">
                    Wholesale
                  </h3>
                  <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/75 font-light leading-snug sm:leading-relaxed">
                    Bulk production for retailers and fashion brands with tiered volume pricing.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Private Label */}
            <div className="bg-cream/30 border border-stone/20 rounded-xl sm:rounded-2xl overflow-hidden flex flex-col hover:border-soft-black/40 hover:bg-cream/60 transition-colors duration-300 group">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone/10">
                <img 
                  src={b2bPrivateLabelImg} 
                  alt="Private label macrame belt custom branding" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-soft-black/80 backdrop-blur-sm text-cream flex items-center justify-center">
                  <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
              <div className="p-3 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xs sm:text-base lg:text-lg font-serif font-bold text-soft-black uppercase tracking-wide mb-1 sm:mb-2 leading-tight">
                    Private Label
                  </h3>
                  <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/75 font-light leading-snug sm:leading-relaxed">
                    Custom woven labels, branded hangtags, and packaging on every piece.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Custom Colours */}
            <div className="bg-cream/30 border border-stone/20 rounded-xl sm:rounded-2xl overflow-hidden flex flex-col hover:border-soft-black/40 hover:bg-cream/60 transition-colors duration-300 group">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone/10">
                <img 
                  src={b2bCustomColoursImg} 
                  alt="Custom colours and Pantone yarn development" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-soft-black/80 backdrop-blur-sm text-cream flex items-center justify-center">
                  <Palette className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
              <div className="p-3 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xs sm:text-base lg:text-lg font-serif font-bold text-soft-black uppercase tracking-wide mb-1 sm:mb-2 leading-tight">
                    Custom Colours
                  </h3>
                  <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/75 font-light leading-snug sm:leading-relaxed">
                    Bespoke colourways according to buyer requirements and seasonal Pantone swatches.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Repeat Orders */}
            <div className="bg-cream/30 border border-stone/20 rounded-xl sm:rounded-2xl overflow-hidden flex flex-col hover:border-soft-black/40 hover:bg-cream/60 transition-colors duration-300 group">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone/10">
                <img 
                  src={b2bRepeatOrdersImg} 
                  alt="Repeat orders and batch production quality control" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-soft-black/80 backdrop-blur-sm text-cream flex items-center justify-center">
                  <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
              <div className="p-3 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xs sm:text-base lg:text-lg font-serif font-bold text-soft-black uppercase tracking-wide mb-1 sm:mb-2 leading-tight">
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
      <section className="py-16 md:py-24 bg-cream border-t border-stone/15">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-terracotta block mb-2 sm:mb-3">
            HAVE A REFERENCE IMAGE?
          </span>
          
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold uppercase text-soft-black tracking-tight leading-tight mb-2 sm:mb-4">
            SEND YOUR IDEA.<br className="hidden sm:inline" /> WE'LL MAP OUT THE NEXT STEP.
          </h2>
          
          <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            A sketch, product link, or photo is enough to start. We will review the details and outline the next step.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-center">
            <a 
              href="https://wa.me/8801940689061?text=Hi%20AST%20Macrame,%20I%20have%20a%20reference%20image%20/%20custom%20design%20idea%20to%20discuss."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-soft-black text-cream px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-dark-charcoal hover:text-white transition-all shadow-md hover:shadow-xl inline-flex items-center justify-center gap-2.5 group"
            >
              <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>CHAT ON WHATSAPP</span>
            </a>
            
            <a 
              href="mailto:astmacrame@gmail.com?subject=Custom%20Macrame%20Design%20/%20Reference%20Inquiry"
              className="w-full sm:w-auto bg-transparent border border-soft-black/30 text-soft-black px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-soft-black hover:text-cream hover:border-soft-black transition-all inline-flex items-center justify-center gap-2.5 group"
            >
              <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>SEND VIA EMAIL</span>
            </a>
          </div>
        </div>
      </section>

      {/* HOME — SECTION 8: QUICK ANSWERS (FAQ ACCORDION) */}
      <section className="py-16 md:py-24 bg-white border-t border-stone/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-terracotta block mb-2 sm:mb-3">
              GOT QUESTIONS?
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold uppercase text-soft-black tracking-tight leading-tight mb-2 sm:mb-4">
              QUICK ANSWERS
            </h2>
            <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light max-w-xl mx-auto leading-relaxed">
              Find quick answers to common questions about sample orders, wholesale minimums, lead times, and global delivery.
            </p>
          </div>

          <div className="max-w-3xl mx-auto border-t border-stone/20 divide-y divide-stone/20">
            {quickFaqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="transition-colors">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-5 sm:py-6 flex items-center justify-between text-left group cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg md:text-xl font-serif font-medium text-soft-black group-hover:text-terracotta transition-colors pr-6">
                      {faq.q}
                    </span>
                    <span className="w-8 h-8 rounded-full border border-stone/25 flex items-center justify-center text-soft-black group-hover:border-terracotta group-hover:text-terracotta transition-colors shrink-0">
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
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-terracotta hover:text-soft-black transition-colors"
            >
              <span>View Full FAQ & Sizing Guide</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* HOME — SECTION 9: READY TO SOURCE? */}
      <section className="py-20 md:py-32 bg-[#131E33] text-cream px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-warm-sand mb-2 sm:mb-3 block">
            START YOUR PARTNERSHIP
          </span>
          
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold uppercase text-cream tracking-tight leading-tight mb-2 sm:mb-4">
            READY TO SOURCE AST?
          </h2>
          
          <p className="text-xs sm:text-base md:text-lg text-cream/80 font-light mb-8 sm:mb-12 max-w-xl mx-auto leading-relaxed">
            Request a sample or discuss your wholesale requirement with our production team.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/sample-order" 
              className="w-full sm:w-auto bg-cream text-soft-black px-10 py-4.5 text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-warm-sand transition-all shadow-xl hover:shadow-2xl text-center"
            >
              REQUEST A SAMPLE
            </Link>
            
            <Link 
              to="/sample-wholesale" 
              className="w-full sm:w-auto bg-transparent border border-cream/40 text-cream px-10 py-4.5 text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-cream/10 hover:border-cream transition-all text-center"
            >
              REQUEST A WHOLESALE QUOTE
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
