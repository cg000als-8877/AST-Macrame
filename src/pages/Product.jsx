import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Minus, X } from 'lucide-react';
import InquiryModal from '../components/InquiryModal';

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
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('M');
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
    { name: 'Brown', hex: '#5c4033' },
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

  const images = colorImages[selectedColor];

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

  return (
    <div className="w-full bg-cream min-h-screen pt-[102px] sm:pt-[76px] md:pt-[96px] pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-0 lg:px-12">
        
        {/* Product Hero & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-5 lg:gap-y-0 lg:gap-x-10 items-start mb-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative px-0 lg:px-0 lg:col-span-7"
          >
            {/* Mobile Carousel (Hidden on lg) */}
            <div className="lg:hidden w-full relative mb-0">
              <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="w-full flex overflow-x-auto snap-x snap-mandatory gap-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {images.map((img, idx) => (
                  <div key={idx} className="relative w-full shrink-0 aspect-[4/5] bg-stone/20 overflow-hidden snap-start snap-always">
                    <img 
                      src={img} 
                      alt={`Macrame Belt ${selectedColor} view ${idx + 1}`} 
                      onClick={() => setLightboxImage(img)}
                      className="absolute inset-0 w-full h-full object-cover object-center mix-blend-multiply opacity-90 cursor-zoom-in"
                    />
                  </div>
                ))}
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
                <div key={idx} className="relative w-full aspect-[4/5] bg-stone/10 overflow-hidden">
                  <motion.img 
                    key={selectedColor + idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src={img} 
                    alt={`Macrame Belt ${selectedColor} view ${idx + 1}`} 
                    onClick={() => setLightboxImage(img)}
                    className="absolute inset-0 w-full h-full object-cover object-center mix-blend-multiply opacity-90 hover:scale-105 transition-transform duration-700 cursor-zoom-in"
                  />
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
            <h1 className="text-2xl lg:text-3xl font-serif text-soft-black mb-2 md:mb-4 mt-2 lg:mt-0">AST Handmade Macramé Belt</h1>
            <p className="text-[10px] md:text-sm font-sans tracking-widest uppercase text-terracotta mb-4 md:mb-6">Unisex Design • 100% Cotton</p>
            
            

            {/* Color Selection */}
            <div className="mb-6 md:mb-10">
              <span className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-soft-black mb-3 md:mb-4">
                Color: <span className="font-medium text-dark-charcoal/70">{selectedColor}</span>
              </span>
              <div className="flex gap-4">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorChange(color.name)}
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-full border-2 transition-all duration-300 ${selectedColor === color.name ? 'border-soft-black p-[2px]' : 'border-transparent'}`}
                    aria-label={`Select ${color.name}`}
                  >
                    <div className="w-full h-full rounded-full shadow-sm" style={{ backgroundColor: color.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8 md:mb-12">
              <div className="flex justify-start items-center gap-4 mb-3 md:mb-4">
                <span className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-soft-black">Size</span>
                <button 
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-terracotta hover:text-dark-charcoal transition-colors underline underline-offset-4"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex gap-3 md:gap-4">
                {['M', 'L'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-xs md:text-sm font-bold uppercase tracking-widest border transition-colors duration-300 rounded-none ${selectedSize === size ? 'bg-soft-black text-cream border-soft-black' : 'bg-transparent text-soft-black border-soft-black/20 hover:border-soft-black/50'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 md:gap-4 mb-10 md:mb-12">
              <div className="flex justify-start mb-1">
                <button 
                  onClick={() => setIsSamplePolicyOpen(true)}
                  className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-terracotta hover:text-dark-charcoal transition-colors underline underline-offset-4"
                >
                  Sample Order Policy
                </button>
              </div>
              <button 
                onClick={() => setIsOrderFormOpen(true)}
                className="w-full bg-soft-black text-cream text-center px-8 py-4 md:py-5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-none hover:bg-dark-charcoal transition-colors"
              >
                Order Sample
              </button>
              <Link 
                to="/contact" 
                className="w-full border border-soft-black text-soft-black text-center px-8 py-4 md:py-5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-none hover:bg-soft-black/5 transition-colors"
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
                    <span className="w-1 h-1 rounded-none bg-terracotta mt-[0.6rem] mr-2.5 flex-shrink-0"></span>
                    <span>Premium High-Quality Cotton Macramé Cord</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 rounded-none bg-terracotta mt-[0.6rem] mr-2.5 flex-shrink-0"></span>
                    <span>Rust-Resistant Metal Buckle with Modern Finish</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 rounded-none bg-terracotta mt-[0.6rem] mr-2.5 flex-shrink-0"></span>
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
                    <span className="w-1 h-1 rounded-none bg-terracotta mt-[0.6rem] mr-2.5 flex-shrink-0"></span>
                    <span>Custom Belt Colors to match your brand palette</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 rounded-none bg-terracotta mt-[0.6rem] mr-2.5 flex-shrink-0"></span>
                    <span>Custom Buckle finishes (Matte, Brass, Silver, Gunmetal)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 rounded-none bg-terracotta mt-[0.6rem] mr-2.5 flex-shrink-0"></span>
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
              
              <p className="text-xs text-dark-charcoal/80 font-light mb-4 px-2 text-center">
                Evaluate our craftsmanship before placing a wholesale order.
              </p>
              
              <div className="bg-stone/5 rounded-lg border border-stone/10 p-4 mb-4">
                <ul className="space-y-3 text-xs text-dark-charcoal/80 font-light list-disc list-outside ml-4">
                  <li>Samples are charged at the standard single-unit price.</li>
                  <li><strong>Bangladesh:</strong> Cash on Delivery (COD) available.</li>
                  <li><strong>International:</strong> Full advance payment required prior to shipping.</li>
                  <li><strong>Reimbursement:</strong> Full sample cost is deducted from your subsequent confirmed bulk order invoice.</li>
                  <li>Limited to one sample per design. Shipping charges are non-refundable.</li>
                </ul>
              </div>
              
              <p className="text-[11px] font-medium text-dark-charcoal/70 leading-relaxed text-center px-2">
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 px-4 overflow-hidden"
            onWheel={(e) => {
              const zoomStep = 0.15;
              if (e.deltaY < 0) {
                setZoomLevel(prev => Math.min(prev + zoomStep, 3));
              } else {
                setZoomLevel(prev => Math.max(prev - zoomStep, 1));
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative flex items-center justify-center w-full h-full"
            >
              <div className="relative max-h-[90vh] md:max-h-[95vh] max-w-[95vw] aspect-[4/5] overflow-hidden">
                <button 
                  onClick={() => { setLightboxImage(null); setZoomLevel(1); }}
                  className="absolute top-2 right-2 md:top-4 md:right-4 text-white mix-blend-difference z-[110] transition-transform hover:scale-110 p-2"
                >
                  <X className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                <img 
                  src={lightboxImage} 
                  alt="Product Zoom"
                  style={{ transform: `scale(${zoomLevel})` }}
                  className="w-full h-full object-contain transition-transform duration-75 ease-out rounded-lg md:rounded-xl bg-white"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <InquiryModal 
        isOpen={isOrderFormOpen} 
        onClose={() => setIsOrderFormOpen(false)} 
        formType="sample" 
        initialColor={selectedColor}
        initialSize={selectedSize}
      />

      {/* Features Grid */}
      <section className="py-12 md:py-20 bg-cotton-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12">
            
            <div className="flex flex-col items-center text-center bg-white p-6 md:p-10 lg:p-12 border border-stone/20 rounded-[2rem] md:rounded-[2.5rem] shadow-sm hover:bg-stone/5 hover:border-stone/40 hover:-translate-y-1 transition-all duration-300 w-full max-w-[340px]">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-cream flex items-center justify-center mb-4 md:mb-6 text-terracotta shrink-0 border border-stone/10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="scale-75 md:scale-100">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-serif mb-2 md:mb-4 text-soft-black">Premium Materials</h3>
              <p className="text-dark-charcoal/70 text-xs md:text-sm leading-relaxed">
                We source only high-quality cotton macramé cord and rust-resistant, durable metal buckles for every piece.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center bg-white p-6 md:p-10 lg:p-12 border border-stone/20 rounded-[2rem] md:rounded-[2.5rem] shadow-sm hover:bg-stone/5 hover:border-stone/40 hover:-translate-y-1 transition-all duration-300 w-full max-w-[340px]">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-cream flex items-center justify-center mb-4 md:mb-6 text-terracotta shrink-0 border border-stone/10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="scale-75 md:scale-100">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-serif mb-2 md:mb-4 text-soft-black">OEM & Private Label</h3>
              <p className="text-dark-charcoal/70 text-xs md:text-sm leading-relaxed">
                Complete customization including custom tags, packaging, bespoke colors, and specific size requirements.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center bg-white p-6 md:p-10 lg:p-12 border border-stone/20 rounded-[2rem] md:rounded-[2.5rem] shadow-sm hover:bg-stone/5 hover:border-stone/40 hover:-translate-y-1 transition-all duration-300 w-full max-w-[340px]">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-cream flex items-center justify-center mb-4 md:mb-6 text-terracotta shrink-0 border border-stone/10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="scale-75 md:scale-100">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-serif mb-2 md:mb-4 text-soft-black">Quality Assured</h3>
              <p className="text-dark-charcoal/70 text-xs md:text-sm leading-relaxed">
                Every belt undergoes rigorous individual inspection covering weaving quality, size accuracy, and buckle strength.
              </p>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;

