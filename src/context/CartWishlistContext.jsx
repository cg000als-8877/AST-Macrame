import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { calculateShippingQuote, BELT_WEIGHT_GRAMS, PACKAGING_WEIGHT_GRAMS } from '../utils/shippingCalculator';

import b1 from '../assets/products/Black/1.webp';
import n1 from '../assets/products/Navy/1.webp';
import br1 from '../assets/products/Brown/1.webp';
import m1 from '../assets/products/Maroon/1.webp';
import k1 from '../assets/products/Khaki/1.webp';

export const colorImageMap = {
  Black: b1,
  Navy: n1,
  Brown: br1,
  Maroon: m1,
  Khaki: k1,
};

const CartWishlistContext = createContext();

export const useCartWishlist = () => {
  const context = useContext(CartWishlistContext);
  if (!context) {
    throw new Error('useCartWishlist must be used within a CartWishlistProvider');
  }
  return context;
};

// Strategic volume pricing formula (850 base price, 2 for 1490)
export const calculateTierPriceBDT = (totalQty) => {
  if (totalQty <= 0) return 0;
  if (totalQty === 1) return 850;
  if (totalQty === 2) return 1490; // 745/pc (Save 210)
  if (totalQty === 3) return 2090; // 697/pc (Save 460)
  if (totalQty === 4) return 2650; // 662.5/pc (Save 750)
  if (totalQty === 5) return 3150; // 630/pc (Save 1100)
  return totalQty * 630;           // 630/pc for 6+
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

  // Fetch localization
  useEffect(() => {
    let isMounted = true;
    const fetchLocalization = async () => {
      try {
        const ipRes = await fetch('https://ipapi.co/json/');
        const ipData = await ipRes.json();
        
        const currencyCode = ipData.currency || 'USD';
        const country = ipData.country_name || 'United States';
        const countryCode = ipData.country_code || 'US';
        const continentCode = ipData.continent_code || 'NA';
        const callingCode = ipData.country_calling_code || '+1';
        
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
        const symbol = symbolMap[currencyCode] || currencyCode + ' ';
        
        if (!isMounted) return;
        setUserCountry(country);
        setUserCountryCode(countryCode);
        setUserContinentCode(continentCode);
        setUserCallingCode(callingCode);
        setLocalCurrency(currencyCode);
        setCurrencySymbol(symbol);

        const erRes = await fetch('https://api.exchangerate-api.com/v4/latest/BDT');
        const erData = await erRes.json();
        const rate = erData.rates[currencyCode] || 1;
        
        if (!isMounted) return;
        setExchangeRate(rate);
      } catch (err) {
        console.error("Failed to load localization data", err);
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
    const id = `${item.color || 'Black'}-${item.size || 'M'}`;
    const exists = wishlist.some(w => w.id === id);
    if (!exists) {
      const newItem = {
        id,
        title: item.title || 'AST Handmade Macramé Belt',
        color: item.color || 'Black',
        size: item.size || 'M',
        priceBDT: 850,
        image: colorImageMap[item.color] || b1,
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

  const isInWishlist = (color, size) => {
    const id = `${color}-${size}`;
    return wishlist.some(w => w.id === id);
  };

  const toggleWishlist = (item) => {
    const id = `${item.color || 'Black'}-${item.size || 'M'}`;
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
    const id = item.id || `${item.color || 'Black'}-${item.size || 'M'}`;
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
          title: item.title || 'AST Handmade Macramé Belt',
          color: item.color || 'Black',
          size: item.size || 'M',
          quantity: qty,
          basePriceBDT: item.priceBDT || item.basePriceBDT || 850,
          regularPriceBDT: item.regularPriceBDT || 1050,
          image: item.image || colorImageMap[item.color] || b1,
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

  // Sample Cart Calculations (Tiered)
  const totalPriceBDT = calculateTierPriceBDT(totalCartQuantity);
  const regularPriceBDT = totalCartQuantity * 850;
  const savingsBDT = Math.max(0, regularPriceBDT - totalPriceBDT);

  const totalPriceLocal = totalPriceBDT * exchangeRate;
  const regularPriceLocal = regularPriceBDT * exchangeRate;
  const savingsLocal = savingsBDT * exchangeRate;
  const unitPriceLocal = totalCartQuantity > 0 ? totalPriceLocal / totalCartQuantity : 850 * exchangeRate;

  // Retail Cart Calculations (Single Belts Tiered: 1 for 850, 2 for 1490, 3 for 2090, 4 for 2650, 5 for 3150, 6+ for 630/pc)
  const singleRetailItems = cart.filter(i => i.isRetail && i.orderType === 'single');
  const comboRetailItems = cart.filter(i => i.isRetail && i.orderType === 'combo');
  
  const singleItemsCount = singleRetailItems.reduce((sum, i) => sum + i.quantity, 0);
  const comboItemsCount = comboRetailItems.reduce((sum, i) => sum + i.quantity, 0);

  const singleSellingTotalBDT = calculateTierPriceBDT(singleItemsCount);
  const singleRegularTotalBDT = singleItemsCount * 1050;

  const comboSellingTotalBDT = comboItemsCount * 1490;
  const comboRegularTotalBDT = comboItemsCount * 2100;

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

