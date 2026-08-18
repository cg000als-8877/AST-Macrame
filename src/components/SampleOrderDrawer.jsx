import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft } from 'lucide-react';

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
  const [step, setStep] = useState('summary'); // 'summary' or 'checkout'
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  
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
      document.body.classList.add('modal-open');
      setStep('summary'); // Reset to summary when opened
      setIsSuccess(false);
    } else {
      document.body.classList.remove('modal-open');
      setTimeout(() => {
        setStep('summary');
        setIsSuccess(false);
      }, 300);
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    
    // Prepend dial code to phone
    const dialCode = popularCountries[selectedCountryCode].dialCode;
    const phoneVal = formData.get('phone') || '';
    formData.set('phone', `${dialCode} ${phoneVal}`);
    
    const formDataObj = Object.fromEntries(formData.entries());
    setSubmittedData(formDataObj);
    
    formData.append('formType', 'Sample');
    formData.append('sheetName', 'Sample');
    
    if (orderDetails) {
      formData.append('orderDetails', JSON.stringify(orderDetails));
    }

    const urlEncodedData = new URLSearchParams(formData).toString();

    try {
      const delay = new Promise(resolve => setTimeout(resolve, 1500));
      
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={`fixed inset-0 z-50 flex ${step === 'checkout' ? 'justify-end md:justify-center md:items-center' : 'justify-end'}`}>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-soft-black/50 backdrop-blur-sm"
          />
          
          {/* Drawer / Popup */}
          <motion.div 
            layout
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`relative bg-cream shadow-2xl overflow-y-auto z-10 flex flex-col ${
              step === 'checkout'
                ? 'w-full h-full md:w-full md:max-w-2xl md:h-auto md:max-h-[90vh] md:rounded-2xl'
                : 'w-[60%] md:w-[40%] lg:max-w-md h-full'
            }`}
          >
            {/* Header */}
            <div className="sticky top-0 bg-cream z-20 px-4 md:px-6 py-4 flex items-center justify-between border-b border-stone/10 shadow-sm">
              {step === 'checkout' && !isSuccess ? (
                <button 
                  onClick={() => setStep('summary')}
                  className="flex items-center text-soft-black hover:text-soft-black/70 transition-colors -ml-1 md:-ml-2"
                >
                  <ChevronLeft size={20} className="md:w-6 md:h-6" />
                  <span className="text-xs md:text-sm font-medium ml-1">Back</span>
                </button>
              ) : (
                <h2 className="text-lg md:text-xl font-serif text-soft-black">
                  {isSuccess ? '' : 'Order Summary'}
                </h2>
              )}
              
              <button 
                onClick={onClose}
                className="p-1 md:p-2 text-soft-black hover:text-soft-black/70 transition-colors ml-auto"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-4 md:p-6 flex-1 flex flex-col">
              {isSuccess && submittedData ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center -mt-6 md:-mt-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center mb-4 md:mb-6 shadow-sm border border-stone/10">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="text-xl md:text-3xl font-serif text-soft-black mb-2">Thank You, {submittedData.name.split(' ')[0]}!</h2>
                  <p className="text-xs md:text-sm text-dark-charcoal/80 mb-6 max-w-[280px] mx-auto leading-relaxed">
                    Your sample order has been successfully submitted. We will contact you shortly.
                  </p>
                  
                  <div className="w-full max-w-sm bg-white rounded-xl p-4 md:p-5 shadow-sm border border-stone/5 mb-6 text-left">
                    <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-dark-charcoal mb-3 border-b border-stone/10 pb-2">Order Details</h4>
                    <div className="space-y-2 text-xs md:text-sm">
                      <div className="flex justify-between">
                        <span className="text-dark-charcoal/70">Quantity:</span>
                        <span className="font-medium text-soft-black">{orderDetails?.quantity} Samples</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark-charcoal/70">Shipping To:</span>
                        <span className="font-medium text-soft-black truncate max-w-[150px] text-right">{submittedData.address}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-stone/5 mt-2">
                        <span className="font-bold text-soft-black">Total Bill:</span>
                        <span className="font-bold text-terracotta">{orderDetails?.currencySymbol}{(orderDetails?.totalPriceLocal + orderDetails?.shippingCostLocal).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <button onClick={onClose} className="w-full max-w-[200px] bg-soft-black text-cream px-6 py-3 md:py-3.5 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full hover:bg-terracotta transition-colors shadow-md mx-auto">
                    Close
                  </button>
                </div>
              ) : isTransitioning ? (
                <div className="flex-1 flex flex-col items-center justify-center h-full -mt-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-stone/20 border-t-terracotta rounded-full animate-spin mb-4 md:mb-6"></div>
                  <p className="text-sm md:text-base font-medium text-dark-charcoal/70 animate-pulse">Preparing secure checkout...</p>
                </div>
              ) : step === 'summary' && orderDetails ? (
                <div className="flex flex-col h-full">
                  <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-stone/5 mb-4 md:mb-6 flex-1">
                    {orderDetails.quantity === 5 ? (
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="flex-1">
                          <p className="text-base md:text-lg font-serif text-soft-black mb-1">Pack of 5 Samples</p>
                          <p className="text-[10px] md:text-sm text-dark-charcoal/70">Includes all 5 signature colors (2 Medium, 3 Large)</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 md:space-y-4">
                        {Array.from({ length: orderDetails.quantity }).map((_, idx) => (
                          <div key={idx} className="flex items-center gap-3 md:gap-4 py-2 border-b border-stone/5 last:border-0 last:pb-0">
                            <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg shadow-sm border border-stone/10 overflow-hidden shrink-0 bg-stone/5">
                              <img 
                                src={colorImages[orderDetails.selectedColors[idx] || 'Black']} 
                                alt={orderDetails.selectedColors[idx]} 
                                className="w-full h-full object-cover mix-blend-multiply" 
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs md:text-sm font-bold text-soft-black mb-0.5 md:mb-1 truncate">
                                {orderDetails.selectedColors[idx] || 'Black'}
                              </p>
                              <p className="text-[9px] md:text-xs text-dark-charcoal/60 uppercase tracking-widest">
                                Size {orderDetails.selectedSizes[idx] || 'M'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-stone/5 mt-auto">
                    <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                      <div className="flex justify-between text-xs md:text-sm text-dark-charcoal/80">
                        <span>Subtotal</span>
                        <span className="font-medium">{orderDetails.currencySymbol}{orderDetails.totalPriceLocal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs md:text-sm text-dark-charcoal/80">
                        <span>Est. Shipping</span>
                        <span className="font-medium">{orderDetails.currencySymbol}{orderDetails.shippingCostLocal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-base md:text-lg text-soft-black font-bold pt-3 md:pt-4 border-t border-stone/10 mt-2">
                        <span>Total</span>
                        <span>{orderDetails.currencySymbol}{(orderDetails.totalPriceLocal + orderDetails.shippingCostLocal).toLocaleString()}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setIsTransitioning(false);
                          setStep('checkout');
                        }, 2000);
                      }}
                      className="w-full bg-soft-black text-cream px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full hover:bg-terracotta transition-colors shadow-md"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-stone/5">
                  <h3 className="text-base md:text-lg font-bold text-soft-black mb-4 md:mb-6">Personal Info</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                    <div>
                      <input 
                        type="text" 
                        name="name" 
                        className="w-full bg-white border border-stone/20 rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base font-medium focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all placeholder:text-dark-charcoal/40 text-soft-black" 
                        placeholder="Your Name *" 
                        required 
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <select
                        value={selectedCountryCode}
                        onChange={(e) => setSelectedCountryCode(e.target.value)}
                        className="w-[95px] md:w-[120px] bg-stone/5 border border-stone/20 rounded-lg px-2 py-2.5 md:py-3 text-sm md:text-base font-medium text-soft-black shrink-0 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all cursor-pointer"
                      >
                        {Object.entries(popularCountries).map(([code, c]) => (
                          <option key={code} value={code}>{getFlagEmoji(code)} {c.dialCode}</option>
                        ))}
                      </select>
                      <input 
                        type="tel" 
                        name="phone" 
                        className="flex-1 bg-white border border-stone/20 rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base font-medium focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all placeholder:text-dark-charcoal/40 text-soft-black" 
                        placeholder="Phone Number *" 
                        required 
                      />
                    </div>

                    <div>
                      <input 
                        type="email" 
                        name="email" 
                        className="w-full bg-white border border-stone/20 rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base font-medium focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all placeholder:text-dark-charcoal/40 text-soft-black" 
                        placeholder="Email Address *" 
                        required
                      />
                    </div>

                    <div className="pt-1 md:pt-2">
                      <input 
                        type="text" 
                        name="company" 
                        className="w-full bg-white border border-stone/20 rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base font-medium focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all placeholder:text-dark-charcoal/40 text-soft-black" 
                        placeholder="Brand *" 
                        required
                      />
                    </div>

                    <div className="flex gap-2 pt-1 md:pt-2">
                      <input type="hidden" name="country" value={popularCountries[selectedCountryCode].name} />
                      <select 
                        value={selectedCountryCode}
                        onChange={(e) => {
                          setSelectedCountryCode(e.target.value);
                          setSelectedCity('');
                        }}
                        className="w-1/2 bg-white border border-stone/20 rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base font-medium focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all text-soft-black cursor-pointer" 
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
                        className="w-1/2 bg-white border border-stone/20 rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base font-medium focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all text-soft-black cursor-pointer" 
                        required
                      >
                        <option value="" disabled>Select City *</option>
                        {popularCountries[selectedCountryCode].cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>

                    {selectedCountryCode === 'OTHER' ? (
                      <p className="text-[10px] md:text-xs text-terracotta italic font-medium -mb-1 pl-1">
                        * Please write in the detailed address box which country/city you belong to.
                      </p>
                    ) : selectedCity === 'Other' ? (
                      <p className="text-[10px] md:text-xs text-terracotta italic font-medium -mb-1 pl-1">
                        * Please write in the detailed address box which city you belong to.
                      </p>
                    ) : null}

                    <div className="pt-1 md:pt-2">
                      <input 
                        type="text" 
                        name="address" 
                        className="w-full bg-white border border-stone/20 rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base font-medium focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all placeholder:text-dark-charcoal/40 text-soft-black" 
                        placeholder="Detailed Address *" 
                        required 
                      />
                    </div>
                    
                    <div className="pt-1 md:pt-2">
                      <textarea 
                        name="message"
                        rows="2" 
                        className="w-full bg-white border border-stone/20 rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base font-medium focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all placeholder:text-dark-charcoal/40 text-soft-black resize-none" 
                        placeholder="Message (Optional)"
                      ></textarea>
                    </div>

                    <p className="mt-2 md:mt-4 text-[9px] md:text-xs text-dark-charcoal/70 font-medium italic mb-1 md:mb-2 leading-tight">
                      * Standard shipping charge {orderDetails?.currencySymbol}{orderDetails?.shippingCostLocal?.toLocaleString(undefined, {maximumFractionDigits: 2})} {orderDetails?.localCurrency} for {orderDetails?.userCountry || 'your region'}.
                    </p>
                    
                    <div className="pt-4 md:pt-6 mt-4 md:mt-6 border-t border-stone/10">
                      <div className="flex justify-between items-center mb-4 md:mb-5">
                        <span className="text-sm md:text-base font-bold text-soft-black">Total to pay:</span>
                        <span className="text-lg md:text-xl font-bold text-terracotta">
                          {orderDetails?.currencySymbol}{(orderDetails?.totalPriceLocal + orderDetails?.shippingCostLocal).toLocaleString()}
                        </span>
                      </div>
                      <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="w-full bg-soft-black text-cream px-4 py-3 md:px-6 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full hover:bg-terracotta transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Processing...' : 'Submit Order'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SampleOrderDrawer;
