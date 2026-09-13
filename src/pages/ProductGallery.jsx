import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Ruler, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  ArrowRight, 
  Search,
  Check
} from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';
import { useStoreConfig } from '../context/StoreConfigContext';
import { ALL_GALLERY_ITEMS, PRODUCTS } from '../data/products';

const ProductGallery = () => {
  const { storeConfig } = useStoreConfig();
  const { currencySymbol, exchangeRate } = useCartWishlist();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'adult' | 'kids'

  const searchQuery = searchParams.get('search')?.toLowerCase().trim() || '';

  const filteredCatalog = ALL_GALLERY_ITEMS.filter(item => {
    // Category filter
    if (selectedCategory !== 'all' && item.productId !== selectedCategory) {
      return false;
    }

    // Search query filter
    if (!searchQuery) return true;
    return (
      item.colorName.toLowerCase().includes(searchQuery) ||
      item.productTitle.toLowerCase().includes(searchQuery) ||
      item.badge.toLowerCase().includes(searchQuery) ||
      item.tagline.toLowerCase().includes(searchQuery) ||
      item.desc.toLowerCase().includes(searchQuery) ||
      'macrame belt'.includes(searchQuery) ||
      'cotton belt'.includes(searchQuery)
    );
  });

  // Size Guide Modal State
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeGuideTab, setActiveGuideTab] = useState('adult'); // 'adult' | 'kids'

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-soft-black pt-20 sm:pt-28 md:pt-32 pb-24 sm:pb-32 selection:bg-terracotta selection:text-cream">
      
      {/* Header Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-10 text-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold uppercase tracking-tight text-soft-black mb-2.5 sm:mb-4">
          Product Gallery
        </h1>

        <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light max-w-2xl mx-auto leading-relaxed">
          Explore our signature 100% handcrafted cotton macramé belts for adults and kids. Available for retail delivery across Bangladesh and sample orders worldwide.
        </p>

        {/* Category Pill Filters */}
        <div className="mt-5 flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar whitespace-nowrap px-1 pb-1 max-w-full">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 sm:px-4 py-1 sm:py-2 rounded text-[10px] sm:text-xs font-normal uppercase tracking-wider transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-soft-black text-white shadow-xs'
                : 'bg-white border border-stone/20 text-soft-black/80 hover:border-soft-black/40 hover:text-soft-black'
            }`}
          >
            All Products ({ALL_GALLERY_ITEMS.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('adult')}
            className={`px-2.5 sm:px-4 py-1 sm:py-2 rounded text-[10px] sm:text-xs font-normal uppercase tracking-wider transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              selectedCategory === 'adult'
                ? 'bg-soft-black text-white shadow-xs'
                : 'bg-white border border-stone/20 text-soft-black/80 hover:border-soft-black/40 hover:text-soft-black'
            }`}
          >
            Adult Unisex ({PRODUCTS.adult.colors.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('kids')}
            className={`px-2.5 sm:px-4 py-1 sm:py-2 rounded text-[10px] sm:text-xs font-normal uppercase tracking-wider transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              selectedCategory === 'kids'
                ? 'bg-soft-black text-white shadow-xs'
                : 'bg-white border border-stone/20 text-soft-black/80 hover:border-soft-black/40 hover:text-soft-black'
            }`}
          >
            Kids Collection ({PRODUCTS.kids.colors.length})
          </button>
        </div>

        {searchQuery && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-xs font-semibold text-dark-charcoal/80 bg-stone/20 px-3 py-1 rounded flex items-center gap-1.5">
              <span>Showing results for: <strong>"{searchQuery}"</strong></span>
              <button 
                onClick={() => setSearchParams({})} 
                className="text-soft-black/60 hover:text-soft-black ml-1 font-bold cursor-pointer"
                title="Clear Search"
              >
                ×
              </button>
            </span>
          </div>
        )}
      </section>

      {/* Main Gallery Grid */}
      <section className="max-w-[1480px] mx-auto px-3 sm:px-6 lg:px-8">
        {filteredCatalog.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone/15 p-8 max-w-md mx-auto">
            <p className="font-serif text-lg font-bold text-soft-black mb-2">No belts found for "{searchQuery}"</p>
            <p className="text-xs text-dark-charcoal/70 mb-4">Try searching for Black, Navy, Brown, Maroon, Khaki, Neon Green, or Red.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchParams({}); }}
              className="bg-soft-black text-white px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider hover:bg-terracotta transition-colors cursor-pointer"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3.5 lg:gap-3.5 xl:gap-4">
            {filteredCatalog.map((item, idx) => {
              const singlePrice = item.singlePriceBDT;
              const regularPrice = item.regularPriceBDT;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="bg-white rounded-2xl lg:rounded-2xl xl:rounded-3xl shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group overflow-hidden border border-stone/15"
                >
                  {/* 1. Flush Edge-to-Edge Image Container */}
                  <div className="relative w-full aspect-square bg-[#F3EFEA] overflow-hidden select-none">
                    <img
                      src={item.images[0]}
                      alt={item.productTitle}
                      className="w-full h-full object-cover mix-blend-multiply pointer-events-none group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Card Body with Padding */}
                  <div className="p-2.5 sm:p-3.5 lg:p-3 xl:p-4 flex flex-col flex-1 justify-between">
                    <div>
                      {/* 2. Product Title (without color name) */}
                      <h2 className="font-serif text-[11px] sm:text-base lg:text-[14.5px] xl:text-[15.5px] font-normal sm:font-bold text-soft-black leading-snug line-clamp-2 mb-1 group-hover:text-terracotta transition-colors">
                        {item.productTitle}
                      </h2>

                      {/* Tagline */}
                      <p className="text-[9.5px] sm:text-xs text-dark-charcoal/60 font-normal italic mb-1.5 sm:mb-2 line-clamp-1">
                        {item.tagline}
                      </p>

                      {/* Price Banner */}
                      <div className="flex items-center justify-between gap-1 mb-2 sm:mb-3.5">
                        <div className="flex items-baseline gap-1 sm:gap-2">
                          <span className="text-xs sm:text-base lg:text-base xl:text-lg font-normal sm:font-bold text-terracotta">
                            {currencySymbol}{Math.round(singlePrice * (exchangeRate || 1)).toLocaleString()}
                          </span>
                          <span className="text-[10px] sm:text-sm text-dark-charcoal/50 line-through">
                            {currencySymbol}{Math.round(regularPrice * (exchangeRate || 1)).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* 3. Single Color Display + Available Sizes */}
                      <div className="pt-1.5 sm:pt-2.5 border-t border-stone/15 mb-2.5 sm:mb-4 flex items-center justify-between gap-1">
                        
                        {/* Left: Color Swatch + Label */}
                        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                          <div 
                            className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full border border-soft-black/30 shadow-2xs shrink-0" 
                            style={{ backgroundColor: item.hex }} 
                          />
                          <span className="text-[10px] sm:text-sm lg:text-xs xl:text-sm font-normal sm:font-bold text-soft-black uppercase tracking-wider">
                            {item.colorName}
                          </span>
                        </div>

                        {/* Right: Available Sizes */}
                        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                          <span className="text-[9px] sm:text-xs text-dark-charcoal/60 font-normal sm:font-medium mr-0.5">Size:</span>
                          {item.sizes.map((sz) => (
                            <span
                              key={sz}
                              className="px-1.5 h-5 sm:h-7 rounded-md bg-[#FAF8F5] text-dark-charcoal/90 border border-stone/25 text-[9.5px] sm:text-xs font-normal sm:font-bold flex items-center justify-center select-none shadow-2xs"
                              title={`Size ${sz} Available`}
                            >
                              {sz}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 4. Action CTAs: Stacked */}
                    <div className="flex flex-col gap-2 pt-1">
                      
                      {/* ORDER SAMPLE CTA -> Deep link to /sample-order */}
                      <Link
                        to={`/sample-order?product=${item.productId}&color=${encodeURIComponent(item.colorName.toLowerCase())}`}
                        className="relative overflow-hidden group w-full h-9 sm:h-10 lg:h-10 xl:h-10.5 px-3 rounded border border-soft-black bg-transparent text-soft-black hover:border-soft-black hover:text-cream hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-xs sm:text-xs lg:text-[12px] xl:text-[12.5px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center cursor-pointer"
                        title="Order sample on the Sample Order page"
                      >
                        <span className="absolute inset-0 bg-soft-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
                        <span className="relative z-10 transition-all duration-300 group-hover:tracking-widest">Order Sample</span>
                      </Link>

                      {/* ORDER RETAIL CTA -> Deep link to /retail */}
                      <div>
                        <Link
                          to={`/retail?product=${item.productId}&color=${encodeURIComponent(item.colorName.toLowerCase())}`}
                          className="relative overflow-hidden group w-full h-9 sm:h-10 lg:h-10 xl:h-10.5 px-3 rounded bg-terracotta hover:bg-[#131E33] hover:shadow-md hover:shadow-terracotta/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-cream text-xs sm:text-xs lg:text-[12px] xl:text-[12.5px] font-bold uppercase tracking-wider transition-all duration-300 shadow-xs flex items-center justify-center cursor-pointer"
                          title="Order on the Retail page"
                        >
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                          <span className="relative z-10 transition-all duration-300 group-hover:tracking-widest">Order Retail</span>
                        </Link>
                        <p className="text-[10px] sm:text-[11.5px] lg:text-[11.5px] xl:text-[12px] text-dark-charcoal/70 text-center font-medium leading-normal mt-1">
                          Retail is for Bangladesh only
                        </p>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}
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
                  Save instantly on 2-belt combos and sample volume tiered evaluation packs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF8F5]">
              <Truck className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold uppercase text-soft-black">Express Courier</h4>
                <p className="text-[11px] text-dark-charcoal/75 leading-relaxed mt-0.5">
                  Fast delivery across all 64 districts in Bangladesh and tracked worldwide air shipping.
                </p>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/retail"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-muted-burgundy text-white px-7 py-3.5 rounded text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <span>Explore Retail Multi-Buy Combos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/sample-wholesale"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-soft-black hover:bg-dark-charcoal text-white px-7 py-3.5 rounded text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <span>Wholesale & OEM Specifications</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sizing Guide Modal with Tabs */}
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
              className="bg-white border border-stone/20 w-full max-w-md p-6 relative z-10 shadow-2xl rounded-2xl text-center"
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
              <p className="text-xs text-dark-charcoal/70 mb-3">Select your collection to check dimensions & measurements.</p>
              
              {/* Tab Switcher */}
              <div className="flex gap-2 mb-4 justify-center">
                <button
                  type="button"
                  onClick={() => setActiveGuideTab('adult')}
                  className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                    activeGuideTab === 'adult' ? 'bg-soft-black text-white' : 'bg-stone/10 text-soft-black/80'
                  }`}
                >
                  Adult Unisex
                </button>
                <button
                  type="button"
                  onClick={() => setActiveGuideTab('kids')}
                  className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                    activeGuideTab === 'kids' ? 'bg-soft-black text-white' : 'bg-stone/10 text-soft-black/80'
                  }`}
                >
                  Kids (Boys & Girls)
                </button>
              </div>

              {activeGuideTab === 'adult' ? (
                <>
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
                </>
              ) : (
                <>
                  <div className="w-full bg-[#FAF8F5] rounded-xl border border-stone/15 overflow-hidden mb-4 text-xs">
                    <div className="grid grid-cols-3 bg-stone/10 py-2.5 font-bold uppercase tracking-wider text-dark-charcoal">
                      <span>Size</span>
                      <span>Waist Fit</span>
                      <span>Total Length</span>
                    </div>
                    <div className="grid grid-cols-3 py-3">
                      <span className="font-bold text-soft-black">One</span>
                      <span className="text-soft-black/80">20–26 in</span>
                      <span className="text-soft-black/80">28 in (71 cm)</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center px-4 py-2.5 bg-[#FAF8F5] rounded-xl border border-stone/15 mb-4 text-xs">
                    <span className="font-bold uppercase tracking-wider text-dark-charcoal">Width</span>
                    <span className="font-bold text-soft-black">1 1/4 inch (3.2 cm)</span>
                  </div>
                </>
              )}
              
              <p className="italic font-light text-dark-charcoal/70 text-[11px] leading-relaxed">
                * The handmade macramé weave features subtle pin-through flexibility at any knot point, ensuring an adaptable tailored fit.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ProductGallery;
