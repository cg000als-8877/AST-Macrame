import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Minus, X, Ruler, ZoomIn, AlignLeft, Layers, Truck, AlertCircle, Droplets } from 'lucide-react';
import RetailOrderModal from '../components/RetailOrderModal';

import b1 from '../assets/products/Black/1.jpg';
import b2 from '../assets/products/Black/2.jpg';
import b3 from '../assets/products/Black/3.jpg';
import b4 from '../assets/products/Black/4.jpg';
import n1 from '../assets/products/Navy/1.jpg';
import n2 from '../assets/products/Navy/2.jpg';
import n3 from '../assets/products/Navy/3.jpg';
import n4 from '../assets/products/Navy/4.jpg';
import br1 from '../assets/products/Brown/1.jpg';
import br2 from '../assets/products/Brown/2.jpg';
import br3 from '../assets/products/Brown/3.jpg';
import br4 from '../assets/products/Brown/4.jpg';
import m1 from '../assets/products/Maroon/1.jpg';
import m2 from '../assets/products/Maroon/2.jpg';
import m3 from '../assets/products/Maroon/3.jpg';
import m4 from '../assets/products/Maroon/4.jpg';
import k1 from '../assets/products/Khaki/1.jpg';
import k2 from '../assets/products/Khaki/2.jpg';
import k3 from '../assets/products/Khaki/3.jpg';
import k4 from '../assets/products/Khaki/4.jpg';

const Accordion = ({ title, isOpen, onClick, children }) => (
  <div className="border-b border-stone/30">
    <button 
      onClick={onClick}
      className="w-full py-3 flex justify-between items-center text-left"
    >
      <span className="font-serif text-base md:text-lg text-soft-black">{title}</span>
      {isOpen ? <Minus className="w-4 h-4 text-soft-black/50" /> : <Plus className="w-4 h-4 text-soft-black/50" />}
    </button>
    {isOpen && (
      <div className="overflow-hidden pb-4 text-dark-charcoal/80 font-light text-sm">
        {children}
      </div>
    )}
  </div>
);

const RetailPage = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [orderType, setOrderType] = useState('single');
  const [comboColor1, setComboColor1] = useState(null);
  const [comboColor2, setComboColor2] = useState(null);
  const [comboSize1, setComboSize1] = useState(null);
  const [comboSize2, setComboSize2] = useState(null);
  const [openAccordions, setOpenAccordions] = useState({});
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCareGuideOpen, setIsCareGuideOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  const [isForeignUser, setIsForeignUser] = useState(false);

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
    Black: [b1, b2, b3, b4],
    Navy: [n1, n2, n3, n4],
    Brown: [br1, br2, br3, br4],
    Maroon: [m1, m2, m3, m4],
    Khaki: [k1, k2, k3, k4],
  };

  // Safely fallback to Black images if no color is selected yet
  const displayColor = selectedColor || 'Black';
  const images = colorImages[displayColor];

  const handleColorChange = (colorName) => {
    setSelectedColor(colorName);
    setActiveIndex(0); // Reset gallery when color changes
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
  };

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

  let orderButtonText = "ORDER NOW";
  let isOrderReady = false;

  if (orderType === 'single') {
    if (!selectedColor && !selectedSize) {
      orderButtonText = "SELECT COLOR & SIZE";
    } else if (selectedColor && !selectedSize) {
      orderButtonText = "SELECT SIZE";
    } else if (!selectedColor && selectedSize) {
      orderButtonText = "SELECT COLOR";
    } else {
      orderButtonText = "ORDER NOW";
      isOrderReady = true;
    }
  } else {
    // combo
    if (!comboColor1 || !comboColor2 || !comboSize1 || !comboSize2) {
      orderButtonText = "SELECT COMBO OPTIONS";
    } else {
      orderButtonText = "ORDER NOW";
      isOrderReady = true;
    }
  }

  return (
    <>
      {isForeignUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-soft-black/80 backdrop-blur-sm p-4">
          <div className="bg-cream rounded-2xl p-6 md:p-8 max-w-sm md:max-w-md w-full text-center shadow-2xl border border-stone/10">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-5">
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
                className="inline-block w-full bg-soft-black text-cream px-6 py-3.5 md:py-4 font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-full hover:bg-terracotta transition-all shadow-md"
              >
                Return to Product Page
              </Link>
          </div>
        </div>
      )}

      <div className="w-full bg-cream min-h-screen pt-[49px] sm:pt-[76px] md:pt-[96px]">
      <div className="max-w-7xl mx-auto px-0 lg:px-12">
        
        {/* Product Hero & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-5 lg:gap-y-0 lg:gap-x-10 items-start mb-24">
          
          <div className="relative px-0 lg:px-0 lg:col-span-7">
            {/* Mobile Carousel (Hidden on lg) */}
            <div className="lg:hidden w-full relative mb-0">
              <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="w-full flex overflow-x-auto snap-x snap-mandatory gap-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {images.map((img, idx) => (
                  <div key={idx} className="relative w-full shrink-0 aspect-[4/5] bg-stone/20 overflow-hidden snap-center rounded-none">
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
              <div className="absolute bottom-4 left-4 pointer-events-none mix-blend-difference text-white z-10 opacity-70">
                <ZoomIn className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5]" />
              </div>

              {/* Mobile Swipe Indicators (Overlaid) */}
              <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2 z-10 pointer-events-none">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToDot(idx)}
                    className={`h-1.5 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-300 pointer-events-auto ${activeIndex === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop 2x2 Grid (Hidden on mobile) */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {images.slice(0, 4).map((img, idx) => (
                <div key={idx} className="relative w-full aspect-[4/5] bg-stone/10 overflow-hidden group rounded-none">
                  <img 
                    key={selectedColor + idx}
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
          </div>
          
          <div className="flex flex-col px-6 lg:px-0 lg:pt-0 lg:col-span-5">
            <h1 className="text-2xl lg:text-3xl font-serif text-soft-black mb-1 md:mb-2 mt-2 lg:mt-0">AST Handmade Macramé Belt</h1>
            <p className="text-xs md:text-sm font-light italic text-dark-charcoal/80 mb-2 md:mb-3 leading-relaxed">
              Fully handmade, very strong, and comfortable to wear. A belt made to last for years, even for the next generation!
            </p>
            <p className="text-[10px] md:text-sm font-sans tracking-widest uppercase text-terracotta mb-2 md:mb-3">Unisex Design • 100% Cotton</p>
            
            {/* Added Price */}
            <div className="mb-4 md:mb-5 flex items-center gap-3 md:gap-4 mt-2">
              <span className="text-2xl md:text-3xl font-serif text-soft-black leading-none">
                {orderType === 'single' ? '990 BDT' : '1,790 BDT'}
              </span>
              <div className="flex items-start gap-2 pt-1">
                <span className="text-[15px] md:text-lg text-red-500/80 line-through font-bold whitespace-nowrap leading-none">
                  {orderType === 'single' ? '1,150 BDT' : '2,300 BDT'}
                </span>
                <span className="bg-red-500 text-white text-[7px] md:text-[8px] font-bold uppercase tracking-widest px-1.5 py-[1px] rounded-full shadow-sm whitespace-nowrap -mt-0.5">
                  {orderType === 'single' ? 'Save 160 Tk' : 'Save 510 Tk'}
                </span>
              </div>
            </div>

            <div className="w-full h-px bg-stone/20 mb-5 md:mb-6"></div>

            {/* Order Type Selection */}
            <div className="mb-6 md:mb-8">
              <div className="flex gap-3 w-full max-w-md">
                <button 
                  onClick={() => setOrderType('single')}
                  className={`flex-1 py-3 md:py-3.5 px-2 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full border transition-all duration-300 ${orderType === 'single' ? 'bg-soft-black text-cream border-soft-black shadow-md' : 'bg-transparent text-soft-black border-stone/30 hover:border-soft-black/50 hover:bg-stone/5'}`}
                >
                  Single Product
                </button>
                <button 
                  onClick={() => setOrderType('combo')}
                  className={`flex-1 py-3 md:py-3.5 px-2 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full border transition-all duration-300 ${orderType === 'combo' ? 'bg-soft-black text-cream border-soft-black shadow-md' : 'bg-transparent text-soft-black border-stone/30 hover:border-soft-black/50 hover:bg-stone/5'}`}
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
                      <span className="underline underline-offset-4">Size Guide</span>
                    </button>
                    <div className="w-[1px] h-4 bg-dark-charcoal/30 mx-1 md:mx-2 shrink-0"></div>
                    <button 
                      onClick={() => setIsCareGuideOpen(true)}
                      className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-soft-black hover:text-dark-charcoal transition-colors"
                    >
                      <Droplets className="w-3.5 h-3.5 md:w-4 md:h-4 text-terracotta" />
                      <span className="underline underline-offset-4">Care Guide</span>
                    </button>
                  </div>
                </div>

                {/* Color and Size Row */}
                <div className="flex flex-row justify-between items-end gap-2 sm:gap-4 mb-6 md:mb-10 w-full">
                  {/* Color Selection */}
                  <div>
                    <span className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-soft-black mb-3 md:mb-4">
                      Color: <span className="font-medium text-dark-charcoal/70">{selectedColor}</span>
                    </span>
                    <div className="flex gap-2 sm:gap-3 md:gap-4">
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
                          className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-[11px] md:text-xs font-bold uppercase tracking-widest border transition-colors duration-300 rounded-full shrink-0 ${selectedSize === size ? 'bg-soft-black text-cream border-soft-black' : 'bg-transparent text-soft-black border-soft-black/20 hover:border-soft-black/50'}`}
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
                      <span className="underline underline-offset-4">Size Guide</span>
                    </button>
                    <div className="w-[1px] h-4 bg-dark-charcoal/30 mx-1 md:mx-2 shrink-0"></div>
                    <button 
                      onClick={() => setIsCareGuideOpen(true)}
                      className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-soft-black hover:text-dark-charcoal transition-colors"
                    >
                      <Droplets className="w-3.5 h-3.5 md:w-4 md:h-4 text-terracotta" />
                      <span className="underline underline-offset-4">Care Guide</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  {/* Belt 1 */}
                  <div className="flex flex-row justify-between items-end gap-2 sm:gap-4 mb-6 md:mb-8">
                    {/* Belt 1 Color */}
                    <div>
                      <span className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-soft-black mb-3 md:mb-4 text-left">
                        Belt 1 Color
                      </span>
                      <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                        {colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => { setComboColor1(color.name); handleColorChange(color.name); }}
                            className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full border transition-all duration-300 shrink-0 ${comboColor1 === color.name ? 'border-soft-black p-[2px]' : 'border-transparent'}`}
                            title={color.name}
                          >
                            <div className="w-full h-full rounded-full shadow-sm" style={{ backgroundColor: color.hex }} />
                          </button>
                        ))}
                      </div>
                    </div>

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
                            className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center text-[11px] md:text-xs font-bold border transition-colors duration-300 rounded-full shrink-0 ${comboSize1 === size ? 'bg-soft-black text-cream border-soft-black' : 'bg-transparent text-soft-black border-soft-black/20 hover:border-soft-black/50'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Belt 2 */}
                  <div className="flex flex-row justify-between items-end gap-2 sm:gap-4 mb-2 md:mb-4">
                    {/* Belt 2 Color */}
                    <div>
                      <span className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-soft-black mb-3 md:mb-4 text-left">
                        Belt 2 Color
                      </span>
                      <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                        {colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => { setComboColor2(color.name); handleColorChange(color.name); }}
                            className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full border transition-all duration-300 shrink-0 ${comboColor2 === color.name ? 'border-soft-black p-[2px]' : 'border-transparent'}`}
                            title={color.name}
                          >
                            <div className="w-full h-full rounded-full shadow-sm" style={{ backgroundColor: color.hex }} />
                          </button>
                        ))}
                      </div>
                    </div>

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
                            className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center text-[11px] md:text-xs font-bold border transition-colors duration-300 rounded-full shrink-0 ${comboSize2 === size ? 'bg-soft-black text-cream border-soft-black' : 'bg-transparent text-soft-black border-soft-black/20 hover:border-soft-black/50'}`}
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
            <div className="flex flex-col mb-10 md:mb-12">
              <div className="flex flex-col gap-3 md:gap-4">
                <button 
                  onClick={() => setIsOrderFormOpen(true)}
                  disabled={!isOrderReady}
                  className={`w-full flex items-center justify-center bg-soft-black text-cream px-8 py-4 md:py-5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors border border-transparent ${!isOrderReady ? 'opacity-50 cursor-not-allowed' : 'hover:bg-dark-charcoal'}`}
                >
                  {orderButtonText}
                </button>
                <a 
                  href="https://wa.me/8801940689061"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center bg-transparent border border-soft-black text-soft-black px-8 py-4 md:py-5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-stone/10 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  WHATSAPP
                </a>
              </div>
              <p className="text-[12px] md:text-[13px] text-dark-charcoal/70 mt-3 md:mt-4 italic flex items-center justify-center gap-1.5 font-medium px-1">
                <svg className="w-3.5 h-3.5 text-terracotta shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>If you want to order more than 2 products, please contact us via WhatsApp.</span>
              </p>
            </div>

            {/* Expandable Accordions */}
            <div className="border-t border-stone/30">
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
                <p className="leading-relaxed">
                  Carefully woven by skilled artisans in Bangladesh. Made from high-quality soft cotton macramé cord and finished with a durable, rust-resistant metal buckle for everyday wear. Lightweight, flexible, and exceptionally comfortable.
                </p>
              </Accordion>

              <Accordion 
                title={
                  <div className="flex items-center gap-3">
                    <Layers className="w-4 h-4 text-terracotta" />
                    <span>Materials & Construction</span>
                  </div>
                } 
                isOpen={!!openAccordions['materials']} 
                onClick={() => toggleAccordion('materials')}
              >
                <ul className="space-y-1.5">
                  <li className="flex items-start">
                    <span className="w-1 h-1 rounded-full bg-terracotta mt-[0.4rem] mr-2 flex-shrink-0"></span>
                    <span>Premium High-Quality Cotton Macramé Cord</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 rounded-full bg-terracotta mt-[0.4rem] mr-2 flex-shrink-0"></span>
                    <span>Rust-Resistant Metal Buckle with Modern Finish</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 rounded-full bg-terracotta mt-[0.4rem] mr-2 flex-shrink-0"></span>
                    <span>Soft, Flexible & Comfortable against the waist</span>
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
                <p className="leading-relaxed">
                  We are committed to delivering your orders quickly and securely. Once your order is confirmed, packages shipped within Chittagong will arrive at your doorstep in 3 working days. For deliveries outside of Chittagong, please expect your order to arrive within 7 working days.
                </p>
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
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-[0.4rem] mr-2.5 flex-shrink-0"></span>
                    <p className="leading-relaxed text-dark-charcoal/90">
                      Please note that actual product colors may vary slightly due to photographic lighting or monitor settings. A hassle-free return and refund policy is available.
                      <Link to="/refund" className="inline-block ml-1.5 font-bold uppercase tracking-widest text-[10px] text-soft-black hover:text-terracotta underline underline-offset-4 transition-colors">
                        Learn More!
                      </Link>
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-[0.4rem] mr-2.5 flex-shrink-0"></span>
                    <p className="leading-relaxed text-dark-charcoal/90">
                      We request you to kindly inspect your item in front of the delivery personnel before completing your payment. Free instant returns are available for your peace of mind.
                      <Link to="/refund" className="inline-block ml-1.5 font-bold uppercase tracking-widest text-[10px] text-soft-black hover:text-terracotta underline underline-offset-4 transition-colors">
                        Learn More!
                      </Link>
                    </p>
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
          <div className="bg-white border border-stone/20 w-full max-w-sm p-6 relative z-10 shadow-2xl rounded-xl text-center">
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
          <div className="bg-white border border-stone/20 w-full max-w-sm p-6 md:p-8 relative z-10 shadow-2xl rounded-xl text-center">
              <button 
                onClick={() => setIsCareGuideOpen(false)}
                className="absolute top-4 right-4 text-soft-black/40 hover:text-soft-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <Droplets className="h-8 w-8 mx-auto mb-4 text-terracotta" />
              
              <h2 className="text-xl md:text-2xl font-serif text-soft-black mb-6">Care Instructions</h2>
              
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3 p-3 bg-stone/5 rounded-lg border border-stone/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 shrink-0"></div>
                  <p className="text-sm text-dark-charcoal/80 leading-relaxed font-medium">Hand wash cold & gently</p>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-stone/5 rounded-lg border border-stone/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 shrink-0"></div>
                  <p className="text-sm text-dark-charcoal/80 leading-relaxed font-medium">Use mild detergent</p>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-stone/5 rounded-lg border border-stone/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 shrink-0"></div>
                  <p className="text-sm text-dark-charcoal/80 leading-relaxed font-medium">Do not bleach or soak</p>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-stone/5 rounded-lg border border-stone/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 shrink-0"></div>
                  <p className="text-sm text-dark-charcoal/80 leading-relaxed font-medium">Air dry naturally</p>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-stone/5 rounded-lg border border-stone/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 shrink-0"></div>
                  <p className="text-sm text-dark-charcoal/80 leading-relaxed font-medium">Do not tumble dry or iron</p>
                </div>
              </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 px-4 overflow-hidden"
          onWheel={(e) => {
            const zoomStep = 0.15;
            if (e.deltaY < 0) {
              setZoomLevel(prev => Math.min(prev + zoomStep, 3));
            } else {
              setZoomLevel(prev => Math.max(prev - zoomStep, 1));
            }
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEndEvent}
        >
          <div className="relative flex items-center justify-center w-full h-full">
              <button 
                onClick={handlePrevImage}
                className="absolute left-2 md:left-8 text-white z-[110] p-1.5 md:p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full transition-all"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              
              <div className="relative max-h-[90vh] md:max-h-[95vh] max-w-[95vw] aspect-[4/5] overflow-hidden rounded-none">
                <button 
                  onClick={() => { setLightboxImage(null); setZoomLevel(1); }}
                  className="absolute top-2 right-2 md:top-4 md:right-4 text-white mix-blend-difference z-[110] transition-transform hover:scale-110 p-2"
                >
                  <X className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                <img 
                  src={lightboxImage} 
                  alt="Product Zoom"
                  onClick={(e) => {
                    e.stopPropagation();
                    const now = Date.now();
                    const DOUBLE_PRESS_DELAY = 300;
                    if (now - (e.target.lastTap || 0) < DOUBLE_PRESS_DELAY) {
                      setZoomLevel(prev => prev === 1 ? 2.5 : 1);
                      e.target.lastTap = 0;
                    } else {
                      e.target.lastTap = now;
                    }
                  }}
                  style={{ transform: `scale(${zoomLevel})` }}
                  className="w-full h-full object-contain transition-transform duration-200 ease-out rounded-lg md:rounded-xl bg-white select-none cursor-zoom-in"
                  draggable="false"
                />
              </div>

              <button 
                onClick={handleNextImage}
                className="absolute right-2 md:right-8 text-white z-[110] p-1.5 md:p-2.5 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full transition-all"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
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

      {/* Retail Features - Clean, Borderless Layout */}
      <section className="pt-12 md:pt-24 pb-8 md:pb-12 bg-cotton-white px-4 md:px-6 border-t border-stone/10">
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex flex-row justify-between md:justify-center items-start w-full md:gap-8 lg:gap-16 px-2 md:px-0">
            
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center flex-1 group px-1 md:px-0">
              <div className="w-8 h-8 md:w-14 md:h-14 mb-2 md:mb-5 text-terracotta flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
              </div>
              <h3 className="text-[12px] md:text-lg font-serif font-bold md:font-normal mb-1 md:mb-3 text-soft-black leading-tight">
                Handcrafted
              </h3>
              <p className="text-dark-charcoal/70 text-[10px] md:text-sm leading-tight md:leading-relaxed">
                Meticulously hand-woven by artisans.
              </p>
            </div>

            {/* Faded Vertical Partition */}
            <div className="w-px h-20 md:h-24 bg-gradient-to-b from-transparent via-stone/40 to-transparent mt-2 md:mt-4 shrink-0"></div>
            
            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center flex-1 group px-1 md:px-0">
              <div className="w-8 h-8 md:w-14 md:h-14 mb-2 md:mb-5 text-terracotta flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
              </div>
              <h3 className="text-[12px] md:text-lg font-serif font-bold md:font-normal mb-1 md:mb-3 text-soft-black leading-tight">
                100% Cotton
              </h3>
              <p className="text-dark-charcoal/70 text-[10px] md:text-sm leading-tight md:leading-relaxed">
                Sustainable cord built to last.
              </p>
            </div>

            {/* Faded Vertical Partition */}
            <div className="w-px h-20 md:h-24 bg-gradient-to-b from-transparent via-stone/40 to-transparent mt-2 md:mt-4 shrink-0"></div>
            
            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center flex-1 group px-1 md:px-0">
              <div className="w-8 h-8 md:w-14 md:h-14 mb-2 md:mb-5 text-terracotta flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <h3 className="text-[12px] md:text-lg font-serif font-bold md:font-normal mb-1 md:mb-3 text-soft-black leading-tight">
                COD Available
              </h3>
              <p className="text-dark-charcoal/70 text-[10px] md:text-sm leading-tight md:leading-relaxed">
                Fast cash on delivery in BD.
              </p>
            </div>
            
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default RetailPage;
