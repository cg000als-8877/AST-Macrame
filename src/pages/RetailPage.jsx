import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Minus, X, Ruler, ZoomIn } from 'lucide-react';
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="pb-4 text-dark-charcoal/80 font-light text-sm">
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
  const [comboColor2, setComboColor2] = useState('Navy');
  const [comboSize1, setComboSize1] = useState('M');
  const [comboSize2, setComboSize2] = useState('M');
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
                <div key={idx} className="relative w-full aspect-[4/5] bg-stone/10 overflow-hidden group">
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
            
            {/* Added Price */}
            <div className="mb-4 md:mb-5 flex flex-wrap items-center gap-2 md:gap-3">
              <span className="text-xl md:text-3xl font-serif text-soft-black leading-none">
                {orderType === 'single' ? '1,090 BDT' : '1,990 BDT'}
              </span>
              <span className="text-sm md:text-lg text-red-500/80 line-through font-semibold pt-1">
                {orderType === 'single' ? '1,250 BDT' : '2,500 BDT'}
              </span>
              <span className="bg-red-500 text-white text-[8px] md:text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full shadow-sm ml-1.5">
                {orderType === 'single' ? 'Save 160 Tk' : 'Save 510 Tk'}
              </span>
            </div>

            <div className="w-full h-px bg-stone/20 mb-5 md:mb-6"></div>

            {/* Order Type Selection */}
            <div className="mb-6">
              <div className="flex bg-stone/10 p-1 rounded-lg w-full max-w-sm">
                <button 
                  onClick={() => setOrderType('single')}
                  className={`flex-1 py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-md transition-all ${orderType === 'single' ? 'bg-white shadow-sm text-soft-black' : 'text-dark-charcoal/60 hover:text-soft-black'}`}
                >
                  Single Product
                </button>
                <button 
                  onClick={() => setOrderType('combo')}
                  className={`flex-1 py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-md transition-all ${orderType === 'combo' ? 'bg-white shadow-sm text-soft-black' : 'text-dark-charcoal/60 hover:text-soft-black'}`}
                >
                  Combo (2 Belts)
                </button>
              </div>
            </div>

            {orderType === 'single' ? (
              <>
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
                  <div className="flex items-center gap-4 mb-3 md:mb-4">
                    <span className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-soft-black">Size</span>
                    <button 
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-soft-black hover:text-dark-charcoal transition-colors"
                    >
                      <Ruler className="w-4 h-4 md:w-4 md:h-4" />
                      <span className="underline underline-offset-4">Size Guide</span>
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
              </>
            ) : (
              <div className="mb-6 md:mb-8">
                <div className="flex items-center gap-4 mb-3 md:mb-4">
                  <span className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-soft-black">Select Combo Options</span>
                  <button 
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-soft-black hover:text-dark-charcoal transition-colors"
                  >
                    <Ruler className="w-4 h-4 md:w-4 md:h-4" />
                    <span className="underline underline-offset-4">Size Guide</span>
                  </button>
                </div>
                <div className="flex flex-col gap-3 md:gap-4 max-w-sm">
                  {/* Belt 1 */}
                  <div className="flex items-center gap-3 bg-white border border-stone/20 p-2 md:p-3 rounded-lg shadow-sm">
                    <span className="text-[10px] font-bold text-dark-charcoal uppercase w-10 md:w-12 shrink-0">Belt 1:</span>
                    <select 
                      value={comboColor1} 
                      onChange={(e) => { setComboColor1(e.target.value); handleColorChange(e.target.value); }}
                      className="flex-1 bg-transparent text-xs md:text-sm font-medium focus:outline-none cursor-pointer text-soft-black"
                    >
                      {colors.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                    <div className="w-[1px] h-6 bg-stone/20"></div>
                    <select 
                      value={comboSize1} 
                      onChange={(e) => setComboSize1(e.target.value)}
                      className="w-10 md:w-12 bg-transparent text-xs md:text-sm font-medium focus:outline-none cursor-pointer text-soft-black"
                    >
                      {['M', 'L'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  {/* Belt 2 */}
                  <div className="flex items-center gap-3 bg-white border border-stone/20 p-2 md:p-3 rounded-lg shadow-sm">
                    <span className="text-[10px] font-bold text-dark-charcoal uppercase w-10 md:w-12 shrink-0">Belt 2:</span>
                    <select 
                      value={comboColor2} 
                      onChange={(e) => setComboColor2(e.target.value)}
                      className="flex-1 bg-transparent text-xs md:text-sm font-medium focus:outline-none cursor-pointer text-soft-black"
                    >
                      {colors.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                    <div className="w-[1px] h-6 bg-stone/20"></div>
                    <select 
                      value={comboSize2} 
                      onChange={(e) => setComboSize2(e.target.value)}
                      className="w-10 md:w-12 bg-transparent text-xs md:text-sm font-medium focus:outline-none cursor-pointer text-soft-black"
                    >
                      {['M', 'L'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col mb-10 md:mb-12">
              <div className="flex flex-col gap-3 md:gap-4">
                <button 
                  onClick={() => setIsOrderFormOpen(true)}
                  className="w-full bg-soft-black text-cream text-center px-8 py-4 md:py-5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-none hover:bg-dark-charcoal transition-colors"
                >
                  ORDER NOW
                </button>
                <a 
                  href="https://wa.me/8801940689061"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center bg-transparent border border-soft-black text-soft-black text-center px-8 py-4 md:py-5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-none hover:bg-stone/10 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  WHATSAPP
                </a>
              </div>
              <p className="text-[10px] md:text-[11px] text-dark-charcoal/70 mt-3 md:mt-4 italic flex items-center justify-center gap-1.5 font-medium px-1">
                <svg className="w-3 h-3 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                If you want to order more than 2 products, please contact us via WhatsApp.
              </p>
            </div>

            {/* Expandable Accordions */}
            <div className="border-t border-stone/30">
              <Accordion 
                title="Description" 
                isOpen={!!openAccordions['description']} 
                onClick={() => toggleAccordion('description')}
              >
                <p className="leading-relaxed">
                  Carefully woven by skilled artisans in Bangladesh. Made from high-quality soft cotton macramé cord and finished with a durable, rust-resistant metal buckle for everyday wear. Lightweight, flexible, and exceptionally comfortable.
                </p>
              </Accordion>

              <Accordion 
                title="Materials & Construction" 
                isOpen={!!openAccordions['materials']} 
                onClick={() => toggleAccordion('materials')}
              >
                <ul className="space-y-1.5">
                  <li className="flex items-start">
                    <span className="w-1 h-1 rounded-none bg-terracotta mt-[0.4rem] mr-2 flex-shrink-0"></span>
                    <span>Premium High-Quality Cotton Macramé Cord</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 rounded-none bg-terracotta mt-[0.4rem] mr-2 flex-shrink-0"></span>
                    <span>Rust-Resistant Metal Buckle with Modern Finish</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 rounded-none bg-terracotta mt-[0.4rem] mr-2 flex-shrink-0"></span>
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
        orderType={orderType}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        comboColor1={comboColor1}
        comboSize1={comboSize1}
        comboColor2={comboColor2}
        comboSize2={comboSize2}
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
