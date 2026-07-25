import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const InquiryModal = ({ isOpen, onClose, formType, initialColor = '', initialSize = '' }) => {
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
            className="relative w-full max-w-3xl bg-cream p-8 md:p-12 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto z-10"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-soft-black/50 hover:text-soft-black transition-colors"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-serif text-soft-black mb-2 text-center">
              {formType === 'sample' ? 'Sample Order Form' : 'Wholesale Quotation Form'}
            </h2>
            <p className="text-center text-sm font-light text-dark-charcoal/70 mb-8">
              Please fill out the details below and our Export Sales Manager will contact you within 24 hours.
            </p>
            
            <form className="space-y-6">
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-2">Name</label>
                <input type="text" className="w-full bg-transparent border-b border-stone/50 py-2 focus:outline-none focus:border-terracotta transition-colors text-sm" placeholder="Your Full Name" required />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-2">Company / Brand</label>
                  <input type="text" className="w-full bg-transparent border-b border-stone/50 py-2 focus:outline-none focus:border-terracotta transition-colors text-sm" placeholder="Your Brand Name" />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-2">Email Address</label>
                  <input type="email" className="w-full bg-transparent border-b border-stone/50 py-2 focus:outline-none focus:border-terracotta transition-colors text-sm" placeholder="email@example.com" required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-3">Select Color</label>
                <div className="flex flex-wrap gap-6">
                  {['Black', 'Navy', 'Brown', 'Maroon', 'Khaki'].map(color => (
                    <label key={color} className="flex items-center gap-2 cursor-pointer text-sm text-dark-charcoal">
                      <input type="radio" name="color" value={color} defaultChecked={color === initialColor} className="w-4 h-4 accent-soft-black" required />
                      {color}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-3">Select Size</label>
                <div className="flex gap-6">
                  {['M', 'L'].map(size => (
                    <label key={size} className="flex items-center gap-2 cursor-pointer text-sm text-dark-charcoal">
                      <input type="radio" name="size" value={size} defaultChecked={size === initialSize} className="w-4 h-4 accent-soft-black" required />
                      {size}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-2">Message / Requirements</label>
                <textarea 
                  rows="3" 
                  className="w-full bg-transparent border-b border-stone/50 py-2 focus:outline-none focus:border-terracotta transition-colors text-sm resize-none" 
                  placeholder="Tell us your shipping address and any specific requirements..."
                  required
                ></textarea>
                <p className="mt-4 text-xs text-dark-charcoal/80 font-medium italic">
                  * Standard shipping charge 150 BDT for Bangladesh. International shipping depends on country and region.
                </p>
              </div>
              
              <div className="pt-4 text-center">
                <button type="button" onClick={onClose} className="bg-terracotta text-cream px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-muted-burgundy transition-colors shadow-lg">
                  Order Sample
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InquiryModal;
