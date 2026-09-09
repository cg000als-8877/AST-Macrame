import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Ruler, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useCartWishlist } from '../context/CartWishlistContext';
import { useStoreConfig } from '../context/StoreConfigContext';

// Black Images
import b1 from '../assets/products/Black/1.webp';
import b2 from '../assets/products/Black/2.webp';
import b3 from '../assets/products/Black/3.webp';
import b4 from '../assets/products/Black/4.webp';
import b5 from '../assets/products/Black/5.webp';
import b6 from '../assets/products/Black/6.webp';

// Navy Images
import n1 from '../assets/products/Navy/1.webp';
import n2 from '../assets/products/Navy/2.webp';
import n3 from '../assets/products/Navy/3.webp';
import n4 from '../assets/products/Navy/4.webp';
import n5 from '../assets/products/Navy/5.webp';
import n6 from '../assets/products/Navy/6.webp';

// Brown Images
import br1 from '../assets/products/Brown/1.webp';
import br2 from '../assets/products/Brown/2.webp';
import br3 from '../assets/products/Brown/3.webp';
import br4 from '../assets/products/Brown/4.webp';
import br5 from '../assets/products/Brown/5.webp';
import br6 from '../assets/products/Brown/6.webp';

// Maroon Images
import m1 from '../assets/products/Maroon/1.webp';
import m2 from '../assets/products/Maroon/2.webp';
import m3 from '../assets/products/Maroon/3.webp';
import m4 from '../assets/products/Maroon/4.webp';
import m5 from '../assets/products/Maroon/5.webp';
import m6 from '../assets/products/Maroon/6.webp';

// Khaki Images
import k1 from '../assets/products/Khaki/1.webp';
import k2 from '../assets/products/Khaki/2.webp';
import k3 from '../assets/products/Khaki/3.webp';
import k4 from '../assets/products/Khaki/4.webp';
import k5 from '../assets/products/Khaki/5.webp';
import k6 from '../assets/products/Khaki/6.webp';

const colorCatalog = [
  {
    id: 'belt-black',
    colorName: 'Black',
    hex: '#1C1B1A',
    tagline: 'Classic & Versatile',
    images: [b1, b2, b3, b4, b5, b6],
    desc: 'Deep obsidian tone. The quintessential everyday belt for sharp formal wear and casual styling.'
  },
  {
    id: 'belt-navy',
    colorName: 'Navy',
    hex: '#1B263B',
    tagline: 'Refined Maritime Blue',
    images: [n1, n2, n3, n4, n5, n6],
    desc: 'Rich indigo hue. Pairs effortlessly with raw denim, chinos, linen shirts, and warm summer neutrals.'
  },
  {
    id: 'belt-brown',
    colorName: 'Brown',
    hex: '#4A3525',
    tagline: 'Earth & Leather Heritage',
    images: [br1, br2, br3, br4, br5, br6],
    desc: 'Warm earthy espresso tone. Offers organic texture for safari jackets, olive trousers, and casual suits.'
  },
  {
    id: 'belt-maroon',
    colorName: 'Maroon',
    hex: '#58111A',
    tagline: 'Signature Artisan Wine',
    images: [m1, m2, m3, m4, m5, m6],
    desc: 'Distinctive burgundy wine palette. A bold conversational statement piece crafted with tight knot density.'
  },
  {
    id: 'belt-khaki',
    colorName: 'Khaki',
    hex: '#C3B091',
    tagline: 'Sun-Bleached Sand',
    images: [k1, k2, k3, k4, k5, k6],
    desc: 'Warm desert sand tone. Highlights the natural pure cotton weave pattern with high-contrast depth.'
  }
];

const ProductGallery = () => {
  const { storeConfig } = useStoreConfig();
  const { currencySymbol, exchangeRate } = useCartWishlist();

  // Size Guide Modal State
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Lightbox Modal State
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxActive, setLightboxActive] = useState(false);

  const openLightbox = (imagesList, startIndex = 0) => {
    setLightboxImages(imagesList);
    setLightboxIndex(startIndex);
    setLightboxActive(true);
  };

  const singlePriceBDT = storeConfig?.singlePrice ?? 850;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-soft-black pt-20 sm:pt-28 md:pt-32 pb-24 sm:pb-32 selection:bg-terracotta selection:text-cream">
      
      {/* Header Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold uppercase tracking-tight text-soft-black mb-2.5 sm:mb-4">
          Product Gallery
        </h1>

        <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light max-w-2xl mx-auto leading-relaxed">
          Explore our signature 100% handcrafted cotton macramé belts across all 5 artisan shades. Available for retail purchase in Bangladesh and sample orders worldwide.
        </p>
      </section>

      {/* Main Gallery Grid: 2 Columns on Mobile, 3 on Tablet, 5 on PC (All in One Row) */}
      <section className="max-w-[1480px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5 lg:gap-3 xl:gap-4">
          {colorCatalog.map((item, idx) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="bg-white rounded-2xl lg:rounded-2xl xl:rounded-3xl p-2.5 sm:p-3.5 lg:p-3 xl:p-4 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* 1. 1:1 Aspect Ratio Image Container */}
                  <div className="relative w-full aspect-square bg-[#F3EFEA] rounded-xl lg:rounded-xl xl:rounded-2xl overflow-hidden mb-2 sm:mb-3 group/img select-none">
                    <img
                      src={item.images[0]}
                      alt={`AST Macramé Belt - ${item.colorName}`}
                      className="w-full h-full object-cover mix-blend-multiply group-hover/img:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => openLightbox(item.images, 0)}
                      loading="lazy"
                    />

                    {/* Quick Lightbox Zoom Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(item.images, 0);
                      }}
                      className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover/img:opacity-100 cursor-pointer shadow-sm"
                      title="Inspect High-Res Photos"
                      aria-label="View Fullscreen"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 2. Product Title */}
                  <h2 className="font-serif text-[13px] sm:text-base lg:text-[15px] xl:text-[16px] font-bold text-soft-black leading-snug line-clamp-2 mb-1.5 group-hover:text-terracotta transition-colors">
                    AST Macramé Belt - {item.colorName}
                  </h2>

                  {/* Price Banner */}
                  <div className="flex items-center justify-between gap-1 mb-2.5 sm:mb-3.5">
                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                      <span className="text-sm sm:text-base lg:text-base xl:text-lg font-bold text-terracotta">
                        {currencySymbol}{Math.round(singlePriceBDT * (exchangeRate || 1)).toLocaleString()}
                      </span>
                      <span className="text-xs sm:text-sm text-dark-charcoal/50 line-through">
                        {currencySymbol}{Math.round(1050 * (exchangeRate || 1)).toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs lg:text-[11px] xl:text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 shrink-0">
                      Save {currencySymbol}{Math.round(200 * (exchangeRate || 1)).toLocaleString()}
                    </span>
                  </div>

                  {/* 3. Single Color Display + Available Sizes (Display Only) */}
                  <div className="pt-2 sm:pt-3 border-t border-stone/15 mb-3 sm:mb-4 flex items-center justify-between gap-1">
                    
                    {/* Left: Color Swatch + Label */}
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <div 
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-soft-black/30 shadow-2xs shrink-0" 
                        style={{ backgroundColor: item.hex }} 
                      />
                      <span className="text-xs sm:text-sm lg:text-xs xl:text-sm font-bold text-soft-black uppercase tracking-wider">
                        {item.colorName}
                      </span>
                    </div>

                    {/* Right: Available Sizes (Non-interactive Display) */}
                    <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                      <span className="text-[10px] sm:text-xs text-dark-charcoal/60 font-medium mr-0.5">Sizes:</span>
                      {['M', 'L'].map((sz) => (
                        <span
                          key={sz}
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[#FAF8F5] text-dark-charcoal/90 border border-stone/25 text-xs sm:text-xs font-bold flex items-center justify-center select-none shadow-2xs"
                          title={`Size ${sz} Available`}
                        >
                          {sz}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Action CTAs: Stacked (One Under Another on Mobile & PC) */}
                <div className="flex flex-col gap-2 pt-1">
                  
                  {/* ORDER SAMPLE CTA -> Goes directly to /sample-order */}
                  <Link
                    to={`/sample-order?color=${item.colorName.toLowerCase()}`}
                    className="w-full h-9 sm:h-10 lg:h-10 xl:h-10.5 px-3 rounded-xl border border-soft-black bg-transparent text-soft-black hover:bg-soft-black hover:text-cream hover:shadow-sm text-xs sm:text-xs lg:text-[12px] xl:text-[12.5px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center active:scale-[0.98] cursor-pointer"
                    title="Order sample on the Sample Order page"
                  >
                    Order Sample
                  </Link>

                  {/* ORDER RETAIL CTA -> Goes directly to /retail */}
                  <div>
                    <Link
                      to={`/retail?color=${item.colorName.toLowerCase()}`}
                      className="w-full h-9 sm:h-10 lg:h-10 xl:h-10.5 px-3 rounded-xl bg-terracotta hover:bg-[#131E33] hover:shadow-md hover:brightness-110 text-cream text-xs sm:text-xs lg:text-[12px] xl:text-[12.5px] font-bold uppercase tracking-wider transition-all duration-300 shadow-xs active:scale-[0.98] flex items-center justify-center cursor-pointer"
                      title="Order on the Retail page"
                    >
                      Order Retail
                    </Link>
                    <p className="text-[10px] sm:text-[11.5px] lg:text-[11.5px] xl:text-[12px] text-dark-charcoal/70 text-center font-medium leading-normal mt-1">
                      * Retail is for Bangladesh delivery only
                    </p>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Value Proposition & Wholesale Teaser */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 mt-12 sm:mt-16 text-center">
        <div className="bg-white border border-stone/20 rounded-2xl sm:rounded-3xl p-6 sm:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 text-left">
            
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF8F5]">
              <ShieldCheck className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold uppercase text-soft-black">Open-Box Inspection</h4>
                <p className="text-[11px] text-dark-charcoal/75 leading-relaxed mt-0.5">
                  Check your macramé belt in front of courier before paying on Cash on Delivery.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF8F5]">
              <Sparkles className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold uppercase text-soft-black">Multi-Belt Discounts</h4>
                <p className="text-[11px] text-dark-charcoal/75 leading-relaxed mt-0.5">
                  Buy 2 for {currencySymbol}{Math.round(1490 * (exchangeRate || 1)).toLocaleString()}, 3 for {currencySymbol}{Math.round(2090 * (exchangeRate || 1)).toLocaleString()}, 4 for {currencySymbol}{Math.round(2650 * (exchangeRate || 1)).toLocaleString()}, or 5 for {currencySymbol}{Math.round(3150 * (exchangeRate || 1)).toLocaleString()}.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF8F5]">
              <Truck className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold uppercase text-soft-black">Global Sample Export</h4>
                <p className="text-[11px] text-dark-charcoal/75 leading-relaxed mt-0.5">
                  100% sample rebate credited on your first bulk wholesale manufacturing order.
                </p>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/retail"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-muted-burgundy text-white px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <span>Explore Retail Multi-Buy Combos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/sample-wholesale"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-soft-black hover:bg-dark-charcoal text-white px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <span>Wholesale & OEM Specifications</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sizing Guide Modal */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute inset-0 bg-soft-black/40 backdrop-blur-xs"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white border border-stone/20 w-full max-w-sm p-6 relative z-10 shadow-2xl rounded-2xl text-center"
            >
              <button 
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                className="absolute top-4 right-4 text-soft-black/40 hover:text-soft-black transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              
              <img src="/logo_black.png" alt="AST Logo" className="h-5 w-auto mx-auto mb-3 object-contain opacity-80" />
              
              <h3 className="text-xl font-serif text-soft-black mb-1 font-bold">Belt Sizing Guide</h3>
              <p className="text-xs text-dark-charcoal/70 mb-4">Select your best fit according to standard waist measurements.</p>
              
              <div className="w-full bg-[#FAF8F5] rounded-xl border border-stone/15 overflow-hidden mb-4 text-xs">
                <div className="grid grid-cols-3 bg-stone/10 py-2.5 font-bold uppercase tracking-wider text-dark-charcoal">
                  <span>Size</span>
                  <span>Waist Fit</span>
                  <span>Total Length</span>
                </div>
                <div className="grid grid-cols-3 py-3 border-b border-stone/10">
                  <span className="font-bold text-soft-black">M</span>
                  <span className="text-soft-black/80">32–35 in</span>
                  <span className="text-soft-black/80">38 in</span>
                </div>
                <div className="grid grid-cols-3 py-3">
                  <span className="font-bold text-soft-black">L</span>
                  <span className="text-soft-black/80">35–38 in</span>
                  <span className="text-soft-black/80">42 in</span>
                </div>
              </div>

              <div className="flex justify-between items-center px-4 py-2.5 bg-[#FAF8F5] rounded-xl border border-stone/15 mb-4 text-xs">
                 <span className="font-bold uppercase tracking-wider text-dark-charcoal">Width</span>
                 <span className="font-bold text-soft-black">4.0 cm (1.57 in)</span>
              </div>
              
              <p className="italic font-light text-dark-charcoal/70 text-[11px] leading-relaxed">
                * The handmade macramé weave features subtle pin-through flexibility at any knot point, ensuring an adaptable tailored fit.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxActive && (
          <div className="fixed inset-0 z-[120] flex flex-col items-center justify-between bg-black/95 px-2 sm:px-6 py-4 overflow-hidden select-none">
            {/* Top Controls */}
            <div className="w-full flex items-center justify-between px-2 z-[130]">
              <span className="text-white/75 text-xs sm:text-sm font-mono tracking-wider">
                {lightboxIndex + 1} / {lightboxImages.length}
              </span>
              <button 
                onClick={() => setLightboxActive(false)}
                className="text-white/80 hover:text-white transition-all p-2 cursor-pointer bg-white/10 hover:bg-white/20 rounded-full"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Main Interactive Zoomable View */}
            <div className="relative flex items-center justify-center w-full flex-1 max-h-[75vh] my-auto">
              <button 
                onClick={() => setLightboxIndex(prev => (prev === 0 ? lightboxImages.length - 1 : prev - 1))}
                className="absolute left-2 sm:left-6 text-white z-[130] p-2 sm:p-3 bg-black/40 hover:bg-black/70 backdrop-blur-md rounded-full transition-all cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
              </button>

              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <TransformWrapper initialScale={1} minScale={1} maxScale={4} centerOnInit={true}>
                  {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                      <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                        <img 
                          src={lightboxImages[lightboxIndex]} 
                          alt="Product Closeup" 
                          className="w-full h-full object-contain cursor-grab active:cursor-grabbing select-none"
                          draggable="false"
                        />
                      </TransformComponent>

                      {/* Zoom controls */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-4 z-[130] bg-black/75 backdrop-blur-md px-4 sm:px-5 py-1.5 rounded-full border border-white/20">
                        <button onClick={() => zoomOut()} className="text-white/80 hover:text-white p-1 cursor-pointer">
                          <ZoomOut className="w-4 h-4" />
                        </button>
                        <button onClick={() => resetTransform()} className="text-[10px] sm:text-xs text-white/90 uppercase tracking-widest px-2 border-x border-white/25 cursor-pointer flex items-center gap-1">
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset</span>
                        </button>
                        <button onClick={() => zoomIn()} className="text-white/80 hover:text-white p-1 cursor-pointer">
                          <ZoomIn className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </TransformWrapper>
              </div>

              <button 
                onClick={() => setLightboxIndex(prev => (prev === lightboxImages.length - 1 ? 0 : prev + 1))}
                className="absolute right-2 sm:right-6 text-white z-[130] p-2 sm:p-3 bg-black/40 hover:bg-black/70 backdrop-blur-md rounded-full transition-all cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="w-full h-14 sm:h-16 flex items-center justify-center gap-2 sm:gap-3 px-2 z-[130]">
              {lightboxImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    lightboxIndex === idx
                      ? 'border-terracotta scale-105 opacity-100 shadow-md'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ProductGallery;
