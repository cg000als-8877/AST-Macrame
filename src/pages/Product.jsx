import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Minus, X, ZoomIn, ZoomOut, RotateCcw, Info, Heart, ShoppingBag } from 'lucide-react';
import SampleOrderDrawer from '../components/SampleOrderDrawer';
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

import { useCartWishlist } from '../context/CartWishlistContext';

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

const Product = () => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setIsCartOpen,
    localCurrency,
    currencySymbol,
    exchangeRate,
    userCountry,
    userCountryCode,
    userCallingCode,
    getShippingQuote
  } = useCartWishlist();
  
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isCustomizingMultiPieces, setIsCustomizingMultiPieces] = useState(false);
  const [customizedPieces, setCustomizedPieces] = useState([
    { color: 'Black', size: 'M' }
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [openAccordions, setOpenAccordions] = useState({
    description: true,
    materials: false,
    custom: false
  });
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isSamplePolicyOpen, setIsSamplePolicyOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    document.title = "AST Handmade Macramé Belt | Sample & Wholesale Order - AST Macramé";
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

  const images = colorImages[selectedColor] || colorImages.Black;

  const handleColorChange = (colorName) => {
    setSelectedColor(colorName);
    setActiveIndex(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
    // Also update piece 1 or all uniform pieces if not customized
    if (!isCustomizingMultiPieces) {
      setCustomizedPieces(Array.from({ length: quantity }, () => ({ color: colorName, size: selectedSize })));
    }
  };

  const handleSizeChange = (newSize) => {
    setSelectedSize(newSize);
    if (!isCustomizingMultiPieces) {
      setCustomizedPieces(Array.from({ length: quantity }, (_, i) => ({
        color: customizedPieces[i]?.color || selectedColor,
        size: newSize
      })));
    }
  };

  const handleQuantityUpdate = (newQty) => {
    setQuantity(newQty);
    setCustomizedPieces(prev => {
      const next = [];
      for (let i = 0; i < newQty; i++) {
        if (prev[i]) {
          next.push(prev[i]);
        } else {
          // Default to distinct colors if available
          next.push({
            color: colors[i % colors.length].name,
            size: selectedSize
          });
        }
      }
      return next;
    });
  };

  const handleIndividualPieceColorChange = (index, colorName) => {
    setCustomizedPieces(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], color: colorName };
      return copy;
    });
  };

  const handleIndividualPieceSizeChange = (index, sizeVal) => {
    setCustomizedPieces(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], size: sizeVal };
      return copy;
    });
  };

  const handleSetAllColorsMixPreset = () => {
    setCustomizedPieces(prev => {
      return prev.map((piece, idx) => ({
        ...piece,
        color: colors[idx % colors.length].name
      }));
    });
  };

  const isWishlisted = isInWishlist(selectedColor, selectedSize);

  const handleToggleWishlistClick = () => {
    toggleWishlist({
      title: 'AST Handmade Macramé Belt',
      color: selectedColor,
      size: selectedSize,
      priceBDT: 850
    });
  };

  const handleAddToCartClick = () => {
    if (quantity === 1 || !isCustomizingMultiPieces) {
      addToCart({
        title: 'AST Handmade Macramé Belt',
        color: selectedColor,
        size: selectedSize
      }, quantity);
    } else {
      // Add each customized piece to cart
      customizedPieces.forEach(p => {
        addToCart({
          title: 'AST Handmade Macramé Belt',
          color: p.color,
          size: p.size
        }, 1);
      });
    }
    setIsCartOpen(true);
  };

  // 850 BDT base price with strategic volume discounts
  const getBasePriceBDT = (qty) => {
    if (qty === 1) return 850;
    if (qty === 2) return 1600; // 800/pc (Save 100)
    if (qty === 3) return 2250; // 750/pc (Save 300)
    if (qty === 4) return 2880; // 720/pc (Save 520)
    return qty * 690;           // 690/pc (Save 800+ on 5)
  };

  const baseSinglePriceBDT = 850;
  const totalPriceBDT = getBasePriceBDT(quantity);
  const regularPriceBDT = baseSinglePriceBDT * quantity;
  const savingsBDT = Math.max(0, regularPriceBDT - totalPriceBDT);

  const totalPriceLocal = totalPriceBDT * exchangeRate;
  const regularPriceLocal = regularPriceBDT * exchangeRate;
  const savingsLocal = savingsBDT * exchangeRate;
  const unitPriceLocal = totalPriceLocal / quantity;
  const currentShipping = getShippingQuote(quantity);

  const toggleAccordion = (title) => {
    setOpenAccordions(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const scrollRef = React.useRef(null);

  const handleScroll = (e) => {
    const { scrollLeft, scrollWidth } = e.target;
    if (scrollWidth > 0 && images.length > 0) {
      const itemWidth = scrollWidth / images.length;
      const newIndex = Math.round(scrollLeft / itemWidth);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  const scrollToDot = (idx) => {
    setActiveIndex(idx);
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.scrollWidth / images.length;
      scrollRef.current.scrollTo({
        left: itemWidth * idx,
        behavior: 'smooth'
      });
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
      setZoomLevel(1);
    }
  };

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    const currentIdx = images.indexOf(lightboxImage);
    if (currentIdx !== -1) {
      setLightboxImage(images[(currentIdx - 1 + images.length) % images.length]);
      setZoomLevel(1);
    }
  };

  return (
    <div className="w-full bg-cream min-h-screen pt-[102px] sm:pt-[76px] md:pt-[96px]">
      <div className="max-w-7xl mx-auto px-0 lg:px-12">
        
        {/* Product Hero & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-5 lg:gap-y-0 lg:gap-x-10 items-start mb-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative px-0 lg:px-0 lg:col-span-7"
          >
            {/* Mobile Product Gallery: Main Image on top with 2px gap (top, left, right) + Thumbnails Underneath */}
            <div className="lg:hidden w-full px-[2px] pt-[2px] mb-4">
              {/* Main Featured Image with 2px gap */}
              <div className="relative w-full overflow-hidden">
                <div 
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="w-full flex overflow-x-auto snap-x snap-mandatory gap-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  style={{ scrollSnapType: 'x mandatory' }}
                >
                  {images.map((img, idx) => (
                    <div 
                      key={idx} 
                      className="relative w-full shrink-0 aspect-square bg-stone/15 overflow-hidden snap-center snap-always rounded-none"
                      style={{ scrollSnapStop: 'always', scrollSnapAlign: 'center' }}
                    >
                      <img 
                        src={img} 
                        alt={`Macrame Belt ${selectedColor} view ${idx + 1}`} 
                        onClick={() => setLightboxImage(img)}
                        className="absolute inset-0 w-full h-full object-cover object-center cursor-zoom-in"
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

              {/* Thumbnails Underneath Product Image - 6 Visible Slots matching image width, smooth scroll if >6 */}
              <div className="flex gap-1.5 sm:gap-2 mt-2 w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToDot(idx)}
                    className={`relative aspect-square w-[calc((100%-5*0.375rem)/6)] shrink-0 overflow-hidden transition-all duration-300 rounded-[4px] cursor-pointer ${
                      activeIndex === idx
                        ? 'border border-soft-black/80 shadow-xs'
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

            {/* Desktop 2-Column Grid (Hidden on mobile) */}
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
            className="flex flex-col px-2.5 sm:px-4 lg:px-0 lg:pt-0 lg:col-span-5"
          >
            <h1 className="text-2xl lg:text-3xl font-serif text-soft-black mb-1 md:mb-2 mt-2 lg:mt-0">AST Handmade Macramé Belt</h1>
            <p className="text-xs md:text-sm font-light italic text-dark-charcoal/80 mb-2 md:mb-3 leading-relaxed">
              Fully handmade, very strong, and comfortable to wear. A belt made to last for years, even for the next generation!
            </p>
            <p className="text-[10px] md:text-sm font-sans tracking-widest uppercase text-terracotta mb-2 md:mb-3">Unisex Design • 100% Cotton</p>
            
            {/* Price Display & Policy */}
            <div className="mb-5">
              <div>
                <div className="flex items-baseline gap-2.5 flex-wrap mb-1">
                  <span className="text-2xl md:text-3xl font-serif text-soft-black font-semibold">
                    {currencySymbol}{Math.round(totalPriceLocal).toLocaleString()}
                  </span>
                  {quantity > 1 && (
                    <>
                      <span className="text-sm md:text-base line-through text-dark-charcoal/40 font-sans">
                        {currencySymbol}{Math.round(regularPriceLocal).toLocaleString()}
                      </span>
                      <span className="text-xs md:text-sm font-semibold text-white bg-red-600 px-2.5 py-0.5 rounded-md shadow-xs">
                        {currencySymbol}{Math.round(unitPriceLocal).toLocaleString()}/pc
                      </span>
                    </>
                  )}
                </div>

                {/* Dynamic Tier Savings Badge / Note */}
                {quantity > 1 ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50/90 border border-emerald-200/80 rounded-full text-emerald-800 text-[11px] md:text-xs font-semibold tracking-wide mt-1">
                    <span>🔥</span>
                    <span>Buy {quantity} & Save {currencySymbol}{Math.round(savingsLocal).toLocaleString()} ({Math.round((savingsBDT / regularPriceBDT) * 100)}% OFF applied)</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-terracotta/10 border border-terracotta/20 rounded-full text-terracotta text-[11px] font-medium tracking-wide mt-1">
                    <span>💡</span>
                    <span>Buy 2 or more to get bulk tier discount (Save up to ৳160/pc)</span>
                  </div>
                )}
              </div>
              
              <hr className="border-t border-stone/20 my-3.5 w-full" />
              
              <div className="flex justify-start">
                <button 
                  onClick={() => setIsSamplePolicyOpen(true)}
                  className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-soft-black/80 hover:text-soft-black transition-colors flex items-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span className="underline underline-offset-4">Sample Order Policy</span>
                </button>
              </div>
            </div>

            {/* Color Selection (Primary / Global) */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold uppercase tracking-widest text-soft-black">
                  Primary Color: <span className="font-serif font-semibold text-terracotta ml-1">{selectedColor}</span>
                </span>
                <span className="text-[11px] text-dark-charcoal/60 font-medium">5 Signature Colors</span>
              </div>
              <div className="flex items-center gap-3">
                {colors.map((color) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => handleColorChange(color.name)}
                      className={`group relative p-0.5 rounded-full transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'ring-2 ring-soft-black ring-offset-2 scale-105'
                          : 'ring-1 ring-black/10 hover:ring-black/30 hover:scale-105'
                      }`}
                      title={color.name}
                      aria-label={`Select color ${color.name}`}
                    >
                      <span
                        className="block w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-black/10 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size & Quantity Selectors - Side by Side on Mobile & Desktop */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 mb-4">
              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-soft-black">
                    Size
                  </span>
                  <button 
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[9px] sm:text-[11px] font-semibold text-terracotta hover:text-dark-charcoal transition-colors underline underline-offset-2 sm:underline-offset-4 flex items-center gap-0.5 sm:gap-1 cursor-pointer"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                      <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/>
                      <path d="m14.5 12.5 2-2"/>
                      <path d="m11.5 9.5 2-2"/>
                      <path d="m8.5 6.5 2-2"/>
                      <path d="m17.5 15.5 2-2"/>
                    </svg>
                    <span>Guide</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  {[
                    { label: 'M', waist: '32–35"' },
                    { label: 'L', waist: '35–38"' }
                  ].map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => handleSizeChange(s.label)}
                      className={`h-[44px] sm:h-[46px] px-1 sm:px-3 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center ${
                        selectedSize === s.label
                          ? 'bg-soft-black text-cream border-soft-black shadow-sm font-bold'
                          : 'bg-white text-soft-black border-stone/20 hover:border-soft-black/40 font-medium'
                      }`}
                    >
                      <span className="text-xs font-bold leading-none mb-0.5">{s.label}</span>
                      <span className={`text-[9px] sm:text-[10px] leading-none whitespace-nowrap ${selectedSize === s.label ? 'text-cream/70' : 'text-dark-charcoal/50'}`}>{s.waist}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-soft-black">
                    Quantity
                  </span>
                  {quantity > 1 && (
                    <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-200/50 truncate max-w-[70px] sm:max-w-none text-right">
                      Tier Rate
                    </span>
                  )}
                </div>
                <div className="flex items-center h-[44px] sm:h-[46px] bg-white border border-stone/20 rounded-xl p-0.5 sm:p-1 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => handleQuantityUpdate(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-8 sm:w-10 h-full flex items-center justify-center text-soft-black hover:bg-stone/10 disabled:opacity-25 disabled:hover:bg-transparent rounded-lg transition-colors cursor-pointer shrink-0"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <div className="flex-1 text-center font-serif text-sm sm:text-base font-semibold text-soft-black select-none">
                    {quantity}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuantityUpdate(Math.min(20, quantity + 1))}
                    className="w-8 sm:w-10 h-full flex items-center justify-center text-soft-black hover:bg-stone/10 rounded-lg transition-colors cursor-pointer shrink-0"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Volume Pricing Tier Shortcuts */}
            <div className="mb-4 p-3 bg-stone/5 border border-stone/15 rounded-2xl">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-dark-charcoal/80 mb-2">
                <span>Volume Discount Pricing</span>
                <span className="text-terracotta font-semibold">Tier Rate Applied</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { q: 1, price: '৳850', label: '1 Pc', save: '' },
                  { q: 2, price: '৳800/pc', label: '2 Pcs', save: 'Save ৳100' },
                  { q: 3, price: '৳750/pc', label: '3 Pcs', save: 'Save ৳300' },
                  { q: 5, price: '৳690/pc', label: '5+ Pcs', save: 'Save ৳800' }
                ].map((tier) => (
                  <button
                    key={tier.q}
                    type="button"
                    onClick={() => handleQuantityUpdate(tier.q)}
                    className={`py-1.5 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                      quantity === tier.q
                        ? 'bg-soft-black text-cream border-soft-black shadow-xs ring-1 ring-soft-black'
                        : 'bg-white text-soft-black border-stone/15 hover:border-stone/40'
                    }`}
                  >
                    <div className="text-[10px] font-bold">{tier.label}</div>
                    <div className={`text-[9px] ${quantity === tier.q ? 'text-cream/80' : 'text-dark-charcoal/70'}`}>{tier.price}</div>
                    {tier.save ? (
                      <div className={`text-[8px] font-semibold ${quantity === tier.q ? 'text-amber-300' : 'text-emerald-600'}`}>{tier.save}</div>
                    ) : (
                      <div className="text-[8px] opacity-0">Base</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Multi-Piece Customizer when quantity > 1 (Allows choosing all 5 colors + 3 M / 2 L) */}
            {quantity > 1 && (
              <div className="mb-5 bg-white border border-stone/20 rounded-2xl p-3.5 md:p-4 shadow-2xs">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3 pb-2.5 border-b border-stone/10">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-soft-black block">
                      Customize Sample Pieces ({quantity} Belts)
                    </span>
                    <span className="text-[10px] text-dark-charcoal/60">
                      Pick distinct color and size for each piece
                    </span>
                  </div>

                  {quantity >= 5 && (
                    <button
                      type="button"
                      onClick={handleSetAllColorsMixPreset}
                      className="px-2.5 py-1 rounded-full bg-terracotta/10 hover:bg-terracotta/20 text-terracotta border border-terracotta/30 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      🌈 1 of Each Color Mix
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
                  {customizedPieces.slice(0, quantity).map((piece, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2 p-2 bg-stone/5 border border-stone/10 rounded-xl">
                      <span className="text-[11px] font-bold text-soft-black shrink-0 w-16">
                        Piece #{idx + 1}:
                      </span>

                      {/* Color swatches for this piece */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {colors.map((c) => (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => handleIndividualPieceColorChange(idx, c.name)}
                            className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                              piece.color === c.name ? 'ring-2 ring-soft-black ring-offset-1 scale-110' : 'border-black/10 opacity-70 hover:opacity-100'
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>

                      {/* Size buttons for this piece */}
                      <div className="flex items-center gap-1 shrink-0">
                        {['M', 'L'].map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => handleIndividualPieceSizeChange(idx, sz)}
                            className={`w-6 h-6 rounded-md text-[10px] font-bold border transition-all cursor-pointer ${
                              piece.size === sz
                                ? 'bg-soft-black text-cream border-soft-black'
                                : 'bg-white text-soft-black border-stone/20 hover:border-soft-black/40'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* CTA & Wishlist Buttons */}
            <div className="flex flex-col gap-3 md:gap-3.5 mb-8 md:mb-10">
              {/* Shipping Status */}
              <div className="text-center">
                <p className="text-[10px] md:text-xs font-semibold text-soft-black/80 tracking-wide">
                  ✈️ {currentShipping.carrier} to {userCountry} ({currentShipping.transit}): {currencySymbol}{currentShipping.costLocal.toFixed(2)}
                </p>
              </div>

              {/* Main CTA + Add to Cart + Wishlist Button Row */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                {/* Request Sample (Direct Checkout) */}
                <button 
                  type="button"
                  onClick={() => setIsOrderFormOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-soft-black text-cream px-4 py-4 md:py-4.5 text-[11px] md:text-xs font-bold uppercase tracking-[0.16em] rounded-2xl hover:bg-dark-charcoal transition-all shadow-md active:scale-[0.99] cursor-pointer"
                >
                  <span>Request Sample</span>
                  <span className="text-cream/40">•</span>
                  <span>{currencySymbol}{Math.round(totalPriceLocal).toLocaleString()}</span>
                </button>

                {/* Add to Cart */}
                <button
                  type="button"
                  onClick={handleAddToCartClick}
                  className="px-4 py-4 md:py-4.5 bg-white border border-stone/30 text-soft-black hover:border-soft-black hover:bg-stone/5 text-[11px] md:text-xs font-bold uppercase tracking-wider rounded-2xl transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
                  title="Add to Cart"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="hidden sm:inline">Add to Cart</span>
                </button>

                {/* Wishlist Button with Heart Icon */}
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
                to="/contact" 
                className="w-full flex items-center justify-center bg-transparent border border-soft-black text-soft-black px-8 py-3.5 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-soft-black/5 transition-colors"
              >
                Wholesale Inquiry
              </Link>
            </div>

            {/* Expandable Accordions - Card View on Mobile */}
            <div className="bg-white sm:bg-transparent border border-stone/20 sm:border-t sm:border-x-0 sm:border-b-0 sm:border-stone/30 p-2 sm:p-0 rounded-2xl sm:rounded-none overflow-hidden shadow-xs sm:shadow-none mb-6 sm:mb-0">
              <Accordion 
                title="Description" 
                isOpen={!!openAccordions['description']} 
                onClick={() => toggleAccordion('description')}
              >
                <p className="text-sm md:text-base text-dark-charcoal/80 leading-relaxed font-light">
                  Carefully woven by skilled artisans in Bangladesh. Made from high-quality soft cotton macramé cord and finished with a durable, rust-resistant metal buckle for everyday wear. Lightweight, flexible, and exceptionally comfortable.
                </p>
              </Accordion>

              <Accordion 
                title="Materials & Construction" 
                isOpen={!!openAccordions['materials']} 
                onClick={() => toggleAccordion('materials')}
              >
                <ul className="space-y-1.5 pt-2 text-sm md:text-base text-dark-charcoal/80 font-light">
                  <li className="flex items-start">
                    <span className="w-1 h-1 rounded-full bg-terracotta mt-[0.6rem] mr-2.5 flex-shrink-0"></span>
                    <span>Premium High-Quality Cotton Macramé Cord</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 rounded-full bg-terracotta mt-[0.6rem] mr-2.5 flex-shrink-0"></span>
                    <span>Rust-Resistant Metal Buckle with Modern Finish</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 rounded-full bg-terracotta mt-[0.6rem] mr-2.5 flex-shrink-0"></span>
                    <span>Soft, Flexible & Comfortable against the waist</span>
                  </li>
                </ul>
              </Accordion>

              <Accordion 
                title="Customization Options" 
                isOpen={!!openAccordions['custom']} 
                onClick={() => toggleAccordion('custom')}
              >
                <ul className="space-y-1.5 pt-2 text-sm md:text-base text-dark-charcoal/80 font-light">
                  <li className="flex items-start">
                    <span className="w-1 h-1 rounded-full bg-terracotta mt-[0.6rem] mr-2.5 flex-shrink-0"></span>
                    <span>Custom Belt Colors to match your brand palette</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 rounded-full bg-terracotta mt-[0.6rem] mr-2.5 flex-shrink-0"></span>
                    <span>Custom Buckle finishes (Matte, Brass, Silver, Gunmetal)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 rounded-full bg-terracotta mt-[0.6rem] mr-2.5 flex-shrink-0"></span>
                    <span>Custom Logo, Hangtags, and Premium Packaging</span>
                  </li>
                </ul>
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
              className="bg-white border border-stone/20 w-full max-w-md p-6 relative z-10 shadow-2xl rounded-xl"
            >
              <button 
                onClick={() => setIsSamplePolicyOpen(false)}
                className="absolute top-4 right-4 text-soft-black/40 hover:text-soft-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center">
                <img src="/logo_black.png" alt="AST Logo" className="h-5 w-auto mx-auto mb-4 object-contain opacity-80" />
                <h2 className="text-xl font-serif text-soft-black mb-5">Sample Order Policy</h2>
              </div>
              
              <p className="text-sm text-dark-charcoal mb-4 px-2 text-center">
                Evaluate our craftsmanship before placing a wholesale order.
              </p>
              
              <div className="bg-stone/5 rounded-lg border border-stone/10 p-5 mb-4 shadow-sm">
                <ul className="space-y-4 text-sm text-dark-charcoal list-disc list-outside ml-4 leading-relaxed">
                  <li>Order up to 5 samples per design with discounted tiered pricing.</li>
                  <li>Customize colors and sizes individually for each sample in a multi-pack.</li>
                  <li><strong>Bangladesh:</strong> Cash on Delivery (COD) available.</li>
                  <li><strong>International:</strong> Full advance payment required prior to shipping.</li>
                  <li><strong>Reimbursement:</strong> Full sample cost is deducted from your subsequent confirmed bulk order invoice.</li>
                  <li>Shipping charges are strictly non-refundable.</li>
                </ul>
              </div>
              
              <p className="text-xs font-medium text-dark-charcoal/80 leading-relaxed text-center px-2">
                Assess product quality with confidence, knowing your investment is credited toward future purchases.
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
                onClick={() => { setLightboxImage(null); setZoomLevel(1); }}
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
                      
                      {/* Zoom Controls (Desktop & Mobile) */}
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

            {/* Thumbnails (Desktop & Mobile) */}
            <div className="w-full h-16 sm:h-20 flex items-center justify-center gap-2 sm:gap-3 px-4 z-[110]">
               {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => { setLightboxImage(img); setZoomLevel(1); }}
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

      {/* Wishlist Toast Notification */}
      <AnimatePresence>
        {wishlistToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[200] bg-soft-black text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-medium border border-white/10 backdrop-blur-md"
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>{wishlistToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <SampleOrderDrawer 
        isOpen={isOrderFormOpen} 
        onClose={() => setIsOrderFormOpen(false)} 
        orderDetails={{
          quantity,
          selectedColor: customizedPieces[0]?.color || selectedColor,
          selectedSize: customizedPieces[0]?.size || selectedSize,
          selectedColors: customizedPieces.slice(0, quantity).map(p => p.color),
          selectedSizes: customizedPieces.slice(0, quantity).map(p => p.size),
          unitPriceLocal,
          shippingCostLocal: currentShipping.costLocal,
          shippingCarrier: currentShipping.carrier,
          shippingTransit: currentShipping.transit,
          totalPriceLocal,
          savingsLocal,
          currencySymbol,
          localCurrency,
          userCountry,
          userCountryCode,
          userCallingCode
        }}
      />

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

      {/* Sample Order Checkout Drawer */}
      <SampleOrderDrawer
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        orderDetails={{
          quantity,
          selectedColor,
          selectedSize,
          selectedColors: !isCustomizingMultiPieces || quantity === 1
            ? Array(quantity).fill(selectedColor)
            : customizedPieces.slice(0, quantity).map(p => p.color),
          selectedSizes: !isCustomizingMultiPieces || quantity === 1
            ? Array(quantity).fill(selectedSize)
            : customizedPieces.slice(0, quantity).map(p => p.size),
          unitPriceLocal,
          shippingCostLocal,
          totalPriceLocal,
          savingsLocal,
          currencySymbol,
          localCurrency,
          userCountry,
          userCountryCode,
          userCallingCode
        }}
      />
    </div>
  );
};

export default Product;

