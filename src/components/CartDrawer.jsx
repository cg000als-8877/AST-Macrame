import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartWishlist } from '../context/CartWishlistContext';
import SampleOrderDrawer from './SampleOrderDrawer';

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    totalCartQuantity,
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
    shippingCostLocal
  } = useCartWishlist();

  const [isSampleCheckoutOpen, setIsSampleCheckoutOpen] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isCartOpen]);

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsSampleCheckoutOpen(true);
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
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-soft-black text-cream flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-soft-black leading-none">Sample Cart</h2>
                    <p className="text-[11px] text-dark-charcoal/60 mt-0.5">
                      {totalCartQuantity} {totalCartQuantity === 1 ? 'sample piece' : 'sample pieces'}
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

              {/* Volume Discount Progress / Reward Banner */}
              {totalCartQuantity > 0 && (
                <div className="px-4 py-2.5 bg-emerald-50 border-b border-emerald-100/80 flex items-center gap-2 text-emerald-800 text-[11px] md:text-xs">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium leading-tight">
                    {totalCartQuantity === 1 && "💡 Add 1 more belt to save ৳100 automatically!"}
                    {totalCartQuantity === 2 && "🔥 Buy 2 Tier active: You save ৳100! Add 1 more to save ৳300."}
                    {totalCartQuantity === 3 && "🔥 Buy 3 Tier active: You save ৳300! Add 1 more to save ৳520."}
                    {totalCartQuantity === 4 && "🔥 Buy 4 Tier active: You save ৳520! Add 1 more to get ৳690/pc rate."}
                    {totalCartQuantity >= 5 && `🎉 Max volume tier unlocked: ${currencySymbol}${Math.round(unitPriceLocal).toLocaleString()}/pc rate applied!`}
                  </span>
                </div>
              )}

              {/* Content / Items */}
              <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-3">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center px-4 py-12">
                    <div className="w-16 h-16 rounded-full bg-white border border-stone/15 flex items-center justify-center text-dark-charcoal/40 mb-4 shadow-xs">
                      <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-soft-black mb-1">Your Sample Cart is Empty</h3>
                    <p className="text-xs text-dark-charcoal/70 max-w-xs mb-6 leading-relaxed">
                      Select your desired macramé belt colors and sizes to inspect our craftsmanship firsthand.
                    </p>
                    <Link
                      to="/product"
                      onClick={() => setIsCartOpen(false)}
                      className="inline-flex items-center gap-2 bg-soft-black text-cream px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-dark-charcoal transition-colors shadow-sm"
                    >
                      <span>Order a Sample</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  cart.map((item) => {
                    const itemTotalLocal = (item.quantity * 850) * exchangeRate;
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white border border-stone/15 rounded-2xl p-3.5 shadow-2xs flex items-center gap-3.5 group"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone/5 border border-stone/10 shrink-0">
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

                          <div className="flex items-center gap-2 text-[11px] text-dark-charcoal/70 my-0.5">
                            <span>Color: <strong className="text-soft-black">{item.color}</strong></span>
                            <span>•</span>
                            <span>Size: <strong className="text-soft-black">{item.size}</strong></span>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            {/* Stepper */}
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

                            <span className="text-xs font-bold text-soft-black">
                              {currencySymbol}{Math.round(itemTotalLocal).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Order Summary Footer */}
              {cart.length > 0 && (
                <div className="p-4 md:p-5 bg-white border-t border-stone/15 space-y-3 shadow-lg">
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

                    <div className="flex justify-between">
                      <span>Est. Shipping ({userCountry}):</span>
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

                  <button
                    type="button"
                    onClick={handleOpenCheckout}
                    className="w-full flex items-center justify-center gap-2 bg-soft-black hover:bg-dark-charcoal text-cream py-4 rounded-xl text-xs font-bold uppercase tracking-[0.18em] transition-all shadow-md active:scale-[0.99] cursor-pointer"
                  >
                    <span>Proceed to Sample Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-dark-charcoal/60 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Sample costs reimbursed on subsequent wholesale bulk orders</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Direct Order Checkout Drawer */}
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
          totalPriceLocal,
          savingsLocal,
          currencySymbol,
          localCurrency,
          userCountry,
          userCountryCode,
          userCallingCode
        }}
      />
    </>
  );
};

export default CartDrawer;
