import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Sparkles, PackageCheck } from 'lucide-react';
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
      const originalOverflow = document.body.style.overflow;
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.classList.remove('modal-open');
        document.body.style.overflow = originalOverflow;
      };
    }
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
          <div className="fixed inset-0 z-50 flex justify-end overflow-hidden overscroll-contain">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-soft-black/50 backdrop-blur-xs overscroll-contain"
            />

            {/* Drawer (Consumes 300% of 400% = 75% width on mobile) */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-[75vw] sm:w-full sm:max-w-md bg-cream h-[100dvh] shadow-2xl z-10 flex flex-col overflow-hidden overscroll-contain"
            >
              {/* Header */}
              <div className="px-3.5 py-3 sm:px-5 sm:py-4 bg-cream border-b border-stone/15 flex items-center justify-between shadow-2xs shrink-0">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${cart.length === 0 ? 'bg-soft-black text-cream' : isRetailCart ? 'bg-terracotta text-cream' : 'bg-soft-black text-cream'}`}>
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h2 className="font-serif text-base sm:text-lg font-bold text-soft-black leading-none truncate">
                        {cart.length === 0 ? 'Shopping Cart' : isRetailCart ? 'Retail Cart' : 'Sample Cart'}
                      </h2>
                      {cart.length > 0 && isRetailCart && (
                        <span className="bg-emerald-100 text-emerald-800 text-[8.5px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider whitespace-nowrap">
                          COD Bangladesh
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-dark-charcoal/60 mt-0.5 truncate">
                      {totalCartQuantity} {totalCartQuantity === 1 ? 'item' : 'items'} in your cart
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full hover:bg-stone/10 text-soft-black transition-colors cursor-pointer shrink-0 ml-1"
                  aria-label="Close Cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content / Items */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5 flex flex-col overscroll-contain">
                {cart.length === 0 ? (
                  <div className="h-full my-auto flex flex-col items-center justify-center text-center px-4 py-12">
                    <div className="w-14 h-14 rounded-full bg-white border border-stone/15 flex items-center justify-center text-dark-charcoal/40 mb-3 shadow-xs">
                      <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-soft-black mb-1">Your Cart is Empty</h3>
                    <p className="text-xs text-dark-charcoal/70 max-w-xs mb-5 leading-relaxed">
                      Discover our handcrafted cotton macramé belts and find your perfect fit.
                    </p>
                    <Link
                      to="/products"
                      onClick={() => setIsCartOpen(false)}
                      className="relative overflow-hidden group inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-soft-black text-cream px-4 sm:px-6 py-2.5 sm:py-3 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-[0.18em] whitespace-nowrap hover:bg-dark-charcoal hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-300 shadow-md cursor-pointer max-w-full"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                      <span className="relative z-10 whitespace-nowrap transition-all duration-300 group-hover:tracking-widest">Explore All Products</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
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
                          className="bg-white border border-stone/15 rounded-2xl p-2.5 sm:p-3.5 shadow-2xs flex items-start gap-2.5 sm:gap-3.5 group"
                        >
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-stone/5 border border-stone/10 shrink-0 mt-0.5">
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
                              <div className="flex items-center bg-stone/10 border border-stone/20 rounded p-0.5">
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
                <div className="p-3 sm:p-3.5 bg-white border-t border-stone/15 space-y-2 shadow-lg shrink-0">
                  
                  {/* Minimal Compressed Motivational Bar */}
                  {isRetailCart ? (
                    (() => {
                      let msg = '';
                      let percent = 50;
                      let isMax = false;

                      if (singleItemsCount === 1) {
                        msg = 'Add 1 more for Combo (2 for ৳1,490 • Save ৳610)';
                        percent = 50;
                      } else if (singleItemsCount === 2) {
                        msg = 'Add 1 more for 3 @ ৳2,090 (Save ৳1,060)';
                        percent = 66;
                      } else if (singleItemsCount === 3) {
                        msg = 'Add 1 more for 4 @ ৳2,650 (Save ৳1,550)';
                        percent = 80;
                      } else if (singleItemsCount === 4) {
                        msg = 'Add 1 more for 5 @ ৳3,150 (Save ৳2,100)';
                        percent = 90;
                      } else if (singleItemsCount >= 5 || comboItemsCount >= 1) {
                        msg = `Max multi-belt savings applied (Saved ৳${retailSavingsTotalBDT.toLocaleString()})`;
                        percent = 100;
                        isMax = true;
                      }

                      if (!msg) return null;

                      return (
                        <div className={`py-1.5 px-2.5 rounded-lg border text-[11px] leading-tight ${
                          isMax 
                            ? 'bg-emerald-50/80 border-emerald-200/80 text-emerald-950 font-medium' 
                            : 'bg-amber-50/80 border-amber-200/80 text-amber-950 font-medium'
                        }`}>
                          <div className="flex items-center gap-1.5 mb-1 truncate">
                            <Sparkles className={`w-3 h-3 shrink-0 ${isMax ? 'text-emerald-600' : 'text-amber-600'}`} />
                            <span className="truncate">{msg}</span>
                          </div>
                          <div className="w-full bg-black/10 rounded-full h-1 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${isMax ? 'bg-emerald-600' : 'bg-terracotta'}`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    (() => {
                      let msg = '';
                      let percent = 50;
                      let isMax = false;

                      if (totalCartQuantity === 1) {
                        msg = `Add 1 more for Tier 2 (${currencySymbol}${Math.round(745 * exchangeRate)}/pc)`;
                        percent = 50;
                      } else if (totalCartQuantity === 2) {
                        msg = `Add 1 more for Tier 3 (${currencySymbol}${Math.round(697 * exchangeRate)}/pc)`;
                        percent = 66;
                      } else if (totalCartQuantity === 3) {
                        msg = `Add 1 more for Tier 4 (${currencySymbol}${Math.round(662.5 * exchangeRate)}/pc)`;
                        percent = 80;
                      } else if (totalCartQuantity === 4) {
                        msg = `Add 1 more for MAX tier (${currencySymbol}${Math.round(630 * exchangeRate)}/pc)`;
                        percent = 90;
                      } else {
                        msg = `Max sample discount unlocked (${currencySymbol}${Math.round(630 * exchangeRate)}/pc)`;
                        percent = 100;
                        isMax = true;
                      }

                      return (
                        <div className={`py-1.5 px-2.5 rounded-lg border text-[11px] leading-tight ${
                          isMax 
                            ? 'bg-emerald-50/80 border-emerald-200/80 text-emerald-950 font-medium' 
                            : 'bg-amber-50/80 border-amber-200/80 text-amber-950 font-medium'
                        }`}>
                          <div className="flex items-center gap-1.5 mb-1 truncate">
                            <Sparkles className={`w-3 h-3 shrink-0 ${isMax ? 'text-emerald-600' : 'text-amber-600'}`} />
                            <span className="truncate">{msg}</span>
                          </div>
                          <div className="w-full bg-black/10 rounded-full h-1 overflow-hidden">
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
                    <div className="space-y-1 text-xs text-dark-charcoal/80">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>৳{retailSellingTotalBDT.toLocaleString()}</span>
                      </div>

                      {retailSavingsTotalBDT > 0 && (
                        <div className="flex justify-between text-emerald-700 font-semibold bg-emerald-50/80 px-2 py-0.5 rounded text-[11px]">
                          <span>Savings:</span>
                          <span>-৳{retailSavingsTotalBDT.toLocaleString()}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-xs text-dark-charcoal/80">
                        <span>Delivery (COD):</span>
                        <span className="font-semibold text-soft-black">
                          ৳{deliveryCharge.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm sm:text-base font-bold text-soft-black pt-1.5 border-t border-stone/10">
                        <span>Total (Pay on Delivery):</span>
                        <span className="text-terracotta">
                          ৳{(retailSellingTotalBDT + deliveryCharge).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1 text-xs text-dark-charcoal/80">
                      <div className="flex justify-between">
                        <span>Subtotal ({totalCartQuantity} items):</span>
                        <span className="font-semibold text-soft-black">
                          {currencySymbol}{Math.round(regularPriceLocal).toLocaleString()}
                        </span>
                      </div>

                      {savingsLocal > 0 && (
                        <div className="flex justify-between text-emerald-700 font-semibold bg-emerald-50/80 px-2 py-0.5 rounded text-[11px]">
                          <span>Volume Savings:</span>
                          <span>-{currencySymbol}{Math.round(savingsLocal).toLocaleString()}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-xs text-dark-charcoal/80">
                        <span>Est. Shipping ({userCountry}):</span>
                        <span className="font-semibold text-soft-black">
                          {currencySymbol}{Math.round(shippingCostLocal).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm sm:text-base font-bold text-soft-black pt-1.5 border-t border-stone/10">
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
                      className="relative overflow-hidden group w-full flex items-center justify-center gap-1.5 bg-terracotta hover:bg-muted-burgundy hover:shadow-lg hover:-translate-y-0.5 text-cream py-3.5 px-4 rounded text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md active:translate-y-0 active:scale-[0.99] cursor-pointer"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                      <PackageCheck className="w-4 h-4 shrink-0 relative z-10" />
                      <span className="truncate relative z-10 transition-all duration-300 group-hover:tracking-widest">CASH ON DELIVERY CHECKOUT</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleOpenSampleCheckout}
                      className="relative overflow-hidden group w-full flex items-center justify-center gap-1.5 bg-soft-black hover:bg-dark-charcoal hover:shadow-lg hover:-translate-y-0.5 text-cream py-3.5 px-4 rounded text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md active:translate-y-0 active:scale-[0.99] cursor-pointer"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                      <span className="truncate relative z-10 transition-all duration-300 group-hover:tracking-widest">Proceed to Sample Order</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  )}

                  {/* Minimal 1-line Trust Badge */}
                  {isRetailCart ? (
                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-emerald-800 bg-emerald-50/60 border border-emerald-200/40 py-1 px-2 rounded-lg text-center">
                      <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>100% Cash on Delivery • Open-Box Inspection</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-emerald-800 bg-emerald-50/60 border border-emerald-200/40 py-1 px-2 rounded-lg text-center">
                      <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>100% Sample Rebate on Wholesale Orders</span>
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
