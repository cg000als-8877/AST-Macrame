import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, Download, Check } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import bd from '../utils/bd-location';

import b1 from '../assets/products/Black/1.webp';
import n1 from '../assets/products/Navy/1.webp';
import br1 from '../assets/products/Brown/1.webp';
import m1 from '../assets/products/Maroon/1.webp';
import k1 from '../assets/products/Khaki/1.webp';

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
  comboColor2 = 'Black', 
  comboSize2 = 'M' 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState(null);
  const receiptRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [nameFilled, setNameFilled] = useState(false);
  const [phoneFilled, setPhoneFilled] = useState(false);
  const [deliveryPointFilled, setDeliveryPointFilled] = useState(false);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [selectedUpazilaName, setSelectedUpazilaName] = useState('');
  const [formError, setFormError] = useState(null);
  
  // 'outside' (100 Tk) or 'inside' (50 Tk)
  const [deliveryType, setDeliveryType] = useState('outside');

  useEffect(() => {
    if (isOpen) {
      const allDistricts = bd.getDistricts();
      const sorted = [...allDistricts].sort((a, b) => a.name.localeCompare(b.name));
      setDistricts(sorted);
      setFormError(null);

      // Meta Pixel: track when someone opens the order form
      if (typeof fbq === 'function') {
        fbq('track', 'InitiateCheckout', {
          content_name: orderType === 'single' ? 'Single Belt' : 'Combo Belt Set',
          currency: 'BDT',
          value: orderType === 'single' ? 990 : 1790,
        });
      }
    } else {
      setSelectedDistrictId('');
      setSelectedUpazilaName('');
      setDistricts([]);
      setUpazilas([]);
      setFormError(null);
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
      setTimeout(() => {
        setIsSuccess(false);
        setOrderReceipt(null);
      }, 300);
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  const handleFormChange = (e) => {
    const form = e.currentTarget;
    setIsFormValid(form.checkValidity());
    setNameFilled(!!form.name?.value.trim());
    setPhoneFilled(!!form.phone?.value.trim());
    setDeliveryPointFilled(!!form.delivery_point?.value.trim());
    if (formError) {
      setFormError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get('name') || '').trim();
    let rawPhone = (formData.get('phone') || '').trim();
    const deliveryPoint = (formData.get('delivery_point') || '').trim();

    if (!name) {
      setFormError('অনুগ্রহ করে আপনার পুরো নাম প্রদান করুন।');
      form.name?.focus();
      return;
    }

    const cleanPhoneDigits = rawPhone.replace(/\D/g, '');
    if (!rawPhone || cleanPhoneDigits.length < 10) {
      setFormError('অনুগ্রহ করে ১১ ডিজিটের সঠিক মোবাইল নম্বর প্রদান করুন।');
      form.phone?.focus();
      return;
    }

    if (!selectedDistrictId) {
      setFormError('অনুগ্রহ করে আপনার জেলা সিলেক্ট করুন।');
      form.district?.focus();
      return;
    }

    if (!selectedUpazilaName) {
      setFormError('অনুগ্রহ করে আপনার থানা / উপজেলা সিলেক্ট করুন।');
      form.thana?.focus();
      return;
    }

    if (!deliveryPoint) {
      setFormError('অনুগ্রহ করে আপনার সম্পূর্ণ ডেলিভারি ঠিকানা প্রদান করুন।');
      form.delivery_point?.focus();
      return;
    }

    setFormError(null);
    setIsSubmitting(true);
    
    // Format phone to always include +88
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
      : 'Outside Chittagong Delivery Charge 100 Tk';
    formData.append('deliveryCharge', deliveryText);

    // Add Date, Time, and Total Amount
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    
    const deliveryCostAmount = deliveryType === 'inside' ? 50 : 100;
    const productCostAmount = orderType === 'single' ? 990 : 1790;
    const totalCostAmount = productCostAmount + deliveryCostAmount;
    
    formData.append('date', dateStr);
    formData.append('time', timeStr);
    formData.append('totalAmount', `${totalCostAmount} BDT`);

    // Target the Retail sheet
    formData.append('sheetName', 'Retail');

    // Security: attach secret token - Apps Script will reject requests without this
    formData.append('token', import.meta.env.VITE_FORM_TOKEN || '');

    const note = (formData.get('note') || '').trim();
    const orderId = `AST-${Math.floor(100000 + Math.random() * 900000)}`;

    const receiptPayload = {
      orderId,
      date: dateStr,
      time: timeStr,
      name,
      phone: rawPhone,
      address: fullAddress,
      note,
      orderType,
      items: orderType === 'combo' ? [
        { name: 'AST Handmade Macramé Belt (1)', color: comboColor1, size: comboSize1 },
        { name: 'AST Handmade Macramé Belt (2)', color: comboColor2, size: comboSize2 }
      ] : [
        { name: 'AST Handmade Macramé Belt', color: selectedColor, size: selectedSize }
      ],
      productCost: productCostAmount,
      deliveryCost: deliveryCostAmount,
      deliveryLocation: deliveryType === 'inside' ? 'Chittagong City' : 'Outside Chittagong',
      totalCost: totalCostAmount,
      paymentMethod: 'Cash on Delivery (COD)'
    };
    setOrderReceipt(receiptPayload);

    // Security: honeypot check - if bot_field is filled, silently reject (bots fill hidden fields)
    const honeypot = e.target.querySelector('input[name="website"]');
    if (honeypot && honeypot.value) {
      // It's a bot - fake a success response without sending anything
      setIsSuccess(true);
      setIsSubmitting(false);
      return;
    }

    const urlEncodedData = new URLSearchParams(formData).toString();
    const scriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;

    try {
      // 3-second realistic processing delay
      const delay = new Promise(resolve => setTimeout(resolve, 3000));
      
      await Promise.all([
        fetch(scriptUrl, {
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

      // Meta Pixel: track successful order as a Purchase event
      if (typeof fbq === 'function') {
        fbq('track', 'Purchase', {
          value: totalCostAmount,
          currency: 'BDT',
          content_name: orderType === 'single' ? 'Single Belt' : 'Combo Belt Set',
          content_type: 'product',
        });
      }
    } catch (error) {
      console.error(error);
      setIsSuccess(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadReceipt = async () => {
    if (!receiptRef.current) return;
    try {
      setIsDownloading(true);
      
      const node = receiptRef.current;
      const blob = await htmlToImage.toBlob(node, {
        quality: 0.95,
        pixelRatio: 2.5,
        backgroundColor: '#FFFFFF',
        cacheBust: true,
      });

      if (!blob) {
        throw new Error('Could not generate receipt image blob');
      }

      const filename = `AST-Receipt-${orderReceipt?.orderId || 'Order'}.jpg`;

      // Direct automatic download to device storage/gallery
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = filename;
      link.href = blobUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error('Failed to download receipt image:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Automatically trigger receipt download to customer device upon successful order
  useEffect(() => {
    let timer;
    if (isSuccess && orderReceipt) {
      timer = setTimeout(() => {
        handleDownloadReceipt();
      }, 700);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isSuccess, orderReceipt]);

  const deliveryCost = deliveryType === 'inside' ? 50 : 100;
  const productCost = orderType === 'single' ? 990 : 1790;
  const totalCost = productCost + deliveryCost;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 lg:p-12">
          {/* Blurred Background Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isSubmitting ? onClose : undefined}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-cream w-full h-full md:h-auto md:max-h-full max-w-5xl p-4 sm:p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl overflow-y-auto relative flex flex-col md:block"
          >
            {!isSubmitting && (
              <button 
                onClick={onClose}
                className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-1.5 text-soft-black/70 hover:text-soft-black transition-colors z-20 group cursor-pointer"
                aria-label="Back"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider">Back</span>
              </button>
            )}
            
            <div className="relative z-10">
            {isSubmitting ? (
              /* 3-Second Realistic Loading Animation */
              <div className="py-16 md:py-24 flex flex-col items-center justify-center text-center">
                <div className="relative w-16 h-16 mb-5 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full border-3 border-stone/20 border-t-[#1C2841] animate-spin" />
                  <img src="/logo_black.png" alt="AST" className="h-4 w-auto absolute opacity-70" />
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-soft-black mb-1.5">
                  Confirming Your Order...
                </h3>
                <p className="text-xs text-dark-charcoal/70 max-w-xs leading-relaxed font-sans">
                  Reserving your handcrafted belt and generating your official order receipt.
                </p>
              </div>
            ) : isSuccess && orderReceipt ? (
              <div className="py-4 md:py-6 flex flex-col items-center justify-center">
                
                {/* Simplified, Clean Minimalist Monospace Receipt */}
                <div 
                  ref={receiptRef}
                  className="w-full max-w-md bg-white border border-[#E5E0D6] p-6 sm:p-7 rounded-2xl shadow-xl font-mono text-soft-black text-left select-text relative"
                >
                  
                  {/* Top brand & Logo */}
                  <div className="text-center pb-4 border-b border-[#E5E0D6]">
                    <img 
                      src="/logo_black.png" 
                      alt="AST Logo" 
                      className="h-7 w-auto mx-auto mb-2 object-contain" 
                    />
                    <h2 className="text-sm sm:text-base font-bold tracking-widest uppercase text-soft-black">
                      AST MACRAMÉ
                    </h2>
                    <p className="text-[10px] text-dark-charcoal/60 uppercase tracking-widest mt-0.5">
                      Order Confirmation Receipt
                    </p>
                  </div>

                  {/* Order Meta Info */}
                  <div className="py-3 border-b border-[#E5E0D6] text-xs space-y-1.5 text-dark-charcoal/80">
                    <div className="flex justify-between">
                      <span className="text-dark-charcoal/60">ORDER ID:</span>
                      <span className="font-bold text-soft-black">{orderReceipt.orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-charcoal/60">DATE:</span>
                      <span>{orderReceipt.date}, {orderReceipt.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-charcoal/60">PAYMENT:</span>
                      <span className="font-semibold text-emerald-800">{orderReceipt.paymentMethod}</span>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="py-3 border-b border-[#E5E0D6] text-xs space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-dark-charcoal/60 mb-1">
                      DELIVERY DETAILS
                    </div>
                    <div className="font-bold text-soft-black">{orderReceipt.name} ({orderReceipt.phone})</div>
                    <div className="text-dark-charcoal/80 text-[11px] leading-relaxed font-sans mt-0.5">{orderReceipt.address}</div>
                    {orderReceipt.note && (
                      <div className="text-[10.5px] text-dark-charcoal/70 italic pt-0.5 font-sans">
                        Note: {orderReceipt.note}
                      </div>
                    )}
                  </div>

                  {/* Order Items */}
                  <div className="py-3 border-b border-[#E5E0D6] text-xs">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-dark-charcoal/60 mb-2">
                      ITEMS ORDERED
                    </div>
                    <div className="space-y-2">
                      {orderReceipt.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <div>
                            <span className="font-bold text-soft-black">{item.name}</span>
                            <div className="text-[10.5px] text-dark-charcoal/70">
                              {item.color} • Size {item.size}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="py-3 border-b border-[#E5E0D6] text-xs space-y-1.5 text-dark-charcoal/80">
                    <div className="flex justify-between">
                      <span>Product Subtotal:</span>
                      <span>৳ {orderReceipt.productCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee ({orderReceipt.deliveryLocation}):</span>
                      <span>৳ {orderReceipt.deliveryCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#E5E0D6] text-soft-black">
                      <span>TOTAL PAYABLE (COD):</span>
                      <span className="text-base text-[#1C2841]">৳ {orderReceipt.totalCost.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Thank you note */}
                  <div className="pt-4 text-center text-xs">
                    <p className="font-bold tracking-wider uppercase text-soft-black mb-0.5">
                      THANK YOU FOR YOUR ORDER!
                    </p>
                    <p className="text-[10.5px] text-dark-charcoal/60 font-sans mb-1">
                      We will carefully prepare and dispatch your parcel shortly.
                    </p>
                    <p className="text-[10.5px] text-dark-charcoal/60 font-sans">
                      WhatsApp Support: +8801940689061
                    </p>
                  </div>

                </div>

                {/* Modal action - Save Receipt Image */}
                <div className="flex items-center justify-center mt-6 w-full max-w-md mx-auto">
                  <button 
                    onClick={handleDownloadReceipt}
                    disabled={isDownloading}
                    className="w-full sm:w-auto bg-[#1C2841] text-white hover:bg-[#131E33] px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full transition-all shadow-lg cursor-pointer font-mono flex items-center justify-center gap-2.5 active:scale-95 disabled:opacity-75"
                  >
                    {downloadSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Saved to Gallery! ✓</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>{isDownloading ? 'Saving Image to Gallery...' : 'Save Receipt to Gallery (JPG)'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center mb-3 md:mb-8 text-center">
                  <img src="/logo_black.png" alt="AST Handmade Macramé Belts" className="h-8 md:h-10 w-auto object-contain md:mb-3" />
                </div>
                
                <form 
                  className="flex flex-col md:grid md:grid-cols-2 md:gap-8 lg:gap-12 md:items-start"
                  onSubmit={handleSubmit}
                  onChange={handleFormChange}
                >
                  {/* Honeypot field - invisible to humans, bots will fill this automatically */}
                  <input
                    type="text"
                    name="website"
                    autoComplete="off"
                    tabIndex="-1"
                    aria-hidden="true"
                    style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                  />
                  <div className="order-2 md:order-1 space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-[11px] md:text-[12px] font-bold tracking-normal uppercase text-dark-charcoal mb-1">
                      Name / <span className="font-bengali tracking-normal font-medium text-[12px] md:text-[13px]">নাম</span> {!nameFilled && <span className="text-red-500 font-normal italic normal-case tracking-normal ml-1 text-[10px] md:text-[11px]">(Required)</span>}
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      className="w-full bg-white border border-[#D1CCC0] rounded-xl px-3.5 py-2.5 md:py-3 focus:outline-none focus:border-soft-black focus:ring-1 focus:ring-soft-black/10 transition-all text-[13px] md:text-[15px] min-h-[42px] md:min-h-[46px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]" 
                      placeholder="Your Full Name" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] md:text-[12px] font-bold tracking-normal uppercase text-dark-charcoal mb-1">
                      Phone / <span className="font-bengali tracking-normal font-medium text-[12px] md:text-[13px]">মোবাইল নম্বর</span> {!phoneFilled && <span className="text-red-500 font-normal italic normal-case tracking-normal ml-1 text-[10px] md:text-[11px]">(Required)</span>}
                    </label>
                    <div className="relative flex items-center w-full bg-white border border-[#D1CCC0] rounded-xl overflow-hidden focus-within:border-soft-black focus-within:ring-1 focus-within:ring-soft-black/10 transition-all min-h-[42px] md:min-h-[46px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                      <span className="pl-3.5 text-[13px] md:text-[15px] text-dark-charcoal/70 font-medium">+88</span>
                      <input 
                        type="tel" 
                        name="phone" 
                        className="w-full bg-transparent px-2 py-2.5 md:py-3 focus:outline-none text-[13px] md:text-[15px]" 
                        placeholder="01XXX XXXXXX" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-[11px] md:text-[12px] font-bold tracking-normal uppercase text-dark-charcoal mb-1">
                      District / <span className="font-bengali tracking-normal font-medium text-[12px] md:text-[13px]">জেলা</span> {!selectedDistrictId && <span className="text-red-500 font-normal italic normal-case tracking-normal ml-1 text-[10px] md:text-[11px]">(Required)</span>}
                    </label>
                    <div className="relative">
                      <select 
                        name="district" 
                        className="w-full bg-white border border-[#D1CCC0] rounded-xl px-3.5 py-2.5 md:py-3 focus:outline-none focus:border-soft-black focus:ring-1 focus:ring-soft-black/10 transition-all text-[13px] md:text-[15px] appearance-none pr-8 font-bengali min-h-[42px] md:min-h-[46px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-pointer" 
                        required
                        value={selectedDistrictId}
                        onChange={(e) => setSelectedDistrictId(e.target.value)}
                      >
                        <option value="" disabled>Select District</option>
                        {districts.map(d => (
                          <option key={d.id} value={d.id}>{d.name} - {d.bn_name}</option>
                        ))}
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-dark-charcoal/60">
                        <ChevronDown size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-[11px] md:text-[12px] font-bold tracking-normal uppercase text-dark-charcoal mb-1">
                      Thana/Upazila / <span className="font-bengali tracking-normal font-medium text-[12px] md:text-[13px]">থানা / উপজেলা</span> {!selectedUpazilaName && <span className="text-red-500 font-normal italic normal-case tracking-normal ml-1 text-[10px] md:text-[11px]">(Required)</span>}
                    </label>
                    <div className="relative">
                      <select 
                        name="thana" 
                        className="w-full bg-white border border-[#D1CCC0] rounded-xl px-3.5 py-2.5 md:py-3 focus:outline-none focus:border-soft-black focus:ring-1 focus:ring-soft-black/10 transition-all text-[13px] md:text-[15px] appearance-none pr-8 font-bengali min-h-[42px] md:min-h-[46px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-pointer" 
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
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-dark-charcoal/60">
                        <ChevronDown size={18} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] md:text-[12px] font-bold tracking-normal uppercase text-dark-charcoal mb-1">
                      Full Address / <span className="font-bengali tracking-normal font-medium text-[12px] md:text-[13px]">সম্পূর্ণ ঠিকানা</span> {!deliveryPointFilled && <span className="text-red-500 font-normal italic normal-case tracking-normal ml-1 text-[10px] md:text-[11px]">(Required)</span>}
                    </label>
                    <textarea 
                      name="delivery_point"
                      rows="1" 
                      onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      className="w-full bg-white border border-[#D1CCC0] rounded-xl px-3.5 py-2.5 md:py-3 focus:outline-none focus:border-soft-black focus:ring-1 focus:ring-soft-black/10 transition-all text-[13px] md:text-[15px] resize-none overflow-hidden min-h-[42px] md:min-h-[46px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]" 
                      placeholder="House/Flat, Road, Area/Village" 
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-[11px] md:text-[12px] font-bold tracking-normal uppercase text-dark-charcoal mb-1">
                      Note / <span className="font-bengali tracking-normal font-medium text-[12px] md:text-[13px]">নোট</span> <span className="text-dark-charcoal/50 font-normal normal-case tracking-normal">(Optional)</span>
                    </label>
                    <textarea 
                      name="message"
                      rows="1" 
                      onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      className="w-full bg-white border border-[#D1CCC0] rounded-xl px-3.5 py-2.5 md:py-3 focus:outline-none focus:border-soft-black focus:ring-1 focus:ring-soft-black/10 transition-all text-[13px] md:text-[15px] resize-none overflow-hidden min-h-[42px] md:min-h-[46px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]" 
                      placeholder="Any custom instructions..."
                    ></textarea>
                  </div>
                  
                  {/* Mobile Submit Button & Checkbox */}
                  <div className="md:hidden pt-4 mt-4 w-full flex flex-col gap-3">
                    {formError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 text-[11px] rounded-xl flex items-center gap-2">
                        <span className="shrink-0 text-red-500 font-bold">⚠️</span>
                        <span className="font-bengali font-medium leading-tight">{formError}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <input type="checkbox" id="terms-mobile" defaultChecked required className="mt-1 accent-terracotta shrink-0" />
                      <label htmlFor="terms-mobile" className="text-[10px] md:text-xs text-dark-charcoal/80 leading-relaxed tracking-normal">
                        By clicking Confirm Order, you agree to our <Link to="/terms" target="_blank" className="text-terracotta font-bold hover:underline">Terms</Link> and <Link to="/refund" target="_blank" className="text-terracotta font-bold hover:underline">Return Policy</Link>.
                      </label>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="w-full bg-black text-white px-2 sm:px-4 py-3.5 text-[10.5px] min-[360px]:text-[11.5px] sm:text-xs font-bold uppercase tracking-tight sm:tracking-wider rounded-full hover:bg-neutral-800 transition-colors shadow-lg active:scale-[0.99] disabled:opacity-75 disabled:cursor-wait whitespace-nowrap overflow-hidden flex items-center justify-center gap-1 cursor-pointer"
                    >
                      {isSubmitting ? (
                        'Processing...'
                      ) : (
                        <span>CONFIRM ORDER — ৳ {totalCost.toLocaleString()} (CASH ON DELIVERY)</span>
                      )}
                    </button>
                  </div>
                  </div>

                  <div className="order-1 md:order-2 flex flex-col h-full mb-4 md:mb-0">
                  {/* Order Summary Card */}
                  <div className="bg-white border border-[#D1CCC0] rounded-2xl p-3.5 sm:p-4 md:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
                    <h3 className="text-[9px] md:text-xs font-bold tracking-widest uppercase text-dark-charcoal mb-2 md:mb-4 border-b border-[#E5E0D6] pb-1.5 md:pb-3">Order Summary</h3>
                    
                    {orderType === 'single' ? (
                      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-stone/10 rounded-xl overflow-hidden border border-[#E5E0D6]">
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
                        <div className="flex items-center gap-3 md:gap-4 p-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D6]">
                          <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 bg-stone/10 rounded-lg overflow-hidden border border-[#E5E0D6]">
                            <img src={colorImages[comboColor1]} alt={comboColor1} className="w-full h-full object-cover mix-blend-multiply" />
                          </div>
                          <span className="text-[10px] md:text-xs text-dark-charcoal/80 tracking-normal">Belt 1: {comboColor1} ({comboSize1})</span>
                        </div>
                        <div className="flex items-center gap-3 md:gap-4 p-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D6]">
                          <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 bg-stone/10 rounded-lg overflow-hidden border border-[#E5E0D6]">
                            <img src={colorImages[comboColor2]} alt={comboColor2} className="w-full h-full object-cover mix-blend-multiply" />
                          </div>
                          <span className="text-[10px] md:text-xs text-dark-charcoal/80 tracking-normal">Belt 2: {comboColor2} ({comboSize2})</span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-1.5 md:space-y-2 mt-3 md:mt-4 pt-3 md:pt-4 border-t border-[#E5E0D6]">
                      <div className="flex justify-between items-center text-[11px] md:text-xs text-dark-charcoal/80">
                        <span>Subtotal</span>
                        <span className="font-medium">{productCost} BDT</span>
                      </div>
                      
                      <div className="flex flex-col gap-1.5 md:gap-2 mt-3 pt-3 border-t border-[#E5E0D6]">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-dark-charcoal mb-1">Delivery Area</span>
                        
                        <label className="flex items-center justify-between cursor-pointer group p-2.5 rounded-xl transition-all bg-[#FAF8F5] hover:bg-[#F3EFEA] border border-[#E5E0D6]">
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
                        
                        <label className="flex items-center justify-between cursor-pointer group p-2.5 rounded-xl transition-all bg-[#FAF8F5] hover:bg-[#F3EFEA] border border-[#E5E0D6]">
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
                          <span className="text-[11px] md:text-xs font-medium text-terracotta">+ 100 BDT</span>
                        </label>
                      </div>

                      <div className="flex justify-between items-center mt-3 md:mt-4 pt-3 md:pt-4 border-t border-[#E5E0D6]">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-soft-black">Total</span>
                        <span className="text-base md:text-xl font-serif font-bold text-terracotta">{totalCost} BDT</span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Submit Button & Checkbox */}
                  <div className="hidden md:flex flex-col pt-4 mt-auto gap-3">
                    {formError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 text-xs rounded-xl flex items-center gap-2">
                        <span className="shrink-0 text-red-500 font-bold">⚠️</span>
                        <span className="font-bengali font-medium leading-tight">{formError}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <input type="checkbox" id="terms-desktop" defaultChecked required className="mt-1 accent-terracotta shrink-0" />
                      <label htmlFor="terms-desktop" className="text-[10px] md:text-xs text-dark-charcoal/80 leading-relaxed tracking-normal">
                        By clicking Confirm Order, you agree to our <Link to="/terms" target="_blank" className="text-terracotta font-bold hover:underline">Terms</Link> and <Link to="/refund" target="_blank" className="text-terracotta font-bold hover:underline">Return Policy</Link>.
                      </label>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="w-full bg-black text-white px-4 py-4 text-xs lg:text-sm font-bold uppercase tracking-wider rounded-full hover:bg-neutral-800 transition-colors shadow-lg active:scale-[0.99] disabled:opacity-75 disabled:cursor-wait whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isSubmitting ? (
                        'Processing...'
                      ) : (
                        <span>CONFIRM ORDER — ৳ {totalCost.toLocaleString()} (CASH ON DELIVERY)</span>
                      )}
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

