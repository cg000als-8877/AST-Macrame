import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Minus, X, ZoomIn, ZoomOut, RotateCcw, Info } from 'lucide-react';
import SampleOrderDrawer from '../components/SampleOrderDrawer';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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
      className="w-full py-4 md:py-5 flex justify-between items-center text-left"
    >
      <span className="font-serif text-lg md:text-xl text-soft-black">{title}</span>
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
  const [selectedColors, setSelectedColors] = useState(['Black']);
  const [selectedSizes, setSelectedSizes] = useState(['M']);
  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openAccordions, setOpenAccordions] = useState({
    description: true,
    materials: true,
    custom: true
  });
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isSamplePolicyOpen, setIsSamplePolicyOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Localization state
  const [localCurrency, setLocalCurrency] = useState('BDT');
  const [currencySymbol, setCurrencySymbol] = useState('৳');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [userCountry, setUserCountry] = useState('Bangladesh');
  const [userCountryCode, setUserCountryCode] = useState('BD');
  const [userCallingCode, setUserCallingCode] = useState('+880');
  const [shippingCostLocal, setShippingCostLocal] = useState(120);
  const [isLoadingLocalization, setIsLoadingLocalization] = useState(true);

  useEffect(() => {
    document.title = "Wholesale & Export | Custom Private Label Macramé Belts - AST Macramé";
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchLocalization = async () => {
      try {
        const ipRes = await fetch('https://ipapi.co/json/');
        const ipData = await ipRes.json();
        
        const currencyCode = ipData.currency || 'USD';
        const country = ipData.country_name || 'United States';
        const countryCode = ipData.country_code || 'US';
        const callingCode = ipData.country_calling_code || '+1';
        
        const symbolMap = { 'USD': '$', 'EUR': '€', 'GBP': '£', 'BDT': '৳', 'CAD': 'C$', 'AUD': 'A$' };
        const symbol = symbolMap[currencyCode] || currencyCode + ' ';
        
        if (!isMounted) return;
        setUserCountry(country);
        setUserCountryCode(countryCode);
        setUserCallingCode(callingCode);
        setLocalCurrency(currencyCode);
        setCurrencySymbol(symbol);

        const erRes = await fetch('https://api.exchangerate-api.com/v4/latest/BDT');
        const erData = await erRes.json();
        const rate = erData.rates[currencyCode] || 1;
        
        if (!isMounted) return;
        setExchangeRate(rate);

        let baseShippingBDT = 2500;
        if (ipData.country_code === 'US') baseShippingBDT = 1500;
        else if (ipData.continent_code === 'EU') baseShippingBDT = 2000;
        else if (ipData.country_code === 'BD') baseShippingBDT = 130;
        
        setShippingCostLocal(baseShippingBDT * rate);
      } catch (err) {
        console.error("Failed to load localization data", err);
      } finally {
        if (isMounted) setIsLoadingLocalization(false);
      }
    };

    fetchLocalization();
    return () => { isMounted = false; };
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

  const images = colorImages[selectedColors[0]];
  const selectedColor = selectedColors[0]; // For backwards compatibility in rendering

  const handleColorChange = (index, colorName) => {
    const newColors = [...selectedColors];
    newColors[index] = colorName;
    setSelectedColors(newColors);
    if (index === 0) {
      setActiveIndex(0); // Reset gallery when primary color changes
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'auto' });
      }
    }
  };

  const handleQuantityChange = (qty) => {
    setQuantity(qty);
    if (qty > selectedColors.length) {
      const newColors = [...selectedColors];
      for (let i = selectedColors.length; i < qty; i++) {
        newColors.push(colors[i % colors.length].name);
      }
      setSelectedColors(newColors);
      const addedSizes = Array(qty - selectedSizes.length).fill(selectedSizes[0]);
      setSelectedSizes([...selectedSizes, ...addedSizes]);
    } else if (qty < selectedColors.length) {
      setSelectedColors(selectedColors.slice(0, qty));
      setSelectedSizes(selectedSizes.slice(0, qty));
    }
  };

  const handleSizeChange = (index, size) => {
    const newSizes = [...selectedSizes];
    newSizes[index] = size;
    setSelectedSizes(newSizes);
  };

  const getBasePriceBDT = (qty) => {
    switch(qty) {
      case 1: return 1090;
      case 2: return 1990;
      case 3: return 2890;
      case 4: return 3690;
      case 5: return 3990;
      default: return 1090 * qty;
    }
  };

  const totalPriceLocal = getBasePriceBDT(quantity) * exchangeRate;
  const unitPriceLocal = totalPriceLocal / quantity;

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
            {/* Mobile Product Gallery: Left Thumbnail Strip + Right Main Image (Hidden on lg) */}
            <div className="lg:hidden w-full px-3 sm:px-4 mb-4">
              <div className="flex gap-2.5 sm:gap-3 items-start">
                {/* Left Vertical Thumbnails */}
                <div className="flex flex-col gap-2 shrink-0 w-14 sm:w-16">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToDot(idx)}
                      className={`relative aspect-[4/5] w-full overflow-hidden transition-all border ${
                        activeIndex === idx
                          ? 'border-soft-black ring-1 ring-soft-black opacity-100 shadow-sm'
                          : 'border-stone/25 opacity-60 hover:opacity-100'
                      }`}
                      aria-label={`Select product image ${idx + 1}`}
                    >
                      <img 
                        src={img} 
                        alt={`Thumbnail ${idx + 1}`} 
                        className="w-full h-full object-cover object-center"
                      />
                    </button>
                  ))}
                </div>

                {/* Right Main Featured Image */}
                <div className="relative flex-1 min-w-0">
                  <div 
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="w-full flex overflow-x-auto snap-x snap-mandatory gap-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    style={{ scrollSnapType: 'x mandatory' }}
                  >
                    {images.map((img, idx) => (
                      <div 
                        key={idx} 
                        className="relative w-full shrink-0 aspect-[4/5] bg-stone/15 overflow-hidden snap-center snap-always rounded-none"
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
              </div>
            </div>

            {/* Desktop 2x2 Grid (Hidden on mobile) */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {images.slice(0, 4).map((img, idx) => (
                <div key={idx} className="relative w-full aspect-[4/5] bg-stone/10 overflow-hidden group rounded-none">
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
            className="flex flex-col px-6 lg:px-0 lg:pt-0 lg:col-span-5"
          >
            <h1 className="text-2xl lg:text-3xl font-serif text-soft-black mb-1 md:mb-2 mt-2 lg:mt-0">AST Handmade Macramé Belt</h1>
            <p className="text-xs md:text-sm font-light italic text-dark-charcoal/80 mb-2 md:mb-3 leading-relaxed">
              Fully handmade, very strong, and comfortable to wear. A belt made to last for years, even for the next generation!
            </p>
            <p className="text-[10px] md:text-sm font-sans tracking-widest uppercase text-terracotta mb-2 md:mb-3">Unisex Design • 100% Cotton</p>
            
            {/* Price Display & Policy */}
            <div className="mb-6">
              {isLoadingLocalization ? (
                <div className="h-8 w-24 bg-stone/20 animate-pulse rounded mb-2"></div>
              ) : (
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl md:text-3xl font-serif text-soft-black">
                    {currencySymbol}{totalPriceLocal.toFixed(2)}
                  </span>
                  <span className="text-xs md:text-sm font-light text-dark-charcoal/60">
                    {quantity > 1 ? `(${currencySymbol}${unitPriceLocal.toFixed(2)} per sample)` : ''}
                  </span>
                </div>
              )}
              
              <hr className="border-t border-stone/30 mb-2 w-full" />
              
              <div className="flex justify-start">
                <button 
                  onClick={() => setIsSamplePolicyOpen(true)}
                  className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-soft-black hover:text-dark-charcoal transition-colors flex items-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[2.5]" />
                  <span className="underline underline-offset-4">Sample Order Policy</span>
                </button>
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-6">
              <span className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-soft-black mb-3 md:mb-4">
                Quantity
              </span>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {[1, 2, 3, 4, 5].map(q => (
                  <button
                    key={q}
                    onClick={() => handleQuantityChange(q)}
                    className={`h-10 px-4 md:px-5 flex items-center justify-center text-[10px] md:text-xs font-bold uppercase tracking-widest border transition-colors duration-300 rounded-full ${quantity === q ? 'bg-soft-black text-cream border-soft-black' : 'bg-transparent text-soft-black border-soft-black/20 hover:border-soft-black/50'}`}
                  >
                    {q === 1 ? 'SINGLE' : `PACK OF ${q}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Color & Size Selection */}
            <div className="mb-8 md:mb-12">
              <div className="flex justify-between items-center mb-3 md:mb-4">
                <span className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-soft-black">
                  {quantity === 5 ? 'Pack Details' : 'Colors & Sizes'}
                </span>
                <button 
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-soft-black hover:text-dark-charcoal transition-colors underline underline-offset-4 flex items-center gap-1.5"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/>
                    <path d="m14.5 12.5 2-2"/>
                    <path d="m11.5 9.5 2-2"/>
                    <path d="m8.5 6.5 2-2"/>
                    <path d="m17.5 15.5 2-2"/>
                  </svg>
                  Size Guide
                </button>
              </div>

              {quantity === 5 ? (
                <div className="mb-6 p-4 md:p-5 border border-stone/30 bg-stone/5 relative rounded-2xl md:rounded-3xl">
                  <p className="text-xs md:text-sm text-dark-charcoal/80 font-light italic leading-relaxed">
                    <span className="font-semibold text-terracotta not-italic uppercase tracking-wider text-[10px] md:text-xs mr-2">Note:</span>
                    The Pack of 5 includes all 5 signature colors (Black, Navy, Brown, Maroon, Khaki) in a curated mix of sizes (2 Medium and 3 Large).
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2 md:gap-4 w-full">
                  {Array.from({ length: quantity }).map((_, index) => (
                    <div key={index} className="flex items-center justify-between sm:justify-start gap-1 sm:gap-3 bg-stone/5 border border-stone/10 p-2 sm:p-2.5 md:p-3 rounded-2xl md:rounded-3xl shadow-sm overflow-x-auto [&::-webkit-scrollbar]:hidden">
                      {quantity > 1 && (
                        <span className="text-[9px] sm:text-[10px] font-bold text-dark-charcoal uppercase shrink-0 sm:w-10 md:w-12">Belt {index + 1}:</span>
                      )}
                      
                      <div className="flex gap-1 sm:gap-1.5 md:gap-2 items-center shrink-0">
                        {colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => handleColorChange(index, color.name)}
                            className={`w-[22px] h-[22px] sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full border transition-all duration-300 ${selectedColors[index] === color.name ? 'border-soft-black p-[2px]' : 'border-transparent'}`}
                            title={color.name}
                          >
                            <div className="w-full h-full rounded-full shadow-sm" style={{ backgroundColor: color.hex }} />
                          </button>
                        ))}
                      </div>
                      
                      <div className="w-[1px] h-5 sm:h-6 md:h-7 bg-stone/20 mx-0.5 sm:mx-2 shrink-0"></div>
                      
                      <div className="flex gap-1 sm:gap-2 shrink-0 items-center">
                        <span className="text-[7px] sm:text-[8px] font-bold text-dark-charcoal/60 uppercase mr-0.5 tracking-wider">Size</span>
                        {['M', 'L'].map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSizeChange(index, size)}
                            className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center text-[10px] sm:text-[11px] md:text-xs font-bold border transition-colors duration-300 rounded-full ${selectedSizes[index] === size ? 'bg-soft-black text-cream border-soft-black' : 'bg-transparent text-soft-black border-soft-black/20 hover:border-soft-black/50'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 md:gap-4 mb-10 md:mb-12">
              {/* Shipping Status */}
              <div className="mb-1 text-center">
                {isLoadingLocalization ? (
                  <div className="h-4 w-48 bg-stone/20 animate-pulse rounded mx-auto"></div>
                ) : (
                  <p className="text-[10px] md:text-xs font-semibold text-soft-black/80 tracking-wide">
                    ✈️ Estimated Shipping to {userCountry}: {currencySymbol}{shippingCostLocal.toFixed(2)}
                  </p>
                )}
              </div>

              <button 
                onClick={() => setIsOrderFormOpen(true)}
                className="w-full flex items-center justify-center bg-soft-black text-cream px-8 py-4 md:py-5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-dark-charcoal transition-colors border border-transparent"
              >
                Order Sample
              </button>
              
              <Link 
                to="/contact" 
                className="w-full flex items-center justify-center bg-transparent border border-soft-black text-soft-black px-8 py-4 md:py-5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-soft-black/5 transition-colors"
              >
                Wholesale Inquiry
              </Link>
            </div>

            {/* Expandable Accordions */}
            <div className="border-t border-stone/30">
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
                    className={`w-12 h-14 sm:w-14 sm:h-16 shrink-0 rounded-none overflow-hidden border-2 transition-all cursor-pointer ${
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

      <SampleOrderDrawer 
        isOpen={isOrderFormOpen} 
        onClose={() => setIsOrderFormOpen(false)} 
        orderDetails={{
          quantity,
          selectedColors,
          selectedSizes,
          unitPriceLocal,
          shippingCostLocal,
          totalPriceLocal,
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
    </div>
  );
};

export default Product;

