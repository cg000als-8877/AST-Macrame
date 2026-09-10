import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Minus, 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Info, 
  ShoppingBag, 
  Ruler, 
  Tag, 
  Zap, 
  Check, 
  AlignLeft, 
  Layers, 
  Sliders 
} from 'lucide-react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useCartWishlist } from '../context/CartWishlistContext';
import { PRODUCTS } from '../data/products';

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
    openCartTemporarily,
    currencySymbol,
    exchangeRate,
    userCountry,
    getShippingQuote
  } = useCartWishlist();

  const [searchParams, setSearchParams] = useSearchParams();

  // Active Product state (Adult vs Kids)
  const [activeProductId, setActiveProductId] = useState(() => {
    const p = searchParams.get('product');
    return (p && p.toLowerCase().includes('kid')) ? 'kids' : 'adult';
  });

  const activeProduct = PRODUCTS[activeProductId] || PRODUCTS.adult;
  
  const [selectedColor, setSelectedColor] = useState(activeProduct.colors[0].name);
  const [selectedSize, setSelectedSize] = useState(activeProduct.defaultSize);
  const [quantity, setQuantity] = useState(1);

  const [activeIndex, setActiveIndex] = useState(0);
  const [openAccordions, setOpenAccordions] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return { description: true, materials: true, custom: true };
    }
    return { description: true, materials: false, custom: false };
  });
  
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isSamplePolicyOpen, setIsSamplePolicyOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    const p = searchParams.get('product');
    const newProductId = (p && p.toLowerCase().includes('kid')) ? 'kids' : 'adult';
    setActiveProductId(newProductId);

    const prod = PRODUCTS[newProductId] || PRODUCTS.adult;
    const colorParam = searchParams.get('color');
    if (colorParam) {
      const matched = prod.colors.find(c => c.name.toLowerCase() === colorParam.toLowerCase());
      if (matched) {
        setSelectedColor(matched.name);
      } else {
        setSelectedColor(prod.colors[0].name);
      }
    } else {
      setSelectedColor(prod.colors[0].name);
    }

    setSelectedSize(prod.defaultSize);
    setActiveIndex(0);
  }, [searchParams]);

  useEffect(() => {
    document.title = `Sample Order | ${activeProduct.title} - AST Macramé`;
  }, [activeProduct]);

  useEffect(() => {
    if (lightboxImage || isSizeGuideOpen || isSamplePolicyOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [lightboxImage, isSizeGuideOpen, isSamplePolicyOpen]);

  const handleProductSwitch = (newId) => {
    setActiveProductId(newId);
    const prod = PRODUCTS[newId] || PRODUCTS.adult;
    setSelectedColor(prod.colors[0].name);
    setSelectedSize(prod.defaultSize);
    setActiveIndex(0);
    setSearchParams({ product: newId, color: prod.colors[0].name.toLowerCase() });
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'instant' });
    }
  };

  const colors = activeProduct.colors;
  const colorImages = Object.fromEntries(activeProduct.colors.map(c => [c.name, c.images]));

  const allColorGalleryItems = activeProduct.colors.flatMap(c => 
    c.images.map((img, idx) => ({ color: c.name, img, subIndex: idx }))
  );

  const images = colorImages[selectedColor] || activeProduct.colors[0].images;

  const scrollRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const isProgrammaticScrollRef = useRef(false);

  const handleColorChange = (colorName) => {
    setSelectedColor(colorName);
    const targetIdx = allColorGalleryItems.findIndex(item => item.color === colorName);
    if (targetIdx !== -1) {
      isProgrammaticScrollRef.current = true;
      setActiveIndex(targetIdx);
      if (scrollRef.current) {
        const itemWidth = scrollRef.current.clientWidth || scrollRef.current.offsetWidth;
        scrollRef.current.scrollTo({
          left: itemWidth * targetIdx,
          behavior: 'smooth'
        });
      }
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 500);
    }
  };

  const handleSizeChange = (newSize) => {
    setSelectedSize(newSize);
  };

  const handleQuantityUpdate = (newQty) => {
    setQuantity(Math.max(1, Math.min(20, newQty)));
  };

  const singlePriceBDT = activeProduct.singlePriceBDT;
  const regularPriceBDT = singlePriceBDT * quantity;
  const totalPriceBDT = activeProduct.calculateTierPrice(quantity);
  const savingsBDT = Math.max(0, regularPriceBDT - totalPriceBDT);

  const totalPriceLocal = totalPriceBDT * exchangeRate;
  const regularPriceLocal = regularPriceBDT * exchangeRate;
  const savingsLocal = savingsBDT * exchangeRate;
  const currentShipping = getShippingQuote(quantity);

  const nextTierInfo = activeProductId === 'kids' ? {
    1: { targetQty: 2, priceBDT: 1090, saveBDT: 610 },
    2: { targetQty: 3, priceBDT: 1560, saveBDT: 990 },
    3: { targetQty: 4, priceBDT: 1980, saveBDT: 1420 },
    4: { targetQty: 5, priceBDT: 2350, saveBDT: 1900 },
  }[quantity] : {
    1: { targetQty: 2, priceBDT: 1490, saveBDT: 210 },
    2: { targetQty: 3, priceBDT: 2090, saveBDT: 460 },
    3: { targetQty: 4, priceBDT: 2650, saveBDT: 750 },
    4: { targetQty: 5, priceBDT: 3150, saveBDT: 1100 },
  }[quantity];

  const handleAddToCart = () => {
    addToCart({
      id: `sample-${activeProduct.id}-${selectedColor}-${selectedSize}`,
      productId: activeProduct.id,
      title: activeProduct.title,
      color: selectedColor,
      size: selectedSize,
      priceBDT: singlePriceBDT,
      regularPriceBDT: activeProduct.singleRegularPriceBDT,
      image: (colors.find(c => c.name === selectedColor) || colors[0]).images[0],
      isRetail: false
    }, quantity);
    openCartTemporarily(4000);
  };

  const toggleAccordion = (title) => {
    setOpenAccordions(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const handleScroll = (e) => {
    if (isProgrammaticScrollRef.current) return;
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
            if (!isProgrammaticScrollRef.current) {
              setSelectedColor(item.color);
            }
          }, 80);
        }
      }
    }
  };

  const scrollToSubIndex = (subIdx) => {
    const currentColor = selectedColor || activeProduct.colors[0].name;
    const targetIdx = allColorGalleryItems.findIndex(
      item => item.color === currentColor && item.subIndex === subIdx
    );
    if (targetIdx !== -1) {
      isProgrammaticScrollRef.current = true;
      setActiveIndex(targetIdx);
      if (scrollRef.current) {
        const itemWidth = scrollRef.current.clientWidth || scrollRef.current.offsetWidth;
        scrollRef.current.scrollTo({
          left: itemWidth * targetIdx,
          behavior: 'smooth'
        });
      }
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 500);
    }
  };

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
    const currentIdx = images.indexOf(lightboxImage);
    if (currentIdx !== -1) {
      setLightboxImage(images[(currentIdx + 1) % images.length]);
    }
  };

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    const currentIdx = images.indexOf(lightboxImage);
    if (currentIdx !== -1) {
      setLightboxImage(images[(currentIdx - 1 + images.length) % images.length]);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-soft-black pt-16 sm:pt-24 md:pt-28 pb-20 sm:pb-24 selection:bg-terracotta selection:text-cream">
      
      {/* Main Grid */}
      <div className="container mx-auto px-0 sm:px-4 md:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-1.5 sm:gap-y-6 lg:gap-8 items-start mb-6 sm:mb-12">
          
          {/* Gallery Column */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Mobile Carousel */}
            <div className="relative w-full aspect-square sm:hidden mb-2 bg-[#F3EFEA] overflow-hidden select-none">
              <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing"
              >
                {allColorGalleryItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="w-full h-full flex-shrink-0 snap-center relative"
                    onClick={() => setLightboxImage(item.img)}
                  >
                    <img 
                      src={item.img} 
                      alt={`${activeProduct.title} - ${item.color} ${item.subIndex + 1}`}
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/40 text-white backdrop-blur-xs text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                      {item.color} ({item.subIndex + 1}/{images.length})
                    </div>
                  </div>
                ))}
              </div>

              <button 
                type="button"
                onClick={() => setLightboxImage(allColorGalleryItems[activeIndex]?.img || images[0])}
                className="absolute top-3 right-3 p-2 bg-black/40 text-white rounded-full backdrop-blur-xs cursor-pointer active:scale-95"
                aria-label="Inspect Fullscreen"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Sub-Index Thumbnails */}
            <div className="flex sm:hidden justify-center items-center gap-1.5 px-3 mb-3 w-full">
              {images.map((img, subIdx) => {
                const currentGalleryItem = allColorGalleryItems[activeIndex];
                const isSelected = currentGalleryItem?.color === selectedColor && currentGalleryItem?.subIndex === subIdx;
                return (
                  <button
                    key={subIdx}
                    type="button"
                    onClick={() => scrollToSubIndex(subIdx)}
                    className={`w-11 h-11 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-[#F3EFEA] cursor-pointer ${
                      isSelected ? 'border-soft-black scale-105 shadow-xs' : 'border-stone/20 opacity-60'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${subIdx + 1}`} className="w-full h-full object-cover mix-blend-multiply" />
                  </button>
                );
              })}
            </div>

            {/* Desktop 2-column gallery */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-2.5 sm:gap-3 w-full">
              {images.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setLightboxImage(img)}
                  className="relative aspect-square bg-[#F3EFEA] rounded-xl lg:rounded-2xl overflow-hidden cursor-pointer group shadow-2xs hover:shadow-md transition-shadow"
                >
                  <img 
                    src={img} 
                    alt={`${activeProduct.title} - ${selectedColor} view ${idx + 1}`}
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                  {idx === 0 && (
                    <div className="absolute bottom-3 left-3 bg-black/40 text-white backdrop-blur-xs text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md">
                      {selectedColor}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Configurator Column */}
          <div className="flex flex-col px-2.5 sm:px-4 lg:px-0 lg:pt-0 lg:col-span-5">
            
            {/* Collection Switcher Tabs */}
            <div className="flex items-center gap-1.5 mb-3.5 bg-stone/10 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => handleProductSwitch('adult')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeProductId === 'adult'
                    ? 'bg-soft-black text-white shadow-xs'
                    : 'text-soft-black/75 hover:text-soft-black'
                }`}
              >
                Adult Unisex ({PRODUCTS.adult.colors.length} Colors)
              </button>
              <button
                type="button"
                onClick={() => handleProductSwitch('kids')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeProductId === 'kids'
                    ? 'bg-soft-black text-white shadow-xs'
                    : 'text-soft-black/75 hover:text-soft-black'
                }`}
              >
                Kids Collection ({PRODUCTS.kids.colors.length} Colors)
              </button>
            </div>

            {/* Header / Title */}
            <h1 className="text-2xl lg:text-3xl font-serif text-soft-black mb-1 md:mb-2 mt-0 lg:mt-0 font-medium">
              {activeProduct.title}
            </h1>
            
            <p className="text-xs md:text-sm font-light italic text-dark-charcoal/80 mb-2 md:mb-3 leading-relaxed">
              {activeProduct.shortDesc}
            </p>
            
            <p className="text-[10px] md:text-sm font-sans tracking-widest uppercase text-terracotta mb-2 md:mb-3">
              {activeProduct.subtitle}
            </p>
            
            {/* Price Display */}
            <div className="mb-4 md:mb-5 flex items-center gap-2.5 sm:gap-3.5 flex-wrap">
              <span className="text-2xl md:text-3xl font-serif text-soft-black font-semibold">
                {currencySymbol}{Math.round(totalPriceLocal).toLocaleString()}
              </span>
              {quantity > 1 && (
                <span className="text-sm md:text-base line-through text-dark-charcoal/40 font-sans">
                  {currencySymbol}{Math.round(regularPriceLocal).toLocaleString()}
                </span>
              )}

              {nextTierInfo ? (
                <button
                  type="button"
                  onClick={() => handleQuantityUpdate(nextTierInfo.targetQty)}
                  className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-200/80 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Upgrade to next volume discount tier"
                >
                  <Zap className="w-3 h-3 fill-emerald-600 text-emerald-600 shrink-0" />
                  <span>Add {nextTierInfo.targetQty - quantity} more &bull; Save {currencySymbol}{Math.round(nextTierInfo.saveBDT * (exchangeRate || 1)).toLocaleString()}</span>
                </button>
              ) : (
                savingsBDT > 0 && (
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                    Save {currencySymbol}{Math.round(savingsLocal).toLocaleString()}
                  </span>
                )
              )}
            </div>

            {/* Policy / Guide Links */}
            <div className="flex items-center gap-2 md:gap-3 mb-2.5">
              <button 
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold tracking-wider uppercase text-soft-black/80 hover:text-soft-black transition-colors cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5 text-terracotta shrink-0" />
                <span className="underline underline-offset-4">Size Guide</span>
              </button>
            </div>

            {/* Row 1: Side by side Color & Size Selector */}
            <div className="flex flex-row justify-start items-end gap-3 sm:gap-5 md:gap-6 w-full mb-3 sm:mb-4">
              {/* Color Selection */}
              <div>
                <span className="block text-[10px] md:text-xs font-bold tracking-wider uppercase text-soft-black mb-2.5">
                  Color: <span className="font-semibold text-terracotta">{selectedColor}</span>
                </span>
                <div className="flex flex-nowrap gap-1.5 sm:gap-2">
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

              {/* Vertical Partition */}
              <div className="w-[1px] h-9 md:h-10 bg-gradient-to-b from-transparent via-stone/30 to-transparent mb-0.5 shrink-0"></div>

              {/* Size Selection */}
              <div>
                <span className="block text-[10px] md:text-xs font-bold tracking-wider uppercase text-soft-black mb-2.5">
                  Size: <span className="font-semibold text-terracotta">{selectedSize}</span>
                </span>
                <div className="flex gap-1.5 sm:gap-2 justify-start">
                  {activeProduct.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeChange(size)}
                        className={`h-9 md:h-10 px-3 rounded-xl border text-center font-bold text-xs md:text-sm transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-soft-black text-cream border-soft-black shadow-xs'
                            : 'bg-white text-soft-black border-stone/20 hover:border-stone/40'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Row 2: Quantity Stepper & Add to Cart */}
            <div className="flex items-center gap-2 sm:gap-3 mb-1">
              {/* Quantity Stepper */}
              <div className="flex items-center h-[48px] sm:h-[52px] bg-white border border-stone/20 rounded-xl p-1 sm:p-1.5 shrink-0 w-[110px] sm:w-[130px]">
                <button
                  type="button"
                  onClick={() => handleQuantityUpdate(quantity - 1)}
                  disabled={quantity <= 1}
                  className="w-7 sm:w-8 h-full rounded-lg bg-stone/10 hover:bg-stone/20 text-soft-black font-bold flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shrink-0"
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
                  className="w-7 sm:w-8 h-full rounded-lg bg-stone/10 hover:bg-stone/20 text-soft-black font-bold flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shrink-0"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Primary Add to Cart CTA */}
              <button 
                type="button"
                onClick={handleAddToCart}
                className="flex-1 h-[48px] sm:h-[52px] flex items-center justify-center gap-2 bg-soft-black text-cream px-4 sm:px-6 text-xs font-bold uppercase tracking-[0.16em] rounded-xl hover:bg-dark-charcoal transition-all shadow-md active:scale-[0.99] cursor-pointer group"
              >
                <ShoppingBag className="w-4 h-4 text-cream transition-transform group-hover:scale-110" />
                <span>ADD TO CART</span>
              </button>
            </div>

            {/* Sample Order Policy Link (3px gap underneath) */}
            <div className="mt-[3px] mb-4 text-center">
              <button 
                type="button"
                onClick={() => setIsSamplePolicyOpen(true)}
                className="text-[10.5px] sm:text-[11.5px] font-bold tracking-wider uppercase text-soft-black/75 hover:text-soft-black transition-colors inline-flex items-center gap-1.5 cursor-pointer py-1"
              >
                <Info className="w-3.5 h-3.5 stroke-[2.2] text-terracotta" />
                <span className="underline underline-offset-4">Sample Order Policy</span>
              </button>
            </div>

            {/* Shipping Status Note */}
            <div className="text-center mb-4">
              <p className="text-[10px] md:text-xs font-semibold text-soft-black/80 tracking-wide">
                ✈️ {currentShipping.carrier} to {userCountry} ({currentShipping.transit}): {currencySymbol}{currentShipping.costLocal.toFixed(2)}
              </p>
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
                <div className="space-y-3 leading-relaxed text-dark-charcoal/90">
                  <p>{activeProduct.shortDesc}</p>
                  <p>{activeProduct.retailDesc}</p>
                </div>
              </Accordion>

              <Accordion 
                title={
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-terracotta shrink-0" />
                    <span>Materials & Hardware Specifications</span>
                  </div>
                } 
                isOpen={!!openAccordions['materials']} 
                onClick={() => toggleAccordion('materials')}
              >
                <ul className="space-y-2.5 text-dark-charcoal/90 text-xs sm:text-sm">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-[0.55rem] mr-2.5 flex-shrink-0"></span>
                    <span><strong className="font-semibold text-soft-black">Weave Material:</strong> 100% natural, high-tensile organic cotton cord.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-[0.55rem] mr-2.5 flex-shrink-0"></span>
                    <span><strong className="font-semibold text-soft-black">Hardware:</strong> Anti-rust metal pin buckle with matte brushed finish.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-[0.55rem] mr-2.5 flex-shrink-0"></span>
                    <span><strong className="font-semibold text-soft-black">Dimensions:</strong> {activeProduct.dimensionsText || activeProduct.sizeGuide?.width}.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-[0.55rem] mr-2.5 flex-shrink-0"></span>
                    <span><strong className="font-semibold text-soft-black">Finish Quality:</strong> Zero synthetic glue, hand-sealed finished cord ends.</span>
                  </li>
                </ul>
              </Accordion>

              <Accordion 
                title={
                  <div className="flex items-center gap-2.5">
                    <Sliders className="w-4 h-4 text-terracotta shrink-0" />
                    <span>OEM & Custom Production Capability</span>
                  </div>
                } 
                isOpen={!!openAccordions['custom']} 
                onClick={() => toggleAccordion('custom')}
              >
                <div className="space-y-3 leading-relaxed text-dark-charcoal/90 text-xs sm:text-sm">
                  <p>
                    All samples serve as direct reference standards for our commercial OEM and wholesale manufacturing:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-[0.55rem] mr-2.5 flex-shrink-0"></span>
                      <span><strong className="font-semibold text-soft-black">Custom Pantone Dyeing:</strong> Lab-dip color matching to your brand's seasonal color palette.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-[0.55rem] mr-2.5 flex-shrink-0"></span>
                      <span><strong className="font-semibold text-soft-black">Custom Dimensions:</strong> Tailored widths (3.0 cm to 5.0 cm) and custom length gradings.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-[0.55rem] mr-2.5 flex-shrink-0"></span>
                      <span><strong className="font-semibold text-soft-black">Private Label & Packaging:</strong> Custom woven tags, embossed gift boxes, and barcode hangtags.</span>
                    </li>
                  </ul>
                </div>
              </Accordion>
            </div>
          </div>
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
              className="bg-white border border-stone/20 w-full max-w-sm p-6 relative z-10 shadow-2xl rounded-2xl text-center"
            >
              <button 
                onClick={() => setIsSizeGuideOpen(false)}
                className="absolute top-4 right-4 text-soft-black/40 hover:text-soft-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <img src="/logo_black.png" alt="AST Logo" className="h-5 w-auto mx-auto mb-4 object-contain opacity-80" />
              
              <h2 className="text-xl font-serif text-soft-black mb-1 font-bold">{activeProduct.sizeGuide?.title || 'Sizing Guide'}</h2>
              <p className="text-xs text-dark-charcoal/70 mb-4">Measurement specifications for {activeProduct.title}</p>
              
              <div className="w-full bg-stone/5 rounded-xl border border-stone/10 overflow-hidden mb-4 text-xs">
                <div className="grid grid-cols-3 bg-stone/10 border-b border-stone/10 py-2 font-bold uppercase tracking-widest text-dark-charcoal">
                  {activeProduct.sizeGuide?.columns?.map((c, i) => (
                    <span key={i}>{c}</span>
                  ))}
                </div>
                {activeProduct.sizeGuide?.rows?.map((r, i) => (
                  <div key={i} className="grid grid-cols-3 py-3 border-b border-stone/10 last:border-b-0">
                    <span className="font-bold text-soft-black">{r.size}</span>
                    <span className="text-soft-black/80">{r.waist}</span>
                    <span className="text-soft-black/80">{r.length}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center px-4 py-2.5 bg-stone/5 rounded-xl border border-stone/10 mb-4 text-xs">
                <span className="font-bold uppercase tracking-widest text-dark-charcoal">Belt Width</span>
                <span className="font-bold text-soft-black">{activeProduct.sizeGuide?.width}</span>
              </div>
              
              <p className="italic font-light text-dark-charcoal/70 text-[11px] leading-relaxed px-2">
                {activeProduct.sizeGuide?.note}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sample Policy Modal */}
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
              className="bg-white border border-stone/20 w-full max-w-md p-6 sm:p-7 relative z-10 shadow-2xl rounded-2xl text-center max-h-[90vh] overflow-y-auto"
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

              <div className="w-full bg-stone/5 rounded-xl border border-stone/10 p-4 sm:p-4.5 text-left space-y-3.5 mb-4 text-xs">
                
                <div className="flex items-start gap-3">
                  <Tag className="w-4 h-4 text-soft-black shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-soft-black uppercase tracking-wider block">100% Sample Rebate</span>
                    <p className="text-dark-charcoal/80 leading-relaxed mt-0.5">
                      The full sample purchase cost is credited back towards your first wholesale bulk order invoice.
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-stone/15"></div>

                <div className="flex items-start gap-3">
                  <Zap className="w-4 h-4 text-soft-black shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-soft-black uppercase tracking-wider block">Tiered Sample Pricing ({activeProduct.title})</span>
                    <p className="text-dark-charcoal/80 leading-relaxed mt-0.5">
                      {activeProductId === 'kids' ? (
                        <>1 pc {currencySymbol}{Math.round(600 * (exchangeRate || 1)).toLocaleString()} &bull; 2 pcs {currencySymbol}{Math.round(1090 * (exchangeRate || 1)).toLocaleString()} (Save {currencySymbol}{Math.round(610 * (exchangeRate || 1)).toLocaleString()}) &bull; 3 pcs {currencySymbol}{Math.round(1560 * (exchangeRate || 1)).toLocaleString()} &bull; 5 pcs {currencySymbol}{Math.round(2350 * (exchangeRate || 1)).toLocaleString()}. Volume savings apply automatically.</>
                      ) : (
                        <>1 pc {currencySymbol}{Math.round(850 * (exchangeRate || 1)).toLocaleString()} &bull; 2 pcs {currencySymbol}{Math.round(1490 * (exchangeRate || 1)).toLocaleString()} (Save {currencySymbol}{Math.round(210 * (exchangeRate || 1)).toLocaleString()}) &bull; 3 pcs {currencySymbol}{Math.round(2090 * (exchangeRate || 1)).toLocaleString()} &bull; 5 pcs {currencySymbol}{Math.round(3150 * (exchangeRate || 1)).toLocaleString()}. Volume savings apply automatically.</>
                      )}
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-stone/15"></div>

                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-soft-black shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-soft-black uppercase tracking-wider block">Production Standard Guarantee</span>
                    <p className="text-dark-charcoal/80 leading-relaxed mt-0.5">
                      All sample items are handcrafted using identical materials, knot density, and hardware to your future mass production run.
                    </p>
                  </div>
                </div>

              </div>

              <button
                type="button"
                onClick={() => setIsSamplePolicyOpen(false)}
                className="w-full bg-soft-black text-white hover:bg-dark-charcoal py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                I Understand &bull; Continue Order
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-black/95 px-2 sm:px-4 py-3 sm:py-4 overflow-hidden select-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEndEvent}
        >
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

          <div className="relative flex items-center justify-center w-full flex-1 max-h-[70vh] sm:max-h-[75vh] md:max-h-[78vh] my-auto">
            <button 
              onClick={handlePrevImage}
              className="absolute left-2 sm:left-4 md:left-8 text-white z-[110] p-2 sm:p-3 bg-black/40 hover:bg-black/70 backdrop-blur-sm rounded-full transition-all cursor-pointer shadow-lg"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>
            
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <TransformWrapper initialScale={1} minScale={1} maxScale={4} centerOnInit={true}>
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                      <img 
                        src={lightboxImage} 
                        alt="Product Zoom" 
                        className="w-full h-full object-contain cursor-grab active:cursor-grabbing bg-transparent select-none"
                        draggable="false"
                      />
                    </TransformComponent>
                    
                    <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-5 z-[110] bg-black/75 backdrop-blur-md px-4 sm:px-6 py-2 rounded-full border border-white/20 shadow-2xl">
                      <button onClick={() => zoomOut()} className="text-white/80 hover:text-white p-1 cursor-pointer">
                        <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button onClick={() => resetTransform()} className="flex items-center gap-1.5 text-[10px] sm:text-xs text-white/90 font-mono uppercase tracking-widest px-2.5 py-0.5 border-x border-white/25 cursor-pointer">
                        <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Reset</span>
                      </button>
                      <button onClick={() => zoomIn()} className="text-white/80 hover:text-white p-1 cursor-pointer">
                        <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </>
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

          <div className="w-full h-16 sm:h-20 flex items-center justify-center gap-2 sm:gap-3 px-4 z-[110]">
            {images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setLightboxImage(img)}
                className={`w-12 h-12 sm:w-14 sm:h-14 aspect-square shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  lightboxImage === img 
                    ? 'border-terracotta scale-105 shadow-md opacity-100' 
                    : 'border-transparent opacity-50 hover:opacity-80'
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default SampleOrder;
