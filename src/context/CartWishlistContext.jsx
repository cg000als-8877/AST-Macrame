import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { calculateShippingQuote, BELT_WEIGHT_GRAMS, PACKAGING_WEIGHT_GRAMS } from '../utils/shippingCalculator';

import b1 from '../assets/products/Black/1.webp';
import n1 from '../assets/products/Navy/1.webp';
import br1 from '../assets/products/Brown/1.webp';
import m1 from '../assets/products/Maroon/1.webp';
import k1 from '../assets/products/Khaki/1.webp';
import wp1 from '../assets/products/Women/Pink/1.webp';
import wpu1 from '../assets/products/Women/Purple/1.webp';

export const colorImageMap = {
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
  'Kids-Black': '/AST Macrame Kids/Black/1.webp',
  'Kids-Navy': '/AST Macrame Kids/Navy/1.webp',
  'Kids-Neon Green': '/AST Macrame Kids/Neon Green/1.webp',
  'Kids-Red': '/AST Macrame Kids/Red/1.webp',
  Pink: wp1,
  Purple: wpu1,
  'Blush Pink': wp1,
  'Royal Purple': wpu1,
  'Women-Pink': wp1,
  'Women-Purple': wpu1,
};

const CartWishlistContext = createContext();

export const useCartWishlist = () => {
  const context = useContext(CartWishlistContext);
  if (!context) {
    throw new Error('useCartWishlist must be used within a CartWishlistProvider');
  }
  return context;
};

// Strategic volume pricing formula for Adult Belt (850 base price, 2 for 1490)
export const calculateTierPriceBDT = (totalQty) => {
  if (totalQty <= 0) return 0;
  if (totalQty === 1) return 850;
  if (totalQty === 2) return 1490; // 745/pc (Save 210)
  if (totalQty === 3) return 2090; // 697/pc (Save 460)
  if (totalQty === 4) return 2650; // 662.5/pc (Save 750)
  if (totalQty === 5) return 3150; // 630/pc (Save 1100)
  return totalQty * 630;           // 630/pc for 6+
};

// Strategic volume pricing formula for Women's Waist Belt (590 base price, 2 for 1080)
export const calculateWomenTierPriceBDT = (totalQty) => {
  if (totalQty <= 0) return 0;
  if (totalQty === 1) return 590;
  if (totalQty === 2) return 1080; // 540/pc (Save 420)
  if (totalQty === 3) return 1530; // 510/pc (Save 720)
  if (totalQty === 4) return 1960; // 490/pc (Save 1040)
  if (totalQty === 5) return 2350; // 470/pc (Save 1400)
  return totalQty * 470;           // 470/pc for 6+
};

// Strategic volume pricing formula for Kids Belt (600 base price, 2 for 1090)
export const calculateKidsTierPriceBDT = (totalQty) => {
  if (totalQty <= 0) return 0;
  if (totalQty === 1) return 600;
  if (totalQty === 2) return 1090; // 545/pc (Save 610)
  if (totalQty === 3) return 1560; // 520/pc (Save 990)
  if (totalQty === 4) return 1980; // 495/pc (Save 1420)
  if (totalQty === 5) return 2350; // 470/pc (Save 1900)
  return totalQty * 470;           // 470/pc for 6+
};

export const CartWishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('ast_sample_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ast_sample_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const autoCloseTimerRef = useRef(null);

  const cancelCartAutoClose = useCallback(() => {
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
  }, []);

  const openCartTemporarily = useCallback((durationMs = 4000) => {
    cancelCartAutoClose();
    setIsCartOpen(true);
    autoCloseTimerRef.current = setTimeout(() => {
      setIsCartOpen(false);
      autoCloseTimerRef.current = null;
    }, durationMs);
  }, [cancelCartAutoClose]);

  const openCart = useCallback(() => {
    cancelCartAutoClose();
    setIsCartOpen(true);
  }, [cancelCartAutoClose]);

  const closeCart = useCallback(() => {
    cancelCartAutoClose();
    setIsCartOpen(false);
  }, [cancelCartAutoClose]);

  // Localization state
  const [localCurrency, setLocalCurrency] = useState('BDT');
  const [currencySymbol, setCurrencySymbol] = useState('৳');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [userCountry, setUserCountry] = useState('Bangladesh');
  const [userCountryCode, setUserCountryCode] = useState('BD');
  const [userContinentCode, setUserContinentCode] = useState('AS');
  const [userCallingCode, setUserCallingCode] = useState('+880');

  useEffect(() => {
    try {
      localStorage.setItem('ast_sample_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('ast_sample_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  // Fetch localization with caching & graceful fallback
  useEffect(() => {
    let isMounted = true;
    const fetchLocalization = async () => {
      try {
        // 1. Check cached localization
        const cached = sessionStorage.getItem('ast_user_localization');
        if (cached) {
          try {
            const data = JSON.parse(cached);
            if (isMounted && data) {
              setUserCountry(data.country || 'Bangladesh');
              setUserCountryCode(data.countryCode || 'BD');
              setUserContinentCode(data.continentCode || 'AS');
              setUserCallingCode(data.callingCode || '+880');
              setLocalCurrency(data.currencyCode || 'BDT');
              setCurrencySymbol(data.symbol || '৳');
              setExchangeRate(data.rate || 1);
              return;
            }
          } catch (_) {}
        }

        const symbolMap = { 
          'USD': '$', 
          'EUR': '€', 
          'GBP': '£', 
          'BDT': '৳', 
          'CAD': 'CA$', 
          'AUD': 'AU$', 
          'AED': 'AED ', 
          'SAR': 'SAR ', 
          'QAR': 'QAR ', 
          'KWD': 'KWD ', 
          'BHD': 'BHD ', 
          'OMR': 'OMR ', 
          'INR': '₹', 
          'SGD': 'S$', 
          'MYR': 'RM ', 
          'JPY': '¥', 
          'CNY': '¥' 
        };

        let currencyCode = 'BDT';
        let country = 'Bangladesh';
        let countryCode = 'BD';
        let continentCode = 'AS';
        let callingCode = '+880';

        // Try primary IP service with 4s timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        try {
          const ipRes = await fetch('https://ipwho.is/', { signal: controller.signal });
          clearTimeout(timeoutId);
          if (ipRes.ok) {
            const ipData = await ipRes.json();
            if (ipData.success !== false) {
              currencyCode = ipData.currency || ipData.currency_code || 'BDT';
              country = ipData.country || 'Bangladesh';
              countryCode = ipData.country_code || 'BD';
              continentCode = ipData.continent_code || 'AS';
              callingCode = ipData.calling_code ? `+${ipData.calling_code.replace('+', '')}` : '+880';
            }
          }
        } catch (_) {
          // Fallback to ipapi.co if needed
          try {
            const fallbackRes = await fetch('https://ipapi.co/json/');
            if (fallbackRes.ok) {
              const fallbackData = await fallbackRes.json();
              currencyCode = fallbackData.currency || 'BDT';
              country = fallbackData.country_name || 'Bangladesh';
              countryCode = fallbackData.country_code || 'BD';
              continentCode = fallbackData.continent_code || 'AS';
              callingCode = fallbackData.country_calling_code || '+880';
            }
          } catch (_) {}
        }

        const symbol = symbolMap[currencyCode] || currencyCode + ' ';

        if (!isMounted) return;
        setUserCountry(country);
        setUserCountryCode(countryCode);
        setUserContinentCode(continentCode);
        setUserCallingCode(callingCode);
        setLocalCurrency(currencyCode);
        setCurrencySymbol(symbol);

        let rate = 1;
        if (currencyCode !== 'BDT') {
          try {
            const erRes = await fetch('https://api.exchangerate-api.com/v4/latest/BDT');
            if (erRes.ok) {
              const erData = await erRes.json();
              rate = erData.rates?.[currencyCode] || 1;
            }
          } catch (_) {}
        }

        if (!isMounted) return;
        setExchangeRate(rate);

        // Cache result for session
        sessionStorage.setItem('ast_user_localization', JSON.stringify({
          country,
          countryCode,
          continentCode,
          callingCode,
          currencyCode,
          symbol,
          rate
        }));
      } catch (err) {
        // Fallback default is BDT
      }
    };

    fetchLocalization();
    return () => { isMounted = false; };
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2600);
  };

  // Wishlist actions
  const addToWishlist = (item) => {
    const isKids = item.productId === 'kids' || (item.title && item.title.toLowerCase().includes('kids'));
    const isWomen = item.productId === 'women' || (item.title && (item.title.toLowerCase().includes('women') || item.title.toLowerCase().includes('waist')));
    const resolvedProductId = isKids ? 'kids' : isWomen ? 'women' : 'adult';
    const defaultTitle = isKids ? 'AST Handmade Macramé Kids Belt' : isWomen ? 'AST Women’s Handmade Macramé Waist Belt' : 'AST Handmade Macramé Belt';
    const defaultBasePrice = isKids ? 600 : isWomen ? 590 : 850;
    const defaultRegularPrice = isKids ? 850 : isWomen ? 750 : 1050;
    const id = item.id || `${resolvedProductId !== 'adult' ? resolvedProductId + '-' : ''}${item.color || (isKids ? 'Neon Green' : isWomen ? 'Pink' : 'Black')}-${item.size || (isKids ? 'One' : isWomen ? '31"' : 'M')}`;
    const exists = wishlist.some(w => w.id === id);
    if (!exists) {
      const newItem = {
        id,
        productId: resolvedProductId,
        title: item.title || defaultTitle,
        color: item.color || (isKids ? 'Neon Green' : isWomen ? 'Pink' : 'Black'),
        size: item.size || (isKids ? 'One' : isWomen ? '31"' : 'M'),
        priceBDT: item.priceBDT || defaultBasePrice,
        regularPriceBDT: item.regularPriceBDT || defaultRegularPrice,
        image: item.image || colorImageMap[item.color] || (isWomen ? wp1 : isKids ? '/AST Macrame Kids/Neon Green/1.webp' : b1),
        addedAt: Date.now()
      };
      setWishlist(prev => [newItem, ...prev]);
      showToast('Added to Wishlist ❤️');
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(w => w.id !== id));
    showToast('Removed from Wishlist');
  };

  const isInWishlist = (color, size, productId = 'adult') => {
    const prefix = productId !== 'adult' ? `${productId}-` : '';
    const id = `${prefix}${color}-${size}`;
    return wishlist.some(w => w.id === id || (w.color === color && w.size === size && (w.productId || 'adult') === productId));
  };

  const toggleWishlist = (item) => {
    const isKids = item.productId === 'kids' || (item.title && item.title.toLowerCase().includes('kids'));
    const isWomen = item.productId === 'women' || (item.title && (item.title.toLowerCase().includes('women') || item.title.toLowerCase().includes('waist')));
    const resolvedProductId = isKids ? 'kids' : isWomen ? 'women' : 'adult';
    const id = item.id || `${resolvedProductId !== 'adult' ? resolvedProductId + '-' : ''}${item.color || (isKids ? 'Neon Green' : isWomen ? 'Pink' : 'Black')}-${item.size || (isKids ? 'One' : isWomen ? '31"' : 'M')}`;
    if (wishlist.some(w => w.id === id)) {
      removeFromWishlist(id);
      return false;
    } else {
      addToWishlist(item);
      return true;
    }
  };

  // Cart actions
  const addToCart = (item, qty = 1) => {
    const isKids = item.productId === 'kids' || (item.title && item.title.toLowerCase().includes('kids'));
    const isWomen = item.productId === 'women' || (item.title && (item.title.toLowerCase().includes('women') || item.title.toLowerCase().includes('waist')));
    const resolvedProductId = isKids ? 'kids' : isWomen ? 'women' : 'adult';
    const defaultTitle = isKids ? 'AST Handmade Macramé Kids Belt' : isWomen ? 'AST Women’s Handmade Macramé Waist Belt' : 'AST Handmade Macramé Belt';
    const defaultBasePrice = isKids ? 600 : isWomen ? 590 : 850;
    const defaultRegularPrice = isKids ? 850 : isWomen ? 750 : 1050;
    const id = item.id || `${resolvedProductId !== 'adult' ? resolvedProductId + '-' : ''}${item.color || (isKids ? 'Neon Green' : isWomen ? 'Pink' : 'Black')}-${item.size || (isKids ? 'One' : isWomen ? '31"' : 'M')}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(c => c.id === id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty
        };
        return updated;
      } else {
        const newItem = {
          id,
          productId: resolvedProductId,
          title: item.title || defaultTitle,
          color: item.color || (isKids ? 'Neon Green' : isWomen ? 'Pink' : 'Black'),
          size: item.size || (isKids ? 'One' : isWomen ? '31"' : 'M'),
          quantity: qty,
          basePriceBDT: item.basePriceBDT || item.priceBDT || defaultBasePrice,
          regularPriceBDT: item.regularPriceBDT || defaultRegularPrice,
          image: item.image || colorImageMap[item.color] || (isWomen ? wp1 : isKids ? '/AST Macrame Kids/Neon Green/1.webp' : b1),
          isRetail: !!item.isRetail,
          orderType: item.orderType || 'single',
          comboColor1: item.comboColor1,
          comboSize1: item.comboSize1,
          comboColor2: item.comboColor2,
          comboSize2: item.comboSize2
        };
        return [...prev, newItem];
      }
    });
  };

  const updateCartQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast('Removed from Cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  const moveToCartFromWishlist = (item) => {
    addToCart(item, 1);
    removeFromWishlist(item.id);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  // Dynamic shipping calculation helper
  const getShippingQuote = useCallback((qty = 1) => {
    return calculateShippingQuote(qty, userCountryCode, userContinentCode, exchangeRate);
  }, [userCountryCode, userContinentCode, exchangeRate]);

  // Aggregated calculations
  const totalCartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistCount = wishlist.length;

  const isRetailCart = cart.some(item => item.isRetail);

  // Sample Cart Calculations (Tiered by product)
  const adultSampleItems = cart.filter(i => !i.isRetail && i.productId !== 'kids' && i.productId !== 'women');
  const womenSampleItems = cart.filter(i => !i.isRetail && i.productId === 'women');
  const kidsSampleItems = cart.filter(i => !i.isRetail && i.productId === 'kids');
  const adultSampleQty = adultSampleItems.reduce((s, i) => s + i.quantity, 0);
  const womenSampleQty = womenSampleItems.reduce((s, i) => s + i.quantity, 0);
  const kidsSampleQty = kidsSampleItems.reduce((s, i) => s + i.quantity, 0);

  const totalPriceBDT = calculateTierPriceBDT(adultSampleQty) + calculateWomenTierPriceBDT(womenSampleQty) + calculateKidsTierPriceBDT(kidsSampleQty);
  const regularPriceBDT = (adultSampleQty * 850) + (womenSampleQty * 750) + (kidsSampleQty * 850);
  const savingsBDT = Math.max(0, regularPriceBDT - totalPriceBDT);

  const totalPriceLocal = totalPriceBDT * exchangeRate;
  const regularPriceLocal = regularPriceBDT * exchangeRate;
  const savingsLocal = savingsBDT * exchangeRate;
  const unitPriceLocal = totalCartQuantity > 0 ? totalPriceLocal / totalCartQuantity : 850 * exchangeRate;

  // Retail Cart Calculations
  const adultSingleRetail = cart.filter(i => i.isRetail && i.orderType === 'single' && i.productId !== 'kids' && i.productId !== 'women');
  const womenSingleRetail = cart.filter(i => i.isRetail && i.orderType === 'single' && i.productId === 'women');
  const kidsSingleRetail = cart.filter(i => i.isRetail && i.orderType === 'single' && i.productId === 'kids');
  
  const adultComboRetail = cart.filter(i => i.isRetail && i.orderType === 'combo' && i.productId !== 'kids' && i.productId !== 'women');
  const womenComboRetail = cart.filter(i => i.isRetail && i.orderType === 'combo' && i.productId === 'women');
  const kidsComboRetail = cart.filter(i => i.isRetail && i.orderType === 'combo' && i.productId === 'kids');

  const adultSingleQty = adultSingleRetail.reduce((s, i) => s + i.quantity, 0);
  const womenSingleQty = womenSingleRetail.reduce((s, i) => s + i.quantity, 0);
  const kidsSingleQty = kidsSingleRetail.reduce((s, i) => s + i.quantity, 0);
  
  const adultComboQty = adultComboRetail.reduce((s, i) => s + i.quantity, 0);
  const womenComboQty = womenComboRetail.reduce((s, i) => s + i.quantity, 0);
  const kidsComboQty = kidsComboRetail.reduce((s, i) => s + i.quantity, 0);

  const singleItemsCount = adultSingleQty + womenSingleQty + kidsSingleQty;
  const comboItemsCount = adultComboQty + womenComboQty + kidsComboQty;

  const singleSellingTotalBDT = calculateTierPriceBDT(adultSingleQty) + calculateWomenTierPriceBDT(womenSingleQty) + calculateKidsTierPriceBDT(kidsSingleQty);
  const singleRegularTotalBDT = (adultSingleQty * 1050) + (womenSingleQty * 750) + (kidsSingleQty * 850);

  const comboSellingTotalBDT = (adultComboQty * 1490) + (womenComboQty * 1080) + (kidsComboQty * 1090);
  const comboRegularTotalBDT = (adultComboQty * 2100) + (womenComboQty * 1500) + (kidsComboQty * 1700);

  const retailRegularTotalBDT = singleRegularTotalBDT + comboRegularTotalBDT;
  const retailSellingTotalBDT = singleSellingTotalBDT + comboSellingTotalBDT;
  const retailSavingsTotalBDT = Math.max(0, retailRegularTotalBDT - retailSellingTotalBDT);

  // Dynamic Shipping for Cart
  const cartShippingQuote = getShippingQuote(totalCartQuantity || 1);
  const shippingCostLocal = cartShippingQuote.costLocal;

  return (
    <CartWishlistContext.Provider
      value={{
        wishlist,
        cart,
        isWishlistOpen,
        setIsWishlistOpen,
        isCartOpen,
        setIsCartOpen,
        openCartTemporarily,
        cancelCartAutoClose,
        openCart,
        closeCart,
        toastMessage,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        moveToCartFromWishlist,
        totalCartQuantity,
        totalWishlistCount,
        isRetailCart,
        totalPriceBDT,
        regularPriceBDT,
        savingsBDT,
        totalPriceLocal,
        regularPriceLocal,
        savingsLocal,
        unitPriceLocal,
        singleItemsCount,
        comboItemsCount,
        adultSingleQty,
        womenSingleQty,
        kidsSingleQty,
        adultComboQty,
        womenComboQty,
        kidsComboQty,
        adultSampleQty,
        womenSampleQty,
        kidsSampleQty,
        singleSellingTotalBDT,
        retailRegularTotalBDT,
        retailSellingTotalBDT,
        retailSavingsTotalBDT,
        localCurrency,
        currencySymbol,
        exchangeRate,
        userCountry,
        userCountryCode,
        userContinentCode,
        userCallingCode,
        getShippingQuote,
        cartShippingQuote,
        shippingCostLocal,
        showToast
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
};

