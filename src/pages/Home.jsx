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
  Sparkles
} from 'lucide-react';

import mobileHeroImage from '../assets/mobile_hero.jpg';
import comparisonDetailImg from '../assets/editorial/comparison_detail.jpg';
import craftsmanshipDetailImg from '../assets/editorial/craftsmanship_detail.jpg';

import hgBlack from '../assets/homepage-gallery/Black.webp';
import hgNavy from '../assets/homepage-gallery/Navy.webp';
import hgBrown from '../assets/homepage-gallery/Brown.webp';
import hgMaroon from '../assets/homepage-gallery/Maroon.webp';
import hgKhaki from '../assets/homepage-gallery/khaki2.webp';

import b2bWholesaleImg from '../assets/b2b/wholesale_production.jpg';
import b2bPrivateLabelImg from '../assets/b2b/private_label.jpg';
import b2bCustomColoursImg from '../assets/b2b/custom_colours.jpg';
import b2bRepeatOrdersImg from '../assets/b2b/repeat_orders.jpg';

const Home = () => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

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
              className="text-4xl md:text-5xl lg:text-6xl text-cream font-serif leading-tight mb-3 md:mb-4"
            >
              Crafted for <br className="hidden md:block"/>
              the Extraordinary.
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-sm md:text-base lg:text-lg text-cream/90 font-light mb-8 md:mb-10 max-w-[95%] md:max-w-xl mx-auto md:mx-0"
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
                to="/product" 
                className="bg-cream text-soft-black px-8 py-3.5 md:px-9 md:py-4 text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-warm-sand transition-all shadow-md hover:shadow-xl inline-block"
              >
                REQUEST A SAMPLE
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOME — SECTION 2: MADE FOR WHOLESALE */}
      <section className="py-16 md:py-24 bg-white border-b border-stone/15">
        <div className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-terracotta block mb-2">
              SUPPLY CHAIN & PRODUCTION
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-soft-black tracking-tight leading-tight">
              MADE FOR WHOLESALE.
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-5 md:gap-8">
            
            {/* Block 1: LOW MOQ */}
            <div className="bg-[#FAF7F2] border border-[#E8E0D2] rounded-xl sm:rounded-2xl p-2.5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between hover:border-soft-black/40 transition-colors duration-300">
              <div>
                <div className="flex items-center justify-between mb-2 sm:mb-4 md:mb-6">
                  <div className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-md sm:rounded-xl bg-soft-black text-cream flex items-center justify-center">
                    <Package className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs sm:text-lg md:text-2xl font-serif font-bold text-soft-black block leading-none">
                      100
                    </span>
                    <span className="text-[7.5px] sm:text-[10px] uppercase tracking-wider font-semibold text-dark-charcoal/50 block mt-0.5">
                      Base MOQ
                    </span>
                  </div>
                </div>
                <h3 className="text-[11px] sm:text-lg md:text-2xl font-serif font-bold text-soft-black mb-1 sm:mb-2 md:mb-3 leading-tight">
                  LOW MOQ
                </h3>
                <p className="text-[9.5px] sm:text-xs md:text-sm text-dark-charcoal/80 font-light leading-tight sm:leading-relaxed">
                  Start your first production run with accessible minimums.
                </p>
              </div>
              <div className="mt-2 pt-1.5 sm:pt-4 border-t border-stone/15 flex items-center gap-1 sm:gap-1.5 text-[8px] sm:text-xs font-medium sm:font-semibold text-soft-black">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0"></span>
                <span className="truncate">Flexible MOQ</span>
              </div>
            </div>

            {/* Block 2: SAMPLE FIRST */}
            <div className="bg-[#FAF2EE] border border-[#ECDAD0] rounded-xl sm:rounded-2xl p-2.5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between hover:border-soft-black/40 transition-colors duration-300">
              <div>
                <div className="flex items-center justify-between mb-2 sm:mb-4 md:mb-6">
                  <div className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-md sm:rounded-xl bg-terracotta text-cream flex items-center justify-center">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs sm:text-lg md:text-2xl font-serif font-bold text-terracotta block leading-none">
                      5–7d
                    </span>
                    <span className="text-[7.5px] sm:text-[10px] uppercase tracking-wider font-semibold text-terracotta/70 block mt-0.5">
                      Sample Time
                    </span>
                  </div>
                </div>
                <h3 className="text-[11px] sm:text-lg md:text-2xl font-serif font-bold text-soft-black mb-1 sm:mb-2 md:mb-3 leading-tight">
                  SAMPLE FIRST
                </h3>
                <p className="text-[9.5px] sm:text-xs md:text-sm text-dark-charcoal/80 font-light leading-tight sm:leading-relaxed">
                  Approve product & weave quality before bulk production.
                </p>
              </div>
              <div className="mt-2 pt-1.5 sm:pt-4 border-t border-stone/15 flex items-center gap-1 sm:gap-1.5 text-[8px] sm:text-xs font-medium sm:font-semibold text-soft-black">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0"></span>
                <span className="truncate">Sample Dispatch</span>
              </div>
            </div>

            {/* Block 3: CUSTOM READY */}
            <div className="bg-[#F1F5F2] border border-[#D7E2D8] rounded-xl sm:rounded-2xl p-2.5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between hover:border-soft-black/40 transition-colors duration-300">
              <div>
                <div className="flex items-center justify-between mb-2 sm:mb-4 md:mb-6">
                  <div className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-md sm:rounded-xl bg-[#2D3A30] text-cream flex items-center justify-center">
                    <Palette className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs sm:text-lg md:text-2xl font-serif font-bold text-[#2D3A30] block leading-none">
                      25–35d
                    </span>
                    <span className="text-[7.5px] sm:text-[10px] uppercase tracking-wider font-semibold text-[#2D3A30]/70 block mt-0.5">
                      Production
                    </span>
                  </div>
                </div>
                <h3 className="text-[11px] sm:text-lg md:text-2xl font-serif font-bold text-soft-black mb-1 sm:mb-2 md:mb-3 leading-tight">
                  CUSTOM READY
                </h3>
                <p className="text-[9.5px] sm:text-xs md:text-sm text-dark-charcoal/80 font-light leading-tight sm:leading-relaxed">
                  Bespoke colours, branding & packaging available.
                </p>
              </div>
              <div className="mt-2 pt-1.5 sm:pt-4 border-t border-stone/15 flex items-center gap-1 sm:gap-1.5 text-[8px] sm:text-xs font-medium sm:font-semibold text-soft-black">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0"></span>
                <span className="truncate">Private Label</span>
              </div>
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
              <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] text-terracotta mb-2">
                CORE ACCESSORY
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-soft-black mb-2 leading-tight">
                AST Macrame handmade belt
              </h2>
              
              <div className="inline-flex items-center gap-2 bg-soft-black text-cream px-3 py-1 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                100% Cotton
              </div>

              <p className="text-base sm:text-lg text-dark-charcoal/85 font-light leading-relaxed mb-8">
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
                      className={`flex flex-col items-center p-2 rounded-xl border transition-all duration-200 ${
                        selectedColorIdx === idx 
                          ? 'border-soft-black bg-white ring-1 ring-soft-black' 
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
                to="/product" 
                className="bg-soft-black text-cream px-8 py-4 sm:py-4.5 text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-dark-charcoal transition-all text-center inline-flex items-center justify-center gap-2 group"
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
        {/* Full Section Background Image */}
        <img 
          src={craftsmanshipDetailImg} 
          alt="Detail is the Product - Macrame Close-up Knot and Brass Hardware" 
          className="absolute inset-0 w-full h-full object-cover object-center" 
        />
        
        {/* 0.5 Dark Contrast Overlay */}
        <div className="absolute inset-0 bg-soft-black/55 md:bg-soft-black/50 backdrop-blur-[1px]" />
        
        {/* Content Over Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-warm-sand block mb-3">
              MATERIAL & CRAFTSMANSHIP
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-4 tracking-tight leading-tight">
              DETAIL IS THE PRODUCT
            </h2>
            <p className="text-lg sm:text-2xl md:text-3xl text-warm-sand/90 font-serif italic mb-4">
              Handcrafted cotton construction
            </p>
            <p className="text-sm sm:text-base md:text-lg text-cream/85 font-light max-w-2xl mx-auto leading-relaxed">
              Every millimeter is knotted by skilled artisans using premium 100% natural cotton cord and solid alloy hardware.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            
            <div className="bg-soft-black/70 backdrop-blur-md border border-white/20 p-5 sm:p-6 rounded-2xl flex items-start gap-4 hover:border-warm-sand/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-warm-sand text-soft-black flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-serif font-bold text-white mb-1">
                  100% Cotton
                </h4>
                <p className="text-xs sm:text-sm text-cream/75 font-light leading-relaxed">
                  Natural, high-density cotton fibers offering soft handfeel with structural durability.
                </p>
              </div>
            </div>

            <div className="bg-soft-black/70 backdrop-blur-md border border-white/20 p-5 sm:p-6 rounded-2xl flex items-start gap-4 hover:border-warm-sand/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-warm-sand text-soft-black flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-serif font-bold text-white mb-1">
                  Handmade macramé construction
                </h4>
                <p className="text-xs sm:text-sm text-cream/75 font-light leading-relaxed">
                  Each individual piece is knotted by skilled artisans in our dedicated workshop in Bangladesh.
                </p>
              </div>
            </div>

            <div className="bg-soft-black/70 backdrop-blur-md border border-white/20 p-5 sm:p-6 rounded-2xl flex items-start gap-4 hover:border-warm-sand/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-warm-sand text-soft-black flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-serif font-bold text-white mb-1">
                  Metal buckle
                </h4>
                <p className="text-xs sm:text-sm text-cream/75 font-light leading-relaxed">
                  Sturdy, corrosion-resistant alloy buckle for effortless and secure fastening.
                </p>
              </div>
            </div>

            <div className="bg-soft-black/70 backdrop-blur-md border border-white/20 p-5 sm:p-6 rounded-2xl flex items-start gap-4 hover:border-warm-sand/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-warm-sand text-soft-black flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-serif font-bold text-white mb-1">
                  Multiple colour options
                </h4>
                <p className="text-xs sm:text-sm text-cream/75 font-light leading-relaxed">
                  5 standard stock colorways + custom Pantone dyeing for brand collections.
                </p>
              </div>
            </div>

            <div className="bg-soft-black/70 backdrop-blur-md border border-white/20 p-5 sm:p-6 rounded-2xl flex items-start gap-4 hover:border-warm-sand/50 transition-colors md:col-span-2 lg:col-span-2">
              <div className="w-8 h-8 rounded-full bg-warm-sand text-soft-black flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-serif font-bold text-white mb-1">
                  Designed for repeat production
                </h4>
                <p className="text-xs sm:text-sm text-cream/75 font-light leading-relaxed">
                  Standardized weaving templates and QC ensure exact sizing across every bulk batch.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* HOME — SECTION 5: FROM SAMPLE TO BULK */}
      <section className="py-12 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 md:mb-18">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-terracotta block mb-2">
              SOURCING WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-soft-black tracking-tight leading-tight mb-2 sm:mb-4">
              FROM SAMPLE TO BULK
            </h2>
            <p className="text-xs sm:text-base text-dark-charcoal/75 font-light max-w-xl mx-auto">
              A transparent, reliable 6-step manufacturing workflow engineered for wholesale buyers and fashion brands worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-5 lg:gap-6">
            
            <div className="bg-white border border-stone/20 rounded-xl sm:rounded-2xl p-3.5 sm:p-6 md:p-7 relative flex flex-col justify-between hover:border-soft-black/40 transition-colors">
              <div>
                <span className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold text-terracotta/40 block mb-1 sm:mb-2">01</span>
                <h3 className="text-xs sm:text-base md:text-lg font-serif font-bold text-soft-black uppercase tracking-wide mb-1 sm:mb-2 leading-snug">
                  REQUEST A SAMPLE
                </h3>
                <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/70 font-light leading-snug sm:leading-relaxed">
                  Select your desired colorways and submit an online sample request to test in your studio.
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone/20 rounded-xl sm:rounded-2xl p-3.5 sm:p-6 md:p-7 relative flex flex-col justify-between hover:border-soft-black/40 transition-colors">
              <div>
                <span className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold text-terracotta/40 block mb-1 sm:mb-2">02</span>
                <h3 className="text-xs sm:text-base md:text-lg font-serif font-bold text-soft-black uppercase tracking-wide mb-1 sm:mb-2 leading-snug">
                  SAMPLE DEVELOPMENT
                </h3>
                <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/70 font-light leading-snug sm:leading-relaxed">
                  Our workshop crafts and packages your physical sample belts with material spec sheets.
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone/20 rounded-xl sm:rounded-2xl p-3.5 sm:p-6 md:p-7 relative flex flex-col justify-between hover:border-soft-black/40 transition-colors">
              <div>
                <span className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold text-terracotta/40 block mb-1 sm:mb-2">03</span>
                <h3 className="text-xs sm:text-base md:text-lg font-serif font-bold text-soft-black uppercase tracking-wide mb-1 sm:mb-2 leading-snug">
                  APPROVAL & CONFIRM
                </h3>
                <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/70 font-light leading-snug sm:leading-relaxed">
                  Evaluate the physical sample, confirm order volume, custom branding, and production timeline.
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone/20 rounded-xl sm:rounded-2xl p-3.5 sm:p-6 md:p-7 relative flex flex-col justify-between hover:border-soft-black/40 transition-colors">
              <div>
                <span className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold text-terracotta/40 block mb-1 sm:mb-2">04</span>
                <h3 className="text-xs sm:text-base md:text-lg font-serif font-bold text-soft-black uppercase tracking-wide mb-1 sm:mb-2 leading-snug">
                  BULK PRODUCTION
                </h3>
                <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/70 font-light leading-snug sm:leading-relaxed">
                  Our artisan team hand-weaves your wholesale batch following approved master specs.
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone/20 rounded-xl sm:rounded-2xl p-3.5 sm:p-6 md:p-7 relative flex flex-col justify-between hover:border-soft-black/40 transition-colors">
              <div>
                <span className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold text-terracotta/40 block mb-1 sm:mb-2">05</span>
                <h3 className="text-xs sm:text-base md:text-lg font-serif font-bold text-soft-black uppercase tracking-wide mb-1 sm:mb-2 leading-snug">
                  QUALITY CHECK
                </h3>
                <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/70 font-light leading-snug sm:leading-relaxed">
                  Piece-by-piece inspection covering size tolerance, knot tension, and clean hardware trim.
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone/20 rounded-xl sm:rounded-2xl p-3.5 sm:p-6 md:p-7 relative flex flex-col justify-between hover:border-soft-black/40 transition-colors">
              <div>
                <span className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold text-terracotta/40 block mb-1 sm:mb-2">06</span>
                <h3 className="text-xs sm:text-base md:text-lg font-serif font-bold text-soft-black uppercase tracking-wide mb-1 sm:mb-2 leading-snug">
                  SHIPPING WORLDWIDE
                </h3>
                <p className="text-[10.5px] sm:text-xs md:text-sm text-dark-charcoal/70 font-light leading-snug sm:leading-relaxed">
                  Export-ready cartons dispatched via air express (DHL/FedEx) or sea freight with tracking.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* HOME — SECTION 6: BUILT FOR BRANDS */}
      <section className="py-16 md:py-24 bg-white border-y border-stone/15">
        <div className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-18">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-terracotta block mb-2">
              B2B PARTNERSHIP
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-soft-black tracking-tight leading-tight mb-3 sm:mb-4">
              BUILT FOR BRANDS
            </h2>
            <p className="text-xs sm:text-base text-dark-charcoal/75 font-light max-w-xl mx-auto">
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
                  <h3 className="text-sm sm:text-lg md:text-xl font-serif font-bold text-soft-black mb-1 sm:mb-2">
                    Wholesale
                  </h3>
                  <p className="text-[11px] sm:text-xs md:text-sm text-dark-charcoal/80 font-light leading-snug sm:leading-relaxed">
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
                  <h3 className="text-sm sm:text-lg md:text-xl font-serif font-bold text-soft-black mb-1 sm:mb-2">
                    Private Label
                  </h3>
                  <p className="text-[11px] sm:text-xs md:text-sm text-dark-charcoal/80 font-light leading-snug sm:leading-relaxed">
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
                  <h3 className="text-sm sm:text-lg md:text-xl font-serif font-bold text-soft-black mb-1 sm:mb-2">
                    Custom Colours
                  </h3>
                  <p className="text-[11px] sm:text-xs md:text-sm text-dark-charcoal/80 font-light leading-snug sm:leading-relaxed">
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
                  <h3 className="text-sm sm:text-lg md:text-xl font-serif font-bold text-soft-black mb-1 sm:mb-2">
                    Repeat Orders
                  </h3>
                  <p className="text-[11px] sm:text-xs md:text-sm text-dark-charcoal/80 font-light leading-snug sm:leading-relaxed">
                    Archived specs and yarn records for consistent, effortless reordering.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* HOME — SECTION 7: READY TO SOURCE? */}
      <section className="py-20 md:py-32 bg-soft-black text-cream px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-white mb-4 block">
            START YOUR PARTNERSHIP
          </span>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-cream mb-6 tracking-tight leading-tight">
            READY TO SOURCE AST?
          </h2>
          
          <p className="text-base sm:text-xl text-cream/80 font-light mb-10 md:mb-14 max-w-2xl mx-auto leading-relaxed">
            Request a sample or discuss your wholesale requirement with our production team.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/product" 
              className="w-full sm:w-auto bg-cream text-soft-black px-10 py-4.5 text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-warm-sand transition-all shadow-xl hover:shadow-2xl text-center"
            >
              REQUEST A SAMPLE
            </Link>
            
            <Link 
              to="/sample-wholesale" 
              className="w-full sm:w-auto bg-transparent border border-cream/40 text-cream px-10 py-4.5 text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-cream/10 hover:border-cream transition-all text-center"
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
