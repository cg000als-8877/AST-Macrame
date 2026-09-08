import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Sparkles, Truck, Check, PackageCheck, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartWishlist } from '../context/CartWishlistContext';
import { useStoreConfig } from '../context/StoreConfigContext';
import SampleOrderDrawer from './SampleOrderDrawer';
import RetailOrderModal from './RetailOrderModal';

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    cancelCartAutoClose,
    closeCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    totalCartQuantity,
    isRetailCart,
    singleItemsCount,
    comboItemsCount,
    singleSellingTotalBDT,
    retailRegularTotalBDT,
    retailSellingTotalBDT,
    retailSavingsTotalBDT,
    totalPriceLocal,
    regularPriceLocal,
    savingsLocal,
    unitPriceLocal,
    currencySymbol,
    localCurrency,
    exchangeRate,
    userCountry,
    userCountryCode,
    userCallingCode,
    cartShippingQuote,
    shippingCostLocal
  } = useCartWishlist();

  const { storeConfig } = useStoreConfig();
  const deliveryCharge = storeConfig?.deliveryCharge ?? 100;

  const [isSampleCheckoutOpen, setIsSampleCheckoutOpen] = useState(false);
  const [isRetailCheckoutOpen, setIsRetailCheckoutOpen] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isCartOpen]);

  const handleOpenSampleCheckout = () => {
    cancelCartAutoClose();
    setIsCartOpen(false);
    setIsSampleCheckoutOpen(true);
  };

  const handleOpenRetailCheckout = () => {
    cancelCartAutoClose();
    setIsCartOpen(false);
    setIsRetailCheckoutOpen(true);
  };

  // Extract selected colors & sizes for SampleOrderDrawer
  const selectedColors = [];
  const selectedSizes = [];
  cart.forEach(item => {
    for (let i = 0; i < item.quantity; i++) {
      selectedColors.push(item.color);
      selectedSizes.push(item.size);
    }
  });

  // Extract first retail item details for RetailOrderModal
  const firstRetailItem = cart.find(item => item.isRetail);
  const retailOrderType = firstRetailItem?.orderType || 'single';
  const retailSelectedColor = firstRetailItem?.color || 'Black';
  const retailSelectedSize = firstRetailItem?.size || 'M';
  const retailComboColor1 = firstRetailItem?.comboColor1 || 'Black';
  const retailComboSize1 = firstRetailItem?.comboSize1 || 'M';
  const retailComboColor2 = firstRetailItem?.comboColor2 || 'Navy';
  const retailComboSize2 = firstRetailItem?.comboSize2 || 'M';


  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-soft-black/50 backdrop-blur-xs"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-md bg-cream h-full shadow-2xl z-10 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="px-5 py-4 bg-cream border-b border-stone/15 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${cart.length === 0 ? 'bg-soft-black text-cream' : isRetailCart ? 'bg-terracotta text-cream' : 'bg-soft-black text-cream'}`}>
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="font-serif text-lg font-bold text-soft-black leading-none">
                        {cart.length === 0 ? 'Shopping Cart' : isRetailCart ? 'Retail Cart' : 'Sample Cart'}
                      </h2>
                      {cart.length > 0 && isRetailCart && (
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                          COD Bangladesh
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-dark-charcoal/60 mt-0.5">
                      {totalCartQuantity} {totalCartQuantity === 1 ? 'item' : 'items'} in your cart
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full hover:bg-stone/10 text-soft-black transition-colors cursor-pointer"
                  aria-label="Close Cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content / Items */}
              <div className="flex-1 overflow-y-auto p-4 md:p-5 flex flex-col">
                {cart.length === 0 ? (
                  <div className="h-full my-auto flex flex-col items-center justify-center text-center px-4 py-12">
                    <div className="w-16 h-16 rounded-full bg-white border border-stone/15 flex items-center justify-center text-dark-charcoal/40 mb-4 shadow-xs">
                      <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-soft-black mb-1">Your Cart is Empty</h3>
                    <p className="text-xs text-dark-charcoal/70 max-w-xs mb-6 leading-relaxed">
                      Select your desired macramé belts to proceed with fast delivery.
                    </p>
                    <Link
                      to="/retail"
                      onClick={() => setIsCartOpen(false)}
                      className="inline-flex items-center gap-2 bg-terracotta text-cream px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-muted-burgundy transition-colors shadow-sm"
                    >
                      <span>Shop Retail Belts</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="mt-auto sm:mt-0 space-y-3 w-full">
                    {cart.map((item) => {
                      const isRetail = !!item.isRetail;
                      const isCombo = item.orderType === 'combo';
                      
                      // Retail pricing (BDT) - Single belts dynamic tiered rate: 1 for 850, 2 for 1490, 3 for 2090, 4 for 2650, 5 for 3150
                      const effectiveSingleUnitPrice = singleItemsCount > 0 ? Math.round(singleSellingTotalBDT / singleItemsCount) : 850;
                      const retailUnitPrice = isCombo ? (item.basePriceBDT || 1490) : effectiveSingleUnitPrice;
                      const retailRegularPrice = isCombo ? (item.regularPriceBDT || 2100) : (item.regularPriceBDT || 1050);
                      const retailItemSavings = Math.max(0, retailRegularPrice - retailUnitPrice);
                      const retailItemTotal = retailUnitPrice * item.quantity;
                      const retailItemRegularTotal = retailRegularPrice * item.quantity;

                      // Sample pricing (Local currency)
                      const sampleUnitPrice = Math.round(unitPriceLocal);
                      const sampleRegularPrice = Math.round(850 * exchangeRate);
                      const sampleItemSavings = Math.max(0, sampleRegularPrice - sampleUnitPrice);
                      const sampleItemTotal = sampleUnitPrice * item.quantity;
                      const sampleItemRegularTotal = sampleRegularPrice * item.quantity;

                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-white border border-stone/15 rounded-2xl p-3.5 shadow-2xs flex items-start gap-3.5 group"
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone/5 border border-stone/10 shrink-0 mt-0.5">
                            <img
                              src={item.image}
                              alt={item.color}
                              className="w-full h-full object-cover mix-blend-multiply"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-serif text-sm font-bold text-soft-black truncate">
                                {item.title}
                              </h4>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="p-1 text-dark-charcoal/30 hover:text-rose-600 transition-colors rounded cursor-pointer"
                                title="Remove"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Detail Specifications */}
                            {isCombo ? (
                              <div className="text-[11px] text-dark-charcoal/75 my-1 space-y-0.5 bg-stone-50 p-1.5 rounded-lg border border-stone/10">
                                <div>1st: <strong className="text-soft-black">{item.comboColor1} ({item.comboSize1})</strong></div>
                                <div>2nd: <strong className="text-soft-black">{item.comboColor2} ({item.comboSize2})</strong></div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-[11px] text-dark-charcoal/70 my-1">
                                <span>Color: <strong className="text-soft-black">{item.color}</strong></span>
                                <span>•</span>
                                <span>Size: <strong className="text-soft-black">{item.size}</strong></span>
                              </div>
                            )}

                            {/* Price & Savings Tag */}
                            <div className="flex items-center gap-2 my-1">
                              {isRetail ? (
                                <>
                                  <span className="text-xs text-red-500/80 line-through font-bold">
                                    ৳{retailItemRegularTotal.toLocaleString()}
                                  </span>
                                  <span className="text-sm font-serif font-bold text-soft-black">
                                    ৳{retailItemTotal.toLocaleString()}
                                  </span>
                                  {retailItemSavings > 0 && (
                                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                                      Save ৳{(retailItemSavings * item.quantity).toLocaleString()}
                                    </span>
                                  )}
                                </>
                              ) : (
                                <>
                                  {sampleItemSavings > 0 && (
                                    <span className="text-xs text-red-500/80 line-through font-bold">
                                      {currencySymbol}{sampleItemRegularTotal.toLocaleString()}
                                    </span>
                                  )}
                                  <span className="text-sm font-serif font-bold text-soft-black">
                                    {currencySymbol}{sampleItemTotal.toLocaleString()}
                                  </span>
                                  {sampleItemSavings > 0 && (
                                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                                      Tier Discount
                                    </span>
                                  )}
                                </>
                              )}
                            </div>

                            {/* Stepper */}
                            <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone/10">
                              <div className="flex items-center bg-stone/10 border border-stone/20 rounded-lg p-0.5">
                                <button
                                  type="button"
                                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                  className="w-6 h-6 flex items-center justify-center text-soft-black hover:bg-white rounded transition-colors cursor-pointer"
                                  aria-label="Decrease"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-7 text-center font-bold text-xs text-soft-black">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                  className="w-6 h-6 flex items-center justify-center text-soft-black hover:bg-white rounded transition-colors cursor-pointer"
                                  aria-label="Increase"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="text-[11px] font-semibold text-dark-charcoal/70">
                                Qty: {item.quantity}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Order Summary Footer */}
              {cart.length > 0 && (
                <div className="p-4 md:p-5 bg-white border-t border-stone/15 space-y-3.5 shadow-lg">
                  
                  {/* Retail Motivational Upsell Card vs Sample Tier Card */}
                  {isRetailCart ? (
                    (() => {
                      if (singleItemsCount === 1) {
                        return (
                          <div className="p-3 sm:p-3.5 rounded-xl border bg-amber-50/90 border-amber-200/90 text-amber-950 space-y-2">
                            <div className="flex items-start gap-2">
                              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div className="text-xs leading-snug">
                                <span className="font-bold">Add 1 more belt to upgrade to COMBO (2 for ৳1,490)!</span>
                                <p className="text-[11px] text-amber-900/80 mt-0.5">
                                  Get 2 belts for only <strong>1,490 BDT</strong> instead of 2,100 BDT — <strong>Save 610 TK</strong> total!
                                </p>
                              </div>
                            </div>
                            <div className="w-full bg-black/10 rounded-full h-2 overflow-hidden">
                              <div className="h-full rounded-full bg-terracotta transition-all duration-500 w-1/2" />
                            </div>
                            <Link
                              to="/retail"
                              onClick={() => setIsCartOpen(false)}
                              className="w-full inline-flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white py-1.5 px-3 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors shadow-xs"
                            >
                              <span>⚡ Pick 2nd Belt & Save 610 TK</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        );
                      }

                      if (singleItemsCount === 2) {
                        return (
                          <div className="p-3 sm:p-3.5 rounded-xl border bg-amber-50/90 border-amber-200/90 text-amber-950 space-y-2">
                            <div className="flex items-start gap-2">
                              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div className="text-xs leading-snug">
                                <span className="font-bold">2 Belts Deal Applied (৳1,490)! Add 1 more for 3 @ ৳2,090!</span>
                                <p className="text-[11px] text-amber-900/80 mt-0.5">
                                  Drop price to only <strong>৳697/pc</strong> (3 Belts for 2,090 BDT) — <strong>Save 1,060 TK</strong> total!
                                </p>
                              </div>
                            </div>
                            <div className="w-full bg-black/10 rounded-full h-2 overflow-hidden">
                              <div className="h-full rounded-full bg-terracotta transition-all duration-500 w-2/3" />
                            </div>
                            <Link
                              to="/retail"
                              onClick={() => setIsCartOpen(false)}
                              className="w-full inline-flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white py-1.5 px-3 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors shadow-xs"
                            >
                              <span>⚡ Add 3rd Belt & Save 1,060 TK</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        );
                      }

                      if (singleItemsCount === 3) {
                        return (
                          <div className="p-3 sm:p-3.5 rounded-xl border bg-amber-50/90 border-amber-200/90 text-amber-950 space-y-2">
                            <div className="flex items-start gap-2">
                              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div className="text-xs leading-snug">
                                <span className="font-bold">3 Belts Deal Applied (৳2,090)! Add 1 more for 4 @ ৳2,650!</span>
                                <p className="text-[11px] text-amber-900/80 mt-0.5">
                                  Drop price to only <strong>৳663/pc</strong> (4 Belts for 2,650 BDT) — <strong>Save 1,550 TK</strong> total!
                                </p>
                              </div>
                            </div>
                            <div className="w-full bg-black/10 rounded-full h-2 overflow-hidden">
                              <div className="h-full rounded-full bg-terracotta transition-all duration-500 w-4/5" />
                            </div>
                            <Link
                              to="/retail"
                              onClick={() => setIsCartOpen(false)}
                              className="w-full inline-flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white py-1.5 px-3 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors shadow-xs"
                            >
                              <span>⚡ Add 4th Belt & Save 1,550 TK</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        );
                      }

                      if (singleItemsCount === 4) {
                        return (
                          <div className="p-3 sm:p-3.5 rounded-xl border bg-amber-50/90 border-amber-200/90 text-amber-950 space-y-2">
                            <div className="flex items-start gap-2">
                              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div className="text-xs leading-snug">
                                <span className="font-bold">4 Belts Deal Applied (৳2,650)! Add 1 more to unlock MAX rate (5 @ ৳3,150)!</span>
                                <p className="text-[11px] text-amber-900/80 mt-0.5">
                                  Drop price to only <strong>৳630/pc</strong> (5 Belts for 3,150 BDT) — <strong>Save 2,100 TK</strong> total!
                                </p>
                              </div>
                            </div>
                            <div className="w-full bg-black/10 rounded-full h-2 overflow-hidden">
                              <div className="h-full rounded-full bg-terracotta transition-all duration-500 w-[90%]" />
                            </div>
                            <Link
                              to="/retail"
                              onClick={() => setIsCartOpen(false)}
                              className="w-full inline-flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white py-1.5 px-3 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors shadow-xs"
                            >
                              <span>⚡ Add 5th Belt & Save 2,100 TK (Max Rate)</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        );
                      }

                      if (singleItemsCount >= 5 || comboItemsCount >= 1) {
                        return (
                          <div className="p-3 sm:p-3.5 rounded-xl border bg-emerald-50/90 border-emerald-200/90 text-emerald-950 space-y-1.5">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span className="text-xs sm:text-sm font-bold">🎉 Maximum Multi-Belt Savings Applied!</span>
                            </div>
                            <p className="text-[11px] text-emerald-900/80 leading-snug">
                              You are saving <strong>৳{retailSavingsTotalBDT.toLocaleString()}</strong> total with Cash on Delivery across Bangladesh.
                            </p>
                            <div className="w-full bg-black/10 rounded-full h-2 overflow-hidden">
                              <div className="h-full rounded-full bg-emerald-600 transition-all duration-500 w-full" />
                            </div>
                          </div>
                        );
                      }

                      return null;
                    })()
                  ) : (
                    /* Sample Order Tiered Incentive Card */
                    (() => {
                      let text = '';
                      let percent = 50;
                      let isMax = false;

                      if (totalCartQuantity === 1) {
                        text = `Add 1 more belt to unlock Tier 2 (${currencySymbol}${Math.round(745 * exchangeRate)}/pc • Save ${currencySymbol}${Math.round(210 * exchangeRate)})!`;
                        percent = 50;
                      } else if (totalCartQuantity === 2) {
                        text = `Add 1 more belt to drop price to ${currencySymbol}${Math.round(697 * exchangeRate)}/pc (Save ${currencySymbol}${Math.round(460 * exchangeRate)} total)!`;
                        percent = 66;
                      } else if (totalCartQuantity === 3) {
                        text = `Add 1 more belt to drop price to ${currencySymbol}${Math.round(662.5 * exchangeRate)}/pc (Save ${currencySymbol}${Math.round(750 * exchangeRate)})!`;
                        percent = 80;
                      } else if (totalCartQuantity === 4) {
                        text = `Add 1 more belt to unlock MAX tier rate (${currencySymbol}${Math.round(630 * exchangeRate)}/pc • Save ${currencySymbol}${Math.round(1100 * exchangeRate)})!`;
                        percent = 90;
                      } else {
                        text = `🎉 Maximum Sample Discount Unlocked (${currencySymbol}${Math.round(630 * exchangeRate)}/pc • Save ${currencySymbol}${Math.round(savingsLocal)})!`;
                        percent = 100;
                        isMax = true;
                      }

                      return (
                        <div className={`p-3 sm:p-3.5 rounded-xl border transition-all ${
                          isMax 
                            ? 'bg-emerald-50/90 border-emerald-200/90 text-emerald-950'
                            : 'bg-amber-50/90 border-amber-200/90 text-amber-950'
                        }`}>
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold mb-2 leading-snug">
                            <Sparkles className={`w-4 h-4 shrink-0 ${isMax ? 'text-emerald-600' : 'text-amber-600'}`} />
                            <span>{text}</span>
                          </div>
                          <div className="w-full bg-black/10 rounded-full h-2 sm:h-2.5 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${isMax ? 'bg-emerald-600' : 'bg-terracotta'}`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })()
                  )}

                  {/* Pricing Breakdown */}
                  {isRetailCart ? (
                    <div className="space-y-1.5 text-xs text-dark-charcoal/80">
                      <div className="flex justify-between">
                        <span>Regular Price:</span>
                        <span className="line-through text-red-500/80 font-semibold">
                          ৳{retailRegularTotalBDT.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between font-semibold text-soft-black">
                        <span>Discounted Subtotal:</span>
                        <span>৳{retailSellingTotalBDT.toLocaleString()}</span>
                      </div>

                      {retailSavingsTotalBDT > 0 && (
                        <div className="flex justify-between text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-md">
                          <span>🎉 Total Discount Savings:</span>
                          <span>-৳{retailSavingsTotalBDT.toLocaleString()}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-xs text-dark-charcoal/80">
                        <span>Delivery (Cash on Delivery):</span>
                        <span className="font-semibold text-soft-black">
                          ৳{deliveryCharge.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between text-base font-bold text-soft-black pt-2 border-t border-stone/10 mt-1">
                        <span>Total Payable on Delivery:</span>
                        <span className="text-terracotta">
                          ৳{(retailSellingTotalBDT + deliveryCharge).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5 text-xs text-dark-charcoal/80">
                      <div className="flex justify-between">
                        <span>Subtotal ({totalCartQuantity} items):</span>
                        <span className="font-semibold text-soft-black">
                          {currencySymbol}{Math.round(regularPriceLocal).toLocaleString()}
                        </span>
                      </div>

                      {savingsLocal > 0 && (
                        <div className="flex justify-between text-emerald-700 font-semibold bg-emerald-50/80 px-2 py-1 rounded-md">
                          <span>🔥 Volume Savings:</span>
                          <span>-{currencySymbol}{Math.round(savingsLocal).toLocaleString()}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-xs text-dark-charcoal/80">
                        <span>Est. Shipping ({cartShippingQuote?.carrier || 'Express'} • {userCountry}):</span>
                        <span className="font-semibold text-soft-black">
                          {currencySymbol}{Math.round(shippingCostLocal).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between text-base font-bold text-soft-black pt-2 border-t border-stone/10 mt-1">
                        <span>Total:</span>
                        <span className="text-terracotta">
                          {currencySymbol}{Math.round(totalPriceLocal + shippingCostLocal).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Primary Checkout CTA Button */}
                  {isRetailCart ? (
                    <button
                      type="button"
                      onClick={handleOpenRetailCheckout}
                      className="w-full flex items-center justify-center gap-2 bg-terracotta hover:bg-muted-burgundy text-cream py-4 rounded-xl text-xs font-bold uppercase tracking-[0.18em] transition-all shadow-md active:scale-[0.99] cursor-pointer"
                    >
                      <PackageCheck className="w-4 h-4" />
                      <span>PROCEED TO CASH ON DELIVERY</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleOpenSampleCheckout}
                      className="w-full flex items-center justify-center gap-2 bg-soft-black hover:bg-dark-charcoal text-cream py-4 rounded-xl text-xs font-bold uppercase tracking-[0.18em] transition-all shadow-md active:scale-[0.99] cursor-pointer"
                    >
                      <span>Proceed to Sample Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  {/* Trust & Guarantee Box */}
                  {isRetailCart ? (
                    <div className="bg-stone-50 border border-stone-200/60 rounded-xl p-2.5 space-y-1 text-left">
                      <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-semibold text-emerald-800">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>100% Cash on Delivery with Open-Box Inspection</span>
                      </div>
                      <p className="text-[10px] text-dark-charcoal/70 leading-normal pl-5">
                        Inspect your macramé belt in front of the delivery agent before completing payment.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-stone-50 border border-stone-200/60 rounded-xl p-2.5 space-y-1 text-left">
                      <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-semibold text-emerald-800">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>100% Sample Rebate Guarantee</span>
                      </div>
                      <p className="text-[10px] text-dark-charcoal/70 leading-normal pl-5">
                        Full sample cost is credited directly back onto your first wholesale bulk order invoice.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Direct Sample Order Checkout Drawer */}
      <SampleOrderDrawer
        isOpen={isSampleCheckoutOpen}
        onClose={() => setIsSampleCheckoutOpen(false)}
        orderDetails={{
          quantity: totalCartQuantity || 1,
          selectedColor: selectedColors[0] || 'Black',
          selectedSize: selectedSizes[0] || 'M',
          selectedColors: selectedColors.length > 0 ? selectedColors : ['Black'],
          selectedSizes: selectedSizes.length > 0 ? selectedSizes : ['M'],
          unitPriceLocal,
          shippingCostLocal,
          shippingCarrier: cartShippingQuote?.carrier || 'DHL Express',
          shippingTransit: cartShippingQuote?.transit,
          totalPriceLocal,
          savingsLocal,
          currencySymbol,
          localCurrency,
          userCountry,
          userCountryCode,
          userCallingCode
        }}
      />

      {/* Direct Retail Cash on Delivery Checkout Modal */}
      <RetailOrderModal
        isOpen={isRetailCheckoutOpen}
        onClose={() => setIsRetailCheckoutOpen(false)}
        cartItems={cart.filter(item => item.isRetail)}
        customProductCost={retailSellingTotalBDT}
        customRegularCost={retailRegularTotalBDT}
        customSavings={retailSavingsTotalBDT}
        orderType={retailOrderType}
        selectedColor={retailSelectedColor}
        selectedSize={retailSelectedSize}
        comboColor1={retailComboColor1}
        comboSize1={retailComboSize1}
        comboColor2={retailComboColor2}
        comboSize2={retailComboSize2}
      />
    </>
  );
};

export default CartDrawer;
