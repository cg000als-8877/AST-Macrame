import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

import b1 from '../assets/products/Black/1.jpg';
import n1 from '../assets/products/Navy/1.jpg';
import br1 from '../assets/products/Brown/1.jpg';
import m1 from '../assets/products/Maroon/1.jpg';
import k1 from '../assets/products/Khaki/1.jpg';

const colorImages = {
  Black: b1,
  Navy: n1,
  Brown: br1,
  Maroon: m1,
  Khaki: k1,
};

const RetailOrderModal = ({ isOpen, onClose, initialColor = '', initialSize = '' }) => {
  const [selectedColor, setSelectedColor] = useState(initialColor || 'Black');
  const [selectedSize, setSelectedSize] = useState(initialSize || 'M');
  const [deliveryCharge, setDeliveryCharge] = useState('150'); // 150 for outside, 100 for inside
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialColor) setSelectedColor(initialColor);
    if (initialSize) setSelectedSize(initialSize);
  }, [initialColor, initialSize]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
      setTimeout(() => setIsSuccess(false), 300);
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    formData.append('formType', 'Retail Order');
    if (!formData.get('color')) formData.append('color', selectedColor);
    if (!formData.get('size')) formData.append('size', selectedSize);
    
    // Add Delivery Charge label for Google Sheet
    formData.append('deliveryCharge', deliveryCharge === '100' ? 'Inside Chittagong (100 Taka)' : 'Outside Chittagong (150 Taka)');

    const urlEncodedData = new URLSearchParams(formData).toString();

    try {
      const delay = new Promise(resolve => setTimeout(resolve, 2000));
      
      await Promise.all([
        fetch('https://script.google.com/macros/s/AKfycbx4gy7B2XG-ZrQaHm2B8LFTLjObJ2ryM09SRwUTS4B-mFBb6kxnBEx1QP4eBrQOD3cm/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: urlEncodedData,
        }),
        delay
      ]);
      
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsSuccess(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-soft-black/50 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-cream p-5 sm:p-8 md:px-12 md:py-8 rounded-xl md:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto z-10"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-soft-black/50 hover:text-soft-black transition-colors z-20"
            >
              <X size={24} />
            </button>

            {/* Watermark Logo for Mobile */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 sm:hidden opacity-5 overflow-hidden">
              <img 
                src="/logo_black.png" 
                alt="" 
                className="w-3/4 max-w-[200px] object-contain"
              />
            </div>
            
            <div className="relative z-10">
            {isSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-stone/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-soft-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-soft-black mb-4">Thank You For Your Order!</h2>
                <p className="text-sm md:text-base text-dark-charcoal/70">
                  Your retail order has been successfully placed.<br />We will process it shortly.
                </p>
                <button onClick={onClose} className="mt-8 bg-terracotta text-cream px-10 py-3 text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-muted-burgundy transition-colors shadow-lg">
                  Close Window
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center mb-6 md:mb-8 text-center">
                  <img src="/logo_black.png" alt="AST Handmade Macramé Belts" className="h-8 md:h-10 w-auto object-contain mb-2 md:mb-3" />
                  <p className="text-[11px] md:text-xs font-bold text-dark-charcoal tracking-wide uppercase">
                    Cash on delivery (COD) all over Bangladesh
                  </p>
                </div>
                
                <form 
                  className="space-y-4 md:space-y-5"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-1 md:mb-1.5">
                        Name / <span className="font-bengali tracking-normal font-medium text-[11px] md:text-[13px] capitalize">নাম</span>
                      </label>
                      <input type="text" name="name" className="w-full bg-transparent border-b border-stone/50 py-1.5 md:py-1.5 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm" placeholder="Your Full Name" required />
                    </div>
                    <div>
                      <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-1 md:mb-1.5">
                        Phone / <span className="font-bengali tracking-normal font-medium text-[11px] md:text-[13px] capitalize">মোবাইল</span>
                      </label>
                      <input type="tel" name="phone" className="w-full bg-transparent border-b border-stone/50 py-1.5 md:py-1.5 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm" placeholder="01XXX XXXXXX" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-1 md:mb-1.5">
                        Email / <span className="font-bengali tracking-normal font-medium text-[11px] md:text-[13px] capitalize">ইমেইল</span> <span className="text-dark-charcoal/50 font-normal normal-case tracking-normal">(Optional)</span>
                      </label>
                      <input type="email" name="email" className="w-full bg-transparent border-b border-stone/50 py-1.5 md:py-1.5 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm" placeholder="email@example.com" />
                    </div>
                    <div>
                      <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-1 md:mb-1.5">
                        Thana / <span className="font-bengali tracking-normal font-medium text-[11px] md:text-[13px] capitalize">থানা</span>
                      </label>
                      <input type="text" name="thana" className="w-full bg-transparent border-b border-stone/50 py-1.5 md:py-1.5 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm" placeholder="e.g. Kotwali" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-1 md:mb-1.5">
                        District / <span className="font-bengali tracking-normal font-medium text-[11px] md:text-[13px] capitalize">জেলা</span>
                      </label>
                      <input type="text" name="district" className="w-full bg-transparent border-b border-stone/50 py-1.5 md:py-1.5 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm" placeholder="e.g. Chittagong" required />
                    </div>
                    <div>
                      <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-1 md:mb-1.5">
                        Delivery Point / <span className="font-bengali tracking-normal font-medium text-[11px] md:text-[13px] capitalize">যে জায়গা থেকে রিসিভ করবেন</span>
                      </label>
                      <input type="text" name="delivery_point" className="w-full bg-transparent border-b border-stone/50 py-1.5 md:py-1.5 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm" placeholder="Full Address" required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-1 md:mb-1.5">
                      Note / <span className="font-bengali tracking-normal font-medium text-[11px] md:text-[13px] capitalize">নোট</span> <span className="text-dark-charcoal/50 font-normal normal-case tracking-normal">(Optional)</span>
                    </label>
                    <textarea 
                      name="message"
                      rows="2" 
                      className="w-full bg-transparent border-b border-stone/50 py-1.5 md:py-1.5 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm resize-none" 
                      placeholder="Any custom instructions..."
                    ></textarea>
                  </div>

                  {/* Color & Size Selection */}
                  <div className="flex gap-4 md:gap-8 items-center pt-2 md:pt-4">
                    <div className="flex-1">
                      <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-2 md:mb-3">Select Color</label>
                      <div className="grid grid-flow-col grid-rows-3 gap-y-2 gap-x-2 md:gap-x-4 mb-4">
                        {['Black', 'Navy', 'Brown', 'Maroon', 'Khaki'].map(color => (
                          <label key={color} className="flex items-center gap-2 cursor-pointer text-xs md:text-sm text-dark-charcoal font-medium">
                            <input 
                              type="radio" 
                              name="color_selection" // Note: used color_selection to avoid conflict with formData auto-append
                              value={color} 
                              checked={selectedColor === color} 
                              onChange={(e) => setSelectedColor(e.target.value)}
                              className="w-3.5 h-3.5 md:w-4 md:h-4 accent-soft-black" 
                              required 
                            />
                            {color}
                          </label>
                        ))}
                      </div>

                      <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-2 md:mb-2">Select Size</label>
                      <div className="flex gap-4 md:gap-6">
                        {['M', 'L'].map(size => (
                          <label key={size} className="flex items-center gap-1.5 md:gap-2 cursor-pointer text-xs md:text-sm text-dark-charcoal">
                            <input 
                              type="radio" 
                              name="size_selection" 
                              value={size} 
                              checked={selectedSize === size}
                              onChange={(e) => setSelectedSize(e.target.value)}
                              className="w-3.5 h-3.5 md:w-4 md:h-4 accent-soft-black" 
                              required 
                            />
                            {size}
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="w-24 md:w-32 shrink-0 aspect-[4/5] bg-stone/10 rounded-lg overflow-hidden border border-stone/20 shadow-sm">
                      <img src={colorImages[selectedColor]} alt={selectedColor} className="w-full h-full object-cover mix-blend-multiply" />
                    </div>
                  </div>

                  <div className="w-full h-px bg-stone/20 my-4 md:my-6"></div>

                  {/* Delivery Charges */}
                  <div>
                    <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-3 md:mb-4">Delivery Options</label>
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-3 cursor-pointer p-3 border border-stone/20 rounded-lg hover:border-terracotta transition-colors">
                        <input 
                          type="radio" 
                          name="delivery_charge" 
                          value="100" 
                          checked={deliveryCharge === '100'}
                          onChange={(e) => setDeliveryCharge(e.target.value)}
                          className="w-4 h-4 accent-soft-black" 
                          required 
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-soft-black">Inside Chittagong</span>
                          <span className="text-xs text-dark-charcoal/70">100 Taka</span>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer p-3 border border-stone/20 rounded-lg hover:border-terracotta transition-colors">
                        <input 
                          type="radio" 
                          name="delivery_charge" 
                          value="150" 
                          checked={deliveryCharge === '150'}
                          onChange={(e) => setDeliveryCharge(e.target.value)}
                          className="w-4 h-4 accent-soft-black" 
                          required 
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-soft-black">Outside Chittagong</span>
                          <span className="text-xs text-dark-charcoal/70">150 Taka</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4 md:pt-6 text-center">
                    <button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-terracotta text-cream px-10 md:px-12 py-4 md:py-4 text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-muted-burgundy transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed">
                      {isSubmitting ? 'Processing...' : 'Submit Order'}
                    </button>
                  </div>
                </form>
              </>
            )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RetailOrderModal;
