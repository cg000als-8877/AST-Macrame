import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartWishlist } from '../context/CartWishlistContext';

const WishlistDrawer = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    removeFromWishlist,
    moveToCartFromWishlist,
    clearCart,
    currencySymbol,
    exchangeRate
  } = useCartWishlist();

  useEffect(() => {
    if (isWishlistOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isWishlistOpen]);

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
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
                <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-500">
                  <Heart className="w-4 h-4 fill-rose-500" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-soft-black leading-none">Wishlist</h2>
                  <p className="text-[11px] text-dark-charcoal/60 mt-0.5">
                    {wishlist.length} {wishlist.length === 1 ? 'item saved' : 'items saved'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone/10 text-soft-black transition-colors cursor-pointer"
                aria-label="Close Wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-3">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-white border border-stone/15 flex items-center justify-center text-dark-charcoal/40 mb-4 shadow-xs">
                    <Heart className="w-7 h-7 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-soft-black mb-1">Your Wishlist is Empty</h3>
                  <p className="text-xs text-dark-charcoal/70 max-w-xs mb-6 leading-relaxed">
                    Save your favorite signature handmade belts to easily find them when you're ready to order samples.
                  </p>
                  <Link
                    to="/product"
                    onClick={() => setIsWishlistOpen(false)}
                    className="inline-flex items-center gap-2 bg-soft-black text-cream px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-dark-charcoal transition-colors shadow-sm"
                  >
                    <span>Browse Belts</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                wishlist.map((item) => {
                  const priceLocal = (item.priceBDT || 850) * exchangeRate;
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white border border-stone/15 rounded-2xl p-3.5 shadow-2xs flex items-center gap-3.5 group hover:border-stone/30 transition-all"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone/5 border border-stone/10 shrink-0">
                        <img
                          src={item.image}
                          alt={item.color}
                          className="w-full h-full object-cover mix-blend-multiply"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-bold text-soft-black truncate">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-dark-charcoal/70 my-0.5">
                          <span>Color: <strong className="text-soft-black">{item.color}</strong></span>
                          <span>•</span>
                          <span>Size: <strong className="text-soft-black">{item.size}</strong></span>
                        </div>
                        <div className="text-xs font-bold text-soft-black">
                          {currencySymbol}{Math.round(priceLocal).toLocaleString()}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 items-end shrink-0">
                        <button
                          type="button"
                          onClick={() => moveToCartFromWishlist(item)}
                          className="flex items-center gap-1 bg-soft-black hover:bg-terracotta text-cream px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors shadow-2xs cursor-pointer"
                          title="Move to Cart"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Order</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromWishlist(item.id)}
                          className="p-1 text-dark-charcoal/40 hover:text-rose-600 transition-colors rounded cursor-pointer"
                          title="Remove"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {wishlist.length > 0 && (
              <div className="p-4 bg-white border-t border-stone/15 flex items-center justify-between gap-3">
                <Link
                  to="/product"
                  onClick={() => setIsWishlistOpen(false)}
                  className="flex-1 text-center py-3 px-4 bg-soft-black text-cream rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-dark-charcoal transition-colors shadow-sm"
                >
                  View Product Details
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WishlistDrawer;
