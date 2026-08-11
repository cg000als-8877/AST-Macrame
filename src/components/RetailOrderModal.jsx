import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import bd from '../utils/bd-location';

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

const RetailOrderModal = ({ 
  isOpen, 
  onClose, 
  orderType = 'single', 
  selectedColor = 'Black', 
  selectedSize = 'M', 
  comboColor1 = 'Black', 
  comboSize1 = 'M', 
  comboColor2 = 'Navy', 
  comboSize2 = 'M' 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [selectedUpazilaName, setSelectedUpazilaName] = useState('');

  useEffect(() => {
    if (isOpen) {
      const allDistricts = bd.getDistricts();
      const sorted = [...allDistricts].sort((a, b) => a.name.localeCompare(b.name));
      setDistricts(sorted);
    } else {
      setSelectedDistrictId('');
      setSelectedUpazilaName('');
      setDistricts([]);
      setUpazilas([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedDistrictId) {
      const upazillaArray = bd.getUpazilasByDistrict(selectedDistrictId);
      const sorted = [...upazillaArray].sort((a, b) => a.name.localeCompare(b.name));
      setUpazilas(sorted);
      setSelectedUpazilaName('');
    } else {
      setUpazilas([]);
      setSelectedUpazilaName('');
    }
  }, [selectedDistrictId]);

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
    
    // Convert district ID back to name for the form submission
    const districtObj = districts.find(d => d.id === selectedDistrictId);
    if (districtObj) {
      formData.set('district', districtObj.name);
    }
    
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
    
    // Explicitly ask third-party Apps Script libraries to use Sheet2
    formData.append('sheet', 'Sheet2');
    formData.append('sheetName', 'Sheet2');

    const urlEncodedData = new URLSearchParams(formData).toString();

    try {
      const delay = new Promise(resolve => setTimeout(resolve, 2000));
      
      await Promise.all([
        fetch('https://script.google.com/macros/s/AKfycbzJtqUpaA-Zfo1MId06SHg2omv178oBX8NsjZkRVKdr4_3RhsRCZDYy6nPuHlocAHME/exec', {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 lg:p-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-cream w-full h-full md:h-auto md:max-h-full max-w-5xl p-4 sm:p-5 md:p-8 rounded-none md:rounded-3xl shadow-2xl overflow-y-auto relative flex flex-col md:block"
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
                  className="flex flex-col md:grid md:grid-cols-2 md:gap-8 lg:gap-12 md:items-start"
                  onSubmit={handleSubmit}
                >
                  <div className="order-2 md:order-1 space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-dark-charcoal mb-0.5 md:mb-1">
                      Name / <span className="font-bengali tracking-normal font-medium text-[11px] md:text-[12px] capitalize">নাম</span>
                    </label>
                    <input type="text" name="name" className="w-full bg-white/50 border border-dark-charcoal/40 rounded-md px-2.5 py-1.5 md:py-2 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm" placeholder="Your Full Name" required />
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-dark-charcoal mb-0.5 md:mb-1">
                      Phone / <span className="font-bengali tracking-normal font-medium text-[11px] md:text-[12px] capitalize">মোবাইল</span>
                    </label>
                    <input type="tel" name="phone" className="w-full bg-white/50 border border-dark-charcoal/40 rounded-md px-2.5 py-1.5 md:py-2 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm" placeholder="01XXX XXXXXX" required />
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-dark-charcoal mb-0.5 md:mb-1">
                      District / <span className="font-bengali tracking-normal font-medium text-[11px] md:text-[12px] capitalize">জেলা</span>
                    </label>
                    <select 
                      name="district" 
                      className="w-full bg-white/50 border border-dark-charcoal/40 rounded-md px-2.5 py-1.5 md:py-2 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm appearance-none" 
                      required
                      value={selectedDistrictId}
                      onChange={(e) => setSelectedDistrictId(e.target.value)}
                    >
                      <option value="" disabled>Select District</option>
                      {districts.map(d => (
                        <option key={d.id} value={d.id}>{d.name} - {d.bn_name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-dark-charcoal mb-0.5 md:mb-1">
                      Thana/Upazila / <span className="font-bengali tracking-normal font-medium text-[11px] md:text-[12px] capitalize">থানা</span>
                    </label>
                    <select 
                      name="thana" 
                      className="w-full bg-white/50 border border-dark-charcoal/40 rounded-md px-2.5 py-1.5 md:py-2 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm appearance-none" 
                      required
                      value={selectedUpazilaName}
                      onChange={(e) => setSelectedUpazilaName(e.target.value)}
                      disabled={!selectedDistrictId}
                    >
                      <option value="" disabled>Select Thana/Upazila</option>
                      {upazilas.map(u => (
                        <option key={u.id} value={u.name}>{u.name} - {u.bn_name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-dark-charcoal mb-0.5 md:mb-1">
                      Delivery Point / <span className="font-bengali tracking-normal font-medium text-[11px] md:text-[12px] capitalize">যে জায়গা থেকে রিসিভ করবেন</span>
                    </label>
                    <textarea 
                      name="delivery_point"
                      rows="3" 
                      className="w-full bg-white/50 border border-dark-charcoal/40 rounded-md px-2.5 py-1.5 md:py-2 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm resize-none" 
                      placeholder="Full Address" 
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-dark-charcoal mb-0.5 md:mb-1">
                      Note / <span className="font-bengali tracking-normal font-medium text-[11px] md:text-[12px] capitalize">নোট</span> <span className="text-dark-charcoal/50 font-normal normal-case tracking-normal">(Optional)</span>
                    </label>
                    <textarea 
                      name="message"
                      rows="3" 
                      className="w-full bg-white/50 border border-dark-charcoal/40 rounded-md px-2.5 py-1.5 md:py-2 focus:outline-none focus:border-terracotta transition-colors text-xs md:text-sm resize-none" 
                      placeholder="Any custom instructions..."
                    ></textarea>
                  </div>
                  
                  {/* Mobile Submit Button */}
                  <div className="md:hidden pt-6 mt-4 w-full">
                    <button type="submit" disabled={isSubmitting} className="w-full bg-soft-black text-cream px-10 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-terracotta transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed">
                      {isSubmitting ? 'Processing...' : 'Submit Order'}
                    </button>
                  </div>
                  </div>

                  <div className="order-1 md:order-2 flex flex-col h-full mb-6 md:mb-0">
                  {/* Order Summary */}
                  <div className="bg-stone/5 border border-stone/20 rounded-xl p-3 md:p-5">
                    <h3 className="text-[9px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-3 md:mb-4 border-b border-stone/10 pb-2 md:pb-3">Order Summary</h3>
                    
                    {orderType === 'single' ? (
                      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-stone/10 rounded-lg overflow-hidden border border-stone/20">
                          <img src={colorImages[selectedColor]} alt={selectedColor} className="w-full h-full object-cover mix-blend-multiply" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] md:text-sm font-bold text-soft-black">Single Product</span>
                          <span className="text-[10px] md:text-xs text-dark-charcoal/70 mt-0.5 md:mt-1">Color: {selectedColor} &bull; Size: {selectedSize}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 md:gap-3 mb-3 md:mb-4">
                        <span className="text-[11px] md:text-sm font-bold text-soft-black">Combo Pack (2 Belts)</span>
                        <div className="flex items-center gap-3 md:gap-4 bg-white/50 p-1.5 md:p-2 rounded-lg border border-stone/10">
                          <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 bg-stone/10 rounded-md overflow-hidden">
                            <img src={colorImages[comboColor1]} alt={comboColor1} className="w-full h-full object-cover mix-blend-multiply" />
                          </div>
                          <span className="text-[10px] md:text-xs text-dark-charcoal/80">Belt 1: {comboColor1} ({comboSize1})</span>
                        </div>
                        <div className="flex items-center gap-3 md:gap-4 bg-white/50 p-1.5 md:p-2 rounded-lg border border-stone/10">
                          <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 bg-stone/10 rounded-md overflow-hidden">
                            <img src={colorImages[comboColor2]} alt={comboColor2} className="w-full h-full object-cover mix-blend-multiply" />
                          </div>
                          <span className="text-[10px] md:text-xs text-dark-charcoal/80">Belt 2: {comboColor2} ({comboSize2})</span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-1.5 md:space-y-2 mt-3 md:mt-4 pt-3 md:pt-4 border-t border-stone/10">
                      <div className="flex justify-between items-center text-[11px] md:text-xs text-dark-charcoal/80">
                        <span>Subtotal</span>
                        <span className="font-medium">{orderType === 'single' ? '990' : '1,790'} BDT</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px] md:text-xs text-dark-charcoal/80 mt-1">
                        <span>Standard Delivery</span>
                        <span className="font-medium text-terracotta">+ 100 BDT</span>
                      </div>
                      <div className="flex justify-between items-center mt-2 md:mt-3 pt-2 md:pt-3 border-t border-stone/10">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-soft-black">Total</span>
                        <span className="text-base md:text-xl font-serif font-bold text-terracotta">{(orderType === 'single' ? 990 : 1790) + 100} BDT</span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Submit Button */}
                  <div className="hidden md:block pt-6 mt-auto">
                    <button type="submit" disabled={isSubmitting} className="w-full bg-soft-black text-cream px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-terracotta transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed">
                      {isSubmitting ? 'Processing...' : 'Submit Order'}
                    </button>
                  </div>
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
