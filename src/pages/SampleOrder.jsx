import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Minus, X, ZoomIn, ZoomOut, RotateCcw, Info, Heart, ShoppingBag, AlignLeft, Layers, SlidersHorizontal, Ruler, Tag, Zap, Truck, ShieldCheck } from 'lucide-react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import b1 from '../assets/products/Black/1.webp';
import b2 from '../assets/products/Black/2.webp';
import b3 from '../assets/products/Black/3.webp';
import b4 from '../assets/products/Black/4.webp';
import b5 from '../assets/products/Black/5.webp';
import b6 from '../assets/products/Black/6.webp';
import n1 from '../assets/products/Navy/1.webp';
import n2 from '../assets/products/Navy/2.webp';
import n3 from '../assets/products/Navy/3.webp';
import n4 from '../assets/products/Navy/4.webp';
import n5 from '../assets/products/Navy/5.webp';
import n6 from '../assets/products/Navy/6.webp';
import br1 from '../assets/products/Brown/1.webp';
import br2 from '../assets/products/Brown/2.webp';
import br3 from '../assets/products/Brown/3.webp';
import br4 from '../assets/products/Brown/4.webp';
import br5 from '../assets/products/Brown/5.webp';
import br6 from '../assets/products/Brown/6.webp';
import m1 from '../assets/products/Maroon/1.webp';
import m2 from '../assets/products/Maroon/2.webp';
import m3 from '../assets/products/Maroon/3.webp';
import m4 from '../assets/products/Maroon/4.webp';
import m5 from '../assets/products/Maroon/5.webp';
import m6 from '../assets/products/Maroon/6.webp';
import k1 from '../assets/products/Khaki/1.webp';
import k2 from '../assets/products/Khaki/2.webp';
import k3 from '../assets/products/Khaki/3.webp';
import k4 from '../assets/products/Khaki/4.webp';
import k5 from '../assets/products/Khaki/5.webp';
import k6 from '../assets/products/Khaki/6.webp';

import { useCartWishlist, calculateTierPriceBDT } from '../context/CartWishlistContext';

const Accordion = ({ title, isOpen, onClick, children }) => (
  <div className="border-b border-stone/15 last:border-b-0 sm:border-stone/30 sm:last:border-b">
    <button 
      onClick={onClick}
      className="w-full py-3.5 px-3.5 sm:px-0 flex justify-between items-center text-left cursor-pointer group select-none"
    >
      <span className="font-serif text-sm sm:text-base md:text-xl text-soft-black font-medium group-hover:text-terracotta transition-colors">{title}</span>
      {isOpen ? <Minus className="w-4 h-4 md:w-5 md:h-5 text-soft-black/50" /> : <Plus className="w-4 h-4 md:w-5 md:h-5 text-soft-black/50" />}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="pb-6 text-dark-charcoal/80 font-light text-sm">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const SampleOrder = () => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setIsCartOpen,
    currencySymbol,
    exchangeRate,
    userCountry,
    getShippingQuote
  } = useCartWishlist();
  
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const [activeIndex, setActiveIndex] = useState(0);
  const [openAccordions, setOpenAccordions] = useState({
    description: true,
    materials: false,
    custom: false
  });
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isSamplePolicyOpen, setIsSamplePolicyOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    document.title = "Sample Order | AST Handmade Macramé Belt - AST Macramé";
  }, []);

  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [lightboxImage]);

  const colors = [
    { name: 'Black', hex: '#1a1a1a' },
    { name: 'Navy', hex: '#1c2841' },
    { name: 'Brown', hex: '#B0868B' },
    { name: 'Maroon', hex: '#6b2737' },
    { name: 'Khaki', hex: '#c3b091' },
  ];

  const colorImages = {
    Black: [b1, b2, b3, b4, b5, b6],
    Navy: [n1, n2, n3, n4, n5, n6],
    Brown: [br1, br2, br3, br4, br5, br6],
    Maroon: [m1, m2, m3, m4, m5, m6],
    Khaki: [k1, k2, k3, k4, k5, k6],
  };

  const allColorGalleryItems = [
    ...colorImages.Black.map((img, idx) => ({ color: 'Black', img, subIndex: idx })),
    ...colorImages.Navy.map((img, idx) => ({ color: 'Navy', img, subIndex: idx })),
    ...colorImages.Brown.map((img, idx) => ({ color: 'Brown', img, subIndex: idx })),
    ...colorImages.Maroon.map((img, idx) => ({ color: 'Maroon', img, subIndex: idx })),
    ...colorImages.Khaki.map((img, idx) => ({ color: 'Khaki', img, subIndex: idx })),
  ];

  const images = colorImages[selectedColor] || colorImages.Black;

  const scrollRef = React.useRef(null);
  const scrollTimeoutRef = React.useRef(null);

  const handleColorChange = (colorName) => {
    setSelectedColor(colorName);
    const targetIdx = allColorGalleryItems.findIndex(item => item.color === colorName);
    if (targetIdx !== -1) {
      setActiveIndex(targetIdx);
      if (scrollRef.current) {
        const itemWidth = scrollRef.current.clientWidth || scrollRef.current.offsetWidth;
        scrollRef.current.scrollTo({
          left: itemWidth * targetIdx,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleSizeChange = (newSize) => {
    setSelectedSize(newSize);
  };

  const handleQuantityUpdate = (newQty) => {
    setQuantity(Math.max(1, Math.min(20, newQty)));
  };

  const singlePriceBDT = 850;
  const regularPriceBDT = singlePriceBDT * quantity;
  const totalPriceBDT = calculateTierPriceBDT(quantity);
  const savingsBDT = Math.max(0, regularPriceBDT - totalPriceBDT);

  const unitPriceLocal = quantity > 0 ? (totalPriceBDT / quantity) * exchangeRate : singlePriceBDT * exchangeRate;
  const totalPriceLocal = totalPriceBDT * exchangeRate;
  const regularPriceLocal = regularPriceBDT * exchangeRate;
  const savingsLocal = savingsBDT * exchangeRate;
  const currentShipping = getShippingQuote(quantity);

  const handleAddToCart = () => {
    addToCart({
      title: 'AST Handmade Macramé Belt',
      color: selectedColor,
      size: selectedSize,
      priceBDT: singlePriceBDT
    }, quantity);
    setIsCartOpen(true);
  };

  const isWishlisted = isInWishlist(selectedColor, selectedSize);

  const handleToggleWishlistClick = () => {
    toggleWishlist({
      title: 'AST Handmade Macramé Belt',
      color: selectedColor,
      size: selectedSize,
      priceBDT: singlePriceBDT
    });
  };

  const toggleAccordion = (title) => {
    setOpenAccordions(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const handleScroll = (e) => {
    const container = e.target;
    if (!container) return;
    const { scrollLeft, clientWidth } = container;
    if (clientWidth > 0 && allColorGalleryItems.length > 0) {
      const newIndex = Math.round(scrollLeft / clientWidth);
      if (newIndex >= 0 && newIndex < allColorGalleryItems.length) {
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
        const item = allColorGalleryItems[newIndex];
        if (item && item.color !== selectedColor) {
          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => {
            setSelectedColor(item.color);
          }, 80);
        }
      }
    }
  };

  const scrollToSubIndex = (subIdx) => {
    const currentColor = selectedColor || 'Black';
    const targetIdx = allColorGalleryItems.findIndex(
      item => item.color === currentColor && item.subIndex === subIdx
    );
    if (targetIdx !== -1) {
      setActiveIndex(targetIdx);
      if (scrollRef.current) {
        const itemWidth = scrollRef.current.clientWidth || scrollRef.current.offsetWidth;
        scrollRef.current.scrollTo({
          left: itemWidth * targetIdx,
          behavior: 'smooth'
        });
      }
    }
  };

  const currentSubIndex = allColorGalleryItems[activeIndex]?.subIndex ?? 0;

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndEvent = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNextImage();
    }
    if (isRightSwipe) {
      handlePrevImage();
    }
  };

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    const currentIdx = allColorGalleryItems.findIndex(item => item.img === lightboxImage);
    if (currentIdx !== -1) {
      setLightboxImage(allColorGalleryItems[(currentIdx + 1) % allColorGalleryItems.length].img);
    }
  };

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    const currentIdx = allColorGalleryItems.findIndex(item => item.img === lightboxImage);
    if (currentIdx !== -1) {
      setLightboxImage(allColorGalleryItems[(currentIdx - 1 + allColorGalleryItems.length) % allColorGalleryItems.length].img);
    }
  };

  return (
    <div className="w-full bg-cream min-h-screen pt-[50px] sm:pt-[76px] md:pt-[96px]">
      <div className="max-w-7xl mx-auto px-0 lg:px-12">
        
        {/* Product Hero & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-5 lg:gap-y-0 lg:gap-x-10 items-start mb-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative px-0 lg:px-0 lg:col-span-7"
          >
            {/* Mobile Product Gallery */}
            <div className="lg:hidden w-full px-[2px] pt-[2px] mb-4">
              <div className="relative w-full overflow-hidden">
                <div 
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="w-full flex overflow-x-auto snap-x snap-mandatory gap-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden overscroll-x-contain"
                  style={{ 
                    scrollSnapType: 'x mandatory',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  {allColorGalleryItems.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="relative w-full min-w-full shrink-0 aspect-square bg-stone/15 overflow-hidden snap-start snap-always rounded-none select-none"
                      style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
                    >
                      <img 
                        src={item.img} 
                        alt={`Macrame Belt ${item.color} view ${item.subIndex + 1}`} 
                        onClick={() => setLightboxImage(item.img)}
                        className="w-full h-full object-cover object-center cursor-zoom-in select-none pointer-events-auto"
                        draggable="false"
                        loading={idx < 4 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </div>

                {/* Zoom Icon (Mobile) */}
                <div className="absolute bottom-2.5 right-2.5 pointer-events-none flex items-center gap-1 bg-black/60 backdrop-blur-md text-white text-[9px] px-2 py-0.5 rounded-full font-medium tracking-wider shadow-sm z-10">
                  <ZoomIn className="w-3 h-3 stroke-[2]" />
                  <span>Tap to zoom</span>
                </div>
              </div>

              {/* Thumbnails Underneath Product Image */}
              <div className="flex gap-1.5 sm:gap-2 mt-2 w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToSubIndex(idx)}
                    className={`relative aspect-square w-[calc((100%-5*0.375rem)/6)] shrink-0 overflow-hidden transition-all duration-300 rounded-[4px] cursor-pointer ${
                      currentSubIndex === idx
                        ? 'border border-terracotta/75 shadow-xs'
                        : 'border border-black/[0.08] hover:border-black/20'
                    }`}
                    aria-label={`Select product image ${idx + 1}`}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${idx + 1}`} 
                      className="w-full h-full object-cover object-center rounded-[4px]"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop 2-Column Grid */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-full aspect-square bg-stone/10 overflow-hidden group rounded-none">
                  <motion.img 
                    key={selectedColor + idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src={img} 
                    alt={`Macrame Belt ${selectedColor} view ${idx + 1}`} 
                    onClick={() => setLightboxImage(img)}
                    className="absolute inset-0 w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 cursor-zoom-in"
                  />
                  {idx === 0 && (
                    <div className="absolute bottom-4 left-4 pointer-events-none mix-blend-difference text-white z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-6 h-6 stroke-[1.5]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col px-4 sm:px-6 lg:px-0 lg:pt-0 lg:col-span-5"
          >
            {/* Header / Title */}
            <h1 className="text-2xl lg:text-3xl font-serif text-soft-black mb-1 md:mb-2 mt-2 lg:mt-0 font-medium">AST Handmade Macramé Belt</h1>
            <p className="text-xs md:text-sm font-light italic text-dark-charcoal/80 mb-2 md:mb-3 leading-relaxed">
              Export-grade artisanal macramé with retail-ready finishing. Exceptional craftsmanship built to elevate your brand’s collection.
            </p>
            <p className="text-[10px] md:text-xs font-sans tracking-widest uppercase text-terracotta font-medium mb-3 md:mb-4">Unisex Design • 100% Cotton</p>
            
            {/* Price Display */}
            <div className="mb-6">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-2xl md:text-3xl font-serif text-soft-black font-semibold">
                  {currencySymbol}{Math.round(totalPriceLocal).toLocaleString()}
                </span>
                {quantity === 1 ? (
                  <button
                    type="button"
                    onClick={() => setQuantity(2)}
                    className="inline-flex items-center gap-1.5 bg-red-100 hover:bg-red-200/90 text-red-800 px-2.5 py-1 rounded-lg text-[11px] md:text-xs font-bold tracking-tight transition-all cursor-pointer group"
                    title="Click to select 2 belts & save"
                  >
                    <Tag className="w-3.5 h-3.5 text-red-700 group-hover:scale-110 transition-transform shrink-0" />
                    <span>Buy 2 for {currencySymbol}{Math.round(1490 * exchangeRate).toLocaleString()} <span className="font-semibold text-red-700/90">(Save {currencySymbol}{Math.round(210 * exchangeRate).toLocaleString()})</span> &rarr;</span>
                  </button>
                ) : (
                  <>
                    <span className="text-sm md:text-base line-through text-dark-charcoal/40 font-sans">
                      {currencySymbol}{Math.round(regularPriceLocal).toLocaleString()}
                    </span>
                    <span className="text-xs md:text-sm font-semibold text-white bg-red-600 px-2.5 py-0.5 rounded-md shadow-xs">
                      {currencySymbol}{Math.round(unitPriceLocal).toLocaleString()}/pc
                    </span>
                    {savingsBDT > 0 && (
                      <span className="text-[11px] font-bold text-white bg-red-600 px-2.5 py-0.5 rounded-full shadow-xs">
                        Save {currencySymbol}{Math.round(savingsLocal).toLocaleString()}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Standard Product Configurator: Color Swatch + Size + Quantity */}
            <div className="space-y-5 mb-6">
              
              {/* 1. Color Swatches */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-soft-black">
                    Color: <span className="font-semibold text-terracotta">{selectedColor}</span>
                  </span>

                  {/* Policy Link */}
                  <button 
                    type="button"
                    onClick={() => setIsSamplePolicyOpen(true)}
                    className="text-[10px] md:text-[11px] font-bold tracking-wider uppercase text-soft-black/80 hover:text-soft-black transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 stroke-[2.2]" />
                    <span className="underline underline-offset-4">Sample Order Policy</span>
                  </button>
                </div>
                <div className="flex flex-nowrap gap-1.5 sm:gap-2 md:gap-2.5">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => handleColorChange(color.name)}
                      className={`w-9 h-9 md:w-10 md:h-10 rounded-full border-2 transition-all duration-300 shrink-0 cursor-pointer ${selectedColor === color.name ? 'border-soft-black p-[2px]' : 'border-transparent'}`}
                      aria-label={`Select ${color.name}`}
                    >
                      <div className="w-full h-full rounded-full shadow-sm" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Size Selector & Quantity Row */}
              {/* 2. Size Selector & Quantity Row (Side by side on all screen sizes) */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
                
                {/* Size Selector */}
                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-soft-black shrink-0">
                      Size: <span className="font-semibold text-terracotta">{selectedSize}</span>
                    </label>
                    <span className="text-stone-300 text-xs shrink-0">•</span>
                    <button 
                      type="button"
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-xs font-bold uppercase tracking-wider text-soft-black hover:text-dark-charcoal transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Ruler className="w-3.5 h-3.5 text-terracotta shrink-0" />
                      <span className="underline underline-offset-4">Size Guide</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                    {['M', 'L'].map(s => {
                      const isSelected = selectedSize === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleSizeChange(s)}
                          className={`h-[52px] rounded-xl border text-center font-bold text-sm transition-all cursor-pointer flex items-center justify-center ${
                            isSelected
                              ? 'bg-soft-black text-cream border-soft-black shadow-xs'
                              : 'bg-white text-soft-black border-stone/20 hover:border-stone/40'
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div>
                  <div className="flex items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-soft-black">
                      Quantity
                    </label>
                  </div>
                  <div className="flex items-center h-[52px] bg-white border border-stone/20 rounded-xl p-1 sm:p-1.5">
                    <button
                      type="button"
                      onClick={() => handleQuantityUpdate(quantity - 1)}
                      disabled={quantity <= 1}
                      className="w-8 sm:w-10 h-full rounded-lg bg-stone/10 hover:bg-stone/20 text-soft-black font-bold flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shrink-0"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex-1 text-center font-bold text-sm text-soft-black select-none">
                      {quantity}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleQuantityUpdate(quantity + 1)}
                      disabled={quantity >= 20}
                      className="w-8 sm:w-10 h-full rounded-lg bg-stone/10 hover:bg-stone/20 text-soft-black font-bold flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shrink-0"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* CTA & Wishlist Buttons */}
            <div className="flex flex-col gap-3 md:gap-3.5 mb-8 md:mb-10">
              {/* Shipping Status */}
              <div className="text-center">
                <p className="text-[10px] md:text-xs font-semibold text-soft-black/80 tracking-wide">
                  ✈️ {currentShipping.carrier} to {userCountry} ({currentShipping.transit}): {currencySymbol}{currentShipping.costLocal.toFixed(2)}
                </p>
              </div>

              {/* Main Primary Add to Cart + Wishlist Button Row */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                {/* Primary Add to Cart CTA */}
                <button 
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2.5 bg-soft-black text-cream px-6 py-4 md:py-4.5 text-xs font-bold uppercase tracking-[0.18em] rounded-2xl hover:bg-dark-charcoal transition-all shadow-md active:scale-[0.99] cursor-pointer group"
                >
                  <ShoppingBag className="w-4 h-4 text-cream transition-transform group-hover:scale-110" />
                  <span>ADD TO CART</span>
                  <span className="text-cream/40">•</span>
                  <span>{currencySymbol}{Math.round(totalPriceLocal).toLocaleString()}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={handleToggleWishlistClick}
                  className={`h-[52px] w-[52px] md:h-[54px] md:w-[54px] flex items-center justify-center rounded-2xl border transition-all duration-300 cursor-pointer shrink-0 ${
                    isWishlisted
                      ? 'bg-rose-50 border-rose-300 text-rose-600 shadow-sm'
                      : 'bg-white border-stone/20 text-soft-black hover:border-soft-black/40 hover:text-rose-600 shadow-2xs'
                  }`}
                  title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                  aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <Heart 
                    className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 ${
                      isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : 'stroke-[1.75]'
                    }`} 
                  />
                </button>
              </div>
              
              <Link 
                to="/sample-wholesale" 
                className="w-full flex items-center justify-center bg-transparent border border-soft-black text-soft-black px-8 py-3.5 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-soft-black/5 transition-colors text-center"
              >
                Wholesale Inquiry
              </Link>
            </div>

            {/* Expandable Accordions */}
            <div className="bg-white sm:bg-transparent border border-stone/20 sm:border-t sm:border-x-0 sm:border-b-0 sm:border-stone/30 p-2 sm:p-0 rounded-2xl sm:rounded-none overflow-hidden shadow-xs sm:shadow-none mb-6 sm:mb-0">
              <Accordion 
                title={
                  <div className="flex items-center gap-2.5">
                    <AlignLeft className="w-4 h-4 text-terracotta shrink-0" />
                    <span>Description</span>
                  </div>
                } 
                isOpen={!!openAccordions['description']} 
                onClick={() => toggleAccordion('description')}
              >
                <div className="space-y-2.5 text-sm md:text-base text-dark-charcoal/85 leading-relaxed font-light">
                  <p>
                    Expertly hand-knotted by skilled Bangladeshi artisans using 100% premium cotton cord. Designed to adapt naturally to your waist without the stiff discomfort of traditional belts, finished with a heavy-duty, anti-rust zinc-alloy buckle.
                  </p>
                  <p>
                    Whether paired with denim, chinos, or casual ethnic wear, it adds a textured, minimalist statement to your everyday wardrobe.
                  </p>
                </div>
              </Accordion>

              <Accordion 
                title={
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-terracotta shrink-0" />
                    <span>Materials & Specifications</span>
                  </div>
                } 
                isOpen={!!openAccordions['materials']} 
                onClick={() => toggleAccordion('materials')}
              >
                <ul className="space-y-2 pt-1 text-sm md:text-base text-dark-charcoal/85 font-light">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-[0.55rem] mr-2.5 flex-shrink-0"></span>
                    <span><strong className="font-semibold text-soft-black">Cord:</strong> 100% natural, eco-friendly high-grade braided cotton</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-[0.55rem] mr-2.5 flex-shrink-0"></span>
                    <span><strong className="font-semibold text-soft-black">Hardware:</strong> Rust-resistant metal pin buckle with matte brushed finish</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-[0.55rem] mr-2.5 flex-shrink-0"></span>
                    <span><strong className="font-semibold text-soft-black">Width:</strong> 4 cm (1.6 in) perfectly fits standard pant & denim loops</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-[0.55rem] mr-2.5 flex-shrink-0"></span>
                    <span><strong className="font-semibold text-soft-black">Flexibility:</strong> Micro-adjustable weave — fasten the buckle prong at any point along the belt for a custom fit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-[0.55rem] mr-2.5 flex-shrink-0"></span>
                    <span><strong className="font-semibold text-soft-black">Origin:</strong> Proudly handcrafted in Bangladesh</span>
                  </li>
                </ul>
              </Accordion>

              <Accordion 
                title={
                  <div className="flex items-center gap-2.5">
                    <SlidersHorizontal className="w-4 h-4 text-terracotta shrink-0" />
                    <span>Customization & OEM Capabilities</span>
                  </div>
                } 
                isOpen={!!openAccordions['custom']} 
                onClick={() => toggleAccordion('custom')}
              >
                <div className="space-y-3 pt-1 text-sm md:text-base text-dark-charcoal/85 font-light">
                  <p className="leading-relaxed">
                    Our workshop provides complete OEM/ODM manufacturing and private-label customization for brands, boutiques, and corporate buyers:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-[0.55rem] mr-2.5 flex-shrink-0"></span>
                      <span><strong className="font-semibold text-soft-black">Bespoke Colorways:</strong> Pantone-accurate color dyeing, multi-tone weave patterns, and seasonal palette runs.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-[0.55rem] mr-2.5 flex-shrink-0"></span>
                      <span><strong className="font-semibold text-soft-black">Hardware & Logo Engraving:</strong> Custom buckle finishes (Matte Black, Antique Brass, Brushed Nickel, Gunmetal) with laser-engraved brand logos.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-[0.55rem] mr-2.5 flex-shrink-0"></span>
                      <span><strong className="font-semibold text-soft-black">Custom Dimensions:</strong> Tailored widths (3.0 cm to 5.0 cm) and extended waist size gradings tailored to your demographic.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-[0.55rem] mr-2.5 flex-shrink-0"></span>
                      <span><strong className="font-semibold text-soft-black">Private Label & Packaging:</strong> Custom woven brand tags, embossed kraft gift boxes, organic cotton dust pouches, and retail-ready barcode hangtags.</span>
                    </li>
                  </ul>
                </div>
              </Accordion>
            </div>
          </motion.div>
        </div>
        
      </div>
      
      {/* Size Guide Modal */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute inset-0 bg-soft-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white border border-stone/20 w-full max-w-sm p-6 relative z-10 shadow-2xl rounded-xl text-center"
            >
              <button 
                onClick={() => setIsSizeGuideOpen(false)}
                className="absolute top-4 right-4 text-soft-black/40 hover:text-soft-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <img src="/logo_black.png" alt="AST Logo" className="h-5 w-auto mx-auto mb-4 object-contain opacity-80" />
              
              <h2 className="text-xl font-serif text-soft-black mb-5">Sizing Guide</h2>
              
              <div className="w-full bg-stone/5 rounded-lg border border-stone/10 overflow-hidden mb-4">
                <div className="grid grid-cols-3 bg-stone/10 border-b border-stone/10 py-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-dark-charcoal">Size</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-dark-charcoal">Waist</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-dark-charcoal">Length</span>
                </div>
                <div className="grid grid-cols-3 py-3 border-b border-stone/10/50">
                  <span className="text-sm font-semibold text-soft-black">M</span>
                  <span className="text-sm text-soft-black/80">32–35"</span>
                  <span className="text-sm text-soft-black/80">38"</span>
                </div>
                <div className="grid grid-cols-3 py-3">
                  <span className="text-sm font-semibold text-soft-black">L</span>
                  <span className="text-sm text-soft-black/80">35–38"</span>
                  <span className="text-sm text-soft-black/80">42"</span>
                </div>
              </div>

              <div className="flex justify-between items-center px-4 py-3 bg-stone/5 rounded-lg border border-stone/10 mb-4">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-dark-charcoal">Belt Width</span>
                 <span className="text-xs font-semibold text-soft-black">4 cm</span>
              </div>
              
              <p className="italic font-light text-dark-charcoal/70 text-[11px] leading-relaxed px-2">
                * Our macramé weave is naturally flexible, offering a slightly adjustable and comfortable fit.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sample Policy Modal - Monochromatic Design */}
      <AnimatePresence>
        {isSamplePolicyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSamplePolicyOpen(false)}
              className="absolute inset-0 bg-soft-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white border border-stone/20 w-full max-w-md p-6 sm:p-7 relative z-10 shadow-2xl rounded-xl text-center max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsSamplePolicyOpen(false)}
                className="absolute top-4 right-4 text-soft-black/40 hover:text-soft-black transition-colors cursor-pointer p-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <img src="/logo_black.png" alt="AST Logo" className="h-5 w-auto mx-auto mb-4 object-contain opacity-80" />
              
              <h2 className="text-xl font-serif text-soft-black mb-1 font-medium">Sample Order Policy</h2>
              <p className="text-xs text-dark-charcoal/70 mb-5">
                Commercial evaluation guidelines for brand buyers & partners.
              </p>

              {/* Monochromatic Policy Sections */}
              <div className="w-full bg-stone/5 rounded-lg border border-stone/10 p-4 sm:p-4.5 text-left space-y-3.5 mb-4">
                
                {/* 1. 100% Rebate */}
                <div className="flex items-start gap-3">
                  <Tag className="w-4 h-4 text-soft-black shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-soft-black uppercase tracking-wider block">100% Sample Rebate</span>
                    <p className="text-xs text-dark-charcoal/80 leading-relaxed mt-0.5">
                      The full sample purchase cost is credited back towards your first wholesale bulk order invoice.
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-stone/15"></div>

                {/* 2. Strategic Tiered Pricing */}
                <div className="flex items-start gap-3">
                  <Zap className="w-4 h-4 text-soft-black shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-soft-black uppercase tracking-wider block">Tiered Sample Pricing</span>
                    <p className="text-xs text-dark-charcoal/80 leading-relaxed mt-0.5">
                      1 pc ৳850 • 2 pcs ৳1,490 (Save ৳210) • 3 pcs ৳2,090 • 5 pcs ৳3,150. Volume savings apply automatically.
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-stone/15"></div>

                {/* 3. Dispatch & Payment */}
                <div className="flex items-start gap-3">
                  <Truck className="w-4 h-4 text-soft-black shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-soft-black uppercase tracking-wider block">Delivery & Payment</span>
                    <p className="text-xs text-dark-charcoal/80 leading-relaxed mt-0.5">
                      Cash on Delivery (COD) nationwide in Bangladesh. Express courier dispatch for international destinations.
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-stone/15"></div>

                {/* 4. Quality Evaluation Terms */}
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-soft-black shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-soft-black uppercase tracking-wider block">Evaluation Terms</span>
                    <p className="text-xs text-dark-charcoal/80 leading-relaxed mt-0.5">
                      Samples are provided for physical quality inspection prior to volume manufacturing. Freight charges cover direct transit.
                    </p>
                  </div>
                </div>

              </div>
              
              <p className="italic font-light text-dark-charcoal/70 text-[11px] leading-relaxed px-2">
                * Evaluate craftsmanship with complete confidence, knowing sample expenses are credited upon bulk PO confirmation.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <div 
            className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-black/95 px-2 sm:px-4 py-3 sm:py-4 overflow-hidden select-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEndEvent}
          >
            {/* Top Bar with Counter & Close */}
            <div className="w-full flex items-center justify-between px-2 sm:px-6 z-[120]">
              <div className="text-white/75 text-xs sm:text-sm font-mono tracking-wider">
                {images.indexOf(lightboxImage) + 1} / {images.length}
              </div>
              <button 
                onClick={() => setLightboxImage(null)}
                className="text-white/80 hover:text-white transition-all hover:scale-110 p-2 cursor-pointer bg-white/10 hover:bg-white/20 rounded-full"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Main Zoomable Image View */}
            <div className="relative flex items-center justify-center w-full flex-1 max-h-[70vh] sm:max-h-[75vh] md:max-h-[78vh] my-auto">
              <button 
                onClick={handlePrevImage}
                className="absolute left-2 sm:left-4 md:left-8 text-white z-[110] p-2 sm:p-3 bg-black/40 hover:bg-black/70 backdrop-blur-sm rounded-full transition-all cursor-pointer shadow-lg"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
              </button>
              
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <TransformWrapper
                  initialScale={1}
                  minScale={1}
                  maxScale={4}
                  centerOnInit={true}
                  doubleClick={{ mode: "toggle" }}
                  wheel={{ step: 0.1 }}
                >
                  {({ zoomIn, zoomOut, resetTransform }) => (
                    <React.Fragment>
                      <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                        <img 
                          src={lightboxImage} 
                          alt="Product Zoom"
                          className="w-full h-full object-contain cursor-grab active:cursor-grabbing bg-transparent select-none"
                          draggable="false"
                        />
                      </TransformComponent>
                      
                      {/* Zoom Controls */}
                      <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-5 z-[110] bg-black/75 backdrop-blur-md px-4 sm:px-6 py-2 rounded-full border border-white/20 shadow-2xl">
                        <button onClick={() => zoomOut()} className="text-white/80 hover:text-white hover:scale-110 transition-all p-1 cursor-pointer" title="Zoom Out">
                          <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button onClick={() => resetTransform()} className="flex items-center gap-1.5 text-[10px] sm:text-xs text-white/90 font-mono uppercase tracking-widest hover:text-white hover:scale-105 transition-all px-2.5 py-0.5 border-x border-white/25 cursor-pointer" title="Reset View">
                          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span>Reset</span>
                        </button>
                        <button onClick={() => zoomIn()} className="text-white/80 hover:text-white hover:scale-110 transition-all p-1 cursor-pointer" title="Zoom In">
                          <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </React.Fragment>
                  )}
                </TransformWrapper>
              </div>

              <button 
                onClick={handleNextImage}
                className="absolute right-2 sm:right-4 md:right-8 text-white z-[110] p-2 sm:p-3 bg-black/40 hover:bg-black/70 backdrop-blur-sm rounded-full transition-all cursor-pointer shadow-lg"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="w-full h-16 sm:h-20 flex items-center justify-center gap-2 sm:gap-3 px-4 z-[110]">
               {images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setLightboxImage(img)}
                    className={`w-12 h-12 sm:w-14 sm:h-14 aspect-square shrink-0 rounded-none overflow-hidden border-2 transition-all cursor-pointer ${
                      lightboxImage === img 
                        ? 'border-terracotta scale-105 shadow-md opacity-100' 
                        : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                    aria-label={`View thumbnail ${idx + 1}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx + 1}`} />
                  </button>
               ))}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Features Grid */}
      <section className="pt-12 md:pt-20 pb-8 md:pb-12 bg-cotton-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full">
            
            {/* Bento Card 1: Premium Materials */}
            <div className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 w-full aspect-[3/2]">
              <img src="/premium_materials_bento.jpg" alt="Premium Materials" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-85 md:opacity-75 md:group-hover:opacity-95 transition-opacity duration-500"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10 flex flex-col justify-end">
                <div className="flex items-center gap-3 md:gap-4 transform transition-transform duration-500 md:group-hover:-translate-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-white leading-tight">Premium Materials</h3>
                </div>
                
                <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out opacity-100 md:opacity-0 md:group-hover:opacity-100">
                  <div className="overflow-hidden">
                    <p className="text-white/80 text-xs md:text-sm leading-relaxed mt-2 pb-2">
                      We source only high-quality cotton macramé cord and rust-resistant, durable metal buckles for every piece.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bento Card 2: OEM & Private Label */}
            <div className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 w-full aspect-[3/2]">
              <img src="/oem_private_label_bento.jpg" alt="OEM & Private Label" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-85 md:opacity-75 md:group-hover:opacity-95 transition-opacity duration-500"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10 flex flex-col justify-end">
                <div className="flex items-center gap-3 md:gap-4 transform transition-transform duration-500 md:group-hover:-translate-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                      <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-white leading-tight">OEM &<br/>Private Label</h3>
                </div>
                
                <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out opacity-100 md:opacity-0 md:group-hover:opacity-100">
                  <div className="overflow-hidden">
                    <p className="text-white/80 text-xs md:text-sm leading-relaxed mt-2 pb-2">
                      Complete customization including custom tags, packaging, bespoke colors, and specific size requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bento Card 3: Quality Assured */}
            <div className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 w-full aspect-[3/2]">
              <img src="/quality_assured_bento.jpg" alt="Quality Assured" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-85 md:opacity-75 md:group-hover:opacity-95 transition-opacity duration-500"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10 flex flex-col justify-end">
                <div className="flex items-center gap-3 md:gap-4 transform transition-transform duration-500 md:group-hover:-translate-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-white leading-tight">Quality Assured</h3>
                </div>
                
                <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out opacity-100 md:opacity-0 md:group-hover:opacity-100">
                  <div className="overflow-hidden">
                    <p className="text-white/80 text-xs md:text-sm leading-relaxed mt-2 pb-2">
                      Every belt undergoes rigorous individual inspection covering weaving quality, size accuracy, and buckle strength.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default SampleOrder;
