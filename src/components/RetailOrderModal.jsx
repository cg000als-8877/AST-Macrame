import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
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
  const [isFormValid, setIsFormValid] = useState(false);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [selectedUpazilaName, setSelectedUpazilaName] = useState('');
  
  // 'outside' (120 Tk) or 'inside' (50 Tk)
  const [deliveryType, setDeliveryType] = useState('outside');

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
      setDeliveryType('outside'); // Reset to default
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
    
    // Format phone to always include +88
    let rawPhone = (formData.get('phone') || '').trim();
    if (rawPhone.startsWith('+88')) {
      // already has it
    } else if (rawPhone.startsWith('88')) {
      rawPhone = '+' + rawPhone;
    } else {
      rawPhone = '+88' + rawPhone;
    }
    formData.set('phone', rawPhone);
    
    // Combine Address, Thana, and District into one cell
    let districtName = '';
    const districtObj = districts.find(d => d.id === selectedDistrictId);
    if (districtObj) {
      districtName = districtObj.name;
    }
    const thanaName = formData.get('thana') || '';
    const deliveryPoint = formData.get('delivery_point') || '';
    
    const fullAddress = [deliveryPoint, thanaName, districtName].filter(Boolean).join(', ');
    
    formData.delete('district');
    formData.delete('thana');
    formData.delete('delivery_point');
    formData.set('address', fullAddress);
    
    formData.append('formType', 'Retail Order');
    if (orderType === 'combo') {
      formData.append('orderType', 'Combo (1790 BDT)');
      if (!formData.get('color')) formData.append('color', `${comboColor1} + ${comboColor2}`);
      if (!formData.get('size')) formData.append('size', `${comboSize1} + ${comboSize2}`);
    } else {
      formData.append('orderType', 'Single (990 BDT)');
      if (!formData.get('color')) formData.append('color', selectedColor);
      if (!formData.get('size')) formData.append('size', selectedSize);
    }
    
    // Add Delivery Charge label for Google Sheet
    const deliveryText = deliveryType === 'inside' 
      ? 'Chittagong City Delivery Charge 50 Tk' 
      : 'Outside Chittagong Delivery Charge 120 Tk';
    formData.append('deliveryCharge', deliveryText);

    // Add Date, Time, and Total Amount
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    
    const deliveryCostAmount = deliveryType === 'inside' ? 50 : 120;
    const productCostAmount = orderType === 'single' ? 990 : 1790;
    
    formData.append('date', dateStr);
    formData.append('time', timeStr);
    formData.append('totalAmount', `${productCostAmount + deliveryCostAmount} BDT`);

    // Target the Retail sheet
    formData.append('sheetName', 'Retail');

    const urlEncodedData = new URLSearchParams(formData).toString();

    try {
      const delay = new Promise(resolve => setTimeout(resolve, 2000));
      
      await Promise.all([
        fetch('https://script.google.com/macros/s/AKfycby-t_SgCbjwZUNz40wgSBINlPOyvbqWcQWW3E5Kdvk5J5WCIhUmcrj3vXc8SgGdWMFY/exec', {
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

  const deliveryCost = deliveryType === 'inside' ? 50 : 120;
  const productCost = orderType === 'single' ? 990 : 1790;
  const totalCost = productCost + deliveryCost;

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
                <div className="flex flex-col items-center justify-center mb-3 md:mb-8 text-center">
                  <img src="/logo_black.png" alt="AST Handmade Macramé Belts" className="h-8 md:h-10 w-auto object-contain md:mb-3" />
                </div>
                
                <form 
                  className="flex flex-col md:grid md:grid-cols-2 md:gap-8 lg:gap-12 md:items-start"
                  onSubmit={handleSubmit}
                  onChange={(e) => setIsFormValid(e.currentTarget.checkValidity())}
                >
                  <div className="order-2 md:order-1 space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-[11px] md:text-[12px] font-bold tracking-normal uppercase text-dark-charcoal mb-0.5 md:mb-1">
                      Name / <span className="font-bengali tracking-normal font-medium text-[12px] md:text-[13px] capitalize">নাম</span> <span className="text-red-500 font-bold normal-case tracking-normal ml-1 text-[10px] md:text-[11px]">(Required)</span>
                    </label>
                    <input type="text" name="name" className="w-full bg-white border border-black rounded-md px-2.5 py-1.5 md:py-2 focus:outline-none focus:border-terracotta transition-colors text-[13px] md:text-[15px]" placeholder="Your Full Name" required />
                  </div>
                    <div>
                      <label className="block text-[11px] md:text-[12px] font-bold tracking-normal uppercase text-dark-charcoal mb-0.5 md:mb-1">
                        Phone / <span className="font-bengali tracking-normal font-medium text-[12px] md:text-[13px] capitalize">মোবাইল নম্বর</span> <span className="text-red-500 font-bold normal-case tracking-normal ml-1 text-[10px] md:text-[11px]">(Required)</span>
                      </label>
                      <div className="relative flex items-center w-full bg-white border border-black rounded-md focus-within:border-terracotta transition-colors">
                        <span className="pl-2.5 text-[13px] md:text-[15px] text-dark-charcoal/80 font-medium">+88</span>
                        <input type="tel" name="phone" className="w-full bg-transparent px-1.5 py-1.5 md:py-2 focus:outline-none text-[13px] md:text-[15px]" placeholder="01XXX XXXXXX" required />
                      </div>
                    </div>
                  <div className="relative">
                    <label className="block text-[11px] md:text-[12px] font-bold tracking-normal uppercase text-dark-charcoal mb-0.5 md:mb-1">
                      District / <span className="font-bengali tracking-normal font-medium text-[12px] md:text-[13px] capitalize">জেলা</span> <span className="text-red-500 font-bold normal-case tracking-normal ml-1 text-[10px] md:text-[11px]">(Required)</span>
                    </label>
                    <select 
                      name="district" 
                      className="w-full bg-white border border-black rounded-md px-2.5 py-1.5 md:py-2 focus:outline-none focus:border-terracotta transition-colors text-[13px] md:text-[15px] appearance-none pr-8" 
                      required
                      value={selectedDistrictId}
                      onChange={(e) => setSelectedDistrictId(e.target.value)}
                    >
                      <option value="" disabled>Select District</option>
                      {districts.map(d => (
                        <option key={d.id} value={d.id}>{d.name} - {d.bn_name}</option>
                      ))}
                    </select>
                    <div className="absolute right-2.5 top-[25px] md:top-[30px] pointer-events-none text-black">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-[11px] md:text-[12px] font-bold tracking-normal uppercase text-dark-charcoal mb-0.5 md:mb-1">
                      Thana/Upazila / <span className="font-bengali tracking-normal font-medium text-[12px] md:text-[13px] capitalize">থানা</span> <span className="text-red-500 font-bold normal-case tracking-normal ml-1 text-[10px] md:text-[11px]">(Required)</span>
                    </label>
                    <select 
                      name="thana" 
                      className="w-full bg-white border border-black rounded-md px-2.5 py-1.5 md:py-2 focus:outline-none focus:border-terracotta transition-colors text-[13px] md:text-[15px] appearance-none pr-8" 
                      value={selectedUpazilaName}
                      onChange={(e) => setSelectedUpazilaName(e.target.value)}
                      disabled={!selectedDistrictId}
                      required
                    >
                      <option value="" disabled>Select Thana/Upazila</option>
                      {upazilas.map(u => (
                        <option key={u.id} value={u.name}>{u.name} - {u.bn_name}</option>
                      ))}
                    </select>
                    <div className="absolute right-2.5 top-[25px] md:top-[30px] pointer-events-none text-black">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] md:text-[12px] font-bold tracking-normal uppercase text-dark-charcoal mb-0.5 md:mb-1">
                      Delivery Point / <span className="font-bengali tracking-normal font-medium text-[12px] md:text-[13px] capitalize">যে জায়গা থেকে রিসিভ করবেন</span> <span className="text-red-500 font-bold normal-case tracking-normal ml-1 text-[10px] md:text-[11px]">(Required)</span>
                    </label>
                    <textarea 
                      name="delivery_point"
                      rows="3" 
                      className="w-full bg-white border border-black rounded-md px-2.5 py-1.5 md:py-2 focus:outline-none focus:border-terracotta transition-colors text-[13px] md:text-[15px] resize-none" 
                      placeholder="Full Address" 
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-[11px] md:text-[12px] font-bold tracking-normal uppercase text-dark-charcoal mb-0.5 md:mb-1">
                      Note / <span className="font-bengali tracking-normal font-medium text-[12px] md:text-[13px] capitalize">নোট</span> <span className="text-dark-charcoal/50 font-normal normal-case tracking-normal">(Optional)</span>
                    </label>
                    <textarea 
                      name="message"
                      rows="3" 
                      className="w-full bg-white border border-black rounded-md px-2.5 py-1.5 md:py-2 focus:outline-none focus:border-terracotta transition-colors text-[13px] md:text-[15px] resize-none" 
                      placeholder="Any custom instructions..."
                    ></textarea>
                  </div>
                  
                  {/* Mobile Submit Button & Checkbox */}
                  <div className="md:hidden pt-4 mt-4 w-full flex flex-col gap-4">
                    <div className="flex items-start gap-2">
                      <input type="checkbox" id="terms-mobile" defaultChecked required className="mt-1 accent-terracotta shrink-0" />
                      <label htmlFor="terms-mobile" className="text-[10px] md:text-xs text-dark-charcoal/80 leading-relaxed tracking-normal">
                        I have read and agree to the <Link to="/terms" target="_blank" className="text-terracotta font-bold hover:underline">Terms and Conditions</Link>, <Link to="/privacy" target="_blank" className="text-terracotta font-bold hover:underline">Privacy Policy</Link> & <Link to="/refund" target="_blank" className="text-terracotta font-bold hover:underline">Refund and Return Policy</Link>.
                      </label>
                    </div>
                    <button type="submit" disabled={isSubmitting || !isFormValid} className="w-full bg-soft-black text-cream px-10 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-terracotta transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed">
                      {isSubmitting ? 'Processing...' : 'Submit Order'}
                    </button>
                  </div>
                  </div>

                  <div className="order-1 md:order-2 flex flex-col h-full mb-4 md:mb-0">
                  {/* Order Summary */}
                  <div className="bg-white border border-black/40 rounded-xl p-2.5 md:p-5 shadow-sm">
                    <h3 className="text-[9px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-2 md:mb-4 border-b border-stone/10 pb-1.5 md:pb-3">Order Summary</h3>
                    
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
                        <div className="flex items-center gap-3 md:gap-4 p-1.5 md:p-2 rounded-lg bg-stone/5">
                          <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 bg-stone/10 rounded-md overflow-hidden border border-black/10">
                            <img src={colorImages[comboColor1]} alt={comboColor1} className="w-full h-full object-cover mix-blend-multiply" />
                          </div>
                          <span className="text-[10px] md:text-xs text-dark-charcoal/80 tracking-normal">Belt 1: {comboColor1} ({comboSize1})</span>
                        </div>
                        <div className="flex items-center gap-3 md:gap-4 p-1.5 md:p-2 rounded-lg bg-stone/5">
                          <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 bg-stone/10 rounded-md overflow-hidden border border-black/10">
                            <img src={colorImages[comboColor2]} alt={comboColor2} className="w-full h-full object-cover mix-blend-multiply" />
                          </div>
                          <span className="text-[10px] md:text-xs text-dark-charcoal/80 tracking-normal">Belt 2: {comboColor2} ({comboSize2})</span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-1.5 md:space-y-2 mt-3 md:mt-4 pt-3 md:pt-4 border-t border-stone/10">
                      <div className="flex justify-between items-center text-[11px] md:text-xs text-dark-charcoal/80">
                        <span>Subtotal</span>
                        <span className="font-medium">{productCost} BDT</span>
                      </div>
                      
                      <div className="flex flex-col gap-1.5 md:gap-2 mt-3 pt-3 border-t border-stone/10">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-dark-charcoal mb-1">Delivery Area</span>
                        
                        <label className="flex items-center justify-between cursor-pointer group p-1.5 md:p-2 rounded-lg transition-colors bg-stone/5 hover:bg-stone/10">
                          <div className="flex items-center gap-2.5 md:gap-3">
                            <input 
                              type="radio" 
                              name="delivery_area" 
                              value="inside" 
                              checked={deliveryType === 'inside'} 
                              onChange={() => setDeliveryType('inside')}
                              className="accent-terracotta w-3.5 h-3.5 md:w-4 md:h-4 cursor-pointer" 
                            />
                            <span className="text-[11px] md:text-xs text-dark-charcoal group-hover:text-soft-black transition-colors">Chittagong City</span>
                          </div>
                          <span className="text-[11px] md:text-xs font-medium text-terracotta">+ 50 BDT</span>
                        </label>
                        
                        <label className="flex items-center justify-between cursor-pointer group p-1.5 md:p-2 rounded-lg transition-colors bg-stone/5 hover:bg-stone/10">
                          <div className="flex items-center gap-2.5 md:gap-3">
                            <input 
                              type="radio" 
                              name="delivery_area" 
                              value="outside" 
                              checked={deliveryType === 'outside'} 
                              onChange={() => setDeliveryType('outside')}
                              className="accent-terracotta w-3.5 h-3.5 md:w-4 md:h-4 cursor-pointer" 
                            />
                            <span className="text-[11px] md:text-xs text-dark-charcoal group-hover:text-soft-black transition-colors">Outside Chittagong</span>
                          </div>
                          <span className="text-[11px] md:text-xs font-medium text-terracotta">+ 120 BDT</span>
                        </label>
                        <p className="text-[12px] md:text-[13px] text-soft-black font-medium mt-1.5 text-center font-bengali tracking-normal">
                          পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন,<br />দ্রুত সময়ের মধ্যে সারা বাংলাদেশে "হোম ডেলিভারি"
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-3 md:mt-4 pt-3 md:pt-4 border-t border-stone/10">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-soft-black">Total</span>
                        <span className="text-base md:text-xl font-serif font-bold text-terracotta">{totalCost} BDT</span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Submit Button & Checkbox */}
                  <div className="hidden md:flex flex-col pt-4 mt-auto gap-4">
                    <div className="flex items-start gap-2">
                      <input type="checkbox" id="terms-desktop" defaultChecked required className="mt-1 accent-terracotta shrink-0" />
                      <label htmlFor="terms-desktop" className="text-[10px] md:text-xs text-dark-charcoal/80 leading-relaxed tracking-normal">
                        I have read and agree to the <Link to="/terms" target="_blank" className="text-terracotta font-bold hover:underline">Terms and Conditions</Link>, <Link to="/privacy" target="_blank" className="text-terracotta font-bold hover:underline">Privacy Policy</Link> & <Link to="/refund" target="_blank" className="text-terracotta font-bold hover:underline">Refund and Return Policy</Link>.
                      </label>
                    </div>
                    <button type="submit" disabled={isSubmitting || !isFormValid} className="w-full bg-soft-black text-cream px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-terracotta transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed">
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
