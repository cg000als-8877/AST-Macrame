import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, Download, Check, Lock, ShieldCheck, X } from 'lucide-react';
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
  
  // Standard Nationwide Delivery Charge (100 Tk)
  const deliveryCost = 100;

  // Lock body scroll on mobile and desktop while order form modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const originalWidth = document.body.style.width;

      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

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
          value: orderType === 'single' ? 850 : 1490,
        });
      }
    } else {
      setSelectedDistrictId('');
      setSelectedUpazilaName('');
      setDistricts([]);
      setUpazilas([]);
      setFormError(null);
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
      formData.append('orderType', 'Combo (1490 BDT)');
      if (!formData.get('color')) formData.append('color', `${comboColor1} + ${comboColor2}`);
      if (!formData.get('size')) formData.append('size', `${comboSize1} + ${comboSize2}`);
    } else {
      formData.append('orderType', 'Single (850 BDT)');
      if (!formData.get('color')) formData.append('color', selectedColor);
      if (!formData.get('size')) formData.append('size', selectedSize);
    }
    
    // Add Delivery Charge label for Google Sheet
    const deliveryText = 'Standard Delivery Charge 100 Tk (All over Bangladesh)';
    formData.append('deliveryCharge', deliveryText);

    // Add Date, Time, and Total Amount
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    
    const deliveryCostAmount = 100;
    const productCostAmount = orderType === 'single' ? 850 : 1490;
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
      deliveryLocation: 'All over Bangladesh',
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
      // Fire Google Sheets background submission
      const submitPromise = scriptUrl ? fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedData,
      }).catch(err => console.error("Sheet submit error:", err)) : Promise.resolve();

      // Snappy 1.2s realistic spinner, capped at 2.0s maximum so it never hangs
      const minDelay = new Promise(resolve => setTimeout(resolve, 1200));
      const maxTimeout = new Promise(resolve => setTimeout(resolve, 2000));
      
      await Promise.all([
        Promise.race([submitPromise, maxTimeout]),
        minDelay
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

  const productCost = orderType === 'single' ? 850 : 1490;
  const totalCost = productCost + deliveryCost;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-3 lg:p-4 overflow-hidden overscroll-contain">
          {/* Blurred Background Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isSubmitting ? onClose : undefined}
            className={`absolute inset-0 transition-all duration-500 ${
              isSuccess 
                ? 'bg-white/80 backdrop-blur-2xl' 
                : 'bg-black/75 backdrop-blur-md'
            }`}
          />
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`w-full h-[100dvh] md:h-auto md:max-h-[96vh] max-w-6xl px-2.5 py-4 sm:px-5 sm:py-6 md:px-8 lg:px-12 md:py-8 rounded-none overflow-y-auto overscroll-contain relative flex flex-col ${
              isSuccess ? 'bg-transparent shadow-none items-center justify-start md:justify-center' : 'bg-cream shadow-2xl md:block'
            }`}
          >
            {!isSubmitting && !isSuccess && (
              <button 
                onClick={onClose}
                className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-1.5 text-soft-black/70 hover:text-soft-black transition-colors z-20 group cursor-pointer"
                aria-label="Back"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider">Back</span>
              </button>
            )}

            {isSuccess && (
              <button 
                onClick={onClose}
                className="fixed top-4 right-4 md:top-6 md:right-6 w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 text-soft-black flex items-center justify-center backdrop-blur-md transition-all z-30 cursor-pointer border border-black/10 shadow-sm"
                aria-label="Close receipt"
              >
                <X size={18} />
              </button>
            )}
            
            <div className={`relative z-10 w-full ${isSuccess || isSubmitting ? 'flex flex-col items-center justify-center' : ''}`}>
            {isSubmitting ? (
              /* Realistic Loading Animation */
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
              <div className="py-2 md:py-4 flex flex-col items-center justify-center w-full">
                
                {/* 1. "YOUR ORDER IS CONFIRMED" Banner ABOVE the receipt */}
                <div className="flex items-center justify-center gap-2 mb-3 select-none">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center shadow-sm shrink-0">
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold tracking-widest text-emerald-800 uppercase font-sans">
                    YOUR ORDER IS CONFIRMED
                  </span>
                </div>

                {/* 2. Redesigned Sharp 3:4 Receipt Card (Compact & Highlighted) */}
                <div 
                  ref={receiptRef}
                  className="w-full max-w-[370px] sm:max-w-[390px] aspect-[3/4] bg-white border border-[#DDD8CE] p-4 sm:p-5 rounded-none shadow-2xl font-mono text-soft-black text-left select-text relative flex flex-col justify-between"
                  style={{ minHeight: '490px' }}
                >
                  {/* Top Brand Header */}
                  <div className="text-center pb-2 border-b border-[#E8E4DB]">
                    <img 
                      src="/logo_black.png" 
                      alt="AST Logo" 
                      className="h-6 w-auto mx-auto mb-1 object-contain" 
                    />
                    <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-soft-black leading-tight">
                      AST MACRAMÉ
                    </h2>
                    <p className="text-[9px] text-dark-charcoal/60 uppercase tracking-widest mt-0.5">
                      Official Order Receipt
                    </p>
                  </div>

                  {/* Order Meta Bar - Highlighted */}
                  <div className="grid grid-cols-2 gap-2 py-1.5 px-2.5 bg-[#FAF8F5] border border-[#E8E4DB] text-[10px] sm:text-[10.5px]">
                    <div>
                      <span className="text-dark-charcoal/60 block text-[8.5px] uppercase">ORDER ID</span>
                      <strong className="font-bold text-soft-black">{orderReceipt.orderId}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-dark-charcoal/60 block text-[8.5px] uppercase">DATE & TIME</span>
                      <span className="text-dark-charcoal/90">{orderReceipt.date}</span>
                    </div>
                  </div>

                  {/* Customer Delivery Details */}
                  <div className="py-2 border-b border-[#E8E4DB] text-[10.5px] space-y-0.5">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-dark-charcoal/60">
                      DELIVER TO
                    </div>
                    <div className="font-bold text-soft-black leading-tight">{orderReceipt.name} • {orderReceipt.phone}</div>
                    <div className="text-dark-charcoal/75 text-[10px] leading-snug font-sans line-clamp-2">{orderReceipt.address}</div>
                    {orderReceipt.note && (
                      <div className="text-[9.5px] text-dark-charcoal/65 italic font-sans">
                        Note: {orderReceipt.note}
                      </div>
                    )}
                  </div>

                  {/* Order Items & Breakdown */}
                  <div className="py-2 space-y-1.5 text-[10.5px]">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-dark-charcoal/60">
                      ORDER SUMMARY
                    </div>
                    <div className="space-y-1">
                      {orderReceipt.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[10.5px] leading-tight">
                          <div>
                            <span className="font-bold text-soft-black">{item.name}</span>
                            <span className="text-[9.5px] text-dark-charcoal/65 ml-1.5 font-sans">
                              ({item.color}, {item.size})
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-1.5 border-t border-dashed border-[#E0DCD3] space-y-0.5 text-[10px] text-dark-charcoal/80">
                      <div className="flex justify-between">
                        <span>Items Subtotal:</span>
                        <span>৳ {orderReceipt.productCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee ({orderReceipt.deliveryLocation}):</span>
                        <span>৳ {orderReceipt.deliveryCost.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Total Payable Box - Highlighted */}
                  <div className="py-2 px-3 bg-[#FAF8F5] border border-[#E0DCD3] flex justify-between items-center text-xs">
                    <span className="font-bold tracking-wider uppercase text-soft-black text-[10.5px]">TOTAL PAYABLE (COD):</span>
                    <span className="text-base font-bold text-terracotta">৳ {orderReceipt.totalCost.toLocaleString()}</span>
                  </div>

                  {/* Highlighted WhatsApp Support Box & Thank You Note */}
                  <div className="pt-2 text-center border-t border-[#E8E4DB]">
                    <a 
                      href="https://wa.me/8801940689061" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-1 px-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-bold rounded-none transition-colors w-full"
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#25D366]">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                      </svg>
                      <span>WhatsApp Support: <strong>+8801940689061</strong></span>
                    </a>
                    <p className="text-[9px] text-dark-charcoal/60 font-sans mt-1">
                      Thank you for your order! Parcel preparation in progress.
                    </p>
                  </div>
                </div>

                {/* 3. Action Buttons (Below Receipt) */}
                <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto mt-4">
                  <button 
                    onClick={handleDownloadReceipt}
                    disabled={isDownloading}
                    className="w-full sm:w-auto bg-[#1C2841] text-white hover:bg-black px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full transition-all shadow-xl cursor-pointer font-mono flex items-center justify-center gap-2.5 active:scale-95 disabled:opacity-75"
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
                  <button
                    onClick={onClose}
                    className="mt-2.5 text-xs text-dark-charcoal/75 hover:text-soft-black uppercase tracking-widest font-semibold transition-colors cursor-pointer underline"
                  >
                    Return to Store
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center mb-3 md:mb-8 text-center">
                  <img src="/logo_black.png" alt="AST Handmade Macramé Belts" className="h-8 md:h-10 w-auto object-contain md:mb-3" />
                </div>
                
                <form 
                  className="w-full flex flex-col md:grid md:grid-cols-2 md:gap-8 lg:gap-12 md:items-start"
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
                        <span>PLACE ORDER — ৳ {totalCost.toLocaleString()} (COD)</span>
                      )}
                    </button>

                    {/* Minimalist Security & Encryption Trust Line */}
                    <div className="flex flex-col items-center justify-center pt-1 text-center select-none">
                      <div className="flex items-center justify-center gap-2 text-[10.5px] sm:text-[11.5px] text-dark-charcoal/75 font-medium">
                        <div className="flex items-center gap-1">
                          <Lock className="w-3 h-3 text-emerald-700 shrink-0 stroke-[2]" />
                          <span>256-bit SSL</span>
                        </div>
                        <span className="text-dark-charcoal/30">•</span>
                        <div className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#1C2841] shrink-0 stroke-[2]" />
                          <span>Norton & McAfee Verified</span>
                        </div>
                      </div>
                      <p className="text-[9.5px] sm:text-[10px] text-dark-charcoal/50 font-light mt-0.5">
                        Your personal data is encrypted & safe
                      </p>
                    </div>
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
                      
                      <div className="flex justify-between items-center text-[11px] md:text-xs text-dark-charcoal/80">
                        <span>Delivery Charge (All over Bangladesh)</span>
                        <span className="font-semibold text-soft-black">100 BDT</span>
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
                        <span>PLACE ORDER — ৳ {totalCost.toLocaleString()} (COD)</span>
                      )}
                    </button>

                    {/* Minimalist Security & Encryption Trust Line */}
                    <div className="flex flex-col items-center justify-center pt-1 text-center select-none">
                      <div className="flex items-center justify-center gap-2.5 text-xs text-dark-charcoal/75 font-medium">
                        <div className="flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5 text-emerald-700 shrink-0 stroke-[2]" />
                          <span>256-bit SSL</span>
                        </div>
                        <span className="text-dark-charcoal/30">•</span>
                        <div className="flex items-center gap-1">
                          <ShieldCheck className="w-4 h-4 text-[#1C2841] shrink-0 stroke-[2]" />
                          <span>Norton & McAfee Verified</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-dark-charcoal/50 font-light mt-0.5">
                        Your personal data is encrypted & safe
                      </p>
                    </div>
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

