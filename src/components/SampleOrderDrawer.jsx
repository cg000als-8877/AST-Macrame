import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, ShieldCheck, Check, Truck } from 'lucide-react';
import { saveOrderToFirestore } from '../services/storeService';

import b1 from '../assets/products/Black/1.webp';
import n1 from '../assets/products/Navy/1.webp';
import br1 from '../assets/products/Brown/1.webp';
import m1 from '../assets/products/Maroon/1.webp';
import k1 from '../assets/products/Khaki/1.webp';
import paymentsImg from '../assets/payments.webp';

const colorImages = {
  Black: b1,
  Navy: n1,
  Brown: br1,
  Maroon: m1,
  Khaki: k1,
  'Lime Rush': '/AST Macrame Kids/Neon Green/1.webp',
  'Red Blaze': '/AST Macrame Kids/Red/1.webp',
  'Shadow Black': '/AST Macrame Kids/Black/1.webp',
  'Ocean Navy': '/AST Macrame Kids/Navy/1.webp',
  'Neon Green': '/AST Macrame Kids/Neon Green/1.webp',
  Red: '/AST Macrame Kids/Red/1.webp',
};

const getFlagEmoji = (countryCode) => {
  if (!countryCode) return '🏳️';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const popularCountries = {
  "US": { name: "United States", dialCode: "+1", cities: ["New York", "Los Angeles", "Chicago", "Houston", "Miami", "Other"] },
  "GB": { name: "United Kingdom", dialCode: "+44", cities: ["London", "Manchester", "Birmingham", "Edinburgh", "Other"] },
  "CA": { name: "Canada", dialCode: "+1", cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Other"] },
  "AU": { name: "Australia", dialCode: "+61", cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Other"] },
  "DE": { name: "Germany", dialCode: "+49", cities: ["Berlin", "Munich", "Frankfurt", "Hamburg", "Other"] },
  "FR": { name: "France", dialCode: "+33", cities: ["Paris", "Marseille", "Lyon", "Toulouse", "Other"] },
  "IT": { name: "Italy", dialCode: "+39", cities: ["Rome", "Milan", "Naples", "Turin", "Other"] },
  "ES": { name: "Spain", dialCode: "+34", cities: ["Madrid", "Barcelona", "Valencia", "Seville", "Other"] },
  "NL": { name: "Netherlands", dialCode: "+31", cities: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Other"] },
  "AE": { name: "United Arab Emirates", dialCode: "+971", cities: ["Dubai", "Abu Dhabi", "Sharjah", "Other"] },
  "SA": { name: "Saudi Arabia", dialCode: "+966", cities: ["Riyadh", "Jeddah", "Mecca", "Medina", "Other"] },
  "BD": { name: "Bangladesh", dialCode: "+880", cities: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Other"] },
  "OTHER": { name: "Other", dialCode: "+", cities: ["Other"] }
};

const SampleOrderDrawer = ({ isOpen, onClose, orderDetails }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Touch gesture handling: Swipe Right to dismiss on mobile
  const touchStartX = React.useRef(0);
  const touchStartY = React.useRef(0);
  const touchMoveX = React.useRef(0);
  const touchMoveY = React.useRef(0);

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      touchMoveX.current = e.touches[0].clientX;
      touchMoveY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      touchMoveX.current = e.touches[0].clientX;
      touchMoveY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = () => {
    const deltaX = touchMoveX.current - touchStartX.current;
    const deltaY = Math.abs(touchMoveY.current - touchStartY.current);
    if (deltaX > 70 && deltaX > deltaY * 1.3) {
      if (!isSubmitting) {
        onClose();
      }
    }
  };
  
  const initialCountryCode = orderDetails?.userCountryCode && popularCountries[orderDetails.userCountryCode] 
    ? orderDetails.userCountryCode 
    : 'US';
  const [selectedCountryCode, setSelectedCountryCode] = useState(initialCountryCode);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    if (orderDetails?.userCountryCode && popularCountries[orderDetails.userCountryCode]) {
      setSelectedCountryCode(orderDetails.userCountryCode);
      setSelectedCity('');
    }
  }, [orderDetails?.userCountryCode]);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const originalWidth = document.body.style.width;

      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      setIsSuccess(false);

      return () => {
        document.body.classList.remove('modal-open');
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    
    // Prepend dial code to phone
    const dialCode = popularCountries[selectedCountryCode]?.dialCode || '+880';
    const phoneVal = formData.get('phone') || '';
    formData.set('phone', `${dialCode} ${phoneVal}`);
    
    const formDataObj = Object.fromEntries(formData.entries());
    setSubmittedData(formDataObj);
    
    formData.append('formType', 'Sample');
    formData.append('sheetName', 'Sample');
    
    if (orderDetails) {
      formData.append('orderDetails', JSON.stringify(orderDetails));
    }

    try {
      await fetch('https://script.google.com/macros/s/AKfycbwPqFvC5Tq-rV-tDqE41eS4_f1oA1tY4_eZ1_G4f1e5f8_E4w/exec', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });

      // Save to Firebase Firestore
      await saveOrderToFirestore({
        ...formDataObj,
        orderDetails: orderDetails || {},
        createdAt: new Date().toISOString(),
        orderType: 'Sample'
      });

      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsSuccess(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  const quantity = orderDetails?.quantity || 1;
  const unitPrice = orderDetails?.unitPriceLocal || 850;
  const totalPrice = orderDetails?.totalPriceLocal || (unitPrice * quantity);
  const shippingCost = orderDetails?.shippingCostLocal ?? 120;
  const currency = orderDetails?.currencySymbol || '৳';
  const grandTotal = totalPrice + shippingCost;
  const activeColor = orderDetails?.selectedColor || 'Black';
  const activeSize = orderDetails?.selectedSize || 'M';
  const carrierName = orderDetails?.shippingCarrier || 'Express Air Courier';

  if (!isOpen) return null;

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 overflow-hidden overscroll-contain"
    >
      {/* Blurred Dark Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={!isSubmitting ? onClose : undefined}
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
      />
      
      {/* Modal Container: Full width 100vw/100dvh on mobile, sleek dialog on desktop */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative bg-[#FAF8F5] shadow-2xl overflow-y-auto overscroll-contain z-10 flex flex-col w-full h-[100dvh] md:h-auto md:max-h-[92vh] md:max-w-xl md:rounded-3xl"
      >
            {/* Sticky Header */}
            <div className="sticky top-0 bg-[#FAF8F5]/95 backdrop-blur-md z-20 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-2xs shrink-0">
              <div>
                <h2 className="text-base sm:text-lg font-serif font-semibold text-soft-black">
                  {isSuccess ? 'Order Confirmation' : 'Sample Order Form'}
                </h2>
                {!isSuccess && (
                  <p className="text-[10.5px] sm:text-xs text-dark-charcoal/65 font-normal">
                    Worldwide express dispatch for brand evaluation
                  </p>
                )}
              </div>
              
              <button 
                type="button"
                onClick={!isSubmitting ? onClose : undefined}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-soft-black transition-colors cursor-pointer"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Content Body */}
            <div className="p-3.5 sm:p-5 md:p-6 flex-1 flex flex-col space-y-3.5">
              {isSuccess && submittedData ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-6 sm:py-8">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4 md:mb-5 shadow-xs">
                    <Check className="w-7 h-7 text-emerald-600 stroke-[2.5]" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-serif text-soft-black mb-1.5 font-semibold">
                    Thank You, {submittedData.name?.split(' ')[0] || 'Valued Partner'}!
                  </h2>
                  <p className="text-xs md:text-sm text-dark-charcoal/80 mb-5 max-w-[320px] mx-auto leading-relaxed">
                    Your sample evaluation order has been successfully placed. Our dispatch team will contact you shortly with tracking details.
                  </p>
                  
                  <div className="w-full max-w-sm bg-white rounded-2xl p-4 md:p-5 shadow-2xs mb-6 text-left space-y-2.5">
                    <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-dark-charcoal/70 pb-1">
                      Evaluation Order Summary
                    </h4>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-dark-charcoal/70">Sample Specification:</span>
                      <span className="font-medium text-soft-black">{activeColor} • Size {activeSize}</span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-dark-charcoal/70">Quantity:</span>
                      <span className="font-medium text-soft-black">{quantity} Pc{quantity > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-dark-charcoal/70">Destination:</span>
                      <span className="font-medium text-soft-black truncate max-w-[170px] text-right">{submittedData.address}</span>
                    </div>
                    <div className="flex justify-between pt-2 text-xs md:text-sm">
                      <span className="font-bold text-soft-black">Total Paid:</span>
                      <span className="font-bold text-terracotta">{currency}{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={onClose} 
                    className="w-full max-w-[200px] bg-soft-black text-cream px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-terracotta transition-colors mx-auto cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  {/* Card 1: Order Summary Preview Card */}
                  <div className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-2xs">
                    <div className="flex items-center gap-3.5">
                      <div className="w-16 h-16 rounded-xl bg-stone/10 overflow-hidden shrink-0 flex items-center justify-center shadow-2xs">
                        <img 
                          src={colorImages[activeColor] || b1} 
                          alt="Sample Belt" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-serif font-bold text-soft-black truncate">
                            AST Handmade Macramé Belt
                          </h4>
                          <span className="text-xs font-bold text-soft-black shrink-0">
                            {currency}{totalPrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-dark-charcoal/75 mt-1">
                          <span>Color: <strong className="font-semibold text-soft-black">{activeColor}</strong></span>
                          <span>•</span>
                          <span>Size: <strong className="font-semibold text-soft-black">{activeSize}</strong></span>
                          <span>•</span>
                          <span>Qty: <strong className="font-semibold text-soft-black">{quantity} Pc{quantity > 1 ? 's' : ''}</strong></span>
                        </div>
                        <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] text-dark-charcoal/70 mt-1.5 pt-1.5">
                          <span className="flex items-center gap-1">
                            <Truck className="w-3 h-3 text-dark-charcoal/60" />
                            <span>{carrierName}:</span>
                          </span>
                          <span className="font-semibold text-soft-black">
                            {currency}{shippingCost.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 100% Sample Rebate Banner - Brand Linen Tone */}
                    <div className="mt-2.5 pt-2 flex items-center justify-between text-[10px] sm:text-[10.5px] bg-[#FAF7F2] text-soft-black px-2.5 py-1.5 rounded-lg">
                      <span className="font-semibold">100% Sample Rebate</span>
                      <span className="text-dark-charcoal/70">Credited back on bulk order PO</span>
                    </div>
                  </div>

                  {/* Card 2: Form Container Card */}
                  <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs">
                    <h3 className="text-xs sm:text-sm font-serif font-bold text-soft-black mb-3">
                      Shipping & Contact Details
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/75 mb-1">
                          Full Name *
                        </label>
                        <input 
                          type="text" 
                          name="name" 
                          className="w-full bg-[#FAF7F2] rounded-xl px-3.5 py-2.5 md:py-3 text-sm font-medium focus:outline-none focus:bg-[#F2EDE4] transition-all placeholder:text-dark-charcoal/40 text-soft-black" 
                          placeholder="Your Name" 
                          required 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/75 mb-1">
                          Phone Number *
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={selectedCountryCode}
                            onChange={(e) => setSelectedCountryCode(e.target.value)}
                            className="w-[110px] sm:w-[125px] bg-[#FAF7F2] rounded-xl px-2.5 py-2.5 md:py-3 text-sm font-medium text-soft-black shrink-0 focus:outline-none focus:bg-[#F2EDE4] transition-all cursor-pointer"
                          >
                            {Object.entries(popularCountries).map(([code, c]) => (
                              <option key={code} value={code}>{getFlagEmoji(code)} {c.dialCode}</option>
                            ))}
                          </select>
                          <input 
                            type="tel" 
                            name="phone" 
                            className="flex-1 min-w-0 bg-[#FAF7F2] rounded-xl px-3.5 py-2.5 md:py-3 text-sm font-medium focus:outline-none focus:bg-[#F2EDE4] transition-all placeholder:text-dark-charcoal/40 text-soft-black" 
                            placeholder="Phone Number" 
                            required 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/75 mb-1">
                            Work Email *
                          </label>
                          <input 
                            type="email" 
                            name="email" 
                            className="w-full bg-[#FAF7F2] rounded-xl px-3.5 py-2.5 md:py-3 text-sm font-medium focus:outline-none focus:bg-[#F2EDE4] transition-all placeholder:text-dark-charcoal/40 text-soft-black" 
                            placeholder="brand@example.com" 
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/75 mb-1">
                            Brand / Company *
                          </label>
                          <input 
                            type="text" 
                            name="company" 
                            className="w-full bg-[#FAF7F2] rounded-xl px-3.5 py-2.5 md:py-3 text-sm font-medium focus:outline-none focus:bg-[#F2EDE4] transition-all placeholder:text-dark-charcoal/40 text-soft-black" 
                            placeholder="Brand or Studio Name" 
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/75 mb-1">
                          Country & City *
                        </label>
                        <div className="flex gap-2">
                          <input type="hidden" name="country" value={popularCountries[selectedCountryCode]?.name || selectedCountryCode} />
                          <select 
                            value={selectedCountryCode}
                            onChange={(e) => {
                              setSelectedCountryCode(e.target.value);
                              setSelectedCity('');
                            }}
                            className="w-1/2 bg-[#FAF7F2] rounded-xl px-3 py-2.5 md:py-3 text-sm font-medium focus:outline-none focus:bg-[#F2EDE4] transition-all text-soft-black cursor-pointer truncate" 
                            required 
                          >
                            {Object.entries(popularCountries).map(([code, c]) => (
                              <option key={code} value={code}>{c.name}</option>
                            ))}
                          </select>
                          
                          <select 
                            name="city" 
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="w-1/2 bg-[#FAF7F2] rounded-xl px-3 py-2.5 md:py-3 text-sm font-medium focus:outline-none focus:bg-[#F2EDE4] transition-all text-soft-black cursor-pointer truncate" 
                            required
                          >
                            <option value="" disabled>Select City</option>
                            {popularCountries[selectedCountryCode]?.cities.map(city => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {selectedCountryCode === 'OTHER' || selectedCity === 'Other' ? (
                        <p className="text-[10px] md:text-xs text-terracotta italic font-medium -mt-1 pl-1">
                          * Please specify your full city and country in the address field below.
                        </p>
                      ) : null}

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/75 mb-1">
                          Delivery Address *
                        </label>
                        <input 
                          type="text" 
                          name="address" 
                          className="w-full bg-[#FAF7F2] rounded-xl px-3.5 py-2.5 md:py-3 text-sm font-medium focus:outline-none focus:bg-[#F2EDE4] transition-all placeholder:text-dark-charcoal/40 text-soft-black" 
                          placeholder="House/Building, Street, Postal Code" 
                          required 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/75 mb-1">
                          Evaluation Note <span className="text-dark-charcoal/40 font-normal normal-case">(Optional)</span>
                        </label>
                        <textarea 
                          name="message"
                          rows="2" 
                          className="w-full bg-[#FAF7F2] rounded-xl px-3.5 py-2 md:py-2.5 text-sm font-medium focus:outline-none focus:bg-[#F2EDE4] transition-all placeholder:text-dark-charcoal/40 text-soft-black resize-none" 
                          placeholder="Custom dimensions, Pantone color matching, or specific packaging requests..."
                        ></textarea>
                      </div>

                      <p className="text-[9.5px] md:text-[10.5px] text-dark-charcoal/65 font-medium italic leading-relaxed pt-1">
                        * Standard shipping charge {currency}{shippingCost.toLocaleString(undefined, {maximumFractionDigits: 2})} via {carrierName} for {orderDetails?.userCountry || 'your delivery location'}.
                      </p>
                      
                      {/* Price Row & Submit CTA */}
                      <div className="pt-3">
                        <div className="flex justify-between items-center mb-3.5">
                          <span className="text-sm md:text-base font-bold text-soft-black">Total to pay:</span>
                          <span className="text-lg md:text-xl font-bold text-terracotta">
                            {currency}{grandTotal.toLocaleString()}
                          </span>
                        </div>

                        <button 
                          type="submit" 
                          disabled={isSubmitting} 
                          className="relative overflow-hidden group w-full bg-soft-black text-cream px-4 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-terracotta hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                          <span className="relative z-10 transition-all duration-300 group-hover:tracking-[0.18em]">
                            {isSubmitting ? 'Processing Order...' : 'Place Order'}
                          </span>
                        </button>

                        {/* Accepted Payment Methods */}
                        <div className="mt-3 flex flex-col items-center justify-center select-none">
                          <img 
                            src={paymentsImg} 
                            alt="Accepted Payment Options" 
                            className="h-auto max-h-12 w-full max-w-[340px] object-contain"
                          />
                        </div>

                        {/* Trust & Security Footnote */}
                        <div className="mt-2.5 flex items-center justify-center gap-2 text-[10px] text-dark-charcoal/70 select-none">
                          <div className="flex items-center gap-1 font-medium">
                            <Lock className="w-3 h-3 text-emerald-700 shrink-0" />
                            <span>256-bit SSL Encrypted</span>
                          </div>
                          <span className="text-stone-300">|</span>
                          <div className="flex items-center gap-1 font-medium">
                            <ShieldCheck className="w-3 h-3 text-[#1C2841] shrink-0" />
                            <span>Direct Workshop Dispatch</span>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
  );
};

export default SampleOrderDrawer;
