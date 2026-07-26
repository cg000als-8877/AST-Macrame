import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Minus, X } from 'lucide-react';
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

const RetailPage = () => {
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeIndex, setActiveIndex] = useState(0);
  const [openAccordions, setOpenAccordions] = useState({
    description: true,
    materials: true,
    custom: true
  });
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
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
    <div className="w-full bg-cream min-h-screen pt-[68px] sm:pt-[76px] md:pt-[96px] pb-16 md:pb-24">
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
                  <div key={idx} className="relative w-full shrink-0 aspect-[4/5] bg-stone/20 overflow-hidden snap-start">
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
            <h1 className="text-2xl md:text-4xl font-serif text-soft-black mb-2 md:mb-3 mt-2 lg:mt-0">AST Handmade Macramé Belt</h1>
            <p className="text-xs md:text-sm font-light italic text-dark-charcoal/80 mb-4 md:mb-5 leading-relaxed">
              Fully handmade, very strong, and comfortable to wear.<br className="hidden md:block" />
              A belt made to last for years, even for the next generation!
            </p>
            <p className="text-[10px] md:text-sm font-sans tracking-widest uppercase text-terracotta mb-4 md:mb-6">Unisex Design • 100% Cotton</p>
            
            {/* Added Price */}
            <div className="mb-6 md:mb-8 flex items-center gap-2">
              <span className="text-xl md:text-3xl font-serif text-soft-black leading-none">1,090 BDT</span>
              <span className="bg-emerald-700/80 text-white text-[7px] md:text-[8px] font-bold uppercase tracking-normal px-1.5 py-[1px] rounded-sm shadow-sm">Per Piece</span>
            </div>

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
            <div className="mb-4 md:mb-5">
              <div className="flex justify-start items-center gap-4 mb-3 md:mb-4">
                <span className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-soft-black">Size</span>
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

            {/* Size Guide Link (Moved) */}
            <div className="mb-8 md:mb-12 text-left">
              <button 
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-terracotta hover:text-dark-charcoal transition-colors underline underline-offset-4"
              >
                Size Guide
              </button>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 md:gap-4 mb-10 md:mb-12">
              <button 
                onClick={() => setIsOrderFormOpen(true)}
                className="w-full bg-soft-black text-cream text-center px-8 py-4 md:py-5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-none hover:bg-dark-charcoal transition-colors"
              >
                ORDER NOW
              </button>
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

      <RetailOrderModal 
        isOpen={isOrderFormOpen} 
        onClose={() => setIsOrderFormOpen(false)} 
        initialColor={selectedColor}
        initialSize={selectedSize}
      />

      {/* Retail Features - Clean, Borderless Layout */}
      <section className="py-12 md:py-24 bg-cotton-white px-4 md:px-6 border-t border-stone/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-row flex-wrap md:flex-nowrap justify-center items-start md:items-start gap-x-4 gap-y-8 md:gap-8 lg:gap-16">
            
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center w-[45%] md:w-full max-w-[280px] group">
              <div className="w-8 h-8 md:w-14 md:h-14 mb-3 md:mb-5 text-terracotta flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
              </div>
              <h3 className="text-xs md:text-lg font-serif font-bold md:font-normal mb-1.5 md:mb-3 text-soft-black">
                <span className="md:hidden">Handcrafted</span>
                <span className="hidden md:inline">Handcrafted Quality</span>
              </h3>
              <p className="text-dark-charcoal/70 text-[10px] md:text-sm leading-relaxed">
                <span className="md:hidden">Meticulously hand-woven by artisans for a premium finish.</span>
                <span className="hidden md:inline">Every belt is meticulously hand-woven by skilled artisans, ensuring a unique and premium finish.</span>
              </p>
            </div>

            {/* Divider for desktop */}
            <div className="hidden md:block w-px h-24 bg-stone/20 mt-4 shrink-0"></div>
            
            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center w-[45%] md:w-full max-w-[280px] group">
              <div className="w-8 h-8 md:w-14 md:h-14 mb-3 md:mb-5 text-terracotta flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
              </div>
              <h3 className="text-xs md:text-lg font-serif font-bold md:font-normal mb-1.5 md:mb-3 text-soft-black">
                <span className="md:hidden">100% Cotton</span>
                <span className="hidden md:inline">100% Eco-Cotton</span>
              </h3>
              <p className="text-dark-charcoal/70 text-[10px] md:text-sm leading-relaxed">
                <span className="md:hidden">Sustainable, durable cord that is soft and built to last.</span>
                <span className="hidden md:inline">Made from sustainable, highly durable cotton macramé cord that is soft to the touch and built to last.</span>
              </p>
            </div>

            {/* Divider for desktop */}
            <div className="hidden md:block w-px h-24 bg-stone/20 mt-4 shrink-0"></div>
            
            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center w-[45%] md:w-full max-w-[280px] group">
              <div className="w-8 h-8 md:w-14 md:h-14 mb-3 md:mb-5 text-terracotta flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <h3 className="text-xs md:text-lg font-serif font-bold md:font-normal mb-1.5 md:mb-3 text-soft-black">
                <span className="md:hidden">COD Available</span>
                <span className="hidden md:inline">Cash on Delivery</span>
              </h3>
              <p className="text-dark-charcoal/70 text-[10px] md:text-sm leading-relaxed">
                <span className="md:hidden">Fast and reliable cash on delivery all over Bangladesh.</span>
                <span className="hidden md:inline">Shop with complete confidence. We offer fast and reliable cash on delivery services anywhere in Bangladesh.</span>
              </p>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default RetailPage;
