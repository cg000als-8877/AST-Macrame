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

const InquiryModal = ({ isOpen, onClose, formType, initialColor = '', initialSize = '' }) => {
  const [selectedColor, setSelectedColor] = useState(initialColor || 'Black');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialColor) {
      setSelectedColor(initialColor);
    }
  }, [initialColor]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setIsSuccess(false), 300);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    formData.append('formType', formType === 'sample' ? 'Sample' : 'Wholesale');
    if (!formData.get('color')) {
      formData.append('color', selectedColor);
    }

    try {
      // Force a minimum 2-second delay for better UX
      const delay = new Promise(resolve => setTimeout(resolve, 2000));
      
      await Promise.all([
        fetch('https://script.google.com/macros/s/AKfycbybgvWpMHYzv5e6yHqhuS4mfBYXFsp5rKcRnqC2sp3F_Hr1h4vhzc6bcUi0ryB-lVs/exec', {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
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
              className="absolute top-4 right-4 md:top-6 md:right-6 text-soft-black/50 hover:text-soft-black transition-colors"
            >
              <X size={24} />
            </button>
            
            {isSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-stone/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-soft-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-soft-black mb-4">Thank You!</h2>
                <p className="text-sm md:text-base text-dark-charcoal/70">
                  Your {formType === 'sample' ? 'sample order' : 'wholesale quotation'} request has been successfully submitted.<br />Our Export Sales Manager will contact you within 24 hours.
                </p>
                <button onClick={onClose} className="mt-8 bg-terracotta text-cream px-10 py-3 text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-muted-burgundy transition-colors shadow-lg">
                  Close Window
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl md:text-2xl font-serif text-soft-black mb-1 md:mb-2 text-center">
                  {formType === 'sample' ? 'Sample Order Form' : 'Wholesale Quotation Form'}
                </h2>
                <p className="text-center text-xs md:text-sm font-light text-dark-charcoal/70 mb-5 md:mb-6">
                  Please fill out the details below and our Export Sales Manager will contact you within 24 hours.
                </p>
                
                <form 
                  className="space-y-4 md:space-y-4"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-1 md:mb-1.5">Name</label>
                    <input type="text" name="name" className="w-full bg-transparent border-b border-stone/50 py-1.5 md:py-1.5 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm" placeholder="Your Full Name" required />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-1 md:mb-1.5">Company / Brand</label>
                      <input type="text" name="company" className="w-full bg-transparent border-b border-stone/50 py-1.5 md:py-1.5 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm" placeholder="Your Brand Name" required />
                    </div>
                    <div>
                      <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-1 md:mb-1.5">Email Address</label>
                      <input type="email" name="email" className="w-full bg-transparent border-b border-stone/50 py-1.5 md:py-1.5 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm" placeholder="email@example.com" required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-1 md:mb-1.5">Shipping Address</label>
                    <input type="text" name="address" className="w-full bg-transparent border-b border-stone/50 py-1.5 md:py-1.5 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm" placeholder="Full delivery address" required />
                  </div>

                  <div className="flex gap-4 md:gap-8 items-center border-t border-b border-stone/10 py-3 md:py-4">
                    <div className="flex-1">
                      <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-2 md:mb-3">Select Color</label>
                      <div className="flex flex-col gap-2 md:gap-2">
                        {['Black', 'Navy', 'Brown', 'Maroon', 'Khaki'].map(color => (
                          <label key={color} className="flex items-center gap-2 cursor-pointer text-xs md:text-sm text-dark-charcoal font-medium">
                            <input 
                              type="radio" 
                              name="color" 
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
                    </div>
                    <div className="w-24 md:w-32 shrink-0 aspect-[4/5] bg-stone/10 rounded-lg overflow-hidden border border-stone/20 shadow-sm">
                      <img src={colorImages[selectedColor]} alt={selectedColor} className="w-full h-full object-cover mix-blend-multiply" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-2 md:mb-2">Select Size</label>
                    <div className="flex gap-4 md:gap-6">
                      {['M', 'L'].map(size => (
                        <label key={size} className="flex items-center gap-1.5 md:gap-2 cursor-pointer text-xs md:text-sm text-dark-charcoal">
                          <input type="radio" name="size" value={size} defaultChecked={size === initialSize} className="w-3.5 h-3.5 md:w-4 md:h-4 accent-soft-black" required />
                          {size}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-1 md:mb-1.5">Message / Requirements (Optional)</label>
                    <textarea 
                      name="message"
                      rows="2" 
                      className="w-full bg-transparent border-b border-stone/50 py-1.5 md:py-1.5 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm resize-none" 
                      placeholder="Tell us about any specific requirements..."
                    ></textarea>
                    <p className="mt-2 md:mt-3 text-[10px] md:text-xs text-dark-charcoal/80 font-medium italic">
                      * Standard shipping charge 150 BDT for Bangladesh. International shipping depends on country and region.
                    </p>
                  </div>
                  
                  <div className="pt-2 md:pt-4 text-center">
                    <button type="submit" disabled={isSubmitting} className="bg-terracotta text-cream px-10 md:px-12 py-3 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-muted-burgundy transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed">
                      {isSubmitting ? 'Sending...' : (formType === 'sample' ? 'Order Sample' : 'Request Quote')}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InquiryModal;
