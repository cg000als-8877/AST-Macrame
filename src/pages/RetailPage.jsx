import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronDown, Plus, Minus, X, Ruler, ZoomIn, ZoomOut, RotateCcw, AlignLeft, Layers, Truck, AlertCircle, Droplets, Sparkles, Leaf, Banknote, ArrowUp } from 'lucide-react';
import RetailOrderModal from '../components/RetailOrderModal';
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

const Accordion = ({ title, isOpen, onClick, children }) => (
  <div className="border-b border-stone/15 last:border-b-0 sm:border-stone/30 sm:last:border-b">
    <button 
      onClick={onClick}
      className="w-full py-3.5 px-3.5 sm:px-0 flex justify-between items-center text-left cursor-pointer group select-none"
    >
      <span className="font-serif text-sm sm:text-base md:text-lg text-soft-black font-medium group-hover:text-terracotta transition-colors">{title}</span>
      <div className={`w-5 h-5 flex items-center justify-center transition-colors ${isOpen ? 'text-terracotta' : 'text-soft-black/60 group-hover:text-soft-black'}`}>
        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
      </div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pb-4 px-3.5 sm:px-0 text-dark-charcoal/90 text-xs sm:text-sm leading-relaxed">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const RetailPage = () => {
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeIndex, setActiveIndex] = useState(0);
  const [orderType, setOrderType] = useState('single');
  const [comboColor1, setComboColor1] = useState('Black');
  const [comboColor2, setComboColor2] = useState('Black');
  const [comboSize1, setComboSize1] = useState('M');
  const [comboSize2, setComboSize2] = useState('M');
  const [openAccordions, setOpenAccordions] = useState({
    description: true,
    materials: true,
    shipping: true,
    disclaimer: true
  });
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCareGuideOpen, setIsCareGuideOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  const [isForeignUser, setIsForeignUser] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const optionsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const handleScrollVisibility = () => {
      if (ctaRef.current) {
        const rect = ctaRef.current.getBoundingClientRect();
        // Show sticky bar when the user has scrolled past the main CTA button
        setShowStickyBar(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScrollVisibility, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);

  const handleStickyOrderClick = () => {
    if (optionsRef.current) {
      const yOffset = -90;
      const y = optionsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    document.title = "Retail Store | Handcrafted Macramé Belts (Cash on Delivery) - AST Macramé";
  }, []);

  useEffect(() => {
    const checkLocation = async () => {
      try {
        const response = await fetch('https://api.country.is');
        const data = await response.json();
        if (data.country !== 'BD') {
          setIsForeignUser(true);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };
    checkLocation();
  }, []);

  useEffect(() => {
    if (lightboxImage || isSizeGuideOpen || isCareGuideOpen) {
      document.body.style.overflow = 'hidden';
    } else if (!isOrderFormOpen) {
      document.body.style.overflow = 'auto';
    }
  }, [lightboxImage, isSizeGuideOpen, isCareGuideOpen, isOrderFormOpen]);

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

  // Safely fallback to Black images if no color is selected yet
  const displayColor = selectedColor || 'Black';
  const images = colorImages[displayColor];

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
      setZoomLevel(1);
    }
  };

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    const currentIdx = allColorGalleryItems.findIndex(item => item.img === lightboxImage);
    if (currentIdx !== -1) {
      setLightboxImage(allColorGalleryItems[(currentIdx - 1 + allColorGalleryItems.length) % allColorGalleryItems.length].img);
      setZoomLevel(1);
    }
  };

  let orderButtonContent = (
    <span className="flex items-center justify-center gap-1.5 flex-wrap">
      <span>ORDER NOW</span>
      <span className="text-[#FDE047] font-black tracking-wider">(CASH ON DELIVERY)</span>
    </span>
  );
  let isOrderReady = false;

  if (orderType === 'single') {
    if (!selectedColor && !selectedSize) {
      orderButtonContent = "SELECT COLOR & SIZE";
    } else if (selectedColor && !selectedSize) {
      orderButtonContent = "SELECT SIZE";
    } else if (!selectedColor && selectedSize) {
      orderButtonContent = "SELECT COLOR";
    } else {
      orderButtonContent = (
        <span className="flex items-center justify-center gap-1.5 flex-wrap">
          <span>ORDER NOW</span>
          <span className="text-[#FDE047] font-black tracking-wider">(CASH ON DELIVERY)</span>
        </span>
      );
      isOrderReady = true;
    }
  } else {
    // combo
    if (!comboColor1 || !comboColor2 || !comboSize1 || !comboSize2) {
      orderButtonContent = "SELECT COMBO OPTIONS";
    } else {
      orderButtonContent = (
        <span className="flex items-center justify-center gap-1.5 flex-wrap">
          <span>ORDER NOW</span>
          <span className="text-[#FDE047] font-black tracking-wider">(CASH ON DELIVERY)</span>
        </span>
      );
      isOrderReady = true;
    }
  }

  return (
    <>
      {isForeignUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-soft-black/80 backdrop-blur-sm p-4">
          <div className="bg-cream rounded-none p-6 md:p-8 max-w-sm md:max-w-md w-full text-center shadow-2xl border border-stone/10">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-red-100 text-red-600 rounded-none flex items-center justify-center mx-auto mb-4 md:mb-5">
                <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-soft-black mb-2 md:mb-3">
                Region Restricted
              </h2>
              <p className="text-dark-charcoal/80 mb-6 md:mb-8 text-sm md:text-base leading-relaxed">
                This retail section is exclusively available for customers residing in <strong>Bangladesh</strong>. 
                For international orders, please visit our wholesale section or order a sample.
              </p>
              <Link 
                to="/product"
                className="inline-block w-full bg-soft-black text-cream px-6 py-3.5 md:py-4 font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-none hover:bg-terracotta transition-all shadow-md"
              >
                Return to Product Page
              </Link>
          </div>
        </div>
      )}

      <div className="w-full bg-cream min-h-screen pt-[77px] sm:pt-[76px] md:pt-[96px]">
      <div className="max-w-7xl mx-auto px-0 lg:px-12">
        
        {/* Product Hero & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-1.5 lg:gap-y-0 lg:gap-x-10 items-start mb-24">
          
          <div className="relative px-0 lg:px-0 lg:col-span-7">
            {/* Mobile Product Gallery: Main Image on top with 2px gap (top, left, right) + Thumbnails Underneath */}
            <div className="lg:hidden w-full px-[2px] pt-[2px] mb-2">
              {/* Main Featured Image with 2px gap */}
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

                {/* Zoom Indicator (Mobile) */}
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
                    onClick={() => scrollToSubIndex(idx)}
                    className={`relative aspect-square w-[calc((100%-5*0.375rem)/6)] shrink-0 overflow-hidden transition-all duration-300 rounded-[4px] cursor-pointer ${
                      currentSubIndex === idx
                        ? 'border border-terracotta/75 shadow-xs'
                        : 'border border-black/[0.08] hover:border-black/20'
                    }`}
                    aria-label={`Select product view ${idx + 1}`}
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
                  <img 
                    key={selectedColor + idx}
                    src={img} 
                    alt={`Macrame Belt ${selectedColor} view ${idx + 1}`} 
                    onClick={() => setLightboxImage(img)}
                    className="absolute inset-0 w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 cursor-zoom-in"
                  />
                  {idx === 0 && (
                    <div className="absolute bottom-3 left-3 pointer-events-none flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full font-medium tracking-wider shadow-sm z-10 opacity-75 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-3.5 h-3.5 stroke-[2]" />
                      <span>Click to zoom</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col px-2.5 sm:px-4 lg:px-0 lg:pt-0 lg:col-span-5">
            <h1 className="text-2xl lg:text-3xl font-serif text-soft-black mb-1 md:mb-2 mt-0 lg:mt-0">AST Handmade Macramé Belt</h1>
            <p className="text-xs md:text-sm font-light italic text-dark-charcoal/80 mb-2 md:mb-3 leading-relaxed">
              Handcrafted with high-density cotton weave for superior flexibility, lasting strength, and effortless daily style.
            </p>
            <p className="text-[10px] md:text-sm font-sans tracking-widest uppercase text-terracotta mb-2 md:mb-3">UNISEX | 100% NATURAL COTTON</p>
            
            {/* Added Price */}
            <div className="mb-4 md:mb-5 flex items-center gap-3 md:gap-4 mt-2 flex-wrap">
              <span className="text-2xl md:text-3xl font-serif text-soft-black leading-none">
                {orderType === 'single' ? '850 BDT' : '1,490 BDT'}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm md:text-base text-red-500/80 line-through font-bold whitespace-nowrap leading-none">
                  {orderType === 'single' ? '1,050 BDT' : '2,100 BDT'}
                </span>
                <span className="inline-flex items-center justify-center bg-red-500 text-white text-[10px] md:text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-[15px] shadow-sm whitespace-nowrap leading-none">
                  {orderType === 'single' ? 'SAVE 200 TK' : 'SAVE 610 TK'}
                </span>
              </div>
            </div>

            <div className="w-full h-px bg-stone/20 mb-5 md:mb-6"></div>

            {/* Order Type Selection */}
            <div ref={optionsRef} className="mb-6 md:mb-8 scroll-mt-28">
              <div className="flex gap-3 w-full max-w-md">
                <button 
                  onClick={() => setOrderType('single')}
                  className={`flex-1 py-3 md:py-3.5 px-2 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full sm:rounded-none border transition-all duration-300 ${orderType === 'single' ? 'bg-soft-black text-cream border-soft-black shadow-md' : 'bg-transparent text-soft-black border-stone/30 hover:border-soft-black/50 hover:bg-stone/5'}`}
                >
                  Single Product
                </button>
                <button 
                  onClick={() => setOrderType('combo')}
                  className={`flex-1 py-3 md:py-3.5 px-2 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full sm:rounded-none border transition-all duration-300 ${orderType === 'combo' ? 'bg-soft-black text-cream border-soft-black shadow-md' : 'bg-transparent text-soft-black border-stone/30 hover:border-soft-black/50 hover:bg-stone/5'}`}
                >
                  Combo (2 Belts)
                </button>
              </div>
            </div>

            {orderType === 'single' ? (
              <>
                {/* Size and Care Guide Row */}
                <div className="flex justify-start mb-4 md:mb-6">
                  <div className="flex items-center gap-2 md:gap-3">
                    <button 
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-soft-black hover:text-dark-charcoal transition-colors"
                    >
                      <Ruler className="w-3.5 h-3.5 md:w-4 md:h-4 text-terracotta" />
                      <span>Size Guide</span>
                    </button>
                    <div className="w-[1px] h-4 bg-dark-charcoal/30 mx-1 md:mx-2 shrink-0"></div>
                    <button 
                      onClick={() => setIsCareGuideOpen(true)}
                      className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-soft-black hover:text-dark-charcoal transition-colors"
                    >
                      <Droplets className="w-3.5 h-3.5 md:w-4 md:h-4 text-terracotta" />
                      <span>Care Guide</span>
                    </button>
                  </div>
                </div>

                {/* Color and Size Row */}
                <div className="flex flex-row justify-start items-end gap-4 sm:gap-6 md:gap-8 mb-6 md:mb-10 w-full">
                  {/* Color Selection */}
                  <div>
                    <span className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-soft-black mb-3 md:mb-4">
                      Color: <span className="font-medium text-dark-charcoal/70">{selectedColor}</span>
                    </span>
                    <div className="flex flex-nowrap gap-1.5 sm:gap-2 md:gap-2.5">
                      {colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => handleColorChange(color.name)}
                          className={`w-9 h-9 md:w-10 md:h-10 rounded-full border-2 transition-all duration-300 shrink-0 ${selectedColor === color.name ? 'border-soft-black p-[2px]' : 'border-transparent'}`}
                          aria-label={`Select ${color.name}`}
                        >
                          <div className="w-full h-full rounded-full shadow-sm" style={{ backgroundColor: color.hex }} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Vertical Partition */}
                  <div className="w-[1px] h-10 md:h-12 bg-gradient-to-b from-transparent via-stone/30 to-transparent mb-1 shrink-0"></div>

                  {/* Size Selection */}
                  <div>
                    <span className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-soft-black text-left mb-3 md:mb-4">
                      Size
                    </span>
                    <div className="flex gap-2 sm:gap-3 md:gap-4 justify-start">
                      {['M', 'L'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-[11px] md:text-xs font-bold uppercase tracking-widest border transition-colors duration-300 rounded-full sm:rounded-none shrink-0 ${selectedSize === size ? 'bg-soft-black text-cream border-soft-black' : 'bg-transparent text-soft-black border-soft-black/20 hover:border-soft-black/50'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="mb-6 md:mb-8">
                <div className="flex justify-start mb-4 md:mb-6">
                  <div className="flex items-center gap-2 md:gap-3">
                    <button 
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-soft-black hover:text-dark-charcoal transition-colors"
                    >
                      <Ruler className="w-3.5 h-3.5 md:w-4 md:h-4 text-terracotta" />
                      <span>Size Guide</span>
                    </button>
                    <div className="w-[1px] h-4 bg-dark-charcoal/30 mx-1 md:mx-2 shrink-0"></div>
                    <button 
                      onClick={() => setIsCareGuideOpen(true)}
                      className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-soft-black hover:text-dark-charcoal transition-colors"
                    >
                      <Droplets className="w-3.5 h-3.5 md:w-4 md:h-4 text-terracotta" />
                      <span>Care Guide</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  {/* Belt 1 */}
                  <div className="flex flex-row justify-start items-end gap-4 sm:gap-6 md:gap-8 mb-6 md:mb-8">
                    {/* Belt 1 Color */}
                    <div>
                      <span className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-soft-black mb-3 md:mb-4 text-left">
                        Belt 1 Color
                      </span>
                      <div className="flex flex-nowrap gap-1.5 sm:gap-2 md:gap-2.5">
                        {colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => { setComboColor1(color.name); handleColorChange(color.name); }}
                            className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border transition-all duration-300 shrink-0 ${comboColor1 === color.name ? 'border-soft-black p-[2px]' : 'border-transparent'}`}
                            title={color.name}
                          >
                            <div className="w-full h-full rounded-full shadow-sm" style={{ backgroundColor: color.hex }} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Vertical Partition */}
                    <div className="w-[1px] h-10 md:h-12 bg-gradient-to-b from-transparent via-stone/30 to-transparent mb-1 shrink-0"></div>

                    {/* Belt 1 Size */}
                    <div>
                      <span className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-soft-black text-left mb-3 md:mb-4">
                        Size
                      </span>
                      <div className="flex gap-2 sm:gap-3 md:gap-4 justify-start">
                        {['M', 'L'].map((size) => (
                          <button
                            key={size}
                            onClick={() => setComboSize1(size)}
                            className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center text-[11px] md:text-xs font-bold border transition-colors duration-300 rounded-full sm:rounded-none shrink-0 ${comboSize1 === size ? 'bg-soft-black text-cream border-soft-black' : 'bg-transparent text-soft-black border-soft-black/20 hover:border-soft-black/50'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Belt 2 */}
                  <div className="flex flex-row justify-start items-end gap-4 sm:gap-6 md:gap-8 mb-2 md:mb-4">
                    {/* Belt 2 Color */}
                    <div>
                      <span className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-soft-black mb-3 md:mb-4 text-left">
                        Belt 2 Color
                      </span>
                      <div className="flex flex-nowrap gap-1.5 sm:gap-2 md:gap-2.5">
                        {colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => { setComboColor2(color.name); handleColorChange(color.name); }}
                            className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border transition-all duration-300 shrink-0 ${comboColor2 === color.name ? 'border-soft-black p-[2px]' : 'border-transparent'}`}
                            title={color.name}
                          >
                            <div className="w-full h-full rounded-full shadow-sm" style={{ backgroundColor: color.hex }} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Vertical Partition */}
                    <div className="w-[1px] h-10 md:h-12 bg-gradient-to-b from-transparent via-stone/30 to-transparent mb-1 shrink-0"></div>

                    {/* Belt 2 Size */}
                    <div>
                      <span className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-soft-black text-left mb-3 md:mb-4">
                        Size
                      </span>
                      <div className="flex gap-2 sm:gap-3 md:gap-4 justify-start">
                        {['M', 'L'].map((size) => (
                          <button
                            key={size}
                            onClick={() => setComboSize2(size)}
                            className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center text-[11px] md:text-xs font-bold border transition-colors duration-300 rounded-full sm:rounded-none shrink-0 ${comboSize2 === size ? 'bg-soft-black text-cream border-soft-black' : 'bg-transparent text-soft-black border-soft-black/20 hover:border-soft-black/50'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-[12px] md:text-[13px] font-medium text-dark-charcoal/70 italic text-center mt-4">
                    * Please select color and size for your combo.
                  </p>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col mb-10 md:mb-12">
              <div className="flex flex-col gap-3 md:gap-4">
                <button 
                  onClick={() => setIsOrderFormOpen(true)}
                  disabled={!isOrderReady}
                  className={`w-full flex items-center justify-center bg-terracotta text-cream px-8 py-4 md:py-5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full sm:rounded-none transition-all shadow-md ${!isOrderReady ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted-burgundy active:scale-[0.99] cursor-pointer'}`}
                >
                  {orderButtonContent}
                </button>
                <a 
                  href="https://wa.me/8801940689061"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center bg-transparent border border-soft-black text-soft-black px-8 py-4 md:py-5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full sm:rounded-none hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  WHATSAPP
                </a>
              </div>
              <p className="text-[11.5px] sm:text-[12px] md:text-[13px] text-dark-charcoal/75 mt-3 md:mt-4 italic text-center font-medium px-2 leading-relaxed max-w-md mx-auto">
                Need custom sizing or bulk/corporate orders? Tap WhatsApp to chat directly with our workshop.
              </p>
            </div>

            {/* Expandable Accordions - Card View on Mobile */}
            <div className="bg-white sm:bg-transparent border border-stone/20 sm:border-t sm:border-x-0 sm:border-b-0 sm:border-stone/30 p-2 sm:p-0 rounded-2xl sm:rounded-none overflow-hidden shadow-xs sm:shadow-none mb-6 sm:mb-0">
              <Accordion 
                title={
                  <div className="flex items-center gap-3">
                    <AlignLeft className="w-4 h-4 text-terracotta" />
                    <span>Description</span>
                  </div>
                } 
                isOpen={!!openAccordions['description']} 
                onClick={() => toggleAccordion('description')}
              >
                <div className="space-y-3 leading-relaxed text-dark-charcoal/90">
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
                  <div className="flex items-center gap-3">
                    <Layers className="w-4 h-4 text-terracotta" />
                    <span>Materials & Specifications</span>
                  </div>
                } 
                isOpen={!!openAccordions['materials']} 
                onClick={() => toggleAccordion('materials')}
              >
                <ul className="space-y-2 text-dark-charcoal/90">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-none bg-terracotta mt-[0.45rem] mr-2.5 flex-shrink-0"></span>
                    <span><strong className="font-semibold text-soft-black">Cord:</strong> 100% natural, eco-friendly high-grade braided cotton</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-none bg-terracotta mt-[0.45rem] mr-2.5 flex-shrink-0"></span>
                    <span><strong className="font-semibold text-soft-black">Hardware:</strong> Rust-resistant metal pin buckle with matte brushed finish</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-none bg-terracotta mt-[0.45rem] mr-2.5 flex-shrink-0"></span>
                    <span><strong className="font-semibold text-soft-black">Width:</strong> 4 cm (1.6 in) perfectly fits standard pant & denim loops</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-none bg-terracotta mt-[0.45rem] mr-2.5 flex-shrink-0"></span>
                    <span><strong className="font-semibold text-soft-black">Flexibility:</strong> Micro-adjustable weave — fasten the buckle prong at any point along the belt for a custom fit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-none bg-terracotta mt-[0.45rem] mr-2.5 flex-shrink-0"></span>
                    <span><strong className="font-semibold text-soft-black">Origin:</strong> Proudly handcrafted in Bangladesh</span>
                  </li>
                </ul>
              </Accordion>

              <Accordion 
                title={
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-terracotta" />
                    <span>Shipping</span>
                  </div>
                } 
                isOpen={!!openAccordions['shipping']} 
                onClick={() => toggleAccordion('shipping')}
              >
                <div className="space-y-3 leading-relaxed text-dark-charcoal/90">
                  <p>
                    We ship all orders promptly via trusted express couriers:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-none bg-terracotta mt-[0.45rem] mr-2.5 flex-shrink-0"></span>
                      <span><strong className="font-semibold text-soft-black">Express Delivery:</strong> 2 to 4 Working Days (Home Delivery Nationwide)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-none bg-terracotta mt-[0.45rem] mr-2.5 flex-shrink-0"></span>
                      <span><strong className="font-semibold text-soft-black">Standard Delivery Charge:</strong> ৳ 100 (All over Bangladesh)</span>
                    </li>
                  </ul>
                  <p className="text-xs text-dark-charcoal/70 italic pt-1">
                    * You will receive an SMS and phone confirmation as soon as your parcel is dispatched.
                  </p>
                </div>
              </Accordion>

              <Accordion 
                title={
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-4 h-4 text-terracotta" />
                    <span>Disclaimer</span>
                  </div>
                } 
                isOpen={!!openAccordions['disclaimer']} 
                onClick={() => toggleAccordion('disclaimer')}
              >
                <ul className="space-y-2.5 leading-relaxed text-dark-charcoal/90">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-none bg-terracotta mt-[0.45rem] mr-2.5 flex-shrink-0"></span>
                    <span><strong className="font-semibold text-soft-black">Open-Box Checking:</strong> Please check your product in front of the delivery rider before making payment.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-none bg-terracotta mt-[0.45rem] mr-2.5 flex-shrink-0"></span>
                    <span><strong className="font-semibold text-soft-black">Instant Return:</strong> If you notice any size issue or defect, you can return it instantly with zero return hassle.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-none bg-terracotta mt-[0.45rem] mr-2.5 flex-shrink-0"></span>
                    <span><strong className="font-semibold text-soft-black">Color Note:</strong> Slight color variations may occur due to studio lighting and individual screen displays.</span>
                  </li>
                </ul>
              </Accordion>
            </div>
          </div>
        </div>
        
      </div>
      
      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div 
            onClick={() => setIsSizeGuideOpen(false)}
            className="absolute inset-0 bg-soft-black/40 backdrop-blur-sm"
          />
          <div className="bg-white border border-stone/20 w-full max-w-sm p-6 relative z-10 shadow-2xl rounded-none text-center">
              <button 
                onClick={() => setIsSizeGuideOpen(false)}
                className="absolute top-4 right-4 text-soft-black/40 hover:text-soft-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <img src="/logo_black.png" alt="AST Logo" className="h-5 w-auto mx-auto mb-4 object-contain opacity-80" />
              
              <h2 className="text-xl font-serif text-soft-black mb-5">Sizing Guide</h2>
              
              <div className="w-full bg-stone/5 rounded-none border border-stone/10 overflow-hidden mb-4">
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

              <div className="flex justify-between items-center px-4 py-3 bg-stone/5 rounded-none border border-stone/10 mb-4">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-dark-charcoal">Belt Width</span>
                 <span className="text-xs font-semibold text-soft-black">4 cm</span>
              </div>
              
              <p className="italic font-light text-dark-charcoal/70 text-[11px] leading-relaxed px-2">
                * Our macramé weave is naturally flexible, offering a slightly adjustable and comfortable fit.
              </p>
            </div>
          </div>
        )}

      {/* Care Guide Modal */}
      {isCareGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div 
            onClick={() => setIsCareGuideOpen(false)}
            className="absolute inset-0 bg-soft-black/40 backdrop-blur-sm"
          />
          <div className="bg-white border border-stone/20 w-full max-w-md p-5 sm:p-6 relative z-10 shadow-2xl rounded-none text-center max-h-[90vh] overflow-y-auto">
              <button 
                onClick={() => setIsCareGuideOpen(false)}
                className="absolute top-4 right-4 text-soft-black/40 hover:text-soft-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <img src="/logo_black.png" alt="AST Logo" className="h-5 w-auto mx-auto mb-3 object-contain opacity-80" />
              
              <h2 className="text-xl md:text-2xl font-serif text-soft-black mb-1">Care Guide</h2>
              <p className="text-xs font-light text-terracotta uppercase tracking-[0.15em] mb-4">Keep it clean. Keep it natural.</p>
              
              <div className="w-full bg-stone/5 rounded-none border border-stone/10 overflow-hidden mb-4 text-left text-xs">
                <div className="p-3 border-b border-stone/10">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-dark-charcoal mb-1 flex items-center gap-1.5"><span className="text-terracotta text-sm leading-none">•</span> Spot Clean Only</h3>
                  <p className="text-soft-black/80 leading-relaxed">Gently wipe with a soft, damp cloth and mild soap. Avoid soaking, bleach, or machine washing.</p>
                </div>
                <div className="p-3 border-b border-stone/10">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-dark-charcoal mb-1 flex items-center gap-1.5"><span className="text-terracotta text-sm leading-none">•</span> Air Dry & Storage</h3>
                  <p className="text-soft-black/80 leading-relaxed">Reshape gently and let air dry away from direct heat. Hang or loosely roll your belt.</p>
                </div>
                <div className="p-3">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-dark-charcoal mb-1 flex items-center gap-1.5"><span className="text-terracotta text-sm leading-none">•</span> Protect Knots</h3>
                  <p className="text-soft-black/80 leading-relaxed">Avoid sharp surfaces and excessive pulling to preserve the handmade macramé weave.</p>
                </div>
              </div>

              <p className="text-[11px] text-soft-black/60 italic font-light">
                Handcrafted to age beautifully with proper care.
              </p>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-black/95 px-2 sm:px-4 py-3 sm:py-4 overflow-hidden select-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEndEvent}
        >
          {/* Top Bar with Image Counter & Close Button */}
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
                    
                    {/* Zoom In, Zoom Out & Reset Controls (Visible on Both Desktop & Mobile) */}
                    <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-5 z-[110] bg-black/75 backdrop-blur-md px-4 sm:px-6 py-2 rounded-full border border-white/20 shadow-2xl">
                      <button 
                        onClick={() => zoomOut()} 
                        className="text-white/80 hover:text-white hover:scale-110 transition-all p-1 cursor-pointer flex items-center justify-center"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button 
                        onClick={() => resetTransform()} 
                        className="flex items-center gap-1.5 text-[10px] sm:text-xs text-white/90 font-mono uppercase tracking-widest hover:text-white hover:scale-105 transition-all px-2.5 py-0.5 border-x border-white/25 cursor-pointer"
                        title="Reset View"
                      >
                        <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Reset</span>
                      </button>
                      <button 
                        onClick={() => zoomIn()} 
                        className="text-white/80 hover:text-white hover:scale-110 transition-all p-1 cursor-pointer flex items-center justify-center"
                        title="Zoom In"
                      >
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

          {/* Picture Thumbnails (Visible on Both Desktop & Mobile) */}
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
                  aria-label={`View image ${idx + 1}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx + 1}`} />
                </button>
             ))}
          </div>
        </div>
      )}

      <RetailOrderModal 
        isOpen={isOrderFormOpen} 
        onClose={() => setIsOrderFormOpen(false)} 
        orderType={orderType}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        comboColor1={comboColor1}
        comboSize1={comboSize1}
        comboColor2={comboColor2}
        comboSize2={comboSize2}
      />



      {/* Sticky Floating Order Bar - Elevated for easy thumb reach */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-11 sm:bottom-12 inset-x-3.5 sm:inset-x-6 z-40 max-w-lg mx-auto bg-cotton-white/95 backdrop-blur-md border border-stone/25 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.22)]"
          >
            <div className="flex items-center justify-between gap-2.5 sm:gap-4 w-full">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-stone/10 rounded-lg overflow-hidden shrink-0 border border-stone/20">
                  <img 
                    src={colorImages[selectedColor][0]} 
                    alt="AST Macrame Belt" 
                    className="w-full h-full object-cover mix-blend-multiply" 
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] sm:text-xs md:text-sm font-serif font-bold text-soft-black truncate">
                    AST Handmade Belt
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs">
                    <span className="text-terracotta font-bold">
                      {orderType === 'single' ? '৳ 850' : '৳ 1,490'}
                    </span>
                    <span className="text-dark-charcoal/60 truncate">
                      {orderType === 'single' ? `• ${selectedColor} (${selectedSize})` : `• Combo`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Circling Stroke Light Beam Border */}
              <div className="relative p-[1.5px] overflow-hidden rounded-full shadow-md shrink-0 group">
                <div 
                  className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] animate-border-beam pointer-events-none"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0deg, transparent 240deg, #60A5FA 320deg, #FFFFFF 360deg)'
                  }}
                />
                <button
                  onClick={handleStickyOrderClick}
                  className="relative z-10 bg-[#1C2841] hover:bg-[#131E33] text-white px-4 sm:px-6 py-2.5 sm:py-3 text-[10.5px] sm:text-xs font-bold uppercase tracking-widest rounded-full transition-all active:scale-[0.98] flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="font-bold tracking-widest">ORDER NOW</span>
                  <ArrowUp className="w-3.5 h-3.5 animate-arrow-up" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default RetailPage;
