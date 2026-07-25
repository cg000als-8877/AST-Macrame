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
  const [orderType, setOrderType] = useState('single');
  const [comboColor1, setComboColor1] = useState('Black');
  const [comboColor2, setComboColor2] = useState('Navy');
  const [comboSize1, setComboSize1] = useState('M');
  const [comboSize2, setComboSize2] = useState('M');
  const [deliveryCharge, setDeliveryCharge] = useState('100'); // Standard delivery is always 100
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
    if (orderType === 'combo') {
      formData.append('orderType', 'Combo (1990 BDT)');
      if (!formData.get('color')) formData.append('color', `${comboColor1} + ${comboColor2}`);
      if (!formData.get('size')) formData.append('size', `${comboSize1} + ${comboSize2}`);
    } else {
      formData.append('orderType', 'Single (1090 BDT)');
      if (!formData.get('color')) formData.append('color', selectedColor);
      if (!formData.get('size')) formData.append('size', selectedSize);
    }
    
    // Add Delivery Charge label for Google Sheet
    formData.append('deliveryCharge', 'Standard Delivery Charge 100 Taka (All Over BD)');

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
                  <div className="grid grid-cols-2 gap-3 md:gap-6">
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

                  <div className="grid grid-cols-2 gap-3 md:gap-6">
                    <div>
                      <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-1 md:mb-1.5">
                        Thana / <span className="font-bengali tracking-normal font-medium text-[11px] md:text-[13px] capitalize">থানা</span>
                      </label>
                      <input type="text" name="thana" className="w-full bg-transparent border-b border-stone/50 py-1.5 md:py-1.5 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm" placeholder="e.g. Kotwali" required />
                    </div>
                    <div>
                      <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-1 md:mb-1.5">
                        District / <span className="font-bengali tracking-normal font-medium text-[11px] md:text-[13px] capitalize">জেলা</span>
                      </label>
                      <input type="text" name="district" className="w-full bg-transparent border-b border-stone/50 py-1.5 md:py-1.5 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm" placeholder="e.g. Chittagong" required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-1 md:mb-1.5">
                      Delivery Point / <span className="font-bengali tracking-normal font-medium text-[11px] md:text-[13px] capitalize">যে জায়গা থেকে রিসিভ করবেন</span>
                    </label>
                    <input type="text" name="delivery_point" className="w-full bg-transparent border-b border-stone/50 py-1.5 md:py-1.5 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm" placeholder="Full Address" required />
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

                  {/* Order Type */}
                  <div className="mb-4 pt-2">
                    <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-2 md:mb-3">Order Type</label>
                    <div className="flex flex-col gap-2.5 md:gap-3">
                      <label className={`flex items-center gap-3 cursor-pointer p-3 md:p-3.5 border rounded-xl transition-all ${orderType === 'single' ? 'border-terracotta bg-terracotta/5 shadow-sm' : 'border-stone/20 hover:border-terracotta/40 bg-white/50'}`}>
                        <input 
                          type="radio" 
                          name="order_type" 
                          value="single" 
                          checked={orderType === 'single'}
                          onChange={() => setOrderType('single')}
                          className="w-4 h-4 md:w-5 md:h-5 accent-terracotta" 
                        />
                        <div className="flex flex-col">
                          <span className="text-xs md:text-sm font-bold text-soft-black tracking-wide">Single Product</span>
                          <span className="text-[11px] md:text-xs text-terracotta font-bold mt-0.5">1090 BDT</span>
                        </div>
                      </label>

                      <label className={`flex items-center gap-3 cursor-pointer p-3 md:p-3.5 border rounded-xl transition-all ${orderType === 'combo' ? 'border-terracotta bg-terracotta/5 shadow-sm' : 'border-stone/20 hover:border-terracotta/40 bg-white/50'}`}>
                        <input 
                          type="radio" 
                          name="order_type" 
                          value="combo" 
                          checked={orderType === 'combo'}
                          onChange={() => setOrderType('combo')}
                          className="w-4 h-4 md:w-5 md:h-5 accent-terracotta" 
                        />
                        <div className="flex flex-col">
                          <span className="text-xs md:text-sm font-bold text-soft-black tracking-wide">Combo (2 Belts)</span>
                          <span className="text-[11px] md:text-xs text-terracotta font-bold mt-0.5">1990 BDT</span>
                        </div>
                      </label>
                    </div>
                    <p className="text-[10px] md:text-[11px] text-dark-charcoal/70 mt-2.5 italic flex items-center gap-1.5 font-medium px-1">
                      <svg className="w-3 h-3 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      If you want to order more than 2 products, please contact us via WhatsApp.
                    </p>
                  </div>

                  <div className="w-full h-px bg-stone/20 my-4 md:my-5"></div>

                  {/* Color & Size Selection */}
                  <div className="flex gap-4 md:gap-8 items-start">
                    <div className="flex-1">
                      {orderType === 'single' ? (
                        <>
                          <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-2 md:mb-3">Select Color</label>
                          <div className="grid grid-flow-col grid-rows-3 gap-y-2 gap-x-2 md:gap-x-4 mb-4 md:mb-5">
                            {['Black', 'Navy', 'Brown', 'Maroon', 'Khaki'].map(color => (
                              <label key={color} className="flex items-center gap-2 cursor-pointer text-xs md:text-sm text-dark-charcoal font-medium">
                                <input 
                                  type="radio" 
                                  name="color_selection" 
                                  value={color} 
                                  checked={selectedColor === color} 
                                  onChange={(e) => setSelectedColor(e.target.value)}
                                  className="w-3.5 h-3.5 md:w-4 md:h-4 accent-soft-black" 
                                />
                                {color}
                              </label>
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-2 md:mb-3">Select Combo Colors & Sizes</label>
                          <div className="flex flex-col gap-3 mb-4 md:mb-5">
                            <div className="flex items-center gap-2 md:gap-3 bg-white/50 border border-stone/20 px-3 py-1.5 rounded-lg">
                              <span className="text-[10px] font-bold text-dark-charcoal uppercase w-10 md:w-12 shrink-0">Belt 1:</span>
                              <select 
                                value={comboColor1} 
                                onChange={(e) => setComboColor1(e.target.value)}
                                className="w-20 md:w-24 bg-transparent text-xs md:text-sm font-medium focus:outline-none cursor-pointer text-soft-black"
                              >
                                {['Black', 'Navy', 'Brown', 'Maroon', 'Khaki'].map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                              <div className="w-[1px] h-4 bg-stone/20"></div>
                              <select 
                                value={comboSize1} 
                                onChange={(e) => setComboSize1(e.target.value)}
                                className="w-10 md:w-14 bg-transparent text-xs md:text-sm font-medium focus:outline-none cursor-pointer text-soft-black"
                              >
                                {['M', 'L'].map(s => <option key={s} value={s}>{s}</option>)}
                              </select>
                            </div>
                            <div className="flex items-center gap-2 md:gap-3 bg-white/50 border border-stone/20 px-3 py-1.5 rounded-lg">
                              <span className="text-[10px] font-bold text-dark-charcoal uppercase w-10 md:w-12 shrink-0">Belt 2:</span>
                              <select 
                                value={comboColor2} 
                                onChange={(e) => setComboColor2(e.target.value)}
                                className="w-20 md:w-24 bg-transparent text-xs md:text-sm font-medium focus:outline-none cursor-pointer text-soft-black"
                              >
                                {['Black', 'Navy', 'Brown', 'Maroon', 'Khaki'].map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                              <div className="w-[1px] h-4 bg-stone/20"></div>
                              <select 
                                value={comboSize2} 
                                onChange={(e) => setComboSize2(e.target.value)}
                                className="w-10 md:w-14 bg-transparent text-xs md:text-sm font-medium focus:outline-none cursor-pointer text-soft-black"
                              >
                                {['M', 'L'].map(s => <option key={s} value={s}>{s}</option>)}
                              </select>
                            </div>
                          </div>
                        </>
                      )}

                      {orderType === 'single' && (
                        <>
                          <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-2 md:mb-3">Select Size</label>
                          <div className="flex gap-4 md:gap-6">
                            {['M', 'L'].map(size => (
                              <label key={size} className="flex items-center gap-1.5 md:gap-2 cursor-pointer text-xs md:text-sm text-dark-charcoal font-medium">
                                <input 
                                  type="radio" 
                                  name="size_selection" 
                                  value={size} 
                                  checked={selectedSize === size}
                                  onChange={(e) => setSelectedSize(e.target.value)}
                                  className="w-3.5 h-3.5 md:w-4 md:h-4 accent-soft-black" 
                                  required={orderType === 'single'} 
                                />
                                {size}
                              </label>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    
                    {orderType === 'single' ? (
                      <div className="w-24 md:w-32 shrink-0 aspect-[4/5] bg-stone/10 rounded-xl overflow-hidden border border-stone/20 shadow-md">
                        <img src={colorImages[selectedColor]} alt={selectedColor} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                    ) : (
                      <div className="w-24 md:w-32 shrink-0 aspect-[4/5] bg-stone/10 rounded-xl overflow-hidden border border-stone/20 shadow-md flex">
                        <div className="w-1/2 h-full relative overflow-hidden border-r border-stone/10">
                          <img src={colorImages[comboColor1]} alt={comboColor1} className="absolute inset-0 w-[200%] h-full object-cover object-left mix-blend-multiply" />
                        </div>
                        <div className="w-1/2 h-full relative overflow-hidden">
                          <img src={colorImages[comboColor2]} alt={comboColor2} className="absolute inset-0 w-[200%] h-full object-cover object-right mix-blend-multiply" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="w-full h-px bg-stone/20 my-4 md:my-6"></div>

                  {/* Delivery Charges */}
                  <div>
                    <label className="block text-[10px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-3 md:mb-4">Delivery Options</label>
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-3 cursor-pointer p-3 border border-terracotta/30 bg-terracotta/5 rounded-lg transition-colors">
                        <input 
                          type="radio" 
                          name="delivery_charge" 
                          value="100" 
                          checked={true}
                          readOnly
                          className="w-3.5 h-3.5 md:w-4 md:h-4 accent-terracotta" 
                        />
                        <div className="flex flex-row items-baseline gap-2">
                          <span className="text-xs md:text-sm font-bold text-soft-black">Standard Delivery Charge</span>
                          <span className="text-[10px] md:text-xs text-terracotta font-semibold">- 100 Taka (All Over BD)</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  {/* Total Amount */}
                  <div className="bg-stone/5 border border-stone/20 rounded-xl p-4 md:p-5 mt-2 flex justify-between items-center shadow-sm">
                    <div className="flex flex-col">
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-dark-charcoal/70">Total Amount</span>
                      <span className="text-[9px] md:text-[10px] text-dark-charcoal/50 mt-0.5">Product + Delivery</span>
                    </div>
                    <span className="text-lg md:text-xl font-serif font-bold text-terracotta">
                      {(orderType === 'single' ? 1090 : 1990) + 100} BDT
                    </span>
                  </div>

                  <div className="pt-6 md:pt-8 text-center">
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
